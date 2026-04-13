"use client";

import { useEffect, useRef, useState } from "react";

function rand(a: number, b: number) {
    return a + Math.random() * (b - a);
}

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        const particles: {
            x: number; y: number; size: number; speed: number;
            opacity: number; maxOp: number; life: number; maxLife: number; drift: number;
        }[] = [];

        function resize() {
            if (!canvas) return;
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        function draw() {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (Math.random() < 0.12) {
                particles.push({
                    x: rand(0, canvas.width),
                    y: canvas.height + 2,
                    size: rand(0.4, 1.6),
                    speed: rand(0.2, 0.9),
                    opacity: 0,
                    maxOp: rand(0.05, 0.16),
                    life: 0,
                    maxLife: rand(250, 600),
                    drift: rand(-0.2, 0.2),
                });
            }
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.life++; p.y -= p.speed; p.x += p.drift;
                const r = p.life / p.maxLife;
                p.opacity = r < 0.1 ? (r / 0.1) * p.maxOp : r > 0.85 ? ((1 - r) / 0.15) * p.maxOp : p.maxOp;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(166,138,63,${p.opacity})`;
                ctx.fill();
                if (p.life >= p.maxLife) particles.splice(i, 1);
            }
            animationId = requestAnimationFrame(draw);
        }
        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <section className="hero-root">
            <canvas ref={canvasRef} className="hero-canvas" />

            {/* corners */}
            <div className="corner corner--tl" />
            <div className="corner corner--tr" />
            <div className="corner corner--bl" />
            <div className="corner corner--br" />

            {/* side labels — desktop only via CSS */}
            <div className={`hero-side hero-side--left ${visible ? "hero-side--visible" : ""}`}>
                <span className="side-text">Biomedicina Estética</span>
                <span className="side-line" />
            </div>
            <div className={`hero-side hero-side--right ${visible ? "hero-side--visible" : ""}`}>
                <span className="side-line" />
                <span className="side-text">@biomedbyduda</span>
            </div>

            {/* center */}
            <div className="hero-center">
                <p className={`hero-eyebrow ${visible ? "hero-eyebrow--visible" : ""}`}>
                    Agenda <em>aberta</em> · Abril
                </p>

                <div className={`hero-divider ${visible ? "hero-divider--visible" : ""}`}>
                    <span className="hero-diamond" />
                </div>

                <h1 className={`hero-title ${visible ? "hero-title--visible" : ""}`}>
                    Realce sua<br /><em>beleza natural</em>
                </h1>

                <p className={`hero-sub ${visible ? "hero-sub--visible" : ""}`}>
                    Procedimentos estéticos com ciência e precisão.<br />
                    Agende seu horário e transforme sua rotina.
                </p>

                <a
                    href="https://wa.me/5591989152642"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hero-btn ${visible ? "hero-btn--visible" : ""}`}
                >
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52ZM12 21.94a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.73.98.99-3.63-.24-.38A9.9 9.9 0 0 1 2.06 12C2.06 6.5 6.5 2.06 12 2.06S21.94 6.5 21.94 12 17.5 21.94 12 21.94Zm5.44-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07a8.17 8.17 0 0 1-2.4-1.48 9.02 9.02 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.01-1.04 2.47 1.06 2.86 1.21 3.06c.15.2 2.09 3.19 5.06 4.48.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" fill="currentColor" />
                    </svg>
                    <span>Agendar pelo WhatsApp</span>
                </a>

                <p className={`hero-handle ${visible ? "hero-handle--visible" : ""}`}>
                    @biomedbyduda
                </p>
            </div>

            {/* scroll hint */}
            <div className={`hero-scroll ${visible ? "hero-scroll--visible" : ""}`}>
                <span className="scroll-line" />
                <span className="scroll-label">scroll</span>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');

        .hero-root {
          font-family: 'Montserrat', sans-serif;
          background: #faf9f7;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        /* corners */
        .corner {
          position: absolute;
          width: 32px; height: 32px;
          z-index: 1;
          opacity: 0.3;
        }
        .corner--tl { top: 1.5rem; left: 1.5rem; border-top: 0.5px solid #A68A3F; border-left: 0.5px solid #A68A3F; }
        .corner--tr { top: 1.5rem; right: 1.5rem; border-top: 0.5px solid #A68A3F; border-right: 0.5px solid #A68A3F; }
        .corner--bl { bottom: 1.5rem; left: 1.5rem; border-bottom: 0.5px solid #A68A3F; border-left: 0.5px solid #A68A3F; }
        .corner--br { bottom: 1.5rem; right: 1.5rem; border-bottom: 0.5px solid #A68A3F; border-right: 0.5px solid #A68A3F; }

        /* side labels */
        .hero-side {
          position: absolute;
          top: 50%;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 1;
          opacity: 0;
          pointer-events: none;
          transition: opacity 1.2s ease 1.4s;
        }
        .hero-side--left {
          left: 1.5rem;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: center center;
        }
        .hero-side--right {
          right: 1.5rem;
          transform: translateY(-50%) rotate(90deg);
          transform-origin: center center;
        }
        .hero-side--visible { opacity: 1; }

        .side-text {
          font-size: 8px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #A68A3F;
          white-space: nowrap;
        }
        .side-line {
          display: inline-block;
          width: 36px; height: 0.5px;
          background: rgba(166,138,63,0.4);
          flex-shrink: 0;
        }

        /* center */
        .hero-center {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 6rem 2rem 5rem;
          width: 100%;
          max-width: 520px;
          box-sizing: border-box;
        }

        .hero-eyebrow {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.8rem, 2vw, 1rem);
          font-weight: 300;
          font-style: italic;
          letter-spacing: 0.12em;
          color: #A68A3F;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s;
        }
        .hero-eyebrow em { font-style: normal; }
        .hero-eyebrow--visible { opacity: 1; transform: translateY(0); }

        .hero-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin: 0.9rem auto;
          opacity: 0;
          transition: opacity 0.9s ease 0.5s;
        }
        .hero-divider::before,
        .hero-divider::after {
          content: '';
          height: 0.5px;
          width: 40px;
        }
        .hero-divider::before { background: linear-gradient(to right, transparent, #A68A3F); }
        .hero-divider::after  { background: linear-gradient(to left, transparent, #A68A3F); }
        .hero-divider--visible { opacity: 1; }

        .hero-diamond {
          display: inline-block;
          width: 5px; height: 5px;
          background: #A68A3F;
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 11vw, 5.5rem);
          font-weight: 300;
          letter-spacing: 0.03em;
          color: #1a130a;
          line-height: 1.1;
          margin: 0;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 1s ease 0.6s, transform 1s ease 0.6s;
        }
        .hero-title em { font-style: italic; color: #A68A3F; }
        .hero-title--visible { opacity: 1; transform: translateY(0); }

        .hero-sub {
          font-size: clamp(10px, 2.5vw, 12px);
          letter-spacing: 0.06em;
          color: #7a6a56;
          line-height: 2;
          margin-top: 1.2rem;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.9s ease 0.9s, transform 0.9s ease 0.9s;
        }
        .hero-sub--visible { opacity: 1; transform: translateY(0); }

        /* CTA */
        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 2rem;
          padding: 0.85rem 1.8rem;
          border: 0.5px solid #A68A3F;
          background: transparent;
          color: #A68A3F;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.9s ease 1.1s, transform 0.9s ease 1.1s, color 0.35s;
          max-width: 100%;
          box-sizing: border-box;
          white-space: nowrap;
        }
        .hero-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #A68A3F;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .hero-btn:hover::before { transform: scaleX(1); }
        .hero-btn:hover { color: #faf9f7; }
        .hero-btn--visible { opacity: 1; transform: translateY(0); }

        .btn-icon {
          width: 15px; height: 15px;
          position: relative; z-index: 1;
          flex-shrink: 0;
        }
        .hero-btn span { position: relative; z-index: 1; }

        .hero-handle {
          font-size: 9px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(166,138,63,0.4);
          margin-top: 1.4rem;
          opacity: 0;
          transition: opacity 0.9s ease 1.3s;
        }
        .hero-handle--visible { opacity: 1; }

        /* scroll hint */
        .hero-scroll {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          z-index: 1;
          opacity: 0;
          transition: opacity 1s ease 1.8s;
        }
        .hero-scroll--visible { opacity: 1; }

        .scroll-line {
          width: 0.5px; height: 30px;
          background: linear-gradient(to bottom, #A68A3F, transparent);
          animation: scrollDrop 2s ease-in-out infinite;
        }
        .scroll-label {
          font-size: 7px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(166,138,63,0.45);
        }
        @keyframes scrollDrop {
          0%, 100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; }
          50%       { opacity: 1;   transform: scaleY(1);   transform-origin: top; }
        }

        /* MOBILE */
        @media (max-width: 600px) {
          /* esconde os labels laterais — eles rotacionam e causam overflow */
          .hero-side { display: none; }
          .corner { opacity: 0.15; }
          .hero-center { padding: 5rem 1.25rem 4rem; }
        }
      `}</style>
        </section>
    );
}