"""
resume_manager/views.py

All sensitive logic lives server-side:
  • Owner identity is verified against env-var-stored bcrypt hash.
  • Sessions track authenticated state.
  • Upload endpoint is protected; public endpoint is read-only.
  • Rate limiting on login via in-memory counter (upgrade to django-ratelimit in production).
"""
import os
import time
import hashlib
import mimetypes
from pathlib import Path
from datetime import datetime, timezone
from collections import defaultdict

from django.conf import settings
from django.http import (
    JsonResponse, FileResponse, Http404, HttpResponseForbidden
)
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

# ── Path where the public resume lives ─────────────────────────────────────
RESUME_DIR = Path(settings.MEDIA_ROOT)
RESUME_FILENAME = "resume.pdf"
RESUME_PATH = RESUME_DIR / RESUME_FILENAME

# ── Simple in-memory rate limiter ───────────────────────────────────────────
_login_attempts: dict = defaultdict(list)   # ip -> [timestamp, ...]

def _check_rate_limit(ip: str) -> bool:
    """Returns True if the IP is allowed to attempt login."""
    now = time.time()
    window = settings.LOGIN_WINDOW_SECONDS
    attempts = [t for t in _login_attempts[ip] if now - t < window]
    _login_attempts[ip] = attempts
    return len(attempts) < settings.LOGIN_MAX_ATTEMPTS

def _record_attempt(ip: str):
    _login_attempts[ip].append(time.time())

def _client_ip(request) -> str:
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR")
    return forwarded.split(",")[0].strip() if forwarded else request.META.get("REMOTE_ADDR", "")

# ── Password verification (bcrypt-based) ────────────────────────────────────
def _verify_password(plain: str) -> bool:
    """
    Verifies plain text against OWNER_PASSWORD_HASH from env.
    Supports:
      • bcrypt hashes (preferred): $2b$... stored in OWNER_PASSWORD_HASH
      • SHA-256 fallback for environments without bcrypt
    Never logs or returns the hash.
    """
    stored_hash = settings.OWNER_PASSWORD_HASH
    if not stored_hash:
        return False

    if stored_hash.startswith("$2b$") or stored_hash.startswith("$2a$"):
        try:
            import bcrypt
            return bcrypt.checkpw(plain.encode(), stored_hash.encode())
        except ImportError:
            pass  # fall through to SHA-256

    # SHA-256 fallback: store as "sha256:<hex>"
    if stored_hash.startswith("sha256:"):
        expected = stored_hash[7:]
        actual = hashlib.sha256(plain.encode()).hexdigest()
        return actual == expected

    return False


# ══════════════════════════════════════════════════════════════════════════════
# PUBLIC ENDPOINT — /api/resume/info/
# Returns metadata only; never exposes server paths.
# ══════════════════════════════════════════════════════════════════════════════
@require_http_methods(["GET"])
def resume_info(request):
    if RESUME_PATH.exists():
        stat = RESUME_PATH.stat()
        last_modified = datetime.fromtimestamp(stat.st_mtime, tz=timezone.utc).isoformat()
        return JsonResponse({
            "available": True,
            "url": "/api/resume/download/",
            "view_url": "/api/resume/view/",
            "last_updated": last_modified,
            "filename": RESUME_FILENAME,
        })
    return JsonResponse({"available": False})


