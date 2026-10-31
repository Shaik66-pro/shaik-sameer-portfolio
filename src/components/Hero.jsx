import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Terminal,
  GraduationCap,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onOpenContact }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Three.js 3D Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle system
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i]     = (Math.random() - 0.5) * 55;
      positions[i + 1] = (Math.random() - 0.5) * 40;
      positions[i + 2] = (Math.random() - 0.5) * 20;
      if (Math.random() > 0.6) {
        colors[i] = 0.84; colors[i + 1] = 1.0; colors[i + 2] = 0.0;
      } else {
        colors[i] = 0.65; colors[i + 1] = 0.68; colors[i + 2] = 0.75;
      }
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({ size: 0.16, vertexColors: true, transparent: true, opacity: 0.75 });
    const particleSystem = new THREE.Points(geometry, pMaterial);
    scene.add(particleSystem);

    // Floating wireframe ico
    const icoGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color: 0xd7ff00, wireframe: true, transparent: true, opacity: 0.22 });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(16, 5, -5);
    scene.add(icoMesh);

    let animId;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      particleSystem.rotation.y = t * 0.025;
      particleSystem.rotation.x = t * 0.012;
      icoMesh.rotation.x = t * 0.18;
      icoMesh.rotation.y = t * 0.22;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="subject"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#08090B] text-white overflow-hidden flex flex-col justify-between pt-24 pb-12 select-none"
    >
      {/* WebGL canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      {/* Cyber grid */}
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none z-[1] opacity-40" />
      {/* Ghost BG "SHAIK" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-[2] overflow-hidden opacity-[0.07]">
        <span className="font-display font-black text-[18vw] leading-none uppercase text-outline-giant tracking-tighter select-none">SHAIK</span>
      </div>

      {/* Top HUD Chapter Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#292D32] pb-3 font-mono text-[11px] tracking-widest text-[#A5A7AE]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-white/10 text-white font-bold border border-white/15">CHAPTER 01</span>
            <span>—</span>
            <span className="text-[#D7FF00] font-bold">FIG. 01 // THE SUBJECT</span>
          </div>
        </div>
      </div>

      {/* ── HERO GRID ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto">
        {/* On large screens: 6+6 split so SAMEER never overlaps the image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
          <div className="flex flex-col items-start text-left">

            {/* Primary language badge */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-[#D7FF00] text-[#08090B] font-display font-black text-xs sm:text-sm tracking-wider uppercase rounded shadow-glow-yellow flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#08090B]" />
                <span>{personalInfo.primaryLanguage} — PRIMARY LANGUAGE</span>
              </div>
            </div>

            {/* Formal name subtitle */}
            <div className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#A5A7AE] uppercase mb-1">
              SHAIK SAMEER // B.TECH ECE 2025
            </div>

            {/* ── SAMEER heading ──
                Key fixes:
                  • "overflow-visible" so the letters never get clipped
                  • fluid font: starts smaller, caps at ~9xl so it cannot overflow into image column
                  • "break-keep" keeps it on one line
                  • left column is now exactly 50% wide on lg screens
            */}
            <div className="w-full overflow-visible mb-3">
              <h1
                className="font-display font-black leading-none uppercase text-white text-3d-white tracking-tight"
                style={{
                  fontSize: 'clamp(3.8rem, 9vw, 8rem)',
                  wordBreak: 'keep-all',
                  whiteSpace: 'nowrap',
                }}
              >
                {personalInfo.firstName}
              </h1>
            </div>

            {/* Role */}
            <h2 className="font-display font-bold text-lg sm:text-2xl text-[#D7FF00] tracking-wide uppercase mb-3">
              {personalInfo.role}
            </h2>

            {/* Career objective */}
            <p className="font-sans text-sm sm:text-base text-[#F5F5F5] font-medium max-w-xl leading-relaxed mb-5 bg-[#111317]/60 p-4 rounded-xl border border-[#292D32] backdrop-blur-sm">
              "{personalInfo.careerObjective}"
            </p>

            {/* Education badges */}
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-[#A5A7AE] mb-7">
              <span className="px-3 py-1 rounded-md bg-[#111317] border border-[#292D32] flex items-center gap-1.5 text-white">
                <GraduationCap className="w-3.5 h-3.5 text-[#D7FF00]" />
                <span>{personalInfo.college}</span>
              </span>
              <span className="px-3 py-1 rounded-md bg-[#111317] border border-[#292D32] text-white">
                CGPA: <strong className="text-[#D7FF00]">{personalInfo.cgpa}</strong>
              </span>
              <span className="px-3 py-1 rounded-md bg-[#111317] border border-[#292D32] text-white">
                BATCH: <strong>{personalInfo.timeline}</strong>
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-full bg-[#D7FF00] text-[#08090B] font-bold tracking-wider hover:bg-white transition-all duration-300 flex items-center gap-2 shadow-glow-yellow active:scale-95 group"
              >
                <span>VIEW MY PROJECTS</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={personalInfo.resumeUrl}
                download="Shaik_Sameer_Resume.pdf"
                className="px-5 py-3.5 rounded-full bg-[#111317] hover:bg-white/10 border border-[#292D32] hover:border-white/40 text-white font-medium tracking-wider transition-all duration-300 flex items-center gap-2 active:scale-95"
              >
                <Download className="w-4 h-4 text-[#D7FF00]" />
                <span>DOWNLOAD RÉSUMÉ</span>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full bg-[#111317] hover:bg-white/10 border border-[#292D32] text-[#A5A7AE] hover:text-white transition-all"
                title="Shaik Sameer GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full bg-[#111317] hover:bg-white/10 border border-[#292D32] text-[#A5A7AE] hover:text-[#0077b5] transition-all"
                title="Shaik Sameer LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ── RIGHT COLUMN — portrait card ───────────────────────────── */}
          <div className="flex justify-center lg:justify-end w-full">
            {/* max-w capped so it doesn't bleed into left column */}
            <div className="relative w-full" style={{ maxWidth: '380px' }}>
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#292D32] hover:border-[#D7FF00]/80 bg-[#111317] shadow-2xl transition-all duration-500 group"
                   style={{ aspectRatio: '4/5' }}>
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-102 transition-transform duration-700"
                />
                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/60 via-transparent to-transparent" />
                {/* Corner labels */}
                <div className="absolute top-3 left-3 font-mono text-[10px] text-[#D7FF00] bg-[#08090B]/85 px-2.5 py-1 rounded border border-[#292D32] backdrop-blur-md">
                  ID // SHAIK SAMEER
                </div>
                <div className="absolute top-3 right-3 font-mono text-[10px] text-zinc-300 bg-[#08090B]/85 px-2.5 py-1 rounded border border-[#292D32] backdrop-blur-md">
                  HYDERABAD, IN
                </div>
              </div>

              {/* Status line */}
              <div className="mt-3 flex items-center justify-between font-mono text-xs text-[#A5A7AE] px-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>READY FOR NEW ROLES</span>
                </span>
                <span className="text-[#D7FF00]">PYTHON FULL STACK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom ticker */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between font-mono text-xs text-[#A5A7AE] border-t border-[#292D32] pt-4">
          <div className="flex items-center gap-2">
            <span>ENGINEERING FOCUS: FASTAPI // FLASK // DJANGO // REACT // MYSQL</span>
          </div>
          <a href="#projects" className="flex items-center gap-1.5 text-[#A5A7AE] hover:text-[#D7FF00] transition-colors">
            <span>EXPLORE 6 CASE FILES</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
