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
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { getActiveResumeUrl } from './OwnerResumeManager';

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

    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);

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
      {/* Closing Teaser Section (Chapter 05) */}
      <section id="contact-trigger" className="relative w-full bg-[#08090B] text-white py-24 sm:py-32 border-t border-[#292D32] overflow-hidden select-none">
        <div className="absolute inset-0 bg-grid-cyber opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#D7FF00] bg-[#D7FF00]/10 border border-[#D7FF00]/30 px-3 py-1 rounded-full uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CHAPTER 05 // FINAL INVITATION</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase text-3d-white mb-2 leading-none">
            ONE LAST THING.
          </h2>

          <p className="font-serifDisplay italic text-xl sm:text-3xl md:text-4xl text-zinc-300 max-w-xl mb-4">
            "Have an Idea? Let's Build Something Great Together."
          </p>

          <span className="font-mono text-sm sm:text-base font-bold tracking-widest text-[#A5A7AE] uppercase mb-8">
            {personalInfo.name} — {personalInfo.role}
          </span>

          <button
            onClick={() => {
              const ev = new CustomEvent('open-contact-modal');
              window.dispatchEvent(ev);
            }}
            className="px-8 py-4 rounded-full bg-[#D7FF00] text-[#08090B] font-display font-black text-base sm:text-lg tracking-wider uppercase hover:bg-white transition-all duration-300 shadow-glow-yellow flex items-center gap-3 active:scale-95 group"
          >
            <Sparkles className="w-5 h-5 text-[#08090B] group-hover:rotate-12 transition-transform" />
            <span>LET'S TALK OPPORTUNITIES</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl bg-[#111317] border border-[#292D32] rounded-3xl p-6 sm:p-10 text-white shadow-2xl my-auto max-h-[95vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#292D32] pb-5 mb-8">
                <div className="flex items-center gap-3 font-mono text-xs text-[#A5A7AE]">
                  <span className="px-2.5 py-0.5 rounded bg-[#D7FF00]/15 text-[#D7FF00] font-bold uppercase">
                    COMMUNICATION CHANNEL
                  </span>
                  <span>•</span>
                  <span>HYDERABAD, TELANGANA</span>
                </div>

                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-[#292D32] font-mono text-xs font-bold text-white transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <span>CLOSE</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left Column */}
                <div className="lg:col-span-6 flex flex-col items-start">
                  <span className="font-mono text-xs tracking-widest text-[#A5A7AE] uppercase mb-2">
                    OPEN FOR FULL-TIME ROLES
                  </span>

                  <h3 className="font-serifDisplay italic text-3xl sm:text-5xl text-white leading-tight mb-4">
                    Let's talk about what I can build for your team.
                  </h3>

                  <div className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight mb-1">
                    {personalInfo.name}
                  </div>

                  <div className="font-mono text-xs text-[#D7FF00] font-bold uppercase tracking-wider mb-4">
                    {personalInfo.role} // MLRIT '25
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                    I am actively looking for entry-level opportunities in Python Development, Backend
                    Development and Full Stack Development. I am excited to contribute, learn and build impactful software solutions.
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mb-6 w-full">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="px-5 py-2.5 rounded-full bg-[#D7FF00] text-[#08090B] font-mono text-xs font-bold hover:bg-white transition-colors flex items-center gap-1.5 shadow-glow-yellow"
                    >
                      <span>SEND AN EMAIL</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <a
                      href={getActiveResumeUrl()}
                      download="Shaik_Sameer_Resume.pdf"
                      className="px-5 py-2.5 rounded-full bg-white text-[#08090B] font-mono text-xs font-bold hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      <span>VIEW RÉSUMÉ</span>
                    </a>
                  </div>

                  {/* Email Copy Pill */}
                  <div className="w-full bg-[#08090B] border border-[#292D32] rounded-2xl p-4 flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <Mail className="w-4 h-4 text-[#D7FF00] shrink-0" />
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
                          <Check className="w-3.5 h-3.5 text-[#D7FF00]" />
                          <span className="text-[#D7FF00] font-bold">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Metrics Box */}
                  <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
                    <div className="bg-[#08090B] p-3 rounded-xl border border-[#292D32]">
                      <span className="font-display font-black text-xl text-white block">2025</span>
                      <span className="text-[10px] text-[#A5A7AE]">MLRIT ECE</span>
                    </div>
                    <div className="bg-[#08090B] p-3 rounded-xl border border-[#292D32]">
                      <span className="font-display font-black text-xl text-[#D7FF00] block">6.68</span>
                      <span className="text-[10px] text-[#A5A7AE]">CGPA</span>
                    </div>
                    <div className="bg-[#08090B] p-3 rounded-xl border border-[#292D32]">
                      <span className="font-display font-black text-xl text-white block">1ST</span>
                      <span className="text-[10px] text-[#A5A7AE]">ROBOTICS</span>
                    </div>
                    <div className="bg-[#08090B] p-3 rounded-xl border border-[#292D32]">
                      <span className="font-display font-black text-xl text-[#D7FF00] block">7</span>
                      <span className="text-[10px] text-[#A5A7AE]">SYSTEMS</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Direct Message Form */}
                <div className="lg:col-span-6 bg-[#08090B] p-6 sm:p-7 rounded-2xl border border-[#292D32]">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-white mb-4">
                    <MessageSquare className="w-4 h-4 text-[#D7FF00]" />
                    <span>DIRECT INQUIRY</span>
                  </div>

                  {formSubmitted ? (
                    <div className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-[#D7FF00]/10 border border-[#D7FF00] text-[#D7FF00] flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-display font-bold text-xl text-white">
                        Inquiry Prepared!
                      </h4>
                      <p className="font-sans text-xs text-zinc-300">
                        Your default email client has been prepared with your message directed to{' '}
                        <strong className="text-[#D7FF00]">{personalInfo.email}</strong>.
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
                        <label className="block font-mono text-[11px] text-[#A5A7AE] uppercase tracking-wider mb-1.5">
                          YOUR NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="e.g. Recruiter / Engineering Manager"
                          className="w-full bg-[#111317] border border-[#292D32] rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#D7FF00] transition-colors font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] text-[#A5A7AE] uppercase tracking-wider mb-1.5">
                          YOUR EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="recruiter@company.com"
                          className="w-full bg-[#111317] border border-[#292D32] rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#D7FF00] transition-colors font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] text-[#A5A7AE] uppercase tracking-wider mb-1.5">
                          SUBJECT *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.subject}
                          onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                          placeholder="Python Full Stack Opportunity at [Company]"
                          className="w-full bg-[#111317] border border-[#292D32] rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#D7FF00] transition-colors font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] text-[#A5A7AE] uppercase tracking-wider mb-1.5">
                          MESSAGE *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          placeholder="Share the role requirements, team details, or project description..."
                          className="w-full bg-[#111317] border border-[#292D32] rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#D7FF00] transition-colors font-sans resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formLoading}
                        className="w-full py-3 rounded-xl bg-[#D7FF00] text-[#08090B] font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-glow-yellow flex items-center justify-center gap-2 active:scale-98"
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

                      <div className="pt-3 border-t border-[#292D32] flex items-center justify-between font-mono text-[11px] text-[#A5A7AE]">
                        <a
                          href={personalInfo.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white flex items-center gap-1"
                        >
                          <Github className="w-3 h-3" />
                          <span>GITHUB PROFILE ↗</span>
                        </a>

                        <a
                          href={personalInfo.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white flex items-center gap-1"
                        >
                          <Linkedin className="w-3 h-3 text-[#0077b5]" />
                          <span>LINKEDIN PROFILE ↗</span>
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
