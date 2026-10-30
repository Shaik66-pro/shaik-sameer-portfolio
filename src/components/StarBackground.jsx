import React, { useEffect, useRef } from 'react';

/**
 * StarBackground — Lightweight CSS-canvas star field.
 * Fixed behind all content, pointer-events: none.
 * Respects prefers-reduced-motion.
 */
export default function StarBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Stars config
    const STAR_COUNT = 180;
    let stars = [];
    let animId;
    let W = window.innerWidth;
    let H = window.innerHeight;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      buildStars();
    }

    function buildStars() {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.6 + 0.4,            // 0.4 – 2 px
        baseAlpha: Math.random() * 0.55 + 0.25,   // 0.25 – 0.8
        alpha: 0,
        speed: Math.random() * 0.008 + 0.004,     // twinkle speed
        phase: Math.random() * Math.PI * 2,       // random phase offset
        // ~30% are lime-tinted, rest are silver/white
        color: Math.random() > 0.7 ? '215,255,0' : '165,170,185',
      }));
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);

      stars.forEach((s) => {
        // Animate twinkle via sin wave
        s.alpha = s.baseAlpha * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${s.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    function drawStatic() {
      // No animation — just paint once
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${s.baseAlpha})`;
        ctx.fill();
      });
    }

    resize();
    window.addEventListener('resize', resize);

    if (prefersReduced) {
      drawStatic();
    } else {
      animId = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
