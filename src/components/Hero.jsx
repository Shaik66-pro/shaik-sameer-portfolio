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
  ChevronRight,
  Flame,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onOpenContact }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Mouse flashlight tracking
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, clientX: 0, clientY: 0 });
  const [isHovering, setIsHovering] = useState(false);

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
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 35;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      // Yellow, white & cyan particles
      if (Math.random() > 0.6) {
        colors[i] = 0.89;
        colors[i + 1] = 1.0;
        colors[i + 2] = 0.1; // Cyber yellow
      } else {
        colors[i] = 0.7;
        colors[i + 1] = 0.75;
        colors[i + 2] = 0.85; // Muted white-silver
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

    // Floating 3D Geometric Objects (Wireframe Icosahedron & Ring)
    const icoGeo = new THREE.IcosahedronGeometry(3.5, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xe4ff1a,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(16, 4, -4);
    scene.add(icoMesh);

    const torusGeo = new THREE.TorusGeometry(2.8, 0.12, 16, 60);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xff3b30,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(-16, -6, -2);
    scene.add(torusMesh);

    // Animation loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      particleSystem.rotation.y = elapsed * 0.03;
      particleSystem.rotation.x = elapsed * 0.015;

      icoMesh.rotation.x = elapsed * 0.2;
      icoMesh.rotation.y = elapsed * 0.25;

      torusMesh.rotation.y = elapsed * 0.3;
      torusMesh.rotation.z = elapsed * 0.15;

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

  // Handle cursor movement for Torch / Flashlight mask
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y, clientX: e.clientX, clientY: e.clientY });
  };

  return (
    <section
      id="subject"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full min-h-screen bg-obsidian-950 text-white overflow-hidden flex flex-col justify-between pt-24 pb-12 select-none"
    >
      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Cyber Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none z-[1] opacity-70" />

      {/* Interactive Torch / Flashlight Radial Spotlight (Screenshot 03) */}
      <div
        className="absolute inset-0 pointer-events-none z-[2] transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 380px at ${mousePos.x}% ${mousePos.y}%, rgba(228, 255, 26, 0.12) 0%, rgba(10, 10, 12, 0.05) 50%, rgba(10, 10, 12, 0.85) 100%)`,
        }}
      />

      {/* Giant Wireframe Outline Typography in Background: "SHAIK" (Screenshot 03) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-[2] overflow-hidden opacity-25">
        <span className="font-display font-black text-[18vw] leading-none uppercase text-outline-giant tracking-tighter select-none">
          SHAIK
        </span>
      </div>

      {/* Top HUD Chapter Bar (Screenshot 03) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 font-mono text-[11px] tracking-widest text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold border border-white/20">
              A PORTFOLIO IN FIVE CHAPTERS
            </span>
            <span>—</span>
            <span className="text-zinc-500">EST. {personalInfo.establishedYear}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#FF3838]" />
            <span className="text-white font-bold tracking-wider uppercase">
              FIG. 01 — THE SUBJECT
            </span>
          </div>
        </div>
      </div>

      {/* Main Hero Body Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Identity, Primary Language, 3D Headline, Bio, Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Primary Language Callout with Curved Arrow & Torch Hint (Screenshot 03) */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="relative inline-flex items-center">
                {/* Yellow Highlighter Box */}
                <div className="px-3.5 py-1.5 bg-cyber-yellow text-obsidian-950 font-display font-black text-sm tracking-wider uppercase rounded shadow-glow-yellow flex items-center gap-1.5 transform -rotate-1">
                  <Terminal className="w-4 h-4 text-obsidian-950" />
                  <span>{personalInfo.primaryLanguage} — PRIMARY LANGUAGE</span>
                </div>

                {/* Curved Arrow pointer */}
                <svg
                  className="w-12 h-6 ml-2 text-cyber-yellow hidden sm:block"
                  viewBox="0 0 60 25"
                  fill="none"
                >
                  <path
                    d="M5 20 C25 25, 45 10, 55 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M45 4 L55 5 L53 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Torch Interactive Prompt */}
              <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-cyber-yellow animate-ping" />
                <span>MOVE THE TORCH. EXPLORE THE SUBJECT.</span>
              </div>
            </div>

            {/* Circular Metric Stamp: B.Tech ECE '25 (Screenshot 03) */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-red-500/90 flex flex-col items-center justify-center p-1 font-serifDisplay italic transform -rotate-6 shadow-glow-coral bg-black/40 backdrop-blur-sm">
                <span className="text-xl sm:text-2xl font-bold text-white leading-none">
                  2025
                </span>
                <span className="text-[9px] font-mono tracking-widest text-zinc-300 uppercase not-italic">
                  B.TECH ECE
                </span>
              </div>
              <div className="flex flex-col font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                <span className="text-white font-bold">MLR INSTITUTE OF TECH</span>
                <span>HYDERABAD, TELANGANA</span>
              </div>
            </div>

            {/* Candidate Sub-Name */}
            <div className="font-mono text-xs sm:text-sm font-bold tracking-widest text-zinc-300 uppercase mb-1">
              DASARI / SHAIK // {personalInfo.name}
            </div>

            {/* Massive Extruded 3D Display Title: "SAMEER" (Screenshot 03) */}
            <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter leading-none uppercase text-white text-3d-white mb-4">
              {personalInfo.firstName}
            </h1>

            {/* Headline & Description from Prompt 4 */}
            <h2 className="font-serifDisplay italic text-2xl sm:text-3xl lg:text-4xl text-zinc-100 max-w-2xl leading-tight mb-3">
              "{personalInfo.headline}"
            </h2>

            <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed mb-8">
              {personalInfo.description}
            </p>

            {/* Action Buttons & Links (Prompt 4) */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-full bg-cyber-yellow text-obsidian-950 font-bold tracking-wider hover:bg-white transition-all duration-300 flex items-center gap-2 shadow-glow-yellow active:scale-95 group"
              >
                <span>VIEW MY PROJECTS</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={personalInfo.resumeUrl}
                download="Shaik_Sameer_Resume.pdf"
                className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium tracking-wider transition-all duration-300 flex items-center gap-2 active:scale-95"
              >
                <Download className="w-4 h-4 text-cyber-yellow" />
                <span>DOWNLOAD RÉSUMÉ</span>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-zinc-300 hover:text-white transition-all"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-zinc-300 hover:text-white transition-all"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-[#0077b5]" />
              </a>
            </div>
          </div>

          {/* Right Column: Stylized Portrait with Angled Cyber-Yellow Plate & HUD Labels (Screenshot 03) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-md">
              {/* Angled Cyber Yellow Polygonal Plate Backdrop (Screenshot 03) */}
              <div
                className="absolute inset-0 bg-cyber-yellow rounded-2xl transform rotate-3 sm:rotate-6 scale-95 opacity-90 shadow-glow-yellow"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
                }}
              />

              {/* Portrait Image Container */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 bg-obsidian-900 shadow-2xl z-10 aspect-[4/5]">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                />

                {/* Cyber Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />

                {/* Corner Technical Crosshairs */}
                <div className="absolute top-3 left-3 font-mono text-[10px] text-cyber-yellow bg-black/60 px-2 py-0.5 rounded border border-cyber-yellow/40 backdrop-blur-sm">
                  SYS // SUBJECT 01
                </div>

                <div className="absolute top-3 right-3 font-mono text-[10px] text-white/80 bg-black/60 px-2 py-0.5 rounded border border-white/20 backdrop-blur-sm">
                  {personalInfo.location.split(',')[0]}
                </div>

                {/* Bottom Card Bio Badges */}
                <div className="absolute bottom-4 inset-x-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono bg-obsidian-950/85 backdrop-blur-md p-2.5 rounded-lg border border-white/15">
                    <div className="flex items-center gap-1.5 text-cyber-yellow font-bold">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>1ST PLACE ROBOTICS</span>
                    </div>
                    <span className="text-zinc-400 text-[10px]">SNIST NATIONAL</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono bg-obsidian-950/85 backdrop-blur-md p-2.5 rounded-lg border border-white/15">
                    <div className="flex items-center gap-1.5 text-zinc-200">
                      <Code2 className="w-3.5 h-3.5 text-cyber-yellow" />
                      <span>AUTOMATION TRAINEE</span>
                    </div>
                    <span className="text-zinc-400 text-[10px]">POLMON MES</span>
                  </div>
                </div>
              </div>

              {/* Floating Monospace HUD Callout */}
              <div className="absolute -bottom-6 -left-6 z-20 hidden sm:flex items-center gap-2 bg-black/90 border border-cyber-yellow/60 px-3.5 py-2 rounded-md font-mono text-[11px] text-zinc-300 shadow-xl backdrop-blur-md">
                <Flame className="w-3.5 h-3.5 text-cyber-yellow animate-pulse" />
                <span>PYTHON FIRST, SCALABLE SYSTEMS ALWAYS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ticker / Transition Marker */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between font-mono text-xs text-zinc-500 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-400">STATUS: OPEN FOR OPPORTUNITIES</span>
          </div>

          <a
            href="#about"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-cyber-yellow transition-colors"
          >
            <span>SCROLL TO CHAPTER 01</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
