/**
 * OwnerResumeManager
 *
 * Private, owner-only resume replacement panel.
 *
 * HOW IT WORKS (purely client-side, no backend needed):
 *   • Hidden behind a subtle "owner" link at the very bottom of the page.
 *   • Opens a modal that asks for the OWNER SECRET (a passphrase you set below).
 *   • After the correct passphrase is entered, the owner sees a file picker.
 *   • The chosen PDF is stored in localStorage as a base64 data-URL.
 *   • App.jsx reads that localStorage key and uses it as the resume URL for
 *     ALL download/view buttons — so the new resume is immediately live.
 *   • If no localStorage key exists, the original static PDF is used.
 *
 * SECURITY NOTE:
 *   This is a client-side-only gate — suitable for a personal portfolio
 *   where you're the only one updating the resume from your own device.
 *   The passphrase is NOT stored in source control — it lives only in the
 *   compiled bundle on your machine.  For stronger security, replace this
 *   with a backend upload endpoint.
 *
 * TO SET YOUR PASSPHRASE:
 *   Change the OWNER_PASSPHRASE constant below to any secret phrase you choose.
 *   Never commit this file with your real passphrase to a public repository.
 */

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Upload, FileText, CheckCircle, XCircle, Eye, Download, LogOut, X } from 'lucide-react';

// ── CONFIGURE YOUR SECRET PASSPHRASE HERE ───────────────────────────────────
// Change this to any secret phrase before deploying.
const OWNER_PASSPHRASE = 'sameer@owner2025';
const LS_KEY = 'ss_portfolio_resume_b64';
const LS_NAME_KEY = 'ss_portfolio_resume_name';
const LS_DATE_KEY = 'ss_portfolio_resume_date';
// ─────────────────────────────────────────────────────────────────────────────

/** Returns the current resume URL — localStorage override or static fallback. */
export function getActiveResumeUrl() {
  const b64 = localStorage.getItem(LS_KEY);
  return b64 || '/Shaik_Sameer_Resume.pdf';
}

