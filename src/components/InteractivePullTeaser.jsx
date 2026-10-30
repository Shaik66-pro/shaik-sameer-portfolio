import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles, ArrowDown, ExternalLink, Mail, FileText, Github, Linkedin, Check } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function InteractivePullTeaser({ onTriggerContact, onScrollToHero }) {
  const [pulled, setPulled] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Motion values for elastic cord physics
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Transform coordinates for dynamic spring cords
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDrag = (_, info) => {
    setCoords({ x: info.offset.x, y: info.offset.y });
    if (Math.abs(info.offset.x) > 120 || Math.abs(info.offset.y) > 100) {
      if (!pulled) {
        setPulled(true);
        onTriggerContact();
        setTimeout(() => setPulled(false), 800);
      }
    }
  };

  const handleDragEnd = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col justify-between items-center bg-[#F6F5F2] text-[#121214] px-4 pt-24 pb-8 overflow-hidden select-none border-b border-black/10">
      {/* Background Subtle Tech Watermark / Est Badge */}
      <div className="absolute top-8 left-8 hidden sm:flex items-center gap-2 font-mono text-[11px] tracking-widest text-zinc-500 uppercase">
        <span className="w-2 h-2 rounded-full bg-[#FF3838] animate-ping" />
        <span>INTERACTIVE CHAPTER 00 // TACTILE INVITATION</span>
      </div>

      <div className="absolute top-8 right-8 hidden sm:flex items-center gap-4 font-mono text-[11px] tracking-widest text-zinc-500">
        <span>EST. {personalInfo.establishedYear}</span>
        <span>•</span>
        <span>HYDERABAD, IN</span>
      </div>

      {/* Main Headline (Screenshot 01) */}
      <div className="w-full max-w-5xl mx-auto text-left pt-6 sm:pt-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col"
        >
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] uppercase text-[#111113]">
            PULL ME INTO
          </h1>
          <span className="font-serifDisplay italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1a1a1f] -mt-1 sm:-mt-3 tracking-normal">
            your team.
          </span>
        </motion.div>
      </div>

      {/* Interactive Elastic Cord & Pull Mechanism */}
      <div className="relative w-full max-w-4xl h-[280px] sm:h-[340px] flex items-center justify-center my-auto z-10">
        {/* SVG Tension Cords anchored from hand fingers to button */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}
        >
          {/* 4 Dynamic Elastic Tension Lines */}
          {[
            { startY: '46%', endY: '45%', color: '#FF3838' },
            { startY: '49%', endY: '49%', color: '#1B1B1E' },
            { startY: '52%', endY: '53%', color: '#FF3838' },
            { startY: '55%', endY: '57%', color: '#1B1B1E' },
          ].map((cord, idx) => {
            const anchorX = 220; // Hand fingertips anchor
            const targetX = 460 + coords.x * 0.7; // Button anchor
            const midX = (anchorX + targetX) / 2 + coords.x * 0.2;
            const midY = 160 + idx * 8 + coords.y * 0.4;

            return (
              <path
                key={idx}
                d={`M 180,${140 + idx * 12} Q ${midX},${midY} ${targetX},${145 + idx * 8 + coords.y * 0.6}`}
                fill="none"
                stroke={cord.color}
                strokeWidth={idx === 1 || idx === 2 ? '2.5' : '1.8'}
                strokeDasharray={idx % 2 === 1 ? '4 2' : 'none'}
                opacity={0.85}
              />
            );
          })}
        </svg>

        {/* Hand Illustration Anchor (Left side) */}
        <div className="absolute left-0 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-20">
          <div className="relative flex items-center">
            {/* Retro Cuff / Sleeve */}
            <div className="w-16 sm:w-24 h-16 sm:h-20 bg-zinc-900 rounded-l-md border-y-2 border-l-2 border-black flex items-center justify-end pr-2 shadow-lg">
              <div className="w-3 sm:w-4 h-14 bg-zinc-100 border-r-2 border-black flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
              </div>
            </div>

            {/* Hand Drawing Vector */}
            <svg
              className="w-28 sm:w-36 h-28 sm:h-36 -ml-1 text-black"
              viewBox="0 0 120 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Hand Palm & Extended Fingers */}
              <path
                d="M10 35 C30 35, 45 30, 60 30 C75 30, 95 38, 102 44 C104 46, 103 49, 100 50 C88 53, 75 52, 60 52 C50 52, 40 55, 30 55"
                stroke="#1B1B1E"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="#FAF8F5"
              />
              <path
                d="M55 42 C70 42, 90 44, 98 48 C100 49, 100 52, 97 53 C85 57, 70 56, 50 56"
                stroke="#1B1B1E"
                strokeWidth="2"
                strokeLinecap="round"
                fill="#FAF8F5"
              />
              <path
                d="M45 54 C60 54, 80 56, 88 60 C90 61, 89 64, 86 65 C72 68, 55 66, 40 64"
                stroke="#1B1B1E"
                strokeWidth="2"
                strokeLinecap="round"
                fill="#FAF8F5"
              />
              {/* Thumb gripping cords */}
              <path
                d="M30 58 C35 68, 50 78, 68 80 C74 81, 76 77, 72 73 C62 67, 48 60, 35 55"
                stroke="#1B1B1E"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="#FAF8F5"
              />
              {/* Finger knuckle lines */}
              <path d="M70 34 L72 38" stroke="#1B1B1E" strokeWidth="1.5" />
              <path d="M82 37 L84 41" stroke="#1B1B1E" strokeWidth="1.5" />
              <path d="M68 45 L70 49" stroke="#1B1B1E" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Draggable 3D "HIRE ME" Glossy Pill (Right side) */}
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 180, top: -80, bottom: 80 }}
          dragElastic={0.4}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={onTriggerContact}
          className="relative z-30 cursor-grab active:cursor-grabbing ml-24 sm:ml-40"
        >
          {/* Glowing Red Neon Halo / Ring */}
          <div className="absolute -inset-1.5 rounded-full border-2 border-[#FF3838]/80 animate-pulse pointer-events-none" />

          {/* 3D Black Glossy Capsule Button (Screenshot 01) */}
          <div className="relative px-7 sm:px-10 py-3.5 sm:py-5 rounded-full bg-gradient-to-b from-[#2B2B33] via-[#141418] to-[#0A0A0D] border border-white/20 text-white shadow-2xl flex flex-col items-center justify-center min-w-[210px] sm:min-w-[260px] group transition-all duration-300">
            {/* Glossy Reflection Highlight */}
            <div className="absolute top-1 inset-x-4 h-[40%] rounded-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl sm:text-3xl tracking-wider text-white uppercase text-3d-white group-hover:text-cyber-yellow transition-colors">
                HIRE ME
              </span>
              <Sparkles className="w-5 h-5 text-cyber-yellow group-hover:rotate-12 transition-transform" />
            </div>

            <span className="text-[10px] sm:text-[11px] font-mono text-zinc-300 tracking-tight mt-0.5 opacity-90">
              let's build something extraordinary.
            </span>
          </div>
        </motion.div>
      </div>

      {/* Micro-Instructions (Screenshot 01) */}
      <div className="text-center my-3 z-10">
        <p className="font-mono text-[11px] tracking-widest text-zinc-600 uppercase font-semibold">
          — GO ON. GIVE IT A PULL. OR JUST CLICK THE BUTTON —
        </p>
      </div>

      {/* Bottom Minimalist Bar / "PREFER IT PLAIN?" (Screenshot 01) */}
      <div className="w-full max-w-5xl mx-auto pt-6 border-t border-black/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs z-10">
        <div className="flex items-center gap-3">
          <span className="text-zinc-500 font-bold uppercase tracking-wider text-[11px]">
            PREFER IT PLAIN?
          </span>
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 text-zinc-800 hover:text-black font-medium underline underline-offset-4 decoration-zinc-400 hover:decoration-black transition-all"
            title="Click to copy email"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{personalInfo.email}</span>
            {copiedEmail ? (
              <span className="text-[10px] bg-black text-cyber-yellow px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-0.5">
                <Check className="w-2.5 h-2.5" /> COPIED
              </span>
            ) : null}
          </button>
        </div>

        <div className="flex items-center gap-5 text-zinc-700 font-semibold">
          <a
            href={personalInfo.resumeUrl}
            download="Shaik_Sameer_Resume.pdf"
            className="hover:text-black transition-colors flex items-center gap-1 hover:underline underline-offset-4"
          >
            <FileText className="w-3.5 h-3.5 text-[#FF3838]" />
            <span>Résumé (PDF)</span>
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors flex items-center gap-1 hover:underline underline-offset-4"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors flex items-center gap-1 hover:underline underline-offset-4"
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-600" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator to Hero Section */}
      <button
        onClick={onScrollToHero}
        className="mt-6 flex flex-col items-center gap-1 text-zinc-400 hover:text-black transition-colors font-mono text-[10px] tracking-widest uppercase group"
      >
        <span>ENTER THE DOSSIER</span>
        <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-[#FF3838]" />
      </button>
    </section>
  );
}
