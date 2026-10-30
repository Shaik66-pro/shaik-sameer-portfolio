import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Calendar,
  Building2,
  Code,
  Layers,
  Database,
  Server,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { personalInfo, professionalInterests } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="relative w-full bg-ivory-100 text-[#151518] py-20 lg:py-28 overflow-hidden">
      {/* Chapter 01 Transition Curtain Bar (Screenshot 04) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="border-b border-black/15 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase block mb-1">
              CHAPTER 01
            </span>
            <h2 className="font-serifDisplay italic text-5xl sm:text-6xl md:text-7xl text-[#121214] tracking-tight">
              The Subject
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-zinc-600">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-yellow border border-black/20" />
            <span>DOSSIER // CANDIDATE BIOGRAPHY & EDUCATION</span>
          </div>
        </div>
      </div>

      {/* Main Profile Layout (Screenshot 05) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Yellow Duotone Portrait Box (Screenshot 05) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Vibrant Yellow Backdrop Block (Screenshot 05) */}
              <div className="w-full bg-[#E4FF1A] p-3 sm:p-4 rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-black/20 bg-zinc-900">
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top filter grayscale contrast-125"
                  />
                  {/* Yellow color blend mode to create the reference duotone look */}
                  <div className="absolute inset-0 bg-[#E4FF1A] mix-blend-multiply opacity-50" />
                </div>

                <div className="mt-3 pt-2 border-t border-black/15 flex items-center justify-between font-mono text-[11px] font-bold text-black uppercase">
                  <span>FIG. 02 // SHAIK SAMEER</span>
                  <span>B.TECH ECE '25</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Bio, Focus Areas & Education Table (Screenshot 05) */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Highlighted Headline (Screenshot 05) */}
            <h3 className="font-serifDisplay italic text-2xl sm:text-3xl lg:text-4xl text-[#111113] leading-snug mb-6">
              I'm Sameer — a B.Tech graduate in{' '}
              <span className="highlighter-yellow not-italic font-bold font-sans">
                Electronics and Communication Engineering
              </span>{' '}
              at MLR Institute of Technology, Hyderabad (Class of 2025).
            </h3>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 font-sans text-sm sm:text-base text-zinc-700 leading-relaxed mb-8">
              <p>
                Python is my primary language; FastAPI, Django, Flask, React.js and MySQL are
                where my scalable systems live. My training and practical experience have taught
                me how to take an idea from architectural conception, through backend API design
                and database normalization, directly into clean, responsive user interfaces.
              </p>
              <p>
                What drives my engineering mindset is systems architecture, backend reliability,
                and high-throughput REST APIs — the places where rigorous programming logic and
                practical utility converge. Hands-on work in industrial automation at{' '}
                <strong className="text-black font-semibold">
                  Polmon Instruments Pvt. Ltd.
                </strong>{' '}
                instilled in me an uncompromising standard for software validation, troubleshooting,
                and real-time data integrity.
              </p>
            </div>

            {/* Professional Interests / Focus Tags */}
            <div className="mb-8">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-3">
                CORE TECHNICAL FOCUS & INTERESTS:
              </span>
              <div className="flex flex-wrap gap-2">
                {professionalInterests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 rounded-md bg-white border border-black/15 font-mono text-xs text-zinc-800 shadow-sm flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-yellow border border-black/30" />
                    <span>{interest}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Structured Academic Metadata Grid (Screenshot 05) */}
            <div className="bg-white rounded-xl border border-black/15 p-6 shadow-sm">
              <h4 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
                ACADEMIC CREDENTIALS & INSTITUTION
              </h4>

              <div className="divide-y divide-black/10 font-mono text-xs sm:text-sm">
                <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-zinc-500 uppercase">DEGREE:</span>
                  <span className="text-black font-bold">
                    {personalInfo.degree}
                  </span>
                </div>

                <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-zinc-500 uppercase">INSTITUTION:</span>
                  <span className="text-black font-bold">
                    {personalInfo.college}
                  </span>
                </div>

                <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-zinc-500 uppercase">LOCATION:</span>
                  <span className="text-black font-bold">
                    {personalInfo.location}
                  </span>
                </div>

                <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-zinc-500 uppercase">TIMELINE:</span>
                  <span className="text-black font-bold">
                    {personalInfo.timeline} (Graduation: {personalInfo.graduationYear})
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
