import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Layers,
  Database,
  Server,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { sixProjects, personalInfo } from '../data/portfolioData';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'fullstack', 'frontend'
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeFilter === 'all'
      ? sixProjects
      : sixProjects.filter((p) => p.type === activeFilter);

  return (
    <section id="projects" className="relative w-full bg-[#08090B] text-white py-24 sm:py-32 overflow-hidden border-t border-[#292D32]">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 border-b border-[#292D32] pb-10">
          <div className="lg:col-span-8 flex flex-col items-start">
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-[#A5A7AE] uppercase mb-3">
              <span className="px-2.5 py-0.5 rounded bg-[#D7FF00]/15 text-[#D7FF00] border border-[#D7FF00]/30 font-bold">
                CHAPTER 02 // CASE FILES
              </span>
              <span>— SIX ENGINEERING SYSTEMS</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none uppercase text-white text-3d-white">
              PROJECT DOSSIER
            </h2>
            <span className="font-serifDisplay italic font-normal text-2xl sm:text-4xl lg:text-5xl text-[#D7FF00] -mt-0.5 sm:-mt-1 tracking-normal">
              Solving Real-World Problems.
            </span>

            <p className="font-sans text-xs sm:text-sm md:text-base text-[#A5A7AE] max-w-2xl mt-3 sm:mt-4 leading-relaxed">
              Real-world systems engineered across backend architectures and frontend user interfaces.
              Completed production systems are distinguished from actively advancing architectures.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end w-full overflow-x-auto pb-1 sm:pb-0">
            <div className="inline-flex p-1 sm:p-1.5 rounded-full bg-[#111317] border border-[#292D32] max-w-full">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[11px] sm:text-xs font-bold transition-all duration-300 ${
                  activeFilter === 'all'
                    ? 'bg-[#D7FF00] text-[#08090B] shadow-glow-yellow'
                    : 'text-[#A5A7AE] hover:text-white'
                }`}
              >
                ALL (6)
              </button>

              <button
                onClick={() => setActiveFilter('fullstack')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[11px] sm:text-xs font-bold transition-all duration-300 ${
                  activeFilter === 'fullstack'
                    ? 'bg-[#D7FF00] text-[#08090B] shadow-glow-yellow'
                    : 'text-[#A5A7AE] hover:text-white'
                }`}
              >
                FULL STACK (3)
              </button>

              <button
                onClick={() => setActiveFilter('frontend')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[11px] sm:text-xs font-bold transition-all duration-300 ${
                  activeFilter === 'frontend'
                    ? 'bg-[#D7FF00] text-[#08090B] shadow-glow-yellow'
                    : 'text-[#A5A7AE] hover:text-white'
                }`}
              >
                FRONTEND (3)
              </button>
            </div>
          </div>
        </div>

        {/* 6 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-[#111317] border border-[#292D32] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#D7FF00]/70 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
            >
              <div>
                {/* Header: Number only — no status badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-black text-4xl sm:text-5xl text-outline-yellow group-hover:text-[#D7FF00] transition-colors">
                    {project.number}
                  </span>
                </div>

                <div className="font-mono text-[11px] tracking-wider text-[#D7FF00] uppercase mb-1">
                  {project.category}
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#D7FF00] transition-colors tracking-tight mb-3">
                  {project.title}
                </h3>

                {/* Problem Statement */}
                <p className="font-sans text-xs sm:text-sm text-[#A5A7AE] line-clamp-3 mb-5 leading-relaxed">
                  {project.problem}
                </p>

                {/* Technologies Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded bg-[#08090B] border border-[#292D32] font-mono text-[10px] text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: View Specs + GitHub link */}
              <div className="pt-4 border-t border-[#292D32] flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-4 py-2 rounded-full bg-[#D7FF00] text-[#08090B] font-mono text-xs font-bold hover:bg-white transition-colors flex items-center gap-1.5 shadow-glow-yellow"
                >
                  <span>VIEW SPECS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#A5A7AE] hover:text-white flex items-center gap-1 hover:underline underline-offset-4"
                  title="Shaik Sameer GitHub Repositories"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GITHUB</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Project Specification Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#111317] border border-[#292D32] rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-white"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-[#292D32] pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#D7FF00] mb-1">
                    <span>CASE FILE #{selectedProject.number}</span>
                    <span>•</span>
                    <span className="text-[#A5A7AE]">{selectedProject.category}</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg bg-white/5 border border-[#292D32] hover:bg-white/10 text-[#A5A7AE] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Problem & Solution */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-mono text-xs font-bold text-[#A5A7AE] uppercase tracking-widest mb-1.5">
                    REAL-WORLD PROBLEM STATEMENT
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 bg-[#08090B] p-3.5 rounded-xl border border-[#292D32] leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold text-[#D7FF00] uppercase tracking-widest mb-1.5">
                    ENGINEERING SOLUTION
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-zinc-200 bg-[#08090B] p-3.5 rounded-xl border border-[#292D32] leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-mono text-xs font-bold text-[#A5A7AE] uppercase tracking-widest mb-2.5">
                  CORE FEATURES & SPECIFICATIONS
                </h4>
                <ul className="space-y-2 font-sans text-xs sm:text-sm text-zinc-300">
                  {selectedProject.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 bg-[#08090B]/60 p-2.5 rounded-lg border border-[#292D32]/60">
                      <CheckCircle2 className="w-4 h-4 text-[#D7FF00] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Challenges Solved */}
              {selectedProject.technicalChallenges && (
                <div className="mb-6">
                  <h4 className="font-mono text-xs font-bold text-[#A5A7AE] uppercase tracking-widest mb-2.5">
                    TECHNICAL CHALLENGES SOLVED
                  </h4>
                  <ul className="space-y-2 font-sans text-xs sm:text-sm text-zinc-300">
                    {selectedProject.technicalChallenges.map((ch, i) => (
                      <li key={i} className="flex items-start gap-2 bg-[#08090B]/60 p-2.5 rounded-lg border border-[#292D32]/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D7FF00] shrink-0 mt-2" />
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="font-mono text-xs font-bold text-[#A5A7AE] uppercase tracking-widest mb-2">
                  TECHNOLOGIES UTILIZED
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md bg-[#D7FF00]/10 border border-[#D7FF00]/30 font-mono text-xs text-[#D7FF00]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-[#292D32] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 sm:px-5 py-2.5 rounded-full bg-[#08090B] hover:bg-white/10 border border-[#292D32] text-white font-mono text-xs flex items-center justify-center gap-2 text-center"
                >
                  <Github className="w-4 h-4" />
                  <span>CHECK GITHUB PROFILE</span>
                </a>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 rounded-full bg-[#D7FF00] text-[#08090B] font-mono text-xs font-bold hover:bg-white transition-colors text-center"
                >
                  CLOSE DOSSIER
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
