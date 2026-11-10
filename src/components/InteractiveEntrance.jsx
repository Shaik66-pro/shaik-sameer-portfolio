import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * InteractiveEntrance — Fully Responsive Dual-Layer Cinematic Entrance
 *
 * Solves the mobile-portrait vs desktop-landscape aspect ratio challenge:
 *   1. Ambient Background Layer:
 *      Plays the same video with `object-fit: cover` + heavy cinematic blur & cyber tint.
 *      Completely eliminates black bars/empty letterbox space on ANY screen (mobile, tablet, desktop, TV).
 *   2. Foreground Content Layer:
 *      Maintains pristine 16:9 aspect ratio without cropping.
 *      Guarantees the cartoon hand, wires, "PULL ME INTO your team" text, and "HIRE ME" button
 *      are 100% fully visible, sharp, and never cut off on tall mobile screens or wide desktops.
 *   3. Responsive HUD & Skip Button:
 *      Adapts to safe areas (notches/pill cutouts) and screen sizes from 3" mobile to 4K displays.
 */
export default function InteractiveEntrance({ onComplete }) {
  const fgVideoRef = useRef(null);
  const bgVideoRef = useRef(null);
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
    }, 600);
  }, [onComplete]);

  // Attempt synchronized autoplay on mount
  useEffect(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg) return;

    fg.muted = true;
    fg.playsInline = true;
    if (bg) {
      bg.muted = true;
      bg.playsInline = true;
    }

    const tryPlay = async () => {
      try {
        await fg.play();
        if (bg) {
          bg.play().catch(() => {});
        }
      } catch {
        setBlockedAutoplay(true);
      }
    };

    const t = setTimeout(tryPlay, 100);
    return () => clearTimeout(t);
  }, []);

  // Sync background video time to foreground video
  useEffect(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;

    const onTimeUpdate = () => {
      if (Math.abs(bg.currentTime - fg.currentTime) > 0.3) {
        bg.currentTime = fg.currentTime;
      }
    };

    fg.addEventListener('timeupdate', onTimeUpdate);
    return () => fg.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  // Safety net: complete after 10s if onEnded fails to trigger
  useEffect(() => {
    const safety = setTimeout(handleComplete, 10000);
    return () => clearTimeout(safety);
  }, [handleComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="entrance"
        className="fixed inset-0 z-[9999] bg-[#08090B] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'exiting' ? 0 : 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* ── 1. AMBIENT BACKGROUND LAYER (Zero Black Bars on Any Screen) ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <video
            ref={bgVideoRef}
            src="/hire_me_entrance.mp4"
            autoPlay
            muted
            playsInline
            loop
            aria-hidden="true"
            className="w-full h-full object-cover scale-110 filter blur-2xl opacity-60 brightness-75 contrast-125"
          />
          {/* Cyber Vignette Overlay to blend ambient lighting into deep obsidian */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-[#08090B] opacity-80" />
          <div className="absolute inset-0 bg-radial-vignette opacity-70" />
          <div className="absolute inset-0 bg-grid-cyber opacity-20" />
        </div>

        {/* ── 2. FOREGROUND CONTENT LAYER (100% Uncut Video on Mobile & Desktop) ── */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 md:p-8">
          
          {/* Main Video Presentation Card */}
          <div className="relative w-full max-w-5xl max-h-[85vh] aspect-video flex items-center justify-center rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9),0_0_40px_rgba(215,255,0,0.18)] border border-[#292D32]/80 bg-black/40 backdrop-blur-sm">
            
            <video
              ref={fgVideoRef}
              src="/hire_me_entrance.mp4"
              autoPlay
              muted
              playsInline
              onEnded={handleComplete}
              className="w-full h-full object-contain"
            />

            {/* Corner Cyber HUD Accents (Subtle sci-fi frame) */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#D7FF00]/60 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D7FF00]/60 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D7FF00]/60 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#D7FF00]/60 pointer-events-none" />
          </div>

          {/* Mobile Orientation Hint / HUD Status */}
          <div className="mt-3 font-mono text-[10px] tracking-widest text-[#A5A7AE] uppercase flex items-center gap-2 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D7FF00] animate-pulse" />
            <span className="hidden xs:inline">INITIALIZING PORTFOLIO // SHAIK SAMEER</span>
            <span className="xs:hidden">INITIALIZING // SHAIK SAMEER</span>
          </div>
        </div>

        {/* ── 3. SKIP BUTTON (Safe Area Aware & Touch-Friendly) ───────────── */}
        <motion.button
          onClick={handleComplete}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="absolute z-30 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase
                     bg-[#08090B]/85 backdrop-blur-md border border-white/20 text-white
                     hover:bg-[#D7FF00] hover:text-[#08090B] hover:border-[#D7FF00]
                     active:scale-95 transition-all duration-300 shadow-xl"
          style={{
            top: 'max(1rem, env(safe-area-inset-top, 1rem))',
            right: 'max(1rem, env(safe-area-inset-right, 1rem))',
          }}
        >
          <span>SKIP</span>
          <span className="text-[#D7FF00] group-hover:text-black">→</span>
        </motion.button>

        {/* ── 4. AUTOPLAY BLOCKED OVERLAY ─────────────────────────────────── */}
        {blockedAutoplay && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-black/80 backdrop-blur-md p-4 text-center"
            onClick={() => {
              fgVideoRef.current?.play().then(() => {
                bgVideoRef.current?.play().catch(() => {});
                setBlockedAutoplay(false);
              }).catch(() => {});
            }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D7FF00] flex items-center justify-center shadow-[0_0_50px_rgba(215,255,0,0.6)] active:scale-90 transition-transform">
              <svg viewBox="0 0 24 24" fill="#08090B" className="w-8 h-8 sm:w-9 sm:h-9 ml-1">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
            <p className="font-mono text-xs sm:text-sm text-white font-bold tracking-widest uppercase">
              TAP TO PLAY INTRO
            </p>
          </motion.button>
        )}

        {/* ── 5. PROGRESS BAR ────────────────────────────────────────────── */}
        <ProgressBar videoRef={fgVideoRef} />
      </motion.div>
    </AnimatePresence>
  );
}

/** Thin progress bar at the bottom tracking foreground video progress */
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
    <div
      className="absolute bottom-0 left-0 right-0 z-30 h-[3px] bg-white/10"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div
        className="h-full bg-[#D7FF00] shadow-[0_0_10px_#D7FF00]"
        style={{ width: `${progress}%`, transition: 'width 0.2s linear' }}
      />
    </div>
  );
}

