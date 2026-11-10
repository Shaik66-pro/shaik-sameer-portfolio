import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import InteractiveEntrance from './components/InteractiveEntrance';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import StarBackground from './components/StarBackground';
import { getActiveResumeUrl } from './components/OwnerResumeManager';

export default function App() {
  const [showEntrance, setShowEntrance] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleOpenContact = () => setIsContactOpen(true);
    window.addEventListener('open-contact-modal', handleOpenContact);
    return () => window.removeEventListener('open-contact-modal', handleOpenContact);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08090B] text-white overflow-x-hidden selection:bg-[#D7FF00] selection:text-[#08090B]">
      {/* Night-sky star field — fixed, behind all content */}
      <StarBackground />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* 1. CINEMATIC INTERACTIVE 3D ENTRANCE (Ivory Theme, Centered GET HIRED, Hanging Thread, Cartoon Hand & Walking Sameer) */}
      {showEntrance && (
        <InteractiveEntrance onComplete={() => setShowEntrance(false)} />
      )}

      {/* Persistent Glass Navigation */}
      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        onReplayEntrance={() => setShowEntrance(true)}
      />

      {/* Chapter 01: The Subject / Focused Light Flashlight Hero (Balanced 2-Col Grid, No Overlap, Suit Photo) */}
      <Hero onOpenContact={() => setIsContactOpen(true)} />

      {/* Chapter 01: The About Archive / MLRIT Academics & Verified Record */}
      <About />

      {/* Chapter 02: Case Files / Seven Real-World Engineering Projects */}
      <Projects />

      {/* Chapter 03: The Toolkit / Primary Python & Categorized Skills */}
      <Skills />

      {/* Chapter 04: The Evidence / Polmon Instruments MES & Robotics Honors */}
      <Experience />

      {/* Chapter 04: Four Accredited Certifications */}
      <Certifications />

      {/* Chapter 05: One Last Thing & Contact Dossier Modal */}
      <Contact
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Minimalist HUD Footer */}
      <Footer />
    </div>
  );
}
