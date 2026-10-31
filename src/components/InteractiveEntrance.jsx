import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * InteractiveEntrance
 *
 * Plays the uploaded hand-gesture / HIRE ME entrance video exactly as-is:
 *   • Autoplays from frame 1, muted, no controls, no loop
 *   • Fills the viewport (object-fit: cover) — responsive on all screen sizes
 *   • After the video ends (onEnded) → smooth fade-out → onComplete()
 *   • Skip button top-right for users who want to jump straight in
 *   • If autoplay is blocked by the browser, a "TAP TO PLAY" overlay appears
 *
 * The video file is served from /public/hire_me_entrance.mp4
 */
export default function InteractiveEntrance({ onComplete }) {
  const videoRef = useRef(null);
  const [phase, setPhase] = useState('playing'); // 'playing' | 'exiting' | 'done'
  const [blockedAutoplay, setBlockedAutoplay] = useState(false);
  const calledRef = useRef(false);

  const handleComplete = useCallback(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    setPhase('exiting');
    setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 700); // matches fade-out duration
  }, [onComplete]);

  // Attempt autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay blocked (common on mobile without user gesture)
        setBlockedAutoplay(true);
      });
    };

    // Small delay so the element is fully painted before we play
    const t = setTimeout(tryPlay, 120);
    return () => clearTimeout(t);
  }, []);

  // Safety net: if the video somehow never fires onEnded, complete after 12s
  useEffect(() => {
    const safety = setTimeout(handleComplete, 12000);
    return () => clearTimeout(safety);
  }, [handleComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="entrance"
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'exiting' ? 0 : 1 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        {/* ── THE ACTUAL VIDEO ────────────────────────────────────────────── */}
        <video
          ref={videoRef}
          src="/hire_me_entrance.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleComplete}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            /* contain = show full frame with no cropping; letterbox with black bars */
            objectFit: 'contain',
            objectPosition: 'center',
            backgroundColor: '#000',
          }}
        />

        {/* ── SKIP BUTTON ─────────────────────────────────────────────────── */}
        <motion.button
          onClick={handleComplete}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="absolute top-5 right-5 z-10 flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold tracking-widest uppercase
                     bg-black/60 backdrop-blur-md border border-white/20 text-white
                     hover:bg-[#D7FF00] hover:text-black hover:border-[#D7FF00]
                     transition-all duration-300"
        >
          SKIP →
        </motion.button>

        {/* ── AUTOPLAY BLOCKED OVERLAY ─────────────────────────────────────
            Shown only when browser blocks autoplay (e.g. some mobile browsers).
            User taps → video starts → overlay disappears.
        ─────────────────────────────────────────────────────────────────── */}
        {blockedAutoplay && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/70 backdrop-blur-sm"
            onClick={() => {
              videoRef.current?.play().then(() => setBlockedAutoplay(false)).catch(() => {});
            }}
          >
            {/* Play icon */}
            <div className="w-20 h-20 rounded-full bg-[#D7FF00] flex items-center justify-center shadow-[0_0_40px_rgba(215,255,0,0.5)]">
              <svg viewBox="0 0 24 24" fill="black" className="w-9 h-9 ml-1">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
            <p className="font-mono text-sm text-white tracking-widest uppercase">TAP TO PLAY</p>
          </motion.button>
        )}

        {/* ── PROGRESS BAR (visual indicator of video duration) ────────────
            Thin lime bar at the bottom, drains over the ~5-second clip.
        ─────────────────────────────────────────────────────────────────── */}
        <ProgressBar videoRef={videoRef} />
      </motion.div>
    </AnimatePresence>
  );
}

/** Thin progress bar at the bottom that tracks video currentTime vs duration. */
function ProgressBar({ videoRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const update = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', update);
    return () => video.removeEventListener('timeupdate', update);
  }, [videoRef]);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 h-[3px] bg-white/10">
      <div
        className="h-full bg-[#D7FF00] transition-none"
        style={{ width: `${progress}%`, transition: 'width 0.25s linear' }}
      />
    </div>
  );
}
