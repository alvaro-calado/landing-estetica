"use client";

import { useEffect, useState } from "react";

const links = [
    { label: "Home", href: "#home" },
    { label: "Procedimentos", href: "#procedimentos" },
    { label: "Contato", href: "#contato" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("home");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const sections = links.map((l) => l.href.replace("#", ""));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id);
                });
            },
            { threshold: 0.4 }
        );
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>

                {/* logo */}
                <a href="#home" className="navbar-logo">
                    <span className="logo-mark" />
                    <span className="logo-text">
                        Biomed<em>by</em>Duda
                    </span>
                </a>

                {/* desktop links */}
                <ul className="navbar-links">
                    {links.map(({ label, href }) => {
                        const id = href.replace("#", "");
                        return (
                            <li key={href}>
                                <a
                                    href={href}
                                    className={`navbar-link ${active === id ? "navbar-link--active" : ""}`}
                                >
                                    {label}
                                    <span className="link-underline" />
                                </a>
                            </li>
                        );
                    })}
                </ul>

                {/* cta */}
                <a
                    href="https://wa.me/5591989152642"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navbar-cta"
                >
                    Agendar
                </a>

                {/* hamburger */}
                <button
                    className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label="Menu"
                >
                    <span /><span /><span />
                </button>
            </nav>

            {/* mobile drawer */}
            <div className={`mobile-drawer ${menuOpen ? "mobile-drawer--open" : ""}`}>
                <ul className="mobile-links">
                    {links.map(({ label, href }) => (
                        <li key={href}>
                            <a
                                href={href}
                                className="mobile-link"
                                onClick={() => setMenuOpen(false)}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
                <a
                    href="https://wa.me/5591989152642"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-cta"
                    onClick={() => setMenuOpen(false)}
                >
                    Agendar pelo WhatsApp
                </a>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Montserrat:wght@300;400;500&display=swap');

        .navbar {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.6rem 2.5rem;
          transition: padding 0.5s ease, background 0.5s ease, border-color 0.5s ease;
          border-bottom: 0.5px solid transparent;
        }

        .navbar--scrolled {
          padding: 1rem 2.5rem;
          background: rgba(250,249,247,0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom-color: rgba(166,138,63,0.15);
        }

        /* LOGO */
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .logo-mark {
          display: inline-block;
          width: 6px; height: 6px;
          background: #A68A3F;
          transform: rotate(45deg);
          transition: transform 0.4s ease;
        }

        .navbar-logo:hover .logo-mark {
          transform: rotate(225deg);
        }

        .logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 300;
          letter-spacing: 0.06em;
          color: #1a130a;
        }

        .logo-text em {
          font-style: italic;
          color: #A68A3F;
        }

        /* DESKTOP LINKS */
        .navbar-links {
          display: flex;
          list-style: none;
          gap: 2.5rem;
          margin: 0; padding: 0;
        }

        .navbar-link {
          position: relative;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #6b5c48;
          text-decoration: none;
          padding-bottom: 4px;
          transition: color 0.3s;
        }

        .navbar-link:hover,
        .navbar-link--active {
          color: #A68A3F;
        }

        .link-underline {
          position: absolute;
          bottom: 0; left: 0;
          height: 0.5px;
          width: 0%;
          background: #A68A3F;
          transition: width 0.35s ease;
        }

        .navbar-link:hover .link-underline,
        .navbar-link--active .link-underline {
          width: 100%;
        }

        /* CTA */
        .navbar-cta {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #A68A3F;
          text-decoration: none;
          border: 0.5px solid #A68A3F;
          padding: 0.5rem 1.2rem;
          position: relative;
          overflow: hidden;
          transition: color 0.35s;
          flex-shrink: 0;
        }

        .navbar-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #A68A3F;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }

        .navbar-cta:hover::before { transform: scaleX(1); }
        .navbar-cta:hover { color: #faf9f7; }

        .navbar-cta span { position: relative; z-index: 1; }

        /* HAMBURGER */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        .hamburger span {
          display: block;
          width: 22px;
          height: 0.5px;
          background: #A68A3F;
          transition: transform 0.35s ease, opacity 0.35s ease;
          transform-origin: center;
        }

        .hamburger--open span:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
        .hamburger--open span:nth-child(2) { opacity: 0; }
        .hamburger--open span:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }

        /* MOBILE DRAWER */
        .mobile-drawer {
          position: fixed;
          top: 0; right: 0;
          width: 280px;
          height: 100vh;
          background: #faf9f7;
          border-left: 0.5px solid rgba(166,138,63,0.2);
          z-index: 99;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 3rem 2.5rem;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.77,0,0.175,1);
        }

        .mobile-drawer--open {
          transform: translateX(0);
        }

        .mobile-links {
          list-style: none;
          padding: 0; margin: 0 0 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .mobile-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 300;
          letter-spacing: 0.06em;
          color: #1a130a;
          text-decoration: none;
          transition: color 0.3s;
        }

        .mobile-link:hover { color: #A68A3F; }

        .mobile-cta {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #A68A3F;
          text-decoration: none;
          border: 0.5px solid #A68A3F;
          padding: 0.75rem 1rem;
          text-align: center;
          transition: background 0.3s, color 0.3s;
        }

        .mobile-cta:hover {
          background: #A68A3F;
          color: #faf9f7;
        }

        /* RESPONSIVE */
        @media (max-width: 680px) {
          .navbar-links,
          .navbar-cta { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>
        </>
    );
}