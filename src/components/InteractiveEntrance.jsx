import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Hand, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function InteractiveEntrance({ onComplete }) {
  // Animation stages: 'visible' -> 'approaching' -> 'grabbing' -> 'pulling' -> 'exiting' -> 'completed'
  const [stage, setStage] = useState('visible');
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isManualPull, setIsManualPull] = useState(false);

  useEffect(() => {
    // Orchestrated Cinematic Timeline
    // Frame 0: GET HIRED is already 100% VISIBLE in exact center
    
    // 1.2s: Cartoon hand enters from the right
    const t1 = setTimeout(() => {
      setStage('approaching');
    }, 1200);

    // 2.4s: Hand reaches and grips the thread
    const t2 = setTimeout(() => {
      setStage('grabbing');
    }, 2400);

    // 3.6s: Hand pulls thread to the right, GET HIRED displaces elastically
    const t3 = setTimeout(() => {
      setStage('pulling');
    }, 3600);

    // 5.5s: Smooth transition to the main portfolio
    const t4 = setTimeout(() => {
      setStage('exiting');
    }, 5500);

    // 6.2s: Complete and hand over to hero
    const t5 = setTimeout(() => {
      setStage('completed');
      if (onComplete) onComplete();
    }, 6200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const handleManualDrag = (_, info) => {
    setIsManualPull(true);
    setDragOffset({ x: info.offset.x, y: info.offset.y });
    if (Math.abs(info.offset.x) > 100) {
      setStage('exiting');
      setTimeout(() => {
        setStage('completed');
        if (onComplete) onComplete();
      }, 500);
    }
  };

  const handleSkip = () => {
    setStage('exiting');
    setTimeout(() => {
      setStage('completed');
      if (onComplete) onComplete();
    }, 300);
  };

  if (stage === 'completed') {
    return null;
  }

  // Calculate dynamic elastic shift
  const textShiftX =
    isManualPull
      ? dragOffset.x * 0.4
      : stage === 'pulling'
      ? 110
      : stage === 'exiting'
      ? 600
      : 0;

  const textRotation =
    isManualPull
      ? dragOffset.x * 0.04
      : stage === 'pulling'
      ? 3.5
      : stage === 'exiting'
      ? 8
      : 0;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden select-none transition-all duration-700 ${
        stage === 'exiting' ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundColor: '#F4F0E6',
        color: '#24211D',
      }}
    >
      {/* Subtle Grain Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(216, 200, 173, 0.3) 0%, rgba(234, 227, 213, 0.6) 100%)',
        }}
      />

      {/* Top HUD Line */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between font-mono text-[11px] text-[#625B51] tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#24211D] animate-ping" />
          <span className="font-bold text-[#24211D]">INTERACTIVE 3D PROLOGUE</span>
          <span className="hidden sm:inline text-[#D8C8AD]">|</span>
          <span className="hidden sm:inline">PULL THREAD OR CLICK TO ENTER</span>
        </div>

        <button
          onClick={handleSkip}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-[#24211D] bg-[#24211D] text-[#F4F0E6] hover:bg-transparent hover:text-[#24211D] transition-all duration-300 font-bold shadow-sm"
        >
          <span>ENTER PORTFOLIO</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* CENTER VIEWPORT STAGE: GET HIRED + THREAD + HAND + WALKING SAMEER */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        
        {/* 1. WALKING CHARACTER (Shaik Sameer in Suit - Prompt Section 5) */}
        <motion.div
          initial={{ x: '-110%', opacity: 0 }}
          animate={{
            x: stage === 'exiting' ? '30%' : '-10%',
            opacity: stage === 'exiting' ? 0 : 1,
          }}
          transition={{
            duration: 3.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute left-4 sm:left-12 md:left-24 bottom-10 sm:bottom-16 z-20 pointer-events-none flex flex-col items-center"
        >
          {/* Walking Rhythmic Stride Animation Container */}
          <motion.div
            animate={{
              y: [0, -12, 0, -12, 0],
              rotate: [-1, 1, -1, 1, -1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.15,
              ease: 'easeInOut',
            }}
            className="relative flex flex-col items-center"
          >
            {/* Elegant Portrait Frame */}
            <div className="relative w-36 sm:w-48 md:w-52 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D8C8AD] bg-[#EAE3D5]">
              <img
                src="/sameer_suit.png"
                alt="Shaik Sameer Walking Character"
                className="w-full h-full object-cover object-top filter contrast-105"
              />

              <div className="absolute bottom-2 inset-x-2 p-1.5 rounded-lg bg-[#24211D]/90 backdrop-blur-md text-[#F4F0E6] font-mono text-[9px] text-center uppercase border border-[#D8C8AD]/30">
                <span className="font-bold block text-white">SHAIK SAMEER</span>
                <span className="text-[#D8C8AD] text-[8px]">MLRIT '25 // PYTHON DEV</span>
              </div>
            </div>

            {/* Dynamic Ground Shadow */}
            <motion.div
              animate={{
                scaleX: [1, 0.8, 1, 0.8, 1],
                opacity: [0.4, 0.2, 0.4, 0.2, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.15,
                ease: 'easeInOut',
              }}
              className="w-28 sm:w-36 h-2.5 rounded-full bg-[#24211D]/30 blur-sm mt-3"
            />
          </motion.div>
        </motion.div>

        {/* 2. EXACT CENTER POSITION: GET HIRED (Prompt Section 2 - 100% VISIBLE FROM FRAME 0) */}
        <motion.div
          animate={{
            x: textShiftX,
            rotate: textRotation,
          }}
          transition={{
            type: 'spring',
            stiffness: 140,
            damping: 16,
          }}
          onClick={handleSkip}
          className="relative z-30 flex flex-col items-center justify-center text-center cursor-pointer px-4"
        >
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-[#625B51] uppercase mb-2 block font-semibold">
            CHAPTER 00 // TACTILE INVITATION
          </span>

          {/* Large Premium Editorial Typography */}
          <div className="relative inline-block">
            <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-tight text-[#24211D] leading-none select-none uppercase drop-shadow-sm hover:text-[#625B51] transition-colors">
              GET HIRED
            </h1>

            {/* Thread Connection Eyelet on letter 'D' */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-3.5 h-3.5 rounded-full border-2 border-[#24211D] bg-[#24211D] shadow-sm" />
          </div>

          <p className="font-serifDisplay italic text-xl sm:text-3xl text-[#625B51] mt-3">
            let's build something extraordinary together.
          </p>
        </motion.div>

        {/* 3. DYNAMIC HANGING THREAD (SVG Curve) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(36,33,29,0.2))' }}
        >
          <path
            d={
              stage === 'pulling' || stage === 'exiting' || isManualPull
                ? `M ${window.innerWidth / 2 + 180 + textShiftX},${window.innerHeight / 2} Q ${
                    window.innerWidth / 2 + 320 + (isManualPull ? dragOffset.x * 0.7 : 0)
                  },${window.innerHeight / 2 + 30} ${
                    window.innerWidth / 2 + 460 + (isManualPull ? dragOffset.x : stage === 'exiting' ? 300 : 0)
                  },${window.innerHeight / 2 - 10}`
                : stage === 'grabbing'
                ? `M ${window.innerWidth / 2 + 180},${window.innerHeight / 2} Q ${
                    window.innerWidth / 2 + 260
                  },${window.innerHeight / 2 + 40} ${window.innerWidth / 2 + 320},${
                    window.innerHeight / 2 + 10
                  }`
                : `M ${window.innerWidth / 2 + 180},${window.innerHeight / 2} Q ${
                    window.innerWidth / 2 + 195
                  },${window.innerHeight / 2 + 90} ${window.innerWidth / 2 + 205},${
                    window.innerHeight / 2 + 150
                  }`
            }
            fill="none"
            stroke="#24211D"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* 4. CARTOON HAND (Prompt Section 4: Existing Cartoon Hand Asset) */}
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 300, top: -100, bottom: 100 }}
          onDrag={handleManualDrag}
          onDragEnd={() => {
            setIsManualPull(false);
            setDragOffset({ x: 0, y: 0 });
          }}
          initial={{ x: '95vw', y: 0, opacity: 0 }}
          animate={
            stage === 'approaching'
              ? { x: '34vw', y: 0, opacity: 1 }
              : stage === 'grabbing'
              ? { x: '21vw', y: 10, opacity: 1 }
              : stage === 'pulling'
              ? { x: '36vw', y: -10, opacity: 1 }
              : stage === 'exiting'
              ? { x: '95vw', y: -20, opacity: 0 }
              : { x: '95vw', y: 0, opacity: 0 }
          }
          transition={{
            duration: stage === 'pulling' ? 1.4 : 1.1,
            ease: [0.2, 1, 0.3, 1],
          }}
          className="absolute z-40 pointer-events-auto cursor-grab active:cursor-grabbing flex items-center justify-center"
        >
          <div className="relative w-48 sm:w-64 md:w-80 group">
            <img
              src="/cartoon_hand_flipped.png"
              alt="Cartoon Hand"
              className="w-full h-auto drop-shadow-2xl select-none"
              draggable="false"
            />

            {/* Interaction Tooltip */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#24211D] text-[#F4F0E6] font-mono text-[9px] px-2.5 py-1 rounded-md whitespace-nowrap shadow-md">
              PULL TO OPEN PORTFOLIO
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Minimalist Bar */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-6 border-t border-[#D8C8AD] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#625B51]">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#24211D]">SHAIK SAMEER</span>
          <span>•</span>
          <span>B.TECH ECE 2025 // MLRIT HYDERABAD</span>
        </div>

        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 text-[#24211D] font-bold hover:underline underline-offset-4"
        >
          <span>CLICK TO SCROLL TO PORTFOLIO</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </div>
  );
}
