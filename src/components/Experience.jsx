import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Trophy,
  Users,
  CheckCircle2,
  Calendar,
  MapPin,
  Cpu,
  ShieldCheck,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { experienceData, achievementsData, personalInfo } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="relative w-full bg-[#E4FF1A] text-obsidian-950 py-24 sm:py-32 overflow-hidden border-b-2 border-black">
      {/* Chapter 04 Transition Banner (Screenshot 08) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        {/* Chapter Badge */}
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-black uppercase mb-3">
          <span className="px-2.5 py-0.5 rounded bg-black text-cyber-yellow font-bold">
            CH. 04
          </span>
          <span>—</span>
          <span className="font-bold">ON THE RECORD</span>
        </div>

        {/* Massive 3D Stamped Typography: "THE EVIDENCE" (Screenshot 08) */}
        <div className="border-b-2 border-black pb-8">
          <h2 className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tight uppercase text-black text-3d-stamped leading-none">
            THE EVIDENCE
          </h2>
          <p className="font-mono text-xs sm:text-sm text-black/80 mt-3 max-w-xl font-semibold uppercase tracking-wider">
            VERIFIED INDUSTRY EXPERIENCE, INDUSTRIAL AUTOMATION WORK, AND COMPETITIVE ACHIEVEMENTS.
          </p>
        </div>
      </div>

      {/* Main Experience & Achievements Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Work Experience at Polmon Instruments (Prompt 9) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-black mb-6">
              <Briefcase className="w-4 h-4 text-black" />
              <span>INDUSTRY WORK EXPERIENCE</span>
            </div>

            {experienceData.map((exp, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border-2 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
              >
                {/* Header */}
                <div className="border-b border-black/15 pb-5 mb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded bg-black text-cyber-yellow font-bold uppercase">
                      {exp.department} DEPARTMENT
                    </span>
                    <span className="font-bold text-zinc-600 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl text-black uppercase tracking-tight">
                    {exp.company}
                  </h3>

                  <div className="font-serifDisplay italic text-lg sm:text-xl text-zinc-800 mt-0.5">
                    {exp.role}
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-black" />
                    <span>{exp.location}</span>
                    <span>•</span>
                    <span>{exp.type}</span>
                  </div>
                </div>

                {/* Verified Work Highlights (Prompt 9 Exact Requirements) */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
                    VERIFIED WORK HIGHLIGHTS & RESPONSIBILITIES:
                  </h4>
                  <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-zinc-800">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Tags */}
                <div className="pt-4 border-t border-black/15">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-[#E4FF1A] border border-black font-mono text-[11px] font-bold text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Achievements & Key Distinction Stats (Prompt 9 & Screenshot 09) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-black mb-6">
              <Trophy className="w-4 h-4 text-black" />
              <span>HONORS & LEADERSHIP ACHIEVEMENTS</span>
            </div>

            <div className="space-y-5">
              {achievementsData.map((ach) => (
                <div
                  key={ach.id}
                  className={`bg-white rounded-2xl border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-start gap-5 transition-transform hover:-translate-y-0.5 ${
                    ach.highlight ? 'ring-2 ring-black' : ''
                  }`}
                >
                  {/* Big 3D Stat Numeral (Screenshot 09) */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl bg-black text-cyber-yellow flex items-center justify-center font-display font-black text-2xl sm:text-3xl border border-black shadow-md">
                    {ach.stat}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                      {ach.organization}
                    </span>
                    <h4 className="font-display font-bold text-base sm:text-lg text-black leading-snug mt-0.5 mb-1.5">
                      {ach.title}
                    </h4>
                    <p className="font-sans text-xs text-zinc-700 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Leadership Callout */}
              <div className="p-5 rounded-2xl bg-black text-white border-2 border-black shadow-xl flex items-center gap-4">
                <div className="p-3 rounded-full bg-cyber-yellow text-black font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs text-cyber-yellow font-bold uppercase block">
                    85+ MEMBER STUDENT BODY LEADERSHIP
                  </span>
                  <p className="font-sans text-xs text-zinc-300 mt-0.5">
                    Coordinated technical symposiums, hackathons, and collaborative engineering events.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
