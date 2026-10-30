import React from 'react';
import {
  Award,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';
import { certificationsData } from '../data/portfolioData';

export default function Certifications() {
  return (
    <section id="certifications" className="relative w-full bg-[#08090B] text-white py-20 overflow-hidden border-t border-[#292D32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase text-[#D7FF00] mb-2">
              <Award className="w-4 h-4" />
              <span>ACCREDITATIONS & VERIFICATIONS</span>
            </div>
            <h2 className="font-serifDisplay italic text-5xl sm:text-6xl text-white tracking-tight leading-none">
              Certifications
            </h2>
          </div>

          <div className="font-mono text-xs text-[#A5A7AE]">
            <span>FOUR ACCREDITED CREDENTIALS</span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#111317] text-white rounded-2xl border border-[#292D32] p-6 flex flex-col justify-between hover:border-[#D7FF00]/50 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded bg-[#D7FF00]/15 text-[#D7FF00] border border-[#D7FF00]/30 font-mono text-[10px] font-bold uppercase">
                    {cert.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    VERIFIED
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white leading-snug mb-1">
                  {cert.title}
                </h3>

                <div className="font-mono text-xs text-[#D7FF00] mb-3">
                  {cert.issuer} {cert.year !== 'Industrial' && cert.year !== 'Robotics' ? `• ${cert.year}` : ''}
                </div>

                <p className="font-sans text-xs text-[#A5A7AE] leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#292D32] mt-6 flex items-center justify-between font-mono text-[11px] text-[#A5A7AE]">
                <span>TAG // {cert.tag}</span>
                <FileCheck className="w-4 h-4 text-[#D7FF00]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
