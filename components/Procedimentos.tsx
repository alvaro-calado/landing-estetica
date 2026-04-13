"use client";

import { useEffect, useRef } from "react";

const procedimentos = [
    { name: "Exoderma", price: "R$ 180" },
    { name: "Microagulhamento Facial", price: "R$ 130" },
    { name: "Dermaplaning", price: "R$ 130" },
    { name: "Limpeza de Pele Profunda", price: "R$ 100" },
    { name: "Tratamento para Estrias", price: "R$ 100" },
    { name: "Brow Lamination", price: "R$ 90" },
    { name: "Lash Lifting", price: "R$ 90" },
    { name: "Design de Sobrancelha c/ Henna", price: "R$ 30" },
    { name: "Design de Sobrancelha", price: "R$ 15" },
];

const combos = [
    { name: "Limpeza de Pele Profunda + Exoderma", price: "R$ 250", save: "economia de R$ 30" },
    { name: "Microagulhamento Facial + Tratamento para Estrias", price: "R$ 200", save: "economia de R$ 30" },
    { name: "Limpeza de Pele Profunda + Dermaplaning", price: "R$ 180", save: "economia de R$ 50" },
    { name: "Brow Lamination + Lash Lifting", price: "R$ 150", save: "economia de R$ 30" },
    { name: "Lash Lifting + Design c/ Henna", price: "R$ 115", save: "economia de R$ 5" },
];

interface Particle {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    maxOp: number;
    life: number;
    maxLife: number;
    drift: number;
}

function rand(a: number, b: number) {
    return a + Math.random() * (b - a);
}