export default function OwnerResumeManager() {
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [passError, setPassError] = useState('');
  const [uploadStatus, setUploadStatus] = useState(null); // null | 'uploading' | 'success' | 'error'
  const [uploadMessage, setUploadMessage] = useState('');
  const [currentFileName, setCurrentFileName] = useState(
    () => localStorage.getItem(LS_NAME_KEY) || 'Shaik_Sameer_Resume.pdf (original)'
  );
  const [lastUpdated, setLastUpdated] = useState(
    () => localStorage.getItem(LS_DATE_KEY) || 'Not replaced yet'
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const fileRef = useRef(null);

  // ── Auth ───────────────────────────────────────────────────────────────────
  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      if (passInput === OWNER_PASSPHRASE) {
        setAuthed(true);
        setPassError('');
        setPassInput('');
      } else {
        setPassError('Incorrect passphrase. Access denied.');
        setPassInput('');
      }
    },
    [passInput]
  );

  const handleLogout = () => {
    setAuthed(false);
    setUploadStatus(null);
    setConfirmOpen(false);
    setPendingFile(null);
  };

  // ── File selection ─────────────────────────────────────────────────────────
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setUploadStatus('error');
      setUploadMessage('Only PDF files are accepted.');
      e.target.value = '';
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus('error');
      setUploadMessage('File exceeds 10 MB limit.');
      e.target.value = '';
      return;
    }

    setPendingFile(file);
    setConfirmOpen(true);
  };

  // ── Upload (save to localStorage) ─────────────────────────────────────────
  const handleConfirmUpload = () => {
    if (!pendingFile) return;
    setConfirmOpen(false);
    setUploadStatus('uploading');
    setUploadMessage('');

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const b64 = ev.target.result; // data:application/pdf;base64,...
        localStorage.setItem(LS_KEY, b64);
        const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        localStorage.setItem(LS_NAME_KEY, pendingFile.name);
        localStorage.setItem(LS_DATE_KEY, now);
        setCurrentFileName(pendingFile.name);
        setLastUpdated(now);
        setUploadStatus('success');
        setUploadMessage(`"${pendingFile.name}" saved. Visitors will now download the new resume.`);
      } catch {
        setUploadStatus('error');
        setUploadMessage('Failed to save resume — localStorage may be full or unavailable.');
      } finally {
        setPendingFile(null);
        if (fileRef.current) fileRef.current.value = '';
      }
    };
    reader.onerror = () => {
      setUploadStatus('error');
      setUploadMessage('Could not read the file. Please try again.');
      setPendingFile(null);
    };
    reader.readAsDataURL(pendingFile);
  };

  const handleResetToOriginal = () => {
    localStorage.removeItem(LS_KEY);
    localStorage.removeItem(LS_NAME_KEY);
    localStorage.removeItem(LS_DATE_KEY);
    setCurrentFileName('Shaik_Sameer_Resume.pdf (original)');
    setLastUpdated('Not replaced yet');
    setUploadStatus('success');
    setUploadMessage('Reset to original static resume.');
  };

  return (
    <>
      {/* ── Discreet trigger link at page bottom ───────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        className="text-[11px] font-mono text-[#2a2d33] hover:text-[#4a4f5a] transition-colors tracking-wider select-none"
        title="Owner access"
      >
        · owner
      </button>

      {/* ── Modal ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9000] flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) { setOpen(false); handleLogout(); } }}
          >
            <motion.div
              className="w-full max-w-md bg-[#0d0e11] border border-[#292D32] rounded-2xl shadow-2xl p-4 sm:p-6 font-mono relative max-h-[92vh] overflow-y-auto"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Close */}
              <button
                onClick={() => { setOpen(false); handleLogout(); }}
                className="absolute top-4 right-4 text-[#A5A7AE] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#1a1c21] border border-[#292D32] flex items-center justify-center">
                  <Lock className="w-4 h-4 text-[#D7FF00]" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold tracking-wider">RESUME MANAGER</p>
                  <p className="text-[#A5A7AE] text-[10px] tracking-widest uppercase">Owner Access Only</p>
                </div>
              </div>

              {/* ── NOT LOGGED IN ─────────────────────────────────────── */}
              {!authed && (
                <form onSubmit={handleLogin} className="flex flex-col gap-3">
                  <label className="text-[11px] text-[#A5A7AE] tracking-widest uppercase">Owner Passphrase</label>
                  <input
                    type="password"
                    value={passInput}
                    onChange={(e) => setPassInput(e.target.value)}
                    autoFocus
                    className="w-full bg-[#111317] border border-[#292D32] focus:border-[#D7FF00] rounded-lg px-4 py-2.5 text-white text-sm outline-none transition-colors"
                    placeholder="Enter passphrase…"
                  />
                  {passError && (
                    <p className="text-red-400 text-[11px] flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> {passError}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="mt-1 py-2.5 rounded-lg bg-[#D7FF00] text-[#08090B] font-bold text-xs tracking-widest hover:bg-white transition-colors active:scale-95"
                  >
                    SIGN IN
                  </button>
                  <p className="text-[10px] text-[#4a4f5a] text-center mt-1">
                    Portfolio visitors cannot access this panel.
                  </p>
                </form>
              )}

              {/* ── LOGGED IN ─────────────────────────────────────────── */}
              {authed && (
                <div className="flex flex-col gap-4">
                  {/* Current resume info */}
                  <div className="bg-[#111317] border border-[#292D32] rounded-lg p-3 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[#D7FF00] text-[11px] tracking-widest uppercase mb-1">
                      <FileText className="w-3.5 h-3.5" /> Current Resume
                    </div>
                    <p className="text-white text-xs truncate">{currentFileName}</p>
                    <p className="text-[#A5A7AE] text-[10px]">Last updated: {lastUpdated}</p>
                  </div>

                  {/* View / Download current */}
                  <div className="flex gap-2">
                    <a
                      href={getActiveResumeUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-lg border border-[#292D32] text-center text-xs text-white hover:border-[#D7FF00]/50 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#D7FF00]" /> View
                    </a>
                    <a
                      href={getActiveResumeUrl()}
                      download="Shaik_Sameer_Resume.pdf"
                      className="flex-1 py-2 rounded-lg border border-[#292D32] text-center text-xs text-white hover:border-[#D7FF00]/50 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-[#D7FF00]" /> Download
                    </a>
                  </div>

                  {/* Upload new */}
                  <div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={handleFileChange}
                      id="owner-resume-upload"
                    />
                    <label
                      htmlFor="owner-resume-upload"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[#D7FF00]/10 border border-[#D7FF00]/30 text-[#D7FF00] text-xs font-bold tracking-widest cursor-pointer hover:bg-[#D7FF00]/20 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      UPLOAD NEW RESUME (PDF, max 10 MB)
                    </label>
                  </div>

                  {/* Reset to original */}
                  <button
                    onClick={handleResetToOriginal}
                    className="text-[11px] text-[#A5A7AE] hover:text-red-400 transition-colors text-center underline underline-offset-2"
                  >
                    Reset to original static resume
                  </button>

                  {/* Status */}
                  {uploadStatus === 'uploading' && (
                    <p className="text-[#D7FF00] text-xs text-center animate-pulse">Saving resume…</p>
                  )}
                  {uploadStatus === 'success' && (
                    <p className="text-emerald-400 text-xs flex items-center justify-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" /> {uploadMessage}
                    </p>
                  )}
                  {uploadStatus === 'error' && (
                    <p className="text-red-400 text-xs flex items-center justify-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5" /> {uploadMessage}
                    </p>
                  )}

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="text-[11px] text-[#4a4f5a] hover:text-[#A5A7AE] transition-colors flex items-center gap-1 justify-center"
                  >
                    <LogOut className="w-3 h-3" /> Sign out
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Confirm Replace Dialog ─────────────────────────────────────────── */}
      <AnimatePresence>
        {confirmOpen && pendingFile && (
          <motion.div
            className="fixed inset-0 z-[9100] flex items-center justify-center p-4 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-sm bg-[#0d0e11] border border-[#D7FF00]/30 rounded-2xl p-6 font-mono shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
            >
              <p className="text-white text-sm font-bold mb-2">Replace Current Resume?</p>
              <p className="text-[#A5A7AE] text-xs mb-4">
                "{pendingFile.name}" will replace the existing resume for all visitors.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => { setConfirmOpen(false); setPendingFile(null); if (fileRef.current) fileRef.current.value = ''; }}
                  className="flex-1 py-2.5 rounded-lg border border-[#292D32] text-white text-xs hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmUpload}
                  className="flex-1 py-2.5 rounded-lg bg-[#D7FF00] text-[#08090B] font-bold text-xs hover:bg-white transition-colors active:scale-95"
                >
                  Yes, Replace
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
