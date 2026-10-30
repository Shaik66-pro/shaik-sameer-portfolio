import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Terminal,
  Sparkles,
  MapPin,
  Trophy,
  Code2,
  GraduationCap,
  Lightbulb,
  Crosshair,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onOpenContact }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Focused Flashlight / Torchlight cursor tracking
  const [flashlight, setFlashlight] = useState({
    x: 50,
    y: 40,
    clientX: 0,
    clientY: 0,
    active: true,
  });
  const [flashlightEnabled, setFlashlightEnabled] = useState(true);

  // Three.js 3D Background setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Stars / Code Nodes
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 55;
      positions[i + 1] = (Math.random() - 0.5) * 40;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      if (Math.random() > 0.6) {
        colors[i] = 0.84;
        colors[i + 1] = 1.0;
        colors[i + 2] = 0.0; // Neon lime #D7FF00
      } else {
        colors[i] = 0.65;
        colors[i + 1] = 0.68;
        colors[i + 2] = 0.75; // Tech silver
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const particleSystem = new THREE.Points(geometry, pMaterial);
    scene.add(particleSystem);

    // Floating 3D Wireframe Geometries
    const icoGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xd7ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(16, 5, -5);
    scene.add(icoMesh);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      particleSystem.rotation.y = elapsed * 0.025;
      particleSystem.rotation.x = elapsed * 0.012;
      icoMesh.rotation.x = elapsed * 0.18;
      icoMesh.rotation.y = elapsed * 0.22;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Track cursor movement for the Focused Flashlight beam
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setFlashlight({
      x,
      y,
      clientX: e.clientX,
      clientY: e.clientY,
      active: true,
    });
  };

  return (
    <section
      id="subject"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#08090B] text-white overflow-hidden flex flex-col justify-between pt-24 pb-12 select-none"
    >
      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none z-[1] opacity-40" />

      {/* FOCUSED LIGHT EFFECT (User Requirement: "the whole concept should runs on a focused light from the cursor") */}
      {flashlightEnabled && (
        <div
          className="absolute inset-0 pointer-events-none z-[2] transition-all duration-75"
          style={{
            background: `radial-gradient(circle 320px at ${flashlight.x}% ${flashlight.y}%, rgba(215, 255, 0, 0.16) 0%, rgba(8, 9, 11, 0.25) 55%, rgba(8, 9, 11, 0.88) 100%)`,
          }}
        />
      )}

      {/* Giant Wireframe Outline Typography in Background: "SHAIK" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-[2] overflow-hidden opacity-15">
        <span className="font-display font-black text-[18vw] leading-none uppercase text-outline-giant tracking-tighter select-none">
          SHAIK
        </span>
      </div>

      {/* Top HUD Chapter Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#292D32] pb-3 font-mono text-[11px] tracking-widest text-[#A5A7AE]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-white/10 text-white font-bold border border-white/15">
              CHAPTER 01
            </span>
            <span>—</span>
            <span className="text-[#D7FF00] font-bold">FIG. 01 // THE SUBJECT</span>
          </div>

          {/* Flashlight Mode Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFlashlightEnabled(!flashlightEnabled)}
              className="px-3 py-1 rounded-full bg-[#111317] border border-[#292D32] hover:border-[#D7FF00] text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors"
            >
              <Lightbulb className={`w-3.5 h-3.5 ${flashlightEnabled ? 'text-[#D7FF00]' : 'text-zinc-500'}`} />
              <span>{flashlightEnabled ? 'FOCUSED LIGHT: ON' : 'FULL BRIGHTNESS'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* BALANCED TWO-COLUMN HERO GRID (Fixes the "SAMEER" heading and image overlap) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Headings, Objective, Badges & Actions (Dedicated Col Span 7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left pr-0 lg:pr-4">
            
            {/* Primary Language Callout & Focused Light Prompt */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-[#D7FF00] text-[#08090B] font-display font-black text-xs sm:text-sm tracking-wider uppercase rounded shadow-glow-yellow flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#08090B]" />
                <span>{personalInfo.primaryLanguage} — PRIMARY LANGUAGE</span>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#A5A7AE] bg-[#111317] border border-[#292D32] px-3 py-1 rounded-full">
                <Crosshair className="w-3 h-3 text-[#D7FF00]" />
                <span>FOCUSED CURSOR SPOTLIGHT ACTIVE</span>
              </div>
            </div>

            {/* Candidate Formal Name */}
            <div className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#A5A7AE] uppercase mb-1">
              SHAIK SAMEER // B.TECH ECE 2025
            </div>

            {/* Large 3D Display Title: "SAMEER" (Clean layout with zero overlap) */}
            <div className="w-full overflow-visible mb-3">
              <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tight leading-none uppercase text-white text-3d-white">
                {personalInfo.firstName}
              </h1>
            </div>

            {/* Professional Role & Objective (Section 2 Prompt) */}
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#D7FF00] tracking-wide uppercase mb-3">
              {personalInfo.role}
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#F5F5F5] font-medium max-w-xl leading-relaxed mb-6 bg-[#111317]/60 p-4 rounded-xl border border-[#292D32] backdrop-blur-sm">
              "{personalInfo.careerObjective}"
            </p>

            {/* Verified Education & Metric Quick Badges */}
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-[#A5A7AE] mb-8">
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

            {/* Action Buttons & Links */}
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

          {/* RIGHT COLUMN: Dedicated Portrait Card (Col Span 5 - Guaranteed Zero Overlap) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Clean Cyber Neon Border Container (No arbitrary overflowing coordinates) */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#292D32] hover:border-[#D7FF00]/80 bg-[#111317] shadow-2xl transition-all duration-500 aspect-[3/4] sm:aspect-[4/5] group">
                
                {/* User's Uploaded Portrait Photo in Suit */}
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-102 transition-transform duration-700"
                />

                {/* Subtle Bottom Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-85" />

                {/* Corner Technical Crosshairs */}
                <div className="absolute top-3 left-3 font-mono text-[10px] text-[#D7FF00] bg-[#08090B]/85 px-2.5 py-1 rounded border border-[#292D32] backdrop-blur-md">
                  ID // SHAIK SAMEER
                </div>

                <div className="absolute top-3 right-3 font-mono text-[10px] text-zinc-300 bg-[#08090B]/85 px-2.5 py-1 rounded border border-[#292D32] backdrop-blur-md">
                  HYDERABAD, IN
                </div>

                {/* Bottom Card Credentials */}
                <div className="absolute bottom-4 inset-x-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono bg-[#08090B]/90 backdrop-blur-md p-2.5 rounded-xl border border-[#292D32]">
                    <div className="flex items-center gap-1.5 text-[#D7FF00] font-bold">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>1ST PLACE ROBOTICS</span>
                    </div>
                    <span className="text-[#A5A7AE] text-[10px]">SNIST & IBS</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono bg-[#08090B]/90 backdrop-blur-md p-2.5 rounded-xl border border-[#292D32]">
                    <div className="flex items-center gap-1.5 text-white">
                      <Code2 className="w-3.5 h-3.5 text-[#D7FF00]" />
                      <span>POLMON INSTRUMENTS</span>
                    </div>
                    <span className="text-[#A5A7AE] text-[10px]">MES AUTOMATION</span>
                  </div>
                </div>
              </div>

              {/* Floating Monospace Status Badge */}
              <div className="mt-3 flex items-center justify-between font-mono text-xs text-[#A5A7AE] px-2">
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

      {/* Bottom Ticker / Transition Marker */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between font-mono text-xs text-[#A5A7AE] border-t border-[#292D32] pt-4">
          <div className="flex items-center gap-2">
            <span>ENGINEERING FOCUS: FASTAPI // FLASK // REACT // MYSQL</span>
          </div>

          <a
            href="#projects"
            className="flex items-center gap-1.5 text-[#A5A7AE] hover:text-[#D7FF00] transition-colors"
          >
            <span>EXPLORE 7 CASE FILES</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
