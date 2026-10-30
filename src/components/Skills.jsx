import React from 'react';
import {
  Code2,
  Layers,
  Database,
  Wrench,
  Terminal,
  Sparkles,
  Server,
  Cpu,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { skillsData, personalInfo } from '../data/portfolioData';

export default function Skills() {
  return (
    <section id="skills" className="relative w-full bg-[#08090B] text-white py-24 sm:py-32 overflow-hidden border-t border-[#292D32]">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#A5A7AE] uppercase mb-3">
            <span className="px-2.5 py-0.5 rounded bg-[#D7FF00]/15 text-[#D7FF00] border border-[#D7FF00]/30 font-bold">
              CHAPTER 03
            </span>
            <span>—</span>
            <span>TECHNICAL PROFICIENCIES</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3 sm:gap-4 mb-4">
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none uppercase text-white text-3d-white">
              WHAT I BUILD
            </h2>
            <span className="font-serifDisplay italic font-normal text-4xl sm:text-6xl text-[#D7FF00] tracking-normal">
              with.
            </span>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#A5A7AE] max-w-2xl leading-relaxed">
            A focused full-stack toolkit centered on scalable Python backends, normalized relational schemas,
            and responsive React interfaces. Zero arbitrary skill percentages.
          </p>
        </div>

        {/* Primary Language Callout Slab */}
        <div className="p-6 sm:p-8 bg-[#111317] rounded-2xl border border-[#292D32] mb-14 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="font-mono text-xs font-bold tracking-widest text-[#A5A7AE] uppercase">
              PRIMARY LANGUAGE:
            </span>

            <div className="px-5 py-2 bg-[#D7FF00] text-[#08090B] font-display font-black text-2xl sm:text-3xl tracking-wider uppercase rounded-xl shadow-glow-yellow">
              PYTHON
            </div>

            <div className="flex items-center gap-2 font-display font-bold text-xl sm:text-2xl text-white">
              <span>JAVASCRIPT</span>
              <span className="text-[#A5A7AE]">•</span>
              <span>SQL</span>
            </div>
          </div>

          <div className="font-mono text-xs text-[#A5A7AE] max-w-sm">
            FastAPI, Flask & Django APIs • MySQL Database Integration • React Frontend UIs
          </div>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* 1. Programming Languages */}
          <div className="bg-[#111317] rounded-2xl border border-[#292D32] p-6 flex flex-col justify-between hover:border-[#D7FF00]/50 transition-colors">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#D7FF00] pb-3 border-b border-[#292D32] mb-4">
                <Terminal className="w-4 h-4" />
                <span>PROGRAMMING LANGUAGES</span>
              </div>
              <div className="space-y-2.5 font-mono text-xs">
                {skillsData.programmingLanguages.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-[#08090B] border border-[#292D32]"
                  >
                    <span className="font-bold text-white">{skill.name}</span>
                    <span className="text-[10px] text-[#A5A7AE] uppercase">{skill.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Backend Engineering */}
          <div className="bg-[#111317] rounded-2xl border border-[#292D32] p-6 flex flex-col justify-between hover:border-[#D7FF00]/50 transition-colors">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#D7FF00] pb-3 border-b border-[#292D32] mb-4">
                <Server className="w-4 h-4" />
                <span>BACKEND ENGINEERING</span>
              </div>
              <div className="space-y-2.5 font-mono text-xs">
                {skillsData.backend.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-[#08090B] border border-[#292D32]"
                  >
                    <span className="font-bold text-white">{skill.name}</span>
                    <span className="text-[10px] text-[#A5A7AE]">{skill.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Frontend Technologies */}
          <div className="bg-[#111317] rounded-2xl border border-[#292D32] p-6 flex flex-col justify-between hover:border-[#D7FF00]/50 transition-colors">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#D7FF00] pb-3 border-b border-[#292D32] mb-4">
                <Layers className="w-4 h-4" />
                <span>FRONTEND</span>
              </div>
              <div className="space-y-2.5 font-mono text-xs">
                {skillsData.frontend.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-[#08090B] border border-[#292D32]"
                  >
                    <span className="font-bold text-white">{skill.name}</span>
                    <span className="text-[10px] text-[#A5A7AE]">{skill.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Databases & Developer Tools */}
          <div className="bg-[#111317] rounded-2xl border border-[#292D32] p-6 flex flex-col justify-between hover:border-[#D7FF00]/50 transition-colors">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#D7FF00] pb-3 border-b border-[#292D32] mb-4">
                <Database className="w-4 h-4" />
                <span>DATABASE & TOOLS</span>
              </div>
              <div className="space-y-2.5 font-mono text-xs">
                {skillsData.database.concat(skillsData.tools).map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#08090B] border border-[#292D32]"
                  >
                    <span className="font-bold text-white">{skill.name}</span>
                    <span className="text-[10px] text-[#A5A7AE]">{skill.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Core Concepts Card Row (Prompt Section 10) */}
        <div className="bg-[#111317] rounded-2xl border border-[#292D32] p-6 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white mb-4">
            <Cpu className="w-4 h-4 text-[#D7FF00]" />
            <span>CORE ARCHITECTURAL CONCEPTS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {skillsData.concepts.map((concept, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#08090B] border border-[#292D32] flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D7FF00] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-sans text-sm">{concept.name}</strong>
                  <span className="text-[#A5A7AE] text-xs">{concept.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