export default function Procedimentos() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        const particles: Particle[] = [];

        function resize() {
            if (!canvas) return;
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        function spawnParticle() {
            if (!canvas) return;
            particles.push({
                x: rand(0, canvas.width),
                y: canvas.height + 2,
                size: rand(0.5, 1.8),
                speed: rand(0.3, 1.0),
                opacity: 0,
                maxOp: rand(0.06, 0.18),
                life: 0,
                maxLife: rand(200, 500),
                drift: rand(-0.3, 0.3),
            });
        }

        function draw() {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.life++;
                p.y -= p.speed;
                p.x += p.drift;
                const ratio = p.life / p.maxLife;
                p.opacity =
                    ratio < 0.1
                        ? (ratio / 0.1) * p.maxOp
                        : ratio > 0.85
                            ? ((1 - ratio) / 0.15) * p.maxOp
                            : p.maxOp;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(166,138,63,${p.opacity})`;
                ctx.fill();

                if (p.life >= p.maxLife) particles.splice(i, 1);
            }

            if (Math.random() < 0.12) spawnParticle();
            animationId = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <section className="clinic-root">
            <canvas ref={canvasRef} className="clinic-canvas" />

            <div className="hero">
                <p className="hero-eyebrow">Biomedicina Estética · Procedimentos</p>
                <h1 className="hero-title">
                    Eduarda <em>&amp;</em> Santos
                </h1>
                <div className="divider-gold">
                    <span className="diamond" />
                </div>
            </div>

            <div className="section-wrap">

                <div className="shimmer-bar" />

                <ul className="items-list">
                    {procedimentos.map((item, i) => (
                        <li
                            key={item.name}
                            className="item-row"
                            style={{ animationDelay: `${1.0 + i * 0.1}s` }}
                        >
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">{item.price}</span>
                        </li>
                    ))}
                </ul>

                <div className="section-spacer">
                    <p className="section-label" style={{ animationDelay: "1.8s" }}>
                        Combos especiais
                    </p>
                    <div className="shimmer-bar" />

                    <ul className="items-list">
                        {combos.map((item, i) => (
                            <li
                                key={item.name}
                                className="item-row"
                                style={{ animationDelay: `${1.9 + i * 0.1}s` }}
                            >
                                <div className="combo-name-wrap">
                                    <span className="item-name">{item.name}</span>
                                    <span className="combo-badge">Combo</span>
                                </div>
                                <div className="price-col">
                                    <span className="item-price">{item.price}</span>
                                    <span className="savings-tag">{item.save}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <p className="footer-note">
                Consulte disponibilidade · Valores sujeitos a alteração
            </p>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Montserrat:wght@300;400;500&display=swap');

        .clinic-root {
          font-family: 'Montserrat', sans-serif;
          background: #faf9f7;
          min-height: 100vh;
          color: #2c2416;
          position: relative;
          overflow: hidden;
        }

        .clinic-canvas {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .hero {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 4rem 2rem 2rem;
        }

        .hero-eyebrow {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.4em;
          color: #A68A3F;
          text-transform: uppercase;
          opacity: 0;
          animation: fadeSlideDown 1s ease 0.2s forwards;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 8vw, 5rem);
          font-weight: 300;
          letter-spacing: 0.08em;
          color: #1a130a;
          line-height: 1;
          margin-top: 0.5rem;
          opacity: 0;
          animation: fadeSlideDown 1s ease 0.4s forwards;
        }

        .hero-title em {
          font-style: italic;
          color: #A68A3F;
        }

        .divider-gold {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin: 1.5rem auto;
          opacity: 0;
          animation: fadeIn 1s ease 0.8s forwards;
        }

        .divider-gold::before,
        .divider-gold::after {
          content: '';
          height: 0.5px;
          width: 60px;
        }

        .divider-gold::before {
          background: linear-gradient(to right, transparent, #A68A3F);
        }

        .divider-gold::after {
          background: linear-gradient(to left, transparent, #A68A3F);
        }

        .diamond {
          display: inline-block;
          width: 5px;
          height: 5px;
          background: #A68A3F;
          transform: rotate(45deg);
        }

        .section-wrap {
          position: relative;
          z-index: 1;
          max-width: 700px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
        }

        .section-label {
          font-size: 9px;
          letter-spacing: 0.5em;
          color: #A68A3F;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 1.5rem;
          padding-left: 2px;
          opacity: 0;
          animation: fadeIn 0.8s ease forwards;
        }

        .shimmer-bar {
          height: 0.5px;
          background: linear-gradient(90deg, transparent, #A68A3F, transparent);
          background-size: 200% 1px;
          animation: shimmer 3s linear infinite;
          margin: 0.5rem 0 2.5rem;
          opacity: 0.45;
        }

        .items-list {
          list-style: none;
          padding: 0;
          margin: 0;
          border-top: 0.5px solid rgba(166,138,63,0.25);
        }

        .item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 0.5px solid rgba(166,138,63,0.15);
          padding: 1rem 0;
          opacity: 0;
          transform: translateX(-12px);
          animation: slideInRow 0.6s ease forwards;
          cursor: default;
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
        }

        .item-row::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(166,138,63,0.05), transparent);
          transform: translateX(-101%);
          transition: transform 0.4s ease;
        }

        .item-row:hover::before {
          transform: translateX(0);
        }

        .item-row:hover .item-name {
          color: #8a6e28;
          transform: translateX(4px);
        }

        .item-row:hover .item-price {
          color: #8a6e28;
        }

        .item-name {
          font-size: 11px;
          letter-spacing: 0.2em;
          font-weight: 400;
          color: #6b5c48;
          text-transform: uppercase;
          transition: color 0.3s, transform 0.3s;
          flex: 1;
        }

        .item-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 300;
          color: #A68A3F;
          letter-spacing: 0.04em;
          white-space: nowrap;
          transition: color 0.3s;
        }

        .combo-name-wrap {
          display: flex;
          align-items: center;
          flex: 1;
          flex-wrap: wrap;
          gap: 6px;
        }

        .combo-badge {
          display: inline-block;
          font-size: 7px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          background: rgba(166,138,63,0.08);
          border: 0.5px solid rgba(166,138,63,0.35);
          color: #A68A3F;
          padding: 2px 8px;
          border-radius: 20px;
          flex-shrink: 0;
        }

        .price-col {
          text-align: right;
        }

        .savings-tag {
          font-size: 8px;
          letter-spacing: 0.2em;
          color: #3a8c62;
          display: block;
          margin-top: 2px;
        }

        .section-spacer {
          margin-top: 3.5rem;
        }

        .footer-note {
          text-align: center;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: rgba(166,138,63,0.45);
          text-transform: uppercase;
          padding-bottom: 2rem;
          position: relative;
          z-index: 1;
          opacity: 0;
          animation: fadeIn 1s ease 3s forwards;
        }

        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes slideInRow {
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
        </section>
    );
}