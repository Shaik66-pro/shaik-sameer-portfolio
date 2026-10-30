import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import InteractivePullTeaser from './components/InteractivePullTeaser';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleOpenContact = () => setIsContactOpen(true);
    window.addEventListener('open-contact-modal', handleOpenContact);
    return () => window.removeEventListener('open-contact-modal', handleOpenContact);
  }, []);

  const scrollToHero = () => {
    const element = document.getElementById('subject');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-obsidian-950 text-white overflow-x-hidden">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Persistent Glass Navigation */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Chapter 00: Interactive Pull Teaser (Screenshot 01: "PULL ME INTO your team.") */}
      <InteractivePullTeaser
        onTriggerContact={() => setIsContactOpen(true)}
        onScrollToHero={scrollToHero}
      />

      {/* Chapter 01: The Subject / Cinematic 3D Flashlight Hero (Screenshots 02 & 03) */}
      <Hero onOpenContact={() => setIsContactOpen(true)} />

      {/* Chapter 01: The About Archive / Curriculum (Screenshots 04 & 05) */}
      <About />

      {/* Chapter 02: Case Files / Frontend & Full Stack Systems (Screenshot 06) */}
      <Projects />

      {/* Chapter 03: The Toolkit / What I Build With (Screenshot 07) */}
      <Skills />

      {/* Chapter 04: The Evidence / Experience & Achievements (Screenshot 08) */}
      <Experience />

      {/* Chapter 04: Certifications Showcase (Screenshot 09) */}
      <Certifications />

      {/* Chapter 05: One Last Thing & Full Contact Drawer (Screenshots 10 & 11) */}
      <Contact
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