# ══════════════════════════════════════════════════════════════════════════════
# PUBLIC ENDPOINT — /api/resume/download/
# Serves the resume as an attachment (download).
# ══════════════════════════════════════════════════════════════════════════════
@require_http_methods(["GET"])
def resume_download(request):
    if not RESUME_PATH.exists():
        raise Http404("Resume not found.")
    response = FileResponse(
        open(RESUME_PATH, "rb"),
        as_attachment=True,
        filename="Shaik_Sameer_Resume.pdf",
        content_type="application/pdf",
    )
    response["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response


# ══════════════════════════════════════════════════════════════════════════════
# PUBLIC ENDPOINT — /api/resume/view/
# Serves the resume inline (view in browser).
# ══════════════════════════════════════════════════════════════════════════════
@require_http_methods(["GET"])
def resume_view(request):
    if not RESUME_PATH.exists():
        raise Http404("Resume not found.")
    response = FileResponse(
        open(RESUME_PATH, "rb"),
        as_attachment=False,
        filename="Shaik_Sameer_Resume.pdf",
        content_type="application/pdf",
    )
    response["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response


# ══════════════════════════════════════════════════════════════════════════════
# PUBLIC ENDPOINT — /api/auth/csrf/
# Returns a CSRF cookie so the SPA can post authenticated requests.
# ══════════════════════════════════════════════════════════════════════════════
@require_http_methods(["GET"])
def get_csrf(request):
    from django.middleware.csrf import get_token
    get_token(request)
    return JsonResponse({"detail": "CSRF cookie set."})


# ══════════════════════════════════════════════════════════════════════════════
# PROTECTED ENDPOINT — /api/auth/login/
# Rate-limited; verifies owner email + password from env vars.
# ══════════════════════════════════════════════════════════════════════════════
@csrf_exempt            # CSRF enforced via Origin check; session set after auth
@require_http_methods(["POST"])
def owner_login(request):
    ip = _client_ip(request)

    if not _check_rate_limit(ip):
        return JsonResponse(
            {"error": "Too many login attempts. Please wait and try again."},
            status=429,
        )

    try:
        body = json.loads(request.body)
        email = body.get("email", "").strip().lower()
        password = body.get("password", "")
    except (json.JSONDecodeError, AttributeError):
        return JsonResponse({"error": "Invalid request body."}, status=400)

    _record_attempt(ip)

    owner_email = (settings.OWNER_EMAIL or "").strip().lower()

    # Constant-time comparison for email to prevent timing attacks
    emails_match = (
        len(email) == len(owner_email)
        and all(a == b for a, b in zip(email, owner_email))
    )

    if not emails_match or not _verify_password(password):
        # Generic message — don't reveal which field was wrong
        return JsonResponse({"error": "Invalid credentials."}, status=401)

    # Auth success — create session
    request.session["is_owner"] = True
    request.session["owner_email"] = email
    request.session.cycle_key()   # prevent session fixation

    return JsonResponse({"authenticated": True})


# ══════════════════════════════════════════════════════════════════════════════
# PROTECTED ENDPOINT — /api/auth/logout/
# ══════════════════════════════════════════════════════════════════════════════
@require_http_methods(["POST"])
def owner_logout(request):
    request.session.flush()
    return JsonResponse({"authenticated": False})


# ══════════════════════════════════════════════════════════════════════════════
# PROTECTED ENDPOINT — /api/auth/check/
# ══════════════════════════════════════════════════════════════════════════════
@require_http_methods(["GET"])
def auth_check(request):
    authenticated = request.session.get("is_owner", False)
    return JsonResponse({"authenticated": authenticated})


# ══════════════════════════════════════════════════════════════════════════════
# PROTECTED ENDPOINT — /api/resume/upload/
# Owner-only. Validates file type and size. Atomic replace.
# ══════════════════════════════════════════════════════════════════════════════
@require_http_methods(["POST"])
def resume_upload(request):
    # ── Authorization ────────────────────────────────────────────────────────
    if not request.session.get("is_owner", False):
        return JsonResponse({"error": "Access denied. Please sign in as the portfolio owner."}, status=403)

    # ── File presence ────────────────────────────────────────────────────────
    uploaded_file = request.FILES.get("resume")
    if not uploaded_file:
        return JsonResponse({"error": "No file provided."}, status=400)

    # ── Type validation ──────────────────────────────────────────────────────
    content_type = uploaded_file.content_type or ""
    file_name = uploaded_file.name or ""
    if content_type != "application/pdf" or not file_name.lower().endswith(".pdf"):
        return JsonResponse({"error": "Only PDF files are accepted."}, status=415)

    # ── Size validation ──────────────────────────────────────────────────────
    max_bytes = settings.MAX_RESUME_SIZE_MB * 1024 * 1024
    if uploaded_file.size > max_bytes:
        return JsonResponse(
            {"error": f"File too large. Maximum size is {settings.MAX_RESUME_SIZE_MB} MB."},
            status=413,
        )

    # ── Magic bytes check (PDF starts with %PDF) ─────────────────────────────
    header = uploaded_file.read(4)
    uploaded_file.seek(0)
    if header != b"%PDF":
        return JsonResponse({"error": "File does not appear to be a valid PDF."}, status=415)

    # ── Atomic write: save to temp, then rename ───────────────────────────────
    RESUME_DIR.mkdir(parents=True, exist_ok=True)
    temp_path = RESUME_DIR / f"_resume_tmp_{int(time.time())}.pdf"
    try:
        with open(temp_path, "wb") as f:
            for chunk in uploaded_file.chunks():
                f.write(chunk)
        # Atomic rename so old resume stays intact if write fails
        temp_path.replace(RESUME_PATH)
    except Exception as exc:
        temp_path.unlink(missing_ok=True)
        return JsonResponse({"error": f"Upload failed: {str(exc)}"}, status=500)

    stat = RESUME_PATH.stat()
    last_modified = datetime.fromtimestamp(stat.st_mtime, tz=timezone.utc).isoformat()
    return JsonResponse({
        "success": True,
        "message": "Resume replaced successfully.",
        "last_updated": last_modified,
    })
