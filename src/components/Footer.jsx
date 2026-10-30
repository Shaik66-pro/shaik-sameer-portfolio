import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Download } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#08090B] text-white border-t border-[#292D32] py-12 px-4 sm:px-6 lg:px-8 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Monogram & Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#111317] border border-[#292D32] flex items-center justify-center font-display font-bold text-[#D7FF00] text-sm">
            SS
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-wider">
              {personalInfo.name}
            </span>
            <span className="text-[10px] text-[#A5A7AE] uppercase tracking-widest">
              PYTHON FULL STACK DEVELOPER // MLRIT HYDERABAD
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-5 text-[#A5A7AE]">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D7FF00] transition-colors flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D7FF00] transition-colors flex items-center gap-1"
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-400" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="hover:text-[#D7FF00] transition-colors flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
          <a
            href={personalInfo.resumeUrl}
            download="Shaik_Sameer_Resume.pdf"
            className="hover:text-[#D7FF00] transition-colors flex items-center gap-1 text-[#D7FF00]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Résumé</span>
          </a>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-[#111317] border border-[#292D32] hover:border-[#D7FF00] text-[#A5A7AE] hover:text-white transition-all duration-200 shadow-glow-yellow flex items-center gap-1.5"
          title="Scroll back to top"
        >
          <span className="text-[11px] uppercase">TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#D7FF00]" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#292D32]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#A5A7AE]">
        <span>
          © {new Date().getFullYear()} Shaik Sameer. All rights reserved.
        </span>
        <span>
          MLR Institute of Technology, Hyderabad (Class of 2025)
        </span>
      </div>
    </footer>
  );
}
