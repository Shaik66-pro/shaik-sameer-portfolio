import React from 'react';
import {
  GraduationCap,
  Calendar,
  Building2,
  Code,
  Layers,
  Database,
  Server,
  Sparkles,
  Award,
} from 'lucide-react';
import { personalInfo, educationData } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="relative w-full bg-[#F4F0E6] text-[#24211D] py-20 lg:py-28 overflow-hidden border-t border-[#D8C8AD]">
      {/* Chapter 01 Transition Curtain Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="border-b border-[#D8C8AD] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#625B51] uppercase block mb-1">
              CHAPTER 01 // DOSSIER
            </span>
            <h2 className="font-serifDisplay italic text-5xl sm:text-6xl md:text-7xl text-[#24211D] tracking-tight">
              About Me & Academics
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#625B51]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#24211D]" />
            <span>VERIFIED CANDIDATE RECORD // MLRIT '25</span>
          </div>
        </div>
      </div>

      {/* Main Profile Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Yellow Duotone Portrait Box with Uploaded Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="w-full bg-[#EAE3D5] p-3 sm:p-4 rounded-2xl border-2 border-[#24211D] shadow-[8px_8px_0px_0px_rgba(36,33,29,1)]">
                <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden border border-[#24211D]/30 bg-[#24211D]">
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top filter contrast-110"
                  />
                  {/* Subtle warm duotone tint */}
                  <div className="absolute inset-0 bg-[#D8C8AD] mix-blend-multiply opacity-25" />
                </div>

                <div className="mt-3 pt-2 border-t border-[#D8C8AD] flex items-center justify-between font-mono text-[11px] font-bold text-[#24211D] uppercase">
                  <span>SHAIK SAMEER</span>
                  <span>B.TECH ECE '25</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Detailed Academic Credentials */}
          <div className="lg:col-span-7 flex flex-col">
            <h3 className="font-serifDisplay italic text-2xl sm:text-3xl lg:text-4xl text-[#24211D] leading-snug mb-6">
              I'm Sameer — a B.Tech graduate in{' '}
              <span className="not-italic font-bold font-sans underline decoration-[#D8C8AD] decoration-4 underline-offset-4">
                Electronics and Communication Engineering
              </span>{' '}
              at MLR Institute of Technology, Hyderabad (Class of 2025).
            </h3>

            {/* Career Objective & Narrative */}
            <div className="space-y-4 font-sans text-sm sm:text-base text-[#625B51] leading-relaxed mb-8">
              <p>
                {personalInfo.careerObjective}
              </p>
              <p>
                My technical core centers on Python backend engineering with{' '}
                <strong className="text-[#24211D]">FastAPI, Flask, and Django</strong>, paired with{' '}
                <strong className="text-[#24211D]">MySQL and React.js</strong>. Through both academic rigor
                and real-world automation training at{' '}
                <strong className="text-[#24211D]">Polmon Instruments Pvt. Ltd.</strong>, I have cultivated
                an engineering discipline focused on system reliability, normalized schemas, and clean RESTful design.
              </p>
            </div>

            {/* Academic Track Record Table */}
            <div className="bg-[#EAE3D5]/70 rounded-2xl border border-[#D8C8AD] p-6 shadow-sm">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#24211D] uppercase tracking-widest mb-4">
                <GraduationCap className="w-4 h-4 text-[#24211D]" />
                <span>VERIFIED ACADEMIC RECORD</span>
              </div>

              <div className="divide-y divide-[#D8C8AD] font-mono text-xs sm:text-sm">
                {educationData.map((edu, idx) => (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="text-[#24211D] font-bold block">{edu.degree}</span>
                      <span className="text-[#625B51] text-xs">{edu.institution} • {edu.location}</span>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="px-2.5 py-1 rounded-md bg-[#F4F0E6] border border-[#D8C8AD] text-[#24211D] font-bold inline-block">
                        {edu.score}
                      </span>
                      <span className="text-[#625B51] text-[11px] block mt-0.5">{edu.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
