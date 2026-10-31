import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Download, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

/**
 * InteractiveEntrance — "PULL ME INTO your team" style
 *
 * Layout (matches reference):
 *  • Ivory/cream background
 *  • Large editorial bold headline: "PULL ME INTO" + italic "your team."
 *  • A small toggle-switch box connected by wire to a draggable HIRE ME pill button
 *  • User drags / pulls the HIRE ME button to the right → enters portfolio
 *  • Bottom strip: email · Resume · GitHub · LinkedIn
 *  • Auto-advance after 12s of inactivity
 */
export default function InteractiveEntrance({ onComplete }) {
  const [pulled, setPulled] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [autoTick, setAutoTick] = useState(0);   // countdown display
  const wireRef = useRef(null);
  const buttonRef = useRef(null);

  // Motion values for draggable HIRE ME button
  const dragX = useMotionValue(0);
  const wireStretch = useTransform(dragX, [0, 300], [0, 300]);

  // Wire SVG path — stretches as button is dragged
  const [wirePath, setWirePath] = useState('');
  const anchorX = useRef(0);
  const anchorY = useRef(0);

  // Measure anchor position after mount
  const measureAnchor = useCallback(() => {
    if (!wireRef.current) return;
    const rect = wireRef.current.getBoundingClientRect();
    anchorX.current = rect.right;
    anchorY.current = rect.top + rect.height / 2;
  }, []);

  useEffect(() => {
    measureAnchor();
    window.addEventListener('resize', measureAnchor);
    return () => window.removeEventListener('resize', measureAnchor);
  }, [measureAnchor]);

  // Update wire path on drag
  const handleDrag = (_, info) => {
    const dx = Math.max(0, info.offset.x);
    const dy = info.offset.y * 0.3;
    // Quadratic bezier: from anchor, curves to button
    const cpX = dx * 0.5;
    setWirePath(`M 0,0 Q ${cpX},${dy + 30} ${dx},${dy}`);

    // If dragged far enough, trigger completion
    if (dx > 220) {
      handlePull();
    }
  };

  const handlePull = useCallback(() => {
    if (pulled) return;
    setPulled(true);
    setExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 700);
  }, [pulled, onComplete]);

  // Auto-advance countdown (12 seconds)
  useEffect(() => {
    let count = 12;
    setAutoTick(count);
    const interval = setInterval(() => {
      count -= 1;
      setAutoTick(count);
      if (count <= 0) {
        clearInterval(interval);
        handlePull();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden select-none"
      style={{ backgroundColor: '#F2EFE7', color: '#1A1A1A' }}
      animate={exiting ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* ── TOP NAVBAR (mirrors real site style) ─────────────────────────── */}
      <nav className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-[#D4CFC3] font-mono text-xs tracking-widest">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#1A1A1A] flex items-center justify-center text-[#E4FF1A] font-display font-black text-sm">
            SS
          </div>
          <div>
            <div className="font-bold text-[#1A1A1A] tracking-tight text-sm">{personalInfo.name.toUpperCase()}</div>
            <div className="text-[10px] text-[#7A7368] uppercase">EST. {personalInfo.establishedYear} // PYTHON DEV</div>
          </div>
        </div>

        {/* Nav links — hidden on mobile */}
        <div className="hidden lg:flex items-center gap-7 text-[11px] text-[#7A7368] uppercase">
          {['THE SUBJECT', 'CASE FILES', 'TOOLKIT', 'THE EVIDENCE', 'CERTIFICATIONS'].map((item, i) => (
            <span key={item} className="hover:text-[#1A1A1A] transition-colors cursor-default">
              0{i + 1} // {item}
            </span>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <a
            href={personalInfo.resumeUrl}
            download
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#C8C2B8] text-[#1A1A1A] hover:border-[#1A1A1A] transition-all text-[11px] font-mono"
          >
            <Download className="w-3 h-3" />
            RÉSUMÉ
          </a>
          <button
            onClick={handlePull}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1A1A1A] text-[#E4FF1A] font-mono text-xs font-bold hover:bg-[#333] transition-all shadow-md"
          >
            <span className="text-base leading-none">✦</span>
            <span>GET HIRED</span>
          </button>
        </div>
      </nav>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 text-center">

        {/* Chapter label */}
        <motion.div
          className="font-mono text-[11px] tracking-[0.3em] text-[#9A9388] uppercase mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          INTERACTIVE CHAPTER 00 // TACTILE INVITATION
        </motion.div>

        {/* ── PULL ME INTO your team. ─────────────────────────────────── */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display font-black uppercase leading-[0.9] tracking-tight text-[#1A1A1A]"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
          >
            PULL ME
            <br />
            INTO
          </h1>
          <p
            className="font-serif italic text-[#1A1A1A] leading-tight mt-1"
            style={{
              fontFamily: '"Instrument Serif", "Playfair Display", Georgia, serif',
              fontSize: 'clamp(2.8rem, 7.5vw, 7rem)',
            }}
          >
            your team.
          </p>
        </motion.div>

        {/* ── WIRE + HIRE ME BUTTON ────────────────────────────────────── */}
        <motion.div
          className="relative flex items-center justify-center w-full max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
        >
          {/* Switch / anchor box */}
          <div
            ref={wireRef}
            className="relative z-10 flex items-center justify-center w-16 h-10 bg-[#1A1A1A] rounded-md shadow-lg flex-shrink-0"
          >
            {/* LED indicator */}
            <div
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                pulled ? 'bg-[#E4FF1A] shadow-[0_0_10px_#E4FF1A]' : 'bg-[#4A4740]'
              }`}
            />
            {/* Wire stub out of right side */}
            <svg
              className="absolute left-full top-1/2 -translate-y-1/2 overflow-visible pointer-events-none"
              width="0" height="0"
              style={{ overflow: 'visible' }}
              aria-hidden
            >
              <path
                d={wirePath || 'M 0,0 L 0,0'}
                fill="none"
                stroke="#1A1A1A"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Decorative ticks on wire */}
              {[30, 70, 120, 170].map((x) => (
                <line key={x} x1={x} y1={-5} x2={x} y2={5}
                  stroke="#1A1A1A" strokeWidth="1.5" opacity="0.4"
                  style={{ display: wirePath ? 'block' : 'none' }}
                />
              ))}
            </svg>
          </div>

          {/* Spacer */}
          <div className="w-32 sm:w-48 flex-shrink-0" />

          {/* ── DRAGGABLE HIRE ME PILL ─────────────────────────────────── */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 280 }}
            dragElastic={0.12}
            onDrag={handleDrag}
            onDragEnd={(_, info) => {
              if (info.offset.x < 220) {
                animate(dragX, 0, { type: 'spring', stiffness: 200, damping: 22 });
                setWirePath('');
              }
            }}
            style={{ x: dragX }}
            whileDrag={{ scale: 1.04 }}
            className="relative z-20 flex-shrink-0 cursor-grab active:cursor-grabbing"
          >
            {/* Pill button */}
            <div
              onClick={handlePull}
              className="flex flex-col items-center justify-center px-8 sm:px-10 py-5 sm:py-6 rounded-full bg-[#1A1A1A] text-white shadow-2xl select-none"
              style={{ minWidth: '220px' }}
            >
              <div className="flex items-center gap-2 font-display font-black text-xl sm:text-2xl uppercase tracking-tight">
                <span className="text-[#E4FF1A]">✦</span>
                <span>HIRE ME</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-400 mt-1 uppercase tracking-wider">
                let's build something extraordinary.
              </span>
            </div>

            {/* Pull arrow hint */}
            <motion.div
              className="absolute -right-8 top-1/2 -translate-y-1/2 text-[#9A9388]"
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            >
              <ArrowUpRight className="w-5 h-5 rotate-90" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Instruction hint */}
        <motion.p
          className="mt-10 font-mono text-xs text-[#9A9388] uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          ~ GO ON, GIVE IT A PULL. OR JUST CLICK THE BUTTON ~
        </motion.p>

        {/* Auto-skip countdown pill */}
        <motion.button
          onClick={handlePull}
          className="mt-5 font-mono text-[11px] text-[#9A9388] hover:text-[#1A1A1A] transition-colors underline underline-offset-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          ENTER PORTFOLIO IN {autoTick}s →
        </motion.button>
      </div>

      {/* ── BOTTOM STRIP ─────────────────────────────────────────────────── */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-4 px-6 sm:px-10 py-4 border-t border-[#D4CFC3] font-mono text-xs text-[#7A7368]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <span className="font-medium">PREFER IT PLAIN?</span>

        <div className="flex flex-wrap items-center gap-5">
          <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-[#1A1A1A] transition-colors">
            <Mail className="w-3.5 h-3.5" />
            {personalInfo.email}
          </a>
          <a href={personalInfo.resumeUrl} download className="flex items-center gap-1.5 hover:text-[#1A1A1A] transition-colors">
            <Download className="w-3.5 h-3.5" />
            Résumé (PDF)
          </a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#1A1A1A] transition-colors">
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#1A1A1A] transition-colors">
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
