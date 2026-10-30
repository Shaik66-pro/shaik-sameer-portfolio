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
  ChevronRight,
  Clock,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { frontendProjects, fullstackProjects, personalInfo } from '../data/portfolioData';

export default function Projects() {
  const [activeTab, setActiveTab] = useState('fullstack'); // 'fullstack' or 'frontend'
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="relative w-full bg-obsidian-950 text-white py-24 sm:py-32 overflow-hidden border-t border-white/10">
      {/* Background Subtle Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header (Screenshot 06 Layout & Typography) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 border-b border-white/10 pb-10">
          <div className="lg:col-span-8 flex flex-col items-start">
            {/* Tag Badge */}
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-zinc-400 uppercase mb-3">
              <span className="px-2 py-0.5 rounded bg-cyber-yellow/10 text-cyber-yellow border border-cyber-yellow/30 font-bold">
                CASE FILES / CASE FILES
              </span>
              <span>—</span>
              <span>CHAPTER 02</span>
            </div>

            {/* 3D Extruded Title & Yellow Script (Screenshot 06) */}
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none uppercase text-3d-white">
              THREE SYSTEMS.
            </h2>
            <span className="font-serifDisplay italic font-normal text-4xl sm:text-6xl text-cyber-yellow -mt-1 sm:-mt-3 tracking-normal">
              Built in {personalInfo.establishedYear}.
            </span>

            <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-2xl mt-4 leading-relaxed">
              Architectural solutions engineered for real-world enterprise utility.
              Explore both comprehensive full-stack backends and intuitive frontend systems.
            </p>
          </div>

          {/* Tab Switcher Pills */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="inline-flex p-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('fullstack')}
                className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  activeTab === 'fullstack'
                    ? 'bg-cyber-yellow text-obsidian-950 shadow-glow-yellow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span>FULL STACK SYSTEMS</span>
              </button>

              <button
                onClick={() => setActiveTab('frontend')}
                className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  activeTab === 'frontend'
                    ? 'bg-cyber-yellow text-obsidian-950 shadow-glow-yellow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>FRONTEND SHOWCASE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Full Stack Projects (Prompt 8 & Screenshot 06) */}
        {activeTab === 'fullstack' && (
          <div className="space-y-12">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white uppercase">
                  Full Stack Projects – Solving Real-World Problems
                </h3>
                <p className="font-mono text-xs text-zinc-400 mt-1">
                  Engineered with Python (FastAPI, Django, Flask), MySQL & React.js
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>ALL SYSTEMS IN PROGRESS</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {fullstackProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative bg-obsidian-900 border border-white/15 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-cyber-yellow/60 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Top Index & Category */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display font-black text-4xl sm:text-5xl text-outline-yellow group-hover:text-cyber-yellow transition-colors">
                        {project.number}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30 font-mono text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {project.status}
                      </span>
                    </div>

                    <div className="font-mono text-[11px] tracking-wider text-zinc-400 uppercase mb-2">
                      {project.category}
                    </div>

                    <h4 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-cyber-yellow transition-colors tracking-tight mb-3">
                      {project.title}
                    </h4>

                    {/* Architecture Pills */}
                    <div className="grid grid-cols-3 gap-2 font-mono text-[10px] bg-white/5 p-2 rounded-lg border border-white/10 mb-4 text-center">
                      <div>
                        <span className="text-zinc-500 block">BACKEND</span>
                        <span className="text-zinc-200 font-bold">{project.backend}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">FRONTEND</span>
                        <span className="text-zinc-200 font-bold">{project.frontend}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">DATABASE</span>
                        <span className="text-zinc-200 font-bold">{project.database}</span>
                      </div>
                    </div>

                    {/* Problem Statement */}
                    <p className="font-sans text-xs sm:text-sm text-zinc-400 line-clamp-3 mb-5 leading-relaxed">
                      {project.problem}
                    </p>

                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2 rounded-full bg-cyber-yellow text-obsidian-950 font-mono text-xs font-bold hover:bg-white transition-colors flex items-center gap-1.5 shadow-glow-yellow"
                    >
                      <span>VIEW SPECS</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-zinc-400 hover:text-white flex items-center gap-1 hover:underline underline-offset-4"
                      title="Shaik Sameer GitHub Repositories"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GITHUB REPO</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Frontend Projects (Prompt 7) */}
        {activeTab === 'frontend' && (
          <div className="space-y-12">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white uppercase">
                  Frontend Projects – Building Better User Experiences
                </h3>
                <p className="font-mono text-xs text-zinc-400 mt-1">
                  Crafted with React.js, modern CSS, dynamic charts and responsive design
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>IN ACTIVE DEVELOPMENT</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {frontendProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative bg-obsidian-900 border border-white/15 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-cyber-yellow/60 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display font-black text-4xl sm:text-5xl text-outline-yellow group-hover:text-cyber-yellow transition-colors">
                        {project.number}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30 font-mono text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {project.status}
                      </span>
                    </div>

                    <div className="font-mono text-[11px] tracking-wider text-zinc-400 uppercase mb-2">
                      {project.category}
                    </div>

                    <h4 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-cyber-yellow transition-colors tracking-tight mb-3">
                      {project.title}
                    </h4>

                    {/* Problem Statement */}
                    <p className="font-sans text-xs sm:text-sm text-zinc-400 line-clamp-3 mb-5 leading-relaxed">
                      {project.problem}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2 rounded-full bg-cyber-yellow text-obsidian-950 font-mono text-xs font-bold hover:bg-white transition-colors flex items-center gap-1.5 shadow-glow-yellow"
                    >
                      <span>VIEW SPECS</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-zinc-400 hover:text-white flex items-center gap-1 hover:underline underline-offset-4"
                      title="Shaik Sameer GitHub Repositories"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GITHUB REPO</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Project Details Modal / Dossier Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-obsidian-900 border border-white/20 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-white"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-cyber-yellow mb-1">
                    <span>CASE FILE #{selectedProject.number}</span>
                    <span>•</span>
                    <span className="text-zinc-400">{selectedProject.category}</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Notice */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="font-mono text-xs text-zinc-300">
                  <strong className="text-amber-300 uppercase block mb-0.5">
                    Project Status: {selectedProject.status}
                  </strong>
                  This application architecture is actively being coded, tested, and validated.
                  Per portfolio integrity standards, live production links and code commits will be
                  synchronized upon milestone validation.
                </div>
              </div>

              {/* Problem Breakdown */}
              <div className="mb-6">
                <h4 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                  PROBLEM STATEMENT
                </h4>
                <p className="font-sans text-sm text-zinc-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                  {selectedProject.problem}
                </p>
              </div>

              {/* Architectural Highlights / Stack */}
              {selectedProject.backend && (
                <div className="mb-6">
                  <h4 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                    SYSTEM ARCHITECTURE
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <span className="text-zinc-400 block text-[10px]">BACKEND FRAMEWORK</span>
                      <strong className="text-white">{selectedProject.backend}</strong>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <span className="text-zinc-400 block text-[10px]">FRONTEND CLIENT</span>
                      <strong className="text-white">{selectedProject.frontend}</strong>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <span className="text-zinc-400 block text-[10px]">DATABASE ENGINE</span>
                      <strong className="text-white">{selectedProject.database}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Features List */}
              <div className="mb-6">
                <h4 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                  CORE FEATURES & SPECIFICATIONS
                </h4>
                <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-zinc-300">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 bg-white/5 p-2.5 rounded-lg border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-cyber-yellow shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Pill Grid */}
              <div className="mb-6">
                <h4 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                  TECHNOLOGIES UTILIZED
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md bg-white/10 border border-white/15 font-mono text-xs text-cyber-yellow"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-semibold flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>CHECK GITHUB PROFILE</span>
                </a>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 rounded-full bg-cyber-yellow text-obsidian-950 font-mono text-xs font-bold hover:bg-white transition-colors"
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
