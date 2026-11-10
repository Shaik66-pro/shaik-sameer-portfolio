"""
Django settings for resume_api project.
Reads secrets from environment variables – never hard-code credentials here.
"""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# ─── Security ──────────────────────────────────────────────────────────────
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "change-me-in-production-use-env-var")
DEBUG = os.environ.get("DJANGO_DEBUG", "False") == "True"
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")

# ─── Applications ──────────────────────────────────────────────────────────
INSTALLED_APPS = [
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "resume_manager",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "resume_api.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {"context_processors": ["django.template.context_processors.request"]},
    },
]

WSGI_APPLICATION = "resume_api.wsgi.application"

# ─── Database (sessions only – no user model needed) ───────────────────────
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# ─── Sessions ──────────────────────────────────────────────────────────────
SESSION_ENGINE = "django.contrib.sessions.backends.db"
SESSION_COOKIE_AGE = 3600          # 1 hour
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = "Lax"
# In production set SESSION_COOKIE_SECURE = True (requires HTTPS)
SESSION_COOKIE_SECURE = os.environ.get("DJANGO_SECURE_COOKIE", "False") == "True"

# ─── CORS ──────────────────────────────────────────────────────────────────
# Dev: allow Vite dev server. In production, set the actual domain.
CORS_ALLOWED_ORIGINS = os.environ.get(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000"
).split(",")
CORS_ALLOW_CREDENTIALS = True

# ─── CSRF ──────────────────────────────────────────────────────────────────
CSRF_TRUSTED_ORIGINS = os.environ.get(
    "CSRF_TRUSTED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000"
).split(",")
CSRF_COOKIE_HTTPONLY = False   # Must be readable by JS for SPA
CSRF_COOKIE_SAMESITE = "Lax"
CSRF_COOKIE_SECURE = os.environ.get("DJANGO_SECURE_COOKIE", "False") == "True"

# ─── Static & Media ────────────────────────────────────────────────────────
STATIC_URL = "/static/"
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# ─── Owner credentials (from env ONLY – never hard-code) ───────────────────
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "")           # Set in .env
OWNER_PASSWORD_HASH = os.environ.get("OWNER_PASSWORD_HASH", "")  # bcrypt hash

# ─── Upload limits ─────────────────────────────────────────────────────────
MAX_RESUME_SIZE_MB = 10

# ─── Rate limiting (simple in-memory for dev; use django-ratelimit in prod) ─
LOGIN_MAX_ATTEMPTS = 5     # per IP per window
LOGIN_WINDOW_SECONDS = 300

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
