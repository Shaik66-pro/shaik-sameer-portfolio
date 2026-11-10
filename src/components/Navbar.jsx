import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { getActiveResumeUrl } from './OwnerResumeManager';

export default function Navbar({ onOpenContact, onReplayEntrance }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: '01 // THE SUBJECT', href: '#subject' },
    { name: '02 // CASE FILES', href: '#projects' },
    { name: '03 // TOOLKIT', href: '#skills' },
    { name: '04 // THE EVIDENCE', href: '#experience' },
    { name: '05 // CERTIFICATIONS', href: '#certifications' },
  ];

  return (
    <>
      <header
        className="relative top-0 left-0 right-0 z-40 bg-[#08090B]/95 backdrop-blur-md border-b border-[#292D32] py-2.5 sm:py-3 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          
          {/* Brand Logo */}
          <a
            href="#"
            className="group flex items-center gap-2 sm:gap-2.5 text-white font-mono text-xs sm:text-sm tracking-wider min-w-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-lg bg-[#111317] border border-[#292D32] flex items-center justify-center font-bold font-display text-[#D7FF00] text-xs sm:text-sm group-hover:border-[#D7FF00] transition-all duration-300 shadow-glow-yellow">
              SS
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold tracking-tight text-white group-hover:text-[#D7FF00] transition-colors truncate text-xs sm:text-sm">
                SHAIK SAMEER
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#A5A7AE] font-mono tracking-wider sm:tracking-widest uppercase truncate hidden xs:block">
                EST. {personalInfo.establishedYear} // PYTHON DEVELOPER
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-wider shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#A5A7AE] hover:text-white transition-colors relative py-1 group"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D7FF00] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 md:gap-3 font-mono text-xs shrink-0">
            <a
              href={getActiveResumeUrl()}
              download="Shaik_Sameer_Resume.pdf"
              className="px-3.5 py-2 rounded-full border border-[#292D32] text-zinc-300 hover:text-white hover:border-white/50 transition-all duration-200 flex items-center gap-1.5 hover:bg-white/5"
              title="Download Shaik Sameer's Resume"
            >
              <Download className="w-3.5 h-3.5 text-[#D7FF00]" />
              <span>RÉSUMÉ</span>
            </a>

            <button
              onClick={onOpenContact}
              className="px-4 py-2 rounded-full bg-[#D7FF00] text-[#08090B] font-semibold tracking-wider hover:bg-white transition-all duration-300 flex items-center gap-1.5 shadow-glow-yellow active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>GET HIRED</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
            <button
              onClick={onOpenContact}
              className="hidden xs:inline-flex sm:hidden px-2.5 py-1 rounded-full bg-[#D7FF00] text-[#08090B] font-mono text-[11px] font-bold"
            >
              HIRE
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-[#292D32] text-zinc-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full z-40 bg-[#08090B]/98 backdrop-blur-xl border-b border-[#292D32] p-6 lg:hidden"
          >
            <nav className="flex flex-col gap-4 font-mono text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-white/5 text-zinc-300 hover:text-[#D7FF00] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-[#292D32] flex flex-col gap-3">
                <a
                  href={getActiveResumeUrl()}
                  download="Shaik_Sameer_Resume.pdf"
                  className="w-full py-2.5 rounded-lg border border-[#292D32] text-center font-mono text-xs text-white flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#D7FF00]" />
                  DOWNLOAD RÉSUMÉ (PDF)
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full py-2.5 rounded-lg bg-[#D7FF00] text-[#08090B] font-bold font-mono text-xs text-center flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  CONTACT SHAIK SAMEER
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
