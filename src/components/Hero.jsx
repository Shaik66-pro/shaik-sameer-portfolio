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
import { getActiveResumeUrl } from './OwnerResumeManager';

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

    // Floating wireframe ico — dynamically positioned based on screen width
    const isMobile = window.innerWidth < 768;
    const icoGeo = new THREE.IcosahedronGeometry(isMobile ? 2.0 : 2.8, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color: 0xd7ff00, wireframe: true, transparent: true, opacity: 0.28 });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(isMobile ? 3.5 : 8, isMobile ? 1.5 : 2, -2);
    scene.add(icoMesh);

    // Second smaller orb for depth
    const icoGeo2 = new THREE.IcosahedronGeometry(isMobile ? 1.0 : 1.4, 1);
    const icoMat2 = new THREE.MeshBasicMaterial({ color: 0xd7ff00, wireframe: true, transparent: true, opacity: 0.14 });
    const icoMesh2 = new THREE.Mesh(icoGeo2, icoMat2);
    icoMesh2.position.set(isMobile ? -3.5 : 11, isMobile ? -3.5 : -3, -4);
    scene.add(icoMesh2);

    let animId;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      particleSystem.rotation.y = t * 0.025;
      particleSystem.rotation.x = t * 0.012;
      // Main orb: gentle float — bob up/down slowly
      icoMesh.rotation.x = t * 0.14;
      icoMesh.rotation.y = t * 0.18;
      icoMesh.position.y = (window.innerWidth < 768 ? 1.5 : 2) + Math.sin(t * 0.6) * 0.5;
      // Small orb: counter-rotate
      icoMesh2.rotation.x = t * 0.22;
      icoMesh2.rotation.z = t * 0.16;
      icoMesh2.position.y = (window.innerWidth < 768 ? -3.5 : -3) + Math.sin(t * 0.9 + 1.2) * 0.35;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      const mobile = w < 768;
      icoMesh.position.x = mobile ? 3.5 : 8;
      icoMesh2.position.x = mobile ? -3.5 : 11;
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
      className="relative w-full min-h-screen bg-[#08090B] text-white overflow-x-hidden flex flex-col justify-between pt-10 pb-12 select-none"
    >
      {/* WebGL canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      {/* Cyber grid */}
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none z-[1] opacity-40" />
      {/* Ghost BG "SHAIK" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-full text-center pointer-events-none z-[2] overflow-hidden opacity-[0.06] select-none">
        <span className="font-display font-black text-[clamp(4rem,16vw,14rem)] leading-none uppercase text-outline-giant tracking-tighter block">SHAIK</span>
      </div>

      {/* Top HUD Chapter Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#292D32] pb-3 font-mono text-[10px] sm:text-[11px] tracking-widest text-[#A5A7AE]">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="px-2 sm:px-2.5 py-0.5 rounded bg-white/10 text-white font-bold border border-white/15">CHAPTER 01</span>
            <span>—</span>
            <span className="text-[#D7FF00] font-bold">FIG. 01 // THE SUBJECT</span>
          </div>
          <span className="hidden sm:inline text-zinc-500">ID // VERIFIED CANDIDATE</span>
        </div>
      </div>

      {/* ── HERO GRID ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-12 items-center">

          {/* ── LEFT COLUMN — Text Content ─────────────────────────────── */}
          <div className="flex flex-col items-start text-left min-w-0 w-full">

            {/* Primary language badge */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="px-2.5 sm:px-3 py-1 bg-[#D7FF00] text-[#08090B] font-display font-black text-[11px] sm:text-xs tracking-wider uppercase rounded shadow-glow-yellow flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#08090B]" />
                <span>{personalInfo.primaryLanguage} — PRIMARY LANGUAGE</span>
              </div>
            </div>

            {/* Formal name subtitle */}
            <div className="font-mono text-[11px] sm:text-xs md:text-sm font-bold tracking-widest text-[#A5A7AE] uppercase mb-1">
              SHAIK SAMEER // B.TECH ECE 2025
            </div>

            {/* ── SAMEER heading (100% responsive, never cut off on any screen) ── */}
            <div className="w-full overflow-hidden mb-2 sm:mb-3">
              <h1
                className="font-display font-black leading-none uppercase text-white text-3d-white tracking-tight"
                style={{
                  fontSize: 'clamp(2.3rem, 9.5vw, 5.4rem)',
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap',
                  display: 'block',
                  maxWidth: '100%',
                }}
              >
                {personalInfo.firstName}
              </h1>
            </div>

            {/* Role */}
            <h2 className="font-display font-bold text-base sm:text-xl md:text-2xl text-[#D7FF00] tracking-wide uppercase mb-3">
              {personalInfo.role}
            </h2>

            {/* Career objective */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-[#F5F5F5] font-medium max-w-xl leading-relaxed mb-4 sm:mb-5 bg-[#111317]/70 p-3 sm:p-4 rounded-xl border border-[#292D32] backdrop-blur-sm">
              "{personalInfo.careerObjective}"
            </p>

            {/* Education badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 font-mono text-[11px] sm:text-xs text-[#A5A7AE] mb-6 sm:mb-7 w-full">
              <span className="px-2.5 sm:px-3 py-1 rounded-md bg-[#111317] border border-[#292D32] flex items-center gap-1.5 text-white">
                <GraduationCap className="w-3.5 h-3.5 text-[#D7FF00]" />
                <span>{personalInfo.college}</span>
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-md bg-[#111317] border border-[#292D32] text-white">
                CGPA: <strong className="text-[#D7FF00]">{personalInfo.cgpa}</strong>
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-md bg-[#111317] border border-[#292D32] text-white">
                BATCH: <strong>{personalInfo.timeline}</strong>
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 font-mono text-xs w-full">
              <a
                href="#projects"
                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#D7FF00] text-[#08090B] font-bold tracking-wider hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-glow-yellow active:scale-95 group text-center"
              >
                <span>VIEW MY PROJECTS</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={getActiveResumeUrl()}
                download="Shaik_Sameer_Resume.pdf"
                className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-[#111317] hover:bg-white/10 border border-[#292D32] hover:border-white/40 text-white font-medium tracking-wider transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 text-center"
              >
                <Download className="w-4 h-4 text-[#D7FF00]" />
                <span>DOWNLOAD RÉSUMÉ</span>
              </a>

              <div className="flex items-center gap-2.5 mt-1 sm:mt-0">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-3.5 rounded-full bg-[#111317] hover:bg-white/10 border border-[#292D32] text-[#A5A7AE] hover:text-white transition-all"
                  title="Shaik Sameer GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-3.5 rounded-full bg-[#111317] hover:bg-white/10 border border-[#292D32] text-[#A5A7AE] hover:text-[#0077b5] transition-all"
                  title="Shaik Sameer LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Portrait card ──────────────────────────── */}
          <div className="flex justify-center lg:justify-end w-full mt-4 lg:mt-0">
            <div className="relative w-full max-w-[270px] xs:max-w-[300px] sm:max-w-[320px] lg:max-w-[340px]">
              <div
                className="relative rounded-2xl overflow-hidden border-2 border-[#292D32] hover:border-[#D7FF00]/80 bg-[#111317] shadow-2xl transition-all duration-500 group"
                style={{ aspectRatio: '4/5' }}
              >
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-102 transition-transform duration-700"
                />
                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/60 via-transparent to-transparent" />
                {/* Corner labels */}
                <div className="absolute top-2.5 left-2.5 font-mono text-[9px] sm:text-[10px] text-[#D7FF00] bg-[#08090B]/85 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-[#292D32] backdrop-blur-md">
                  ID // SHAIK SAMEER
                </div>
                <div className="absolute top-2.5 right-2.5 font-mono text-[9px] sm:text-[10px] text-zinc-300 bg-[#08090B]/85 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-[#292D32] backdrop-blur-md">
                  HYDERABAD, IN
                </div>
              </div>

              {/* Status line */}
              <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] sm:text-xs text-[#A5A7AE] px-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>READY FOR NEW ROLES</span>
                </span>
                <span className="text-[#D7FF00]">PYTHON DEVELOPER</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom ticker */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[11px] sm:text-xs text-[#A5A7AE] border-t border-[#292D32] pt-3 sm:pt-4">
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
