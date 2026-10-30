import React from 'react';
import {
  Briefcase,
  Trophy,
  Users,
  CheckCircle2,
  MapPin,
  Clock,
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
            Verified Industrial & Training Internship Exposure, Software Engineering Work, and Robotics Achievements.
          </p>
        </div>

        {/* Top Section: Two Experience Cards Side by Side */}
        <div className="mb-14">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#D7FF00] mb-6">
            <Briefcase className="w-4 h-4" />
            <span>WORK EXPERIENCE & TRAINING INTERNSHIPS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {experienceData.map((exp, idx) => (
              <div
                key={idx}
                className="bg-[#111317] rounded-2xl border border-[#292D32] p-6 sm:p-7 shadow-2xl flex flex-col justify-between hover:border-[#D7FF00]/50 transition-colors"
              >
                {/* Header */}
                <div className="border-b border-[#292D32] pb-5 mb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded bg-[#D7FF00] text-[#08090B] font-bold uppercase">
                      {exp.department}
                    </span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-[#A5A7AE]" />
                      <span className="font-bold text-[#A5A7AE]">
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mt-1">
                    {exp.company}
                  </h3>

                  <div className="font-serifDisplay italic text-lg text-[#D7FF00] mt-0.5">
                    {exp.role}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-[#292D32] font-mono text-[10px] text-zinc-300 uppercase">
                      {exp.designation}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#D7FF00]/10 border border-[#D7FF00]/20 font-mono text-[10px] text-[#D7FF00] uppercase">
                      {exp.employmentType}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-[#A5A7AE] mt-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D7FF00]" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2.5 mb-5 flex-1">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#A5A7AE]">
                    VERIFIED WORK HIGHLIGHTS:
                  </h4>
                  <ul className="space-y-2 font-sans text-xs sm:text-sm text-zinc-300">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 bg-[#08090B]/60 p-2.5 rounded-lg border border-[#292D32]/60">
                        <CheckCircle2 className="w-4 h-4 text-[#D7FF00] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
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
        </div>

        {/* Bottom Section: Achievements & Leadership */}
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#D7FF00] mb-6">
            <Trophy className="w-4 h-4" />
            <span>COMPETITIVE ACHIEVEMENTS & LEADERSHIP</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-4">
              {achievementsData.map((ach) => (
                <div
                  key={ach.id}
                  className="bg-[#111317] rounded-2xl border border-[#292D32] p-5 sm:p-6 shadow-xl flex items-start gap-5 hover:border-[#D7FF00]/50 transition-colors"
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
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4">
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

              {/* Summary Stats */}
              <div className="bg-[#111317] rounded-2xl border border-[#292D32] p-5 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="font-display font-black text-3xl text-[#D7FF00]">2</div>
                  <div className="font-mono text-[10px] text-[#A5A7AE] uppercase tracking-wider mt-1">Internships</div>
                </div>
                <div className="text-center">
                  <div className="font-display font-black text-3xl text-[#D7FF00]">6+</div>
                  <div className="font-mono text-[10px] text-[#A5A7AE] uppercase tracking-wider mt-1">Months Training</div>
                </div>
                <div className="text-center">
                  <div className="font-display font-black text-3xl text-[#D7FF00]">2</div>
                  <div className="font-mono text-[10px] text-[#A5A7AE] uppercase tracking-wider mt-1">1st Place Wins</div>
                </div>
                <div className="text-center">
                  <div className="font-display font-black text-3xl text-[#D7FF00]">85+</div>
                  <div className="font-mono text-[10px] text-[#A5A7AE] uppercase tracking-wider mt-1">Team Members Led</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
