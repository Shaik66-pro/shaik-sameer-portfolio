import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  CheckCircle,
  FileCheck,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { certificationsData } from '../data/portfolioData';

export default function Certifications() {
  const [filter, setFilter] = useState('ALL');

  const filterOptions = ['ALL', 'INFOSYS', 'SNIT', 'IBS', 'PROLEIT'];

  const filteredCerts =
    filter === 'ALL'
      ? certificationsData
      : certificationsData.filter((c) => c.tag === filter);

  return (
    <section id="certifications" className="relative w-full bg-[#E4FF1A] text-obsidian-950 pb-28 pt-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Stencil Title (Screenshot 09) */}
        <div className="border-t-2 border-black/20 pt-12 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase text-black mb-2">
              <Award className="w-4 h-4 text-black" />
              <span>ACCREDITATION & QUALIFICATIONS</span>
            </div>
            {/* Stencil / Calligraphic Header matching Screenshot 09 */}
            <h2 className="font-serifDisplay italic text-5xl sm:text-7xl text-black tracking-tight leading-none">
              Certifications
            </h2>
          </div>

          {/* Filter Pills (Screenshot 09) */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-3.5 py-1.5 rounded-lg border-2 border-black font-bold uppercase transition-all duration-200 ${
                  filter === opt
                    ? 'bg-black text-cyber-yellow shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white/70 text-black hover:bg-white'
                }`}
              >
                {opt === 'ALL' ? 'SEE ALL' : opt}
              </button>
            ))}
          </div>
        </div>

        {/* Certification Cards Grid (Screenshot 09) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-obsidian-950 text-white rounded-2xl border-2 border-black p-6 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded bg-cyber-yellow/15 text-cyber-yellow border border-cyber-yellow/30 font-mono text-[10px] font-bold uppercase">
                      {cert.category}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      VERIFIED
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white leading-snug mb-2">
                    {cert.title}
                  </h3>

                  <div className="font-mono text-xs text-cyber-yellow mb-4">
                    {cert.issuer}
                  </div>

                  <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 mt-6 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                  <span>TAG // {cert.tag}</span>
                  <FileCheck className="w-4 h-4 text-cyber-yellow" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
