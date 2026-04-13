"use client";

import { useEffect, useRef, useState } from "react";

function rand(a: number, b: number) {
    return a + Math.random() * (b - a);
}

export default function Contato() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setPulse((p) => !p), 2000);
        return () => clearInterval(interval);
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
            if (Math.random() < 0.15) {
                particles.push({
                    x: rand(0, canvas.width), y: canvas.height + 2,
                    size: rand(0.5, 1.8), speed: rand(0.3, 1.0),
                    opacity: 0, maxOp: rand(0.08, 0.22),
                    life: 0, maxLife: rand(200, 500), drift: rand(-0.3, 0.3),
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
        return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", resize); };
    }, []);

    return (
        <section className="contato-root">
            <canvas ref={canvasRef} className="contato-canvas" />

            {/* header */}
            <div className="contato-hero">
                <p className="contato-eyebrow">Estamos aqui por você</p>
                <h2 className="contato-title">Fale <em>conosco</em></h2>
                <div className="contato-divider"><span className="contato-diamond" /></div>
                <p className="contato-subtitle">
                    Agende seu procedimento ou tire suas dúvidas.<br />
                    Responderemos o mais breve possível.
                </p>
            </div>

            {/* cards */}
            <div className="contato-cards">

                {/* whatsapp */}
                <a
                    href="https://wa.me/5591989152642"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contato-card contato-card--main"
                >
                    <div className="card-icon-wrap">
                        <svg className="card-icon" viewBox="0 0 24 24" fill="none">
                            <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52ZM12 21.94a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.73.98.99-3.63-.24-.38A9.9 9.9 0 0 1 2.06 12C2.06 6.5 6.5 2.06 12 2.06S21.94 6.5 21.94 12 17.5 21.94 12 21.94Zm5.44-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07a8.17 8.17 0 0 1-2.4-1.48 9.02 9.02 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.01-1.04 2.47 1.06 2.86 1.21 3.06c.15.2 2.09 3.19 5.06 4.48.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" fill="currentColor" />
                        </svg>
                        <span className={`card-pulse ${pulse ? "card-pulse--on" : ""}`} />
                    </div>
                    <div className="card-body">
                        <span className="card-label">WhatsApp</span>
                        <span className="card-value">(91) 98915-2642</span>
                        <span className="card-cta">Toque para conversar →</span>
                    </div>
                </a>

                {/* email */}
                <a
                    href="mailto:contatoeduar.santos@email.com"
                    className="contato-card"
                >
                    <div className="card-icon-wrap">
                        <svg className="card-icon" viewBox="0 0 24 24" fill="none">
                            <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" fill="currentColor" />
                        </svg>
                    </div>
                    <div className="card-body">
                        <span className="card-label">E-mail</span>
                        <span className="card-value">contatoeduar.santos@email.com</span>
                        <span className="card-cta">Enviar mensagem →</span>
                    </div>
                </a>

            </div>

            {/* availability */}
            <div className="contato-availability">
                <span className="avail-dot" />
                <span className="avail-text">Disponível para agendamentos</span>
            </div>

            <p className="contato-footer">
                Respondemos em até 24 horas · Atendimento personalizado
            </p>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Montserrat:wght@300;400;500&display=swap');

        .contato-root {
          font-family: 'Montserrat', sans-serif;
          background: #faf9f7;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 5rem 1.5rem;
        }

        .contato-canvas {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        /* HERO */
        .contato-hero {
          position: relative;
          z-index: 1;
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .contato-eyebrow {
          font-size: 10px;
          letter-spacing: 0.45em;
          color: #A68A3F;
          text-transform: uppercase;
          font-weight: 400;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.2s forwards;
        }

        .contato-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 7vw, 4.5rem);
          font-weight: 300;
          letter-spacing: 0.06em;
          color: #1a130a;
          margin-top: 0.4rem;
          line-height: 1;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.4s forwards;
        }

        .contato-title em {
          font-style: italic;
          color: #A68A3F;
        }

        .contato-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin: 1.2rem auto;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.6s forwards;
        }

        .contato-divider::before,
        .contato-divider::after {
          content: '';
          height: 0.5px;
          width: 50px;
        }
        .contato-divider::before { background: linear-gradient(to right, transparent, #A68A3F); }
        .contato-divider::after  { background: linear-gradient(to left,  transparent, #A68A3F); }

        .contato-diamond {
          display: inline-block;
          width: 5px; height: 5px;
          background: #A68A3F;
          transform: rotate(45deg);
        }

        .contato-subtitle {
          font-size: 12px;
          letter-spacing: 0.06em;
          color: #7a6a56;
          line-height: 1.9;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.7s forwards;
        }

        /* CARDS */
        .contato-cards {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
          max-width: 480px;
        }

        .contato-card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: #ffffff;
          border: 0.5px solid rgba(166,138,63,0.25);
          border-radius: 4px;
          padding: 1.5rem 1.75rem;
          text-decoration: none;
          color: inherit;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(16px);
          animation: fadeUp 0.7s ease forwards;
          transition: border-color 0.3s, transform 0.3s;
        }

        .contato-card:nth-child(1) { animation-delay: 0.9s; }
        .contato-card:nth-child(2) { animation-delay: 1.05s; }

        .contato-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(166,138,63,0.04), transparent 60%);
          opacity: 0;
          transition: opacity 0.4s;
        }

        .contato-card:hover { border-color: rgba(166,138,63,0.6); transform: translateY(-2px); }
        .contato-card:hover::before { opacity: 1; }

        .contato-card--main {
          border-color: rgba(166,138,63,0.4);
          padding: 2rem 1.75rem;
        }

        .contato-card--main::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 100%;
          background: linear-gradient(to bottom, #A68A3F, #c9a84c, #A68A3F);
        }

        /* icon */
        .card-icon-wrap {
          position: relative;
          flex-shrink: 0;
          width: 48px; height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-icon {
          width: 28px; height: 28px;
          color: #A68A3F;
          position: relative;
          z-index: 1;
          transition: transform 0.3s;
        }

        .contato-card:hover .card-icon { transform: scale(1.1); }

        .card-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(166,138,63,0.35);
          transform: scale(0.8);
          opacity: 0;
          transition: transform 1s ease, opacity 1s ease;
        }

        .card-pulse--on {
          transform: scale(1.4);
          opacity: 0;
          animation: pulseRing 2s ease-out infinite;
        }

        @keyframes pulseRing {
          0%   { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        /* body */
        .card-body {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .card-label {
          font-size: 9px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #A68A3F;
          font-weight: 500;
        }

        .card-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 300;
          letter-spacing: 0.04em;
          color: #1a130a;
        }

        .card-cta {
          font-size: 10px;
          letter-spacing: 0.15em;
          color: #9a8060;
          transition: color 0.3s, letter-spacing 0.3s;
        }

        .contato-card:hover .card-cta {
          color: #A68A3F;
          letter-spacing: 0.22em;
        }

        /* availability */
        .contato-availability {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 2.5rem;
          opacity: 0;
          animation: fadeUp 0.8s ease 1.3s forwards;
        }

        .avail-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #3a8c62;
          box-shadow: 0 0 0 0 rgba(58,140,98,0.4);
          animation: dotPulse 2.5s ease-out infinite;
        }

        @keyframes dotPulse {
          0%   { box-shadow: 0 0 0 0 rgba(58,140,98,0.4); }
          70%  { box-shadow: 0 0 0 8px rgba(58,140,98,0); }
          100% { box-shadow: 0 0 0 0 rgba(58,140,98,0); }
        }

        .avail-text {
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #3a8c62;
          font-weight: 400;
        }

        /* footer */
        .contato-footer {
          position: relative;
          z-index: 1;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: rgba(166,138,63,0.45);
          text-transform: uppercase;
          margin-top: 2rem;
          opacity: 0;
          animation: fadeUp 0.8s ease 1.5s forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </section>
    );
}