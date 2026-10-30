import React from 'react';
import {
  Briefcase,
  Trophy,
  Users,
  CheckCircle2,
  Calendar,
  MapPin,
  Cpu,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { experienceData, achievementsData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="relative w-full bg-[#08090B] text-white py-24 sm:py-32 overflow-hidden border-t border-[#292D32]">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Chapter 04 Header */}
        <div className="mb-16 border-b border-[#292D32] pb-10">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#A5A7AE] uppercase mb-3">
            <span className="px-2.5 py-0.5 rounded bg-[#D7FF00]/15 text-[#D7FF00] border border-[#D7FF00]/30 font-bold">
              CHAPTER 04 // ON THE RECORD
            </span>
            <span>—</span>
            <span>INDUSTRY WORK & HONORS</span>
          </div>

          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none uppercase text-white text-3d-white">
            THE EVIDENCE
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#A5A7AE] mt-3 max-w-xl uppercase tracking-wider">
            Verified Industrial Automation Exposure, Software Engineering Work, and Robotics Achievements.
          </p>
        </div>

        {/* 2-Column Layout: Work Experience (Left) & Honors / Leadership (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Polmon Instruments Work Experience (Prompt Section 11) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#D7FF00] mb-6">
              <Briefcase className="w-4 h-4" />
              <span>INDUSTRIAL WORK EXPERIENCE</span>
            </div>

            {experienceData.map((exp, idx) => (
              <div
                key={idx}
                className="bg-[#111317] rounded-2xl border border-[#292D32] p-6 sm:p-8 shadow-2xl flex flex-col justify-between hover:border-[#D7FF00]/50 transition-colors"
              >
                {/* Header */}
                <div className="border-b border-[#292D32] pb-5 mb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded bg-[#D7FF00] text-[#08090B] font-bold uppercase">
                      {exp.department} DEPARTMENT
                    </span>
                    <span className="font-bold text-[#A5A7AE]">
                      {exp.type}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                    {exp.company}
                  </h3>

                  <div className="font-serifDisplay italic text-xl text-[#D7FF00] mt-0.5">
                    {exp.role}
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-[#A5A7AE] mt-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D7FF00]" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Verified Work Exposure Highlights */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#A5A7AE]">
                    VERIFIED TECHNICAL WORK HIGHLIGHTS:
                  </h4>
                  <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-zinc-300">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 bg-[#08090B]/60 p-2.5 rounded-lg border border-[#292D32]/60">
                        <CheckCircle2 className="w-4 h-4 text-[#D7FF00] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Tags */}
                <div className="pt-4 border-t border-[#292D32]">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-[#08090B] border border-[#292D32] font-mono text-[11px] text-[#A5A7AE]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Achievements & Leadership (Prompt Section 12) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#D7FF00] mb-6">
              <Trophy className="w-4 h-4" />
              <span>COMPETITIVE ACHIEVEMENTS & LEADERSHIP</span>
            </div>

            <div className="space-y-5">
              {achievementsData.map((ach) => (
                <div
                  key={ach.id}
                  className="bg-[#111317] rounded-2xl border border-[#292D32] p-6 shadow-xl flex items-start gap-5 hover:border-[#D7FF00]/50 transition-colors"
                >
                  <div className="w-16 h-16 shrink-0 rounded-xl bg-[#08090B] border border-[#D7FF00]/40 text-[#D7FF00] flex items-center justify-center font-display font-black text-2xl shadow-md">
                    {ach.stat}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#A5A7AE]">
                      {ach.organization}
                    </span>
                    <h4 className="font-display font-bold text-base sm:text-lg text-white leading-snug mt-0.5 mb-1.5">
                      {ach.title}
                    </h4>
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Department Coordinator Highlight Card */}
              <div className="p-6 rounded-2xl bg-[#D7FF00] text-[#08090B] font-mono flex items-center gap-4 shadow-glow-yellow">
                <div className="p-3 rounded-xl bg-[#08090B] text-[#D7FF00]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <strong className="block font-display text-lg tracking-tight uppercase">
                    DEPARTMENT COORDINATOR (85+ MEMBERS)
                  </strong>
                  <span className="text-xs text-zinc-900 block mt-0.5 font-sans">
                    Led technical symposiums, hackathons, and multi-team engineering events at MLRIT.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
