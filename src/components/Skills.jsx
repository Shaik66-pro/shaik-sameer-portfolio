import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Layers,
  Database,
  Wrench,
  Terminal,
  Sparkles,
  Server,
  Cpu,
} from 'lucide-react';
import { skillsData, personalInfo } from '../data/portfolioData';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'ALL SKILLS', icon: Sparkles },
    { id: 'languages', name: 'LANGUAGES', icon: Terminal },
    { id: 'backend', name: 'BACKEND', icon: Server },
    { id: 'frontend', name: 'FRONTEND', icon: Layers },
    { id: 'database', name: 'DATABASES', icon: Database },
    { id: 'tools', name: 'DEV TOOLS', icon: Wrench },
  ];

  return (
    <section id="skills" className="relative w-full bg-[#F4F3EF] text-[#121215] py-24 sm:py-32 overflow-hidden border-y border-black/15">
      {/* Section Header (Screenshot 07 Layout & Typography) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Top Chapter Tag */}
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-zinc-500 uppercase mb-3">
          <span className="px-2.5 py-0.5 rounded bg-black text-cyber-yellow font-bold">
            CH. 03
          </span>
          <span>—</span>
          <span>THE TOOLKIT</span>
        </div>

        {/* Big 3D Headline: "WHAT I BUILD with." (Screenshot 07) */}
        <div className="flex flex-wrap items-baseline gap-3 sm:gap-4 mb-6">
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none uppercase text-black">
            WHAT I BUILD
          </h2>
          <span className="font-serifDisplay italic font-normal text-4xl sm:text-6xl text-zinc-800 tracking-normal">
            with.
          </span>
        </div>

        {/* Primary Language Callout & Secondary Languages (Screenshot 07) */}
        <div className="p-6 sm:p-8 bg-white rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="font-mono text-[11px] font-bold tracking-widest text-zinc-500 uppercase block w-full sm:w-auto">
              PRIMARY LANGUAGE:
            </span>

            {/* Bright Yellow Highlighter Box for PYTHON (Screenshot 07) */}
            <div className="px-4 py-2 bg-cyber-yellow border-2 border-black rounded-lg shadow-sm font-display font-black text-2xl sm:text-3xl text-black tracking-wider uppercase transform -rotate-1">
              PYTHON
            </div>

            <div className="flex items-center gap-2 font-display font-bold text-xl sm:text-2xl text-zinc-800">
              <span>JAVASCRIPT</span>
              <span className="text-zinc-400">•</span>
              <span>SQL</span>
            </div>
          </div>

          <div className="font-mono text-xs text-zinc-600 max-w-sm">
            Disciplined backend architecture, robust RESTful APIs, normalized database designs,
            and clean frontend interfaces.
          </div>
        </div>
      </div>

      {/* Infinite Rolling Marquee Rows (Screenshot 07 Dynamic Ribbon) */}
      <div className="w-full space-y-4 mb-16 overflow-hidden pointer-events-none select-none opacity-90">
        {/* Row 1: Languages & Backend */}
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 text-xl sm:text-2xl font-display font-black tracking-wider text-black/80 px-3 uppercase">
              <span>PYTHON</span>
              <span className="text-cyber-yellow">✦</span>
              <span>FASTAPI</span>
              <span className="text-zinc-400">•</span>
              <span>DJANGO</span>
              <span className="text-cyber-yellow">✦</span>
              <span>FLASK</span>
              <span className="text-zinc-400">•</span>
              <span>REST API DEVELOPMENT</span>
              <span className="text-cyber-yellow">✦</span>
              <span>JWT AUTHENTICATION</span>
              <span className="text-zinc-400">•</span>
            </div>
          ))}
        </div>

        {/* Row 2: Frontend & Databases & Tools (Reverse Marquee) */}
        <div className="flex whitespace-nowrap animate-marquee-reverse">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 text-xl sm:text-2xl font-display font-black tracking-wider text-zinc-700 px-3 uppercase">
              <span>REACT.JS</span>
              <span className="text-cyber-yellow">✦</span>
              <span>JAVASCRIPT (ES6+)</span>
              <span className="text-zinc-400">•</span>
              <span>HTML5 & CSS3</span>
              <span className="text-cyber-yellow">✦</span>
              <span>MYSQL</span>
              <span className="text-zinc-400">•</span>
              <span>SQLITE</span>
              <span className="text-cyber-yellow">✦</span>
              <span>GIT & GITHUB</span>
              <span className="text-zinc-400">•</span>
              <span>POSTMAN</span>
              <span className="text-cyber-yellow">✦</span>
              <span>SWAGGER / OPENAPI</span>
              <span className="text-zinc-400">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Structured Categorized Skill Cards (Prompt 6 Requirements) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Group 1: Programming Languages */}
          <div className="bg-white rounded-xl border border-black/15 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black pb-3 border-b border-black/10 mb-4">
              <Terminal className="w-4 h-4 text-black" />
              <span>PROGRAMMING</span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              {skillsData.programmingLanguages.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 border border-black/10"
                >
                  <span className="font-bold text-black">{skill.name}</span>
                  <span className="text-[10px] text-zinc-500 uppercase">{skill.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: Backend Development */}
          <div className="bg-white rounded-xl border border-black/15 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black pb-3 border-b border-black/10 mb-4">
              <Server className="w-4 h-4 text-black" />
              <span>BACKEND ENGINEERING</span>
            </div>
            <div className="space-y-2.5 font-mono text-xs">
              {skillsData.backend.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 border border-black/10"
                >
                  <span className="font-bold text-black">{skill.name}</span>
                  <span className="text-[10px] text-zinc-500">{skill.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Group 3: Frontend Development */}
          <div className="bg-white rounded-xl border border-black/15 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black pb-3 border-b border-black/10 mb-4">
              <Layers className="w-4 h-4 text-black" />
              <span>FRONTEND</span>
            </div>
            <div className="space-y-2.5 font-mono text-xs">
              {skillsData.frontend.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 border border-black/10"
                >
                  <span className="font-bold text-black">{skill.name}</span>
                  <span className="text-[10px] text-zinc-500">{skill.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Group 4: Database & Developer Tools */}
          <div className="bg-white rounded-xl border border-black/15 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black pb-3 border-b border-black/10 mb-4">
              <Wrench className="w-4 h-4 text-black" />
              <span>DATABASE & TOOLS</span>
            </div>
            <div className="space-y-2.5 font-mono text-xs">
              {skillsData.database.concat(skillsData.tools.slice(0, 3)).map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 border border-black/10"
                >
                  <span className="font-bold text-black">{skill.name}</span>
                  <span className="text-[10px] text-zinc-500">{skill.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
