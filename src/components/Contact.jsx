import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Copy,
  Check,
  Download,
  Github,
  Linkedin,
  Send,
  Sparkles,
  ArrowUpRight,
  Phone,
  MapPin,
  X,
  MessageSquare,
  ShieldAlert,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Contact({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true);

    // Client-side validated form dispatch
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);

      // Also generate mailto link for direct sending without fake third-party claims
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        formState.subject || 'Portfolio Inquiry for Shaik Sameer'
      )}&body=${encodeURIComponent(
        `Hi Sameer,\n\nMy name is ${formState.name} (${formState.email}).\n\n${formState.message}`
      )}`;
      window.open(mailtoUrl, '_blank');
    }, 800);
  };

  return (
    <>
      {/* SECTION 1: Closing Teaser Banner (Screenshot 10) */}
      <section id="contact-trigger" className="relative w-full bg-obsidian-950 text-white py-24 sm:py-32 border-t border-white/10 overflow-hidden select-none">
        <div className="absolute inset-0 bg-grid-cyber opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyber-yellow bg-cyber-yellow/10 border border-cyber-yellow/30 px-3 py-1 rounded-full uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CHAPTER 05 // FINAL INVITATION</span>
          </div>

          {/* Extruded Title: "ONE LAST THING." (Screenshot 10) */}
          <h2 className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tight uppercase text-3d-white mb-2 leading-none">
            ONE LAST THING.
          </h2>

          {/* Cursive Subtitle (Screenshot 10) */}
          <p className="font-serifDisplay italic text-2xl sm:text-4xl text-zinc-300 max-w-xl mb-4">
            Your next creative developer might be right here.
          </p>

          <span className="font-mono text-sm sm:text-base font-bold tracking-widest text-zinc-400 uppercase mb-8">
            {personalInfo.name} — PYTHON FULL STACK DEVELOPER
          </span>

          {/* Big Interactive Launch Button */}
          <button
            onClick={() => {
              if (onClose) onClose(false); // toggle
              // Trigger modal open
              const ev = new CustomEvent('open-contact-modal');
              window.dispatchEvent(ev);
            }}
            className="px-8 py-4 rounded-full bg-cyber-yellow text-obsidian-950 font-display font-black text-lg tracking-wider uppercase hover:bg-white transition-all duration-300 shadow-glow-yellow flex items-center gap-3 active:scale-95 group"
          >
            <Sparkles className="w-5 h-5 text-obsidian-950 group-hover:rotate-12 transition-transform" />
            <span>LET'S BUILD SOMETHING GREAT</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* SECTION 2: Full Screen Contact Drawer & Modal (Screenshot 11) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl bg-obsidian-900 border border-white/20 rounded-3xl p-6 sm:p-10 text-white shadow-2xl my-auto max-h-[95vh] overflow-y-auto"
            >
              {/* Header Bar: Chapter 05 & Close Pill (Screenshot 11) */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
                <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
                  <span className="px-2.5 py-0.5 rounded bg-white/10 text-cyber-yellow font-bold uppercase">
                    CH. 05 — YOU PULLED
                  </span>
                  <span>•</span>
                  <span>COMMUNICATION CHANNEL</span>
                </div>

                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 font-mono text-xs font-bold text-white transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <span>CLOSE</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Grid Layout: Left Bio & Quick Links, Right Contact Form (Screenshot 11) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Column (Screenshot 11) */}
                <div className="lg:col-span-6 flex flex-col items-start">
                  <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase mb-2">
                    ENOUGH ABOUT MY PORTFOLIO.
                  </span>

                  <h3 className="font-serifDisplay italic text-3xl sm:text-5xl text-white leading-tight mb-4">
                    Let's talk about what I can build for you.
                  </h3>

                  <div className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight mb-1">
                    {personalInfo.name}
                  </div>

                  <div className="font-mono text-xs text-cyber-yellow font-bold uppercase tracking-wider mb-4">
                    {personalInfo.role} // B.TECH ECE '25
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                    {personalInfo.description} Actively seeking entry-level opportunities in
                    Python Development, Backend Engineering, and Full Stack Architecture.
                  </p>

                  {/* Action Buttons Row (Screenshot 11) */}
                  <div className="flex flex-wrap gap-3 mb-6 w-full">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="px-5 py-2.5 rounded-full bg-[#FF5733] text-white font-mono text-xs font-bold hover:bg-[#ff6f4e] transition-colors flex items-center gap-1.5 shadow-glow-coral"
                    >
                      <span>LET'S TALK</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <a
                      href={personalInfo.resumeUrl}
                      download="Shaik_Sameer_Resume.pdf"
                      className="px-5 py-2.5 rounded-full bg-white text-obsidian-950 font-mono text-xs font-bold hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      <span>VIEW MY RÉSUMÉ</span>
                    </a>
                  </div>

                  {/* Interactive Copy Email Pill (Screenshot 11) */}
                  <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <Mail className="w-4 h-4 text-cyber-yellow shrink-0" />
                      <span className="font-mono text-xs sm:text-sm text-zinc-200 truncate">
                        {personalInfo.email}
                      </span>
                    </div>

                    <button
                      onClick={handleCopyEmail}
                      className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 font-mono text-xs text-white flex items-center gap-1 shrink-0 transition-colors"
                      title="Copy email to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-cyber-yellow" />
                          <span className="text-cyber-yellow font-bold">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Metrics Box (Screenshot 11) */}
                  <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="font-display font-black text-xl text-white block">
                        2025
                      </span>
                      <span className="text-[10px] text-zinc-400">MLRIT GRAD</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="font-display font-black text-xl text-cyber-yellow block">
                        3
                      </span>
                      <span className="text-[10px] text-zinc-400">SYSTEMS</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="font-display font-black text-xl text-white block">
                        1ST
                      </span>
                      <span className="text-[10px] text-zinc-400">ROBOTICS</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="font-display font-black text-xl text-cyber-yellow block">
                        85+
                      </span>
                      <span className="text-[10px] text-zinc-400">LED TEAM</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Direct Contact Form (Prompt 11) */}
                <div className="lg:col-span-6 bg-obsidian-950 p-6 sm:p-7 rounded-2xl border border-white/15">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-white mb-4">
                    <MessageSquare className="w-4 h-4 text-cyber-yellow" />
                    <span>SEND DIRECT MESSAGE</span>
                  </div>

                  {formSubmitted ? (
                    <div className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-cyber-yellow/10 border border-cyber-yellow text-cyber-yellow flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-display font-bold text-xl text-white">
                        Message Initialized!
                      </h4>
                      <p className="font-sans text-xs text-zinc-300">
                        Thank you for reaching out. Your default email client has been prepared with your message to{' '}
                        <strong className="text-cyber-yellow">{personalInfo.email}</strong>.
                      </p>
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormState({ name: '', email: '', subject: '', message: '' });
                        }}
                        className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white"
                      >
                        SEND ANOTHER NOTE
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-xs">
                      <div>
                        <label className="block font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-1.5">
                          YOUR NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-cyber-yellow transition-colors font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-1.5">
                          YOUR EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-cyber-yellow transition-colors font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-1.5">
                          SUBJECT *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.subject}
                          onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                          placeholder="Python Full Stack Role / Project Inquiry"
                          className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-cyber-yellow transition-colors font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-1.5">
                          MESSAGE *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          placeholder="Share the role requirements, project idea, or discussion topic..."
                          className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-cyber-yellow transition-colors font-sans resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formLoading}
                        className="w-full py-3 rounded-xl bg-cyber-yellow text-obsidian-950 font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-glow-yellow flex items-center justify-center gap-2 active:scale-98"
                      >
                        {formLoading ? (
                          <span>CONNECTING...</span>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>SUBMIT INQUIRY</span>
                          </>
                        )}
                      </button>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-zinc-400">
                        <a
                          href={personalInfo.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white flex items-center gap-1"
                        >
                          <Github className="w-3 h-3" />
                          <span>GITHUB ↗</span>
                        </a>

                        <a
                          href={personalInfo.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white flex items-center gap-1"
                        >
                          <Linkedin className="w-3 h-3 text-[#0077b5]" />
                          <span>LINKEDIN ↗</span>
                        </a>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
