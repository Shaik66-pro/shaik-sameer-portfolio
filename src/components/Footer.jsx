import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Download, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-obsidian-950 text-white border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Monogram & Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center font-display font-bold text-cyber-yellow text-sm">
            SS
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-wider">
              {personalInfo.name}
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
              PYTHON FULL STACK DEVELOPER // HYDERABAD
            </span>
          </div>
        </div>

        {/* Social & Resume Links */}
        <div className="flex items-center gap-5 text-zinc-400">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyber-yellow transition-colors flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyber-yellow transition-colors flex items-center gap-1"
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-500" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="hover:text-cyber-yellow transition-colors flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
          <a
            href={personalInfo.resumeUrl}
            download="Shaik_Sameer_Resume.pdf"
            className="hover:text-cyber-yellow transition-colors flex items-center gap-1 text-cyber-yellow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Résumé</span>
          </a>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-cyber-yellow text-zinc-400 hover:text-white transition-all duration-200 hover:shadow-glow-yellow flex items-center gap-1.5"
          title="Scroll back to top"
        >
          <span className="text-[11px] uppercase">TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-cyber-yellow" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
        <span>
          © {new Date().getFullYear()} Shaik Sameer. All rights reserved.
        </span>
        <span>
          Designed & engineered with React.js, Three.js, Tailwind CSS & Framer Motion.
        </span>
      </div>
    </footer>
  );
}
