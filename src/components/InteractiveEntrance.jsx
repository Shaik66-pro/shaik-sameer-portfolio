import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

/**
 * InteractiveEntrance
 * ─────────────────────────────────────────────────────────────────────
 * Layout:  LEFT half  — Large walking character (sameer_suit.png)
 *          RIGHT half — "GET HIRED" editorial text + thread + hand
 *
 * Timeline:
 *   0.0s  Background + left character slides in + right text fades in
 *   1.5s  Character reaches standing position
 *   2.0s  Cartoon hand enters from far right, approaches thread
 *   3.2s  Hand grabs + thread goes taut
 *   4.2s  Hand pulls right → GET HIRED elastically follows
 *   5.6s  Everything exits → onComplete()
 */
export default function InteractiveEntrance({ onComplete }) {
  const [stage, setStage] = useState('visible'); // visible | approaching | grabbing | pulling | exiting | completed
  const [isManualPull, setIsManualPull] = useState(false);
  const [dragX, setDragX] = useState(0);
  const timersRef = useRef([]);

  const addTimer = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  };

  useEffect(() => {
    addTimer(() => setStage('approaching'), 2000);
    addTimer(() => setStage('grabbing'),    3200);
    addTimer(() => setStage('pulling'),     4200);
    addTimer(() => setStage('exiting'),     5600);
    addTimer(() => {
      setStage('completed');
      if (onComplete) onComplete();
    }, 6300);

    return () => timersRef.current.forEach(clearTimeout);
  }, [onComplete]);

  const handleSkip = () => {
    timersRef.current.forEach(clearTimeout);
    setStage('exiting');
    setTimeout(() => {
      setStage('completed');
      if (onComplete) onComplete();
    }, 350);
  };

  const handleDrag = (_, info) => {
    setIsManualPull(true);
    setDragX(info.offset.x);
    if (info.offset.x > 90) {
      timersRef.current.forEach(clearTimeout);
      setStage('exiting');
      setTimeout(() => {
        setStage('completed');
        if (onComplete) onComplete();
      }, 400);
    }
  };

  if (stage === 'completed') return null;

  // Elastic displacement for "GET HIRED" text when pulled
  const textPullX = isManualPull
    ? dragX * 0.45
    : stage === 'pulling'
    ? 90
    : stage === 'exiting'
    ? 600
    : 0;

  const textRotate = isManualPull
    ? dragX * 0.035
    : stage === 'pulling'
    ? 3
    : stage === 'exiting'
    ? 7
    : 0;

  return (
    <motion.div
      className="fixed inset-0 z-50 select-none overflow-hidden"
      style={{ backgroundColor: '#F4F0E6', color: '#24211D' }}
      animate={stage === 'exiting' ? { opacity: 0, scale: 0.97 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, ease: 'easeInOut' }}
    >
      {/* Warm radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(244,240,230,0) 40%, rgba(216,200,173,0.35) 100%)',
        }}
      />

      {/* ── TOP HUD ─────────────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 pt-5 font-mono text-[11px] text-[#625B51] tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#24211D] animate-ping" />
          <span className="font-bold text-[#24211D] hidden sm:inline">INTERACTIVE ENTRANCE</span>
          <span className="text-[#D8C8AD] hidden sm:inline">|</span>
          <span className="hidden sm:inline">PULL THREAD TO ENTER</span>
        </div>

        <button
          onClick={handleSkip}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24211D] text-[#F4F0E6] border-2 border-[#24211D] hover:bg-transparent hover:text-[#24211D] transition-all duration-300 font-bold text-[11px] shadow"
        >
          <span>SKIP INTRO</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── MAIN SPLIT LAYOUT ──────────────────────────────────────────── */}
      <div className="absolute inset-0 flex">

        {/* ══ LEFT HALF: LARGE WALKING CHARACTER ══════════════════════════ */}
        <div className="relative w-1/2 h-full flex items-end justify-center overflow-hidden">
          <motion.div
            className="relative h-full flex items-end justify-center"
            initial={{ x: '-110%', opacity: 0 }}
            animate={{
              x: stage === 'exiting' ? '-110%' : '0%',
              opacity: stage === 'exiting' ? 0 : 1,
            }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Walking body bob */}
            <motion.div
              animate={
                stage !== 'exiting' && stage !== 'completed'
                  ? { y: [0, -14, 0, -14, 0], rotate: [-0.8, 0.8, -0.8, 0.8, -0.8] }
                  : { y: 0, rotate: 0 }
              }
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
              className="flex flex-col items-center"
            >
              {/* Full-body walking photo — large, no card frame */}
              <img
                src="/sameer_suit.png"
                alt="Shaik Sameer – Python Full Stack Developer"
                className="h-[78vh] max-h-[720px] w-auto object-contain object-bottom filter drop-shadow-2xl"
                style={{ imageRendering: 'high-quality' }}
                draggable={false}
              />

              {/* Ground shadow that bobs with walking */}
              <motion.div
                animate={{ scaleX: [1, 0.78, 1, 0.78, 1], opacity: [0.35, 0.18, 0.35, 0.18, 0.35] }}
                transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                className="w-48 h-3 rounded-full mt-[-8px]"
                style={{ background: 'rgba(36,33,29,0.22)', filter: 'blur(6px)' }}
              />
            </motion.div>
          </motion.div>

          {/* Name badge bottom-left of left panel */}
          <motion.div
            className="absolute bottom-8 left-6 font-mono text-[11px] text-[#625B51] uppercase tracking-widest"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: stage === 'exiting' ? 0 : 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span className="font-bold text-[#24211D] block text-sm">SHAIK SAMEER</span>
            <span>B.TECH ECE 2025 // MLRIT HYDERABAD</span>
          </motion.div>
        </div>

        {/* ══ RIGHT HALF: GET HIRED + THREAD + HAND ═══════════════════════ */}
        <div className="relative w-1/2 h-full flex flex-col items-center justify-center overflow-visible">

          {/* Vertical divider line */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ backgroundColor: '#D8C8AD' }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: stage === 'exiting' ? 0 : 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* GET HIRED editorial text (elastic when pulled) */}
          <motion.div
            className="relative z-20 flex flex-col items-start px-8 sm:px-12 cursor-pointer"
            animate={{ x: textPullX, rotate: textRotate }}
            transition={{ type: 'spring', stiffness: 130, damping: 14 }}
            onClick={handleSkip}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <motion.span
              className="font-mono text-xs tracking-[0.35em] text-[#625B51] uppercase mb-2 block font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === 'exiting' ? 0 : 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              CHAPTER 00 // TACTILE INVITATION
            </motion.span>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: stage === 'exiting' ? 0 : 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="font-display font-black leading-none uppercase tracking-tight text-[#24211D] select-none"
                style={{ fontSize: 'clamp(3.5rem, 7vw, 7.5rem)' }}
              >
                GET
                <br />
                HIRED
              </h1>

              {/* Thread attachment eyelet on the "D" of HIRED */}
              <div
                className="absolute right-[-8px] bottom-[18%] w-3.5 h-3.5 rounded-full border-2 border-[#24211D] bg-[#24211D]"
                style={{ boxShadow: '0 0 0 2px #F4F0E6' }}
              />
            </motion.div>

            <motion.p
              className="font-mono text-xs sm:text-sm text-[#625B51] mt-4 max-w-[280px] leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === 'exiting' ? 0 : 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Python Full Stack Developer ready to build scalable systems and intuitive products.
            </motion.p>

            {/* Pull instruction */}
            <motion.div
              className="flex items-center gap-1.5 mt-6 font-mono text-[10px] text-[#625B51] uppercase tracking-widest"
              animate={{ opacity: stage === 'approaching' || stage === 'grabbing' ? 1 : 0.5 }}
              transition={{ duration: 0.4 }}
            >
              <span className="w-2 h-px bg-[#625B51]" />
              <span>PULL THREAD OR CLICK TO ENTER</span>
            </motion.div>
          </motion.div>

          {/* ── SVG THREAD ────────────────────────────────────────────────── */}
          <ThreadSVG stage={stage} isManualPull={isManualPull} dragX={dragX} />

          {/* ── CARTOON HAND ──────────────────────────────────────────────── */}
          <motion.div
            drag
            dragConstraints={{ left: -60, right: 250, top: -80, bottom: 80 }}
            onDrag={handleDrag}
            onDragEnd={() => {
              setIsManualPull(false);
              setDragX(0);
            }}
            initial={{ x: '60vw', y: 0, opacity: 0 }}
            animate={
              stage === 'approaching'
                ? { x: '18vw', y: 0, opacity: 1 }
                : stage === 'grabbing'
                ? { x: '10vw', y: 12, opacity: 1 }
                : stage === 'pulling'
                ? { x: '25vw', y: -14, opacity: 1 }
                : stage === 'exiting'
                ? { x: '60vw', y: -20, opacity: 0 }
                : { x: '60vw', y: 0, opacity: 0 }
            }
            transition={{
              duration: stage === 'pulling' ? 1.3 : 1.0,
              ease: [0.2, 1, 0.3, 1],
            }}
            className="absolute z-30 cursor-grab active:cursor-grabbing"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <div className="relative w-36 sm:w-48 md:w-60">
              <img
                src="/cartoon_hand_flipped.png"
                alt="Grab thread"
                className="w-full h-auto drop-shadow-2xl select-none"
                draggable={false}
              />
              {/* Tooltip */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#24211D] text-[#F4F0E6] font-mono text-[9px] px-2.5 py-1 rounded-md whitespace-nowrap shadow-md pointer-events-none">
                DRAG TO PULL
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM BAR ──────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-[#D8C8AD] px-6 py-4 flex items-center justify-between font-mono text-[11px] text-[#625B51] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span>EST. 2026</span>
          <span className="text-[#D8C8AD]">|</span>
          <span>HYDERABAD, IN</span>
          <span className="text-[#D8C8AD]">|</span>
          <span>PYTHON FULL STACK</span>
        </div>
        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 text-[#24211D] font-bold hover:underline underline-offset-4"
        >
          <span>ENTER PORTFOLIO</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </motion.div>
  );
}

// ── Thread SVG subcomponent ─────────────────────────────────────────────────
function ThreadSVG({ stage, isManualPull, dragX }) {
  // Thread is rendered as a CSS-positioned SVG overlay on the right half.
  // It connects from the eyelet on "HIRED" text rightward to the hand.

  const getPath = () => {
    if (stage === 'visible' || stage === 'completed') {
      // Gentle hang — thread droops down from anchor
      return 'M 60,0 Q 65,60 68,110';
    }
    if (stage === 'approaching') {
      return 'M 60,0 Q 80,30 120,20';
    }
    if (stage === 'grabbing') {
      return 'M 60,0 Q 75,15 100,8';
    }
    if (stage === 'pulling' || isManualPull) {
      const pullExtra = isManualPull ? dragX * 0.5 : 0;
      return `M 60,0 Q ${120 + pullExtra},${-10} ${180 + pullExtra},${-8}`;
    }
    if (stage === 'exiting') {
      return 'M 60,0 Q 200,-20 380,-15';
    }
    return 'M 60,0 Q 65,60 68,110';
  };

  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: '32%',
        top: '46%',
        width: '420px',
        height: '160px',
        overflow: 'visible',
        pointerEvents: 'none',
        zIndex: 25,
        filter: 'drop-shadow(0 1px 3px rgba(36,33,29,0.25))',
      }}
    >
      <path
        d={getPath()}
        fill="none"
        stroke="#24211D"
        strokeWidth="2.2"
        strokeLinecap="round"
        style={{ transition: 'all 0.4s ease' }}
      />
    </svg>
  );
}
