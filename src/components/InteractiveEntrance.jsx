import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function InteractiveEntrance({ onComplete }) {
  // Animation state stages:
  // 'initial' -> 'text-visible' -> 'hand-entering' -> 'character-entering' -> 'grabbing' -> 'pulling' -> 'exiting' -> 'completed'
  const [stage, setStage] = useState('initial');
  const [isDragging, setIsDragging] = useState(false);

  // Dynamic coordinates for interactive thread
  const [handPos, setHandPos] = useState({ x: 0, y: 0 });
  const [isPulled, setIsPulled] = useState(false);

  // Thread anchor coordinates relative to GET HIRED center
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Orchestrated Cinematic Timeline (Prompt Section 6)
    // 0.0 – 1.0s: Ivory background fades into view (stage: text-visible)
    const t1 = setTimeout(() => {
      setStage('text-visible');
    }, 600);

    // 1.5 – 2.8s: Cartoon hand enters from the right
    const t2 = setTimeout(() => {
      setStage('hand-entering');
    }, 1800);

    // 2.2 – 4.5s: Sameer walking character starts walking into the scene
    const t3 = setTimeout(() => {
      setStage('character-entering');
    }, 2400);

    // 3.2 – 4.0s: Hand approaches and grabs the thread
    const t4 = setTimeout(() => {
      setStage('grabbing');
    }, 3400);

    // 4.2 – 5.8s: Hand pulls thread to the right, GET HIRED responds elastically
    const t5 = setTimeout(() => {
      setStage('pulling');
    }, 4400);

    // 6.2 – 7.5s: Exit transition
    const t6 = setTimeout(() => {
      setStage('exiting');
    }, 6400);

    // 7.4s: Complete and hand over to main portfolio
    const t7 = setTimeout(() => {
      setStage('completed');
      if (onComplete) onComplete();
    }, 7500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [onComplete]);

  // Handle manual interactive pull if user drags
  const handleDragThread = (e, info) => {
    setIsDragging(true);
    setHandPos({ x: info.offset.x, y: info.offset.y });
    if (info.offset.x > 90 || info.offset.x < -90) {
      if (!isPulled) {
        setIsPulled(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 600);
      }
    }
  };

  const handleSkip = () => {
    setStage('completed');
    if (onComplete) onComplete();
  };

  if (stage === 'completed') {
    return null;
  }

  // Calculate pulling offsets for GET HIRED and the thread
  const textDisplacementX =
    stage === 'pulling' ? 120 : stage === 'exiting' ? 900 : isDragging ? handPos.x * 0.4 : 0;
  const textRotation =
    stage === 'pulling' ? 4 : stage === 'exiting' ? 12 : isDragging ? handPos.x * 0.05 : 0;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden select-none transition-opacity duration-700 ${
        stage === 'exiting' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundColor: '#F4F0E6',
        color: '#24211D',
      }}
    >
      {/* Subtle Grain / Vignette Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(216, 200, 173, 0.25) 0%, rgba(234, 227, 213, 0.6) 100%)',
        }}
      />

      {/* Top Subtle HUD / Status Line */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between font-mono text-[11px] text-[#625B51] tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#24211D] animate-pulse" />
          <span>PROLOGUE // INTERACTIVE 3D CINEMATIC ENTRANCE</span>
        </div>

        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#D8C8AD] bg-[#EAE3D5]/60 hover:bg-[#24211D] hover:text-[#F4F0E6] transition-all duration-300 font-semibold"
        >
          <span>ENTER PORTFOLIO</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* CENTER VIEWPORT STAGE: GET HIRED + THREAD + HAND + WALKING SAMEER */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        {/* 1. ANIMATED WALKING CHARACTER (Shaik Sameer in Suit) */}
        <motion.div
          initial={{ x: '-120%', opacity: 0 }}
          animate={
            stage === 'character-entering' || stage === 'grabbing' || stage === 'pulling'
              ? { x: '-15%', opacity: 1 }
              : stage === 'exiting'
              ? { x: '10%', opacity: 0 }
              : { x: '-120%', opacity: 0 }
          }
          transition={{
            x: { duration: 3.2, ease: [0.25, 1, 0.5, 1] },
            opacity: { duration: 0.8 },
          }}
          className="absolute left-6 sm:left-16 md:left-28 bottom-12 sm:bottom-16 z-20 pointer-events-none flex flex-col items-center"
        >
          {/* Walking Rhythmic Stride Animation Container */}
          <motion.div
            animate={{
              y: [0, -14, 0, -14, 0],
              rotate: [-1.2, 1.2, -1.2, 1.2, -1.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.1,
              ease: 'easeInOut',
            }}
            className="relative flex flex-col items-center"
          >
            {/* Elegant Floating Portrait Card / Cutout */}
            <div className="relative w-36 sm:w-48 md:w-56 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D8C8AD] bg-[#EAE3D5]">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-full h-full object-cover object-top filter contrast-105"
              />

              {/* Editorial Name Tag on Walking Card */}
              <div className="absolute bottom-2.5 inset-x-2.5 p-2 rounded-lg bg-[#24211D]/90 backdrop-blur-md text-[#F4F0E6] font-mono text-[9px] sm:text-[10px] tracking-wider text-center uppercase border border-[#D8C8AD]/30">
                <span className="font-bold block text-white">{personalInfo.name}</span>
                <span className="text-[#D8C8AD] text-[8px]">PYTHON FULL STACK</span>
              </div>
            </div>

            {/* Dynamic Ground Contact Shadow (Expands and contracts with stride) */}
            <motion.div
              animate={{
                scaleX: [1, 0.75, 1, 0.75, 1],
                opacity: [0.45, 0.25, 0.45, 0.25, 0.45],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.1,
                ease: 'easeInOut',
              }}
              className="w-32 sm:w-40 h-3 rounded-full bg-[#24211D]/30 blur-sm mt-3"
            />
          </motion.div>
        </motion.div>

        {/* 2. EXACT CENTER POSITION: GET HIRED TYPOGRAPHY */}
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{
            opacity: stage !== 'initial' ? 1 : 0,
            scale: stage !== 'initial' ? 1 : 0.94,
            x: textDisplacementX,
            rotate: textRotation,
          }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 18,
          }}
          className="relative z-30 flex flex-col items-center justify-center text-center cursor-pointer px-4"
        >
          {/* Subtle Accent Pre-Title */}
          <span className="font-mono text-xs sm:text-sm tracking-[0.28em] text-[#625B51] uppercase mb-2">
            CHAPTER 00 // TACTILE INVITATION
          </span>

          {/* Large Premium Editorial Typography (Prompt Section 2) */}
          <div className="relative inline-block">
            <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tight text-[#24211D] leading-none select-none uppercase drop-shadow-sm">
              GET HIRED
            </h1>

            {/* Thread Attachment Eyelet on the letter 'D' */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-3 h-3 rounded-full border-2 border-[#24211D] bg-[#EAE3D5]" />
          </div>

          <p className="font-serifDisplay italic text-xl sm:text-2xl text-[#625B51] mt-3">
            let's build something extraordinary together.
          </p>
        </motion.div>

        {/* 3. DYNAMIC HANGING THREAD & SVG TENSION CURVE (Prompt Section 3 & 7) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
          style={{ filter: 'drop-shadow(0 2px 3px rgba(36,33,29,0.15))' }}
        >
          {/* Main Thread connecting from GET HIRED to the Hand */}
          {stage !== 'initial' && (
            <path
              d={
                stage === 'pulling' || stage === 'exiting'
                  ? `M ${window.innerWidth / 2 + 180 + textDisplacementX},${window.innerHeight / 2} Q ${
                      window.innerWidth / 2 + 340
                    },${window.innerHeight / 2 + 30} ${
                      window.innerWidth / 2 + 480 + (stage === 'exiting' ? 400 : 0)
                    },${window.innerHeight / 2 - 10}`
                  : stage === 'grabbing'
                  ? `M ${window.innerWidth / 2 + 180},${window.innerHeight / 2} Q ${
                      window.innerWidth / 2 + 270
                    },${window.innerHeight / 2 + 40} ${window.innerWidth / 2 + 330},${
                      window.innerHeight / 2 + 10
                    }`
                  : `M ${window.innerWidth / 2 + 180},${window.innerHeight / 2} Q ${
                      window.innerWidth / 2 + 200
                    },${window.innerHeight / 2 + 90} ${window.innerWidth / 2 + 210},${
                      window.innerHeight / 2 + 140
                    }`
              }
              fill="none"
              stroke="#24211D"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* 4. CARTOON HAND (Prompt Section 4: Existing Cartoon Hand Asset) */}
        <motion.div
          drag
          dragConstraints={{ left: -150, right: 300, top: -100, bottom: 100 }}
          onDrag={handleDragThread}
          onDragEnd={() => {
            setIsDragging(false);
            setHandPos({ x: 0, y: 0 });
          }}
          initial={{ x: '100vw', y: 0, opacity: 0 }}
          animate={
            stage === 'hand-entering'
              ? { x: '35vw', y: 0, opacity: 1 }
              : stage === 'grabbing'
              ? { x: '22vw', y: 10, opacity: 1 }
              : stage === 'pulling'
              ? { x: '38vw', y: -10, opacity: 1 }
              : stage === 'exiting'
              ? { x: '100vw', y: -20, opacity: 0 }
              : { x: '100vw', y: 0, opacity: 0 }
          }
          transition={{
            duration: stage === 'pulling' ? 1.6 : 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute z-40 pointer-events-auto cursor-grab active:cursor-grabbing flex items-center justify-center"
        >
          {/* The Existing Cartoon Hand cropped from reference */}
          <div className="relative w-48 sm:w-64 md:w-80 group">
            <img
              src="/cartoon_hand_flipped.png"
              alt="Cartoon Hand"
              className="w-full h-auto drop-shadow-2xl select-none"
              draggable="false"
            />

            {/* Micro pull callout label */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#24211D] text-[#F4F0E6] font-mono text-[9px] px-2 py-0.5 rounded whitespace-nowrap">
              PULL TO OPEN
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Minimalist Bar (Ivory Theme) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-6 border-t border-[#D8C8AD] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#625B51]">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#24211D]">SHAIK SAMEER</span>
          <span>•</span>
          <span>B.TECH ECE 2025 // MLRIT HYDERABAD</span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={personalInfo.resumeUrl}
            download="Shaik_Sameer_Resume.pdf"
            className="hover:text-[#24211D] font-medium underline underline-offset-4 decoration-[#D8C8AD]"
          >
            Résumé (PDF)
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#24211D] font-medium"
          >
            GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#24211D] font-medium"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
