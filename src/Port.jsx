import { useState, useEffect, useRef } from "react";
import profilePhoto from "./assets/vote.jpg";

const skills = [
  { name: "React.js", level: 85, icon: "⚛️" },
  { name: "JavaScript", level: 80, icon: "🟨" },
  { name: "HTML & CSS", level: 92, icon: "🎨" },
  { name: "Bootstrap", level: 88, icon: "🅱️" },
  { name: "jQuery", level: 75, icon: "💠" },
  { name: "MySQL", level: 70, icon: "🗄️" },
  { name: "Java", level: 65, icon: "☕" },
  { name: "Figma", level: 72, icon: "🖼️" },
];

const projects = [
  {
    title: "KFC E-Commerce Website",
    tech: ["HTML", "CSS", "JavaScript"],
    desc: "A responsive KFC website with product listings, shopping cart, checkout with JS validations, CSS animations, and localStorage cart persistence.",
    link: "https://kfc-vk.netlify.app/",
    icon: "🍗",
    color: "#e8272e",
  },
  {
    title: "Banner Shop Website",
    tech: ["React Vite", "Bootstrap 5", "React Router", "WhatsApp API"],
    desc: "Print management SPA with custom size configurator (inches/feet), live price calculator, and WhatsApp API order integration with pre-filled order details.",
    link: "https://vinoth-art-s-bannner.vercel.app",
    icon: "🖨️",
    color: "#00b4d8",
  },
];

const experiences = [
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    period: "Part-time (Ongoing)",
    points: [
      "Delivered multiple frontend & full-stack projects for diverse clients.",
      "Built responsive UIs with HTML, CSS, Bootstrap, jQuery, React Vite.",
      "Collaborated with clients to gather requirements and deliver on deadlines.",
    ],
    icon: "💼",
  },
  {
    role: "Java Full-Stack Intern",
    company: "Pumo Technovation",
    period: "Completed",
    points: [
      "Hands-on experience building dynamic websites with HTML, CSS, JS.",
      "Worked on end-to-end Java Full-Stack development solutions.",
      "Implemented real-world projects with modern web technologies.",
    ],
    icon: "🏢",
  },
];

function AnimatedBar({ level, color }) {
  const [width, setWidth] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setWidth(level); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level]);

  return (
    <div ref={ref} style={{
      background: "rgba(255,255,255,0.08)", borderRadius: 99,
      height: 6, overflow: "hidden", marginTop: 8
    }}>
      <div style={{
        width: `${width}%`, height: "100%",
        background: `linear-gradient(90deg, ${color}, ${color}99)`,
        borderRadius: 99,
        transition: "width 1.2s cubic-bezier(.4,0,.2,1)",
        boxShadow: `0 0 12px ${color}88`
      }} />
    </div>
  );
}

function TypeWriter({ texts }) {
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    const delay = !deleting && charIdx === current.length ? 2000 : deleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setIdx(i => (i + 1) % texts.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, idx, texts]);

  const display = texts[idx].substring(0, charIdx);

  return (
    <span style={{ color: "#00f5c4" }}>
      {display}<span style={{ animation: "blink 1s infinite", opacity: 1 }}>|</span>
    </span>
  );
}

const NAV = ["Home", "Skills", "Projects", "Experience", "Education", "Contact"];

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map(id => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      entries => {
        const visibleSection = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection?.target?.id) {
          setActive(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  const accent = "#00f5c4";
  const accent2 = "#7b61ff";

  return (
    <div className="portfolio-page" style={{
      fontFamily: "'Syne', 'Space Grotesk', sans-serif",
      background: "#080c14",
      color: "#e8eaf0",
      minHeight: "100vh",
      overflowX: "hidden",
      width: "100%",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080c14; }
        ::-webkit-scrollbar-thumb { background: #00f5c4; border-radius: 4px; }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:.5}100%{transform:scale(1.5);opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)} }
        @keyframes gradientShift { 0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%} }
        @keyframes spin-slow { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }
        .nav-link:hover { color: #00f5c4 !important; }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-8px); box-shadow: 0 24px 60px rgba(0,245,196,0.15) !important; }
        .skill-card:hover { border-color: #00f5c4 !important; background: rgba(0,245,196,0.07) !important; }
        .btn-primary-v:hover { background: #00f5c4 !important; color: #080c14 !important; transform: translateY(-2px); }
        .exp-item:hover { border-left-color: #00f5c4 !important; background: rgba(0,245,196,0.04) !important; }
        .social-btn:hover { background: rgba(0,245,196,0.15) !important; border-color: #00f5c4 !important; color: #00f5c4 !important; transform: translateY(-3px); }
        section { animation: fadeUp 0.7s ease both; }
        .mobile-menu-btn { display: none; }
        .content-grid { width: 100%; }

        @media (max-width: 1100px) {
          .hero-profile {
            opacity: 0.22;
            right: 4% !important;
            transform: translateY(-50%) scale(0.9) !important;
            pointer-events: none;
          }
          .hero-content {
            max-width: 680px !important;
          }
        }

        @media (max-width: 900px) {
          .portfolio-nav {
            height: auto !important;
            min-height: 66px;
            padding: 12px 5% !important;
            align-items: flex-start !important;
          }
          .mobile-menu-btn {
            display: inline-flex;
          }
          .nav-menu {
            position: absolute;
            top: 58px;
            left: 5%;
            right: 5%;
            display: ${menuOpen ? "grid" : "none"} !important;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px !important;
            padding: 14px;
            border: 1px solid rgba(0,245,196,0.14);
            border-radius: 14px;
            background: rgba(8,12,20,0.98);
            box-shadow: 0 18px 48px rgba(0,0,0,0.35);
          }
          .nav-link {
            width: 100%;
            padding: 10px 12px !important;
            border-radius: 8px;
            text-align: left;
            background: rgba(255,255,255,0.03) !important;
            border-bottom: 0 !important;
          }
          .hero-section {
            min-height: auto !important;
            padding: 112px 6% 72px !important;
          }
          .hero-profile {
            display: none !important;
          }
          .section-block {
            padding: 76px 6% !important;
          }
          .contact-section {
            padding: 76px 6% 48px !important;
          }
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 34px !important;
            max-width: 100% !important;
          }
        }

        @media (max-width: 640px) {
          .nav-menu {
            grid-template-columns: 1fr;
          }
          .hero-section {
            padding-inline: 20px !important;
          }
          .section-block,
          .contact-section {
            padding-inline: 20px !important;
          }
          .hero-title {
            font-size: clamp(40px, 14vw, 58px) !important;
            letter-spacing: -1px !important;
          }
          .hero-actions,
          .hero-stats,
          .skill-pills {
            width: 100%;
          }
          .hero-actions > button {
            width: 100%;
          }
          .hero-stats {
            justify-content: space-between;
            gap: 18px !important;
          }
          .content-grid {
            grid-template-columns: 1fr !important;
          }
          .skill-card,
          .project-card,
          .education-card,
          .exp-item,
          .contact-card {
            padding: 24px 20px !important;
            border-radius: 14px !important;
          }
          .experience-list {
            max-width: 100% !important;
          }
          .experience-heading {
            align-items: flex-start !important;
          }
          .contact-row {
            align-items: flex-start !important;
          }
          .contact-value {
            overflow-wrap: anywhere;
          }
        }
      `}</style>

      {/* NAV */}
      <nav className="portfolio-nav" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 5%",
        background: scrolled ? "rgba(8,12,20,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,245,196,0.1)" : "none",
        transition: "all 0.3s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 70,
      }}>
        <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.5px" }}>
          <span style={{ color: accent }}>V</span>INOTH<span style={{ color: accent2 }}>.</span>
        </div>
        <button
          className="mobile-menu-btn"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(open => !open)}
          style={{
            width: 42, height: 42, borderRadius: 10,
            border: "1px solid rgba(0,245,196,0.22)",
            background: "rgba(0,245,196,0.08)",
            color: accent,
            alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 22, lineHeight: 1,
          }}
        >
          {menuOpen ? "x" : "="}
        </button>
        {/* Desktop Nav */}
        <div className="nav-menu" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV.map(n => (
            <button key={n} className="nav-link" onClick={() => scrollTo(n)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: active === n ? accent : "rgba(232,234,240,0.65)",
                fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 14,
                letterSpacing: "0.5px", transition: "color 0.2s",
                borderBottom: active === n ? `2px solid ${accent}` : "2px solid transparent",
                paddingBottom: 2,
              }}>{n}</button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="Home" className="hero-section" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "100px 8% 60px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background blobs */}
        <div style={{
          position: "absolute", width: 500, height: 500,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(0,245,196,0.08) 0%, transparent 70%)",
          top: -100, right: -100, animation: "float 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: 400, height: 400,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)",
          bottom: 0, left: -80,
        }} />
        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,245,196,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,196,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="hero-content" style={{ position: "relative", maxWidth: 720 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(0,245,196,0.08)", border: "1px solid rgba(0,245,196,0.2)",
            borderRadius: 99, padding: "6px 16px", marginBottom: 28,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: accent, display: "block", animation: "pulse-ring 1.5s infinite" }} />
            <span style={{ fontSize: 13, color: accent, fontFamily: "DM Mono, monospace" }}>Available for work</span>
          </div>

          <h1 className="hero-title" style={{ fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 16, letterSpacing: "-2px" }}>
            Vinoth<br />
            <span style={{
              background: `linear-gradient(135deg, ${accent}, ${accent2})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundSize: "200% 200%", animation: "gradientShift 4s ease infinite",
            }}>Kumar K</span>
          </h1>

          <div style={{ fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 600, marginBottom: 24, color: "rgba(232,234,240,0.8)" }}>
            <TypeWriter texts={["Frontend Developer", "React Specialist", "UI/UX Enthusiast", "Freelance Developer"]} />
          </div>

          <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(232,234,240,0.55)", maxWidth: 560, marginBottom: 40 }}>
            Building interactive, intuitive web experiences with modern tools. 
            Passionate about clean code, beautiful UI, and seamless user journeys.
          </p>

          <div className="hero-actions" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn-primary-v" onClick={() => scrollTo("Projects")}
              style={{
                background: "transparent", border: `2px solid ${accent}`,
                color: accent, padding: "14px 32px", borderRadius: 8,
                fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15,
                cursor: "pointer", transition: "all 0.25s ease", letterSpacing: "0.5px",
              }}>View Projects →</button>
            <button className="btn-primary-v" onClick={() => scrollTo("Contact")}
              style={{
                background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                border: "none", color: "#080c14",
                padding: "14px 32px", borderRadius: 8,
                fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15,
                cursor: "pointer", transition: "all 0.25s ease",
              }}>Hire Me</button>
          </div>

          <div className="hero-stats" style={{ display: "flex", gap: 32, marginTop: 56, flexWrap: "wrap" }}>
            {[["5+", "Projects Done"], ["100%", "Client Satisfaction"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 32, fontWeight: 800, color: accent }}>{n}</div>
                <div style={{ fontSize: 13, color: "rgba(232,234,240,0.45)", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile image */}
        <div className="hero-profile" style={{
          position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
        }}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: 260, height: 260, borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              border: `2px solid ${accent}33`,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, rgba(0,245,196,0.08), rgba(123,97,255,0.08))",
              animation: "float 6s ease-in-out infinite",
              overflow: "hidden", position: "relative",
            }}>
              <img
                src={profilePhoto}
                alt="Vinoth Kumar K"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "50% 34%",
                  transform: "scale(1.28)",
                  transformOrigin: "50% 34%",
                  display: "block",
                }}
              />
            </div>
            {/* Orbit ring */}
            <div style={{
              position: "absolute", inset: -20, borderRadius: "50%",
              border: `1px dashed rgba(0,245,196,0.2)`,
              animation: "spin-slow 12s linear infinite",
            }}>
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translate(-50%,-50%)", width: 10, height: 10, borderRadius: "50%", background: accent }} />
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="Skills" className="section-block" style={{ padding: "100px 8%", position: "relative" }}>
        <SectionHeader title="Technical" highlight="Skills" accent={accent} />
        <div className="content-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 20, marginTop: 60 }}>
          {skills.map(s => (
            <div key={s.name} className="skill-card" style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: "24px 28px", transition: "all 0.3s ease",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{s.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{s.name}</span>
                </div>
                <span style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: accent }}>{s.level}%</span>
              </div>
              <AnimatedBar level={s.level} color={accent} />
            </div>
          ))}
        </div>

        {/* Extra skills pills */}
        <div style={{ marginTop: 48 }}>
          <div className="skill-pills" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["Photoshop", "Figma", "Video Editing", "C", "Git", "Responsive Design"].map(t => (
              <span key={t} style={{
                padding: "6px 18px", borderRadius: 99,
                background: "rgba(123,97,255,0.1)", border: "1px solid rgba(123,97,255,0.25)",
                fontSize: 13, color: "#b8abff", fontWeight: 600,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="Projects" className="section-block" style={{ padding: "100px 8%", background: "rgba(255,255,255,0.01)" }}>
        <SectionHeader title="Featured" highlight="Projects" accent={accent} />
        <div className="content-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 28, marginTop: 60 }}>
          {projects.map(p => (
            <div key={p.title} className="card-hover project-card" style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20, padding: "36px 32px", position: "relative", overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${p.color}, ${accent})`,
              }} />
              <div style={{ fontSize: 48, marginBottom: 20 }}>{p.icon}</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 14, letterSpacing: "-0.5px" }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(232,234,240,0.55)", lineHeight: 1.8, marginBottom: 24 }}>{p.desc}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                {p.tech.map(t => (
                  <span key={t} style={{
                    padding: "4px 12px", borderRadius: 6,
                    background: `${p.color}18`, border: `1px solid ${p.color}44`,
                    fontSize: 12, color: p.color, fontWeight: 600, fontFamily: "DM Mono, monospace",
                  }}>{t}</span>
                ))}
              </div>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-v"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  textDecoration: "none",
                  background: "transparent", border: `1px solid ${p.color}`,
                  color: p.color, padding: "10px 18px", borderRadius: 8,
                  fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14,
                  transition: "all 0.25s ease",
                }}
              >
                View Project -&gt;
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="Experience" className="section-block" style={{ padding: "100px 8%" }}>
        <SectionHeader title="Work" highlight="Experience" accent={accent} />
        <div className="experience-list" style={{ marginTop: 60, display: "flex", flexDirection: "column", gap: 24, maxWidth: 760 }}>
          {experiences.map(e => (
            <div key={e.role} className="exp-item" style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderLeft: `4px solid ${accent2}`,
              borderRadius: 16, padding: "32px 36px",
              transition: "all 0.3s ease",
            }}>
              <div className="experience-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 24 }}>{e.icon}</span>
                    <h3 style={{ fontSize: 20, fontWeight: 800 }}>{e.role}</h3>
                  </div>
                  <div style={{ color: accent, fontWeight: 600, fontSize: 14 }}>{e.company}</div>
                </div>
                <span style={{
                  background: "rgba(0,245,196,0.08)", border: "1px solid rgba(0,245,196,0.2)",
                  borderRadius: 99, padding: "4px 14px", fontSize: 12,
                  color: accent, fontFamily: "DM Mono, monospace",
                }}>{e.period}</span>
              </div>
              <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {e.points.map((p, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "rgba(232,234,240,0.65)", lineHeight: 1.7 }}>
                    <span style={{ color: accent, flexShrink: 0, marginTop: 2 }}>▸</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="Education" className="section-block" style={{ padding: "100px 8%", background: "rgba(255,255,255,0.01)" }}>
        <SectionHeader title="My" highlight="Education" accent={accent} />
        <div className="content-grid" style={{ marginTop: 60, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 24 }}>
          {[
            { school: "Mailam Engineering College", degree: "B.E — ECE", period: "2021–2025", score: "70%", icon: "🎓" },
            { school: "Siga Higher Secondary School", degree: "Higher Secondary (12th)", period: "2020–2021", score: "72%", icon: "📚" },
            { school: "Subramaniya Barathi HSS", degree: "Secondary School (10th)", period: "2018–2019", score: "60%", icon: "🏫" },
          ].map(e => (
            <div key={e.school} className="card-hover education-card" style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: "32px 28px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
            }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{e.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: accent, marginBottom: 4 }}>{e.score}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{e.degree}</div>
              <div style={{ fontSize: 14, color: "rgba(232,234,240,0.55)", marginBottom: 8 }}>{e.school}</div>
              <div style={{ fontSize: 12, fontFamily: "DM Mono, monospace", color: accent2 }}>{e.period}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="Contact" className="contact-section" style={{ padding: "100px 8% 60px" }}>
        <SectionHeader title="Get In" highlight="Touch" accent={accent} />
        <div className="contact-grid" style={{ marginTop: 60, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, maxWidth: 900 }}>
          <div>
            <p style={{ fontSize: 16, color: "rgba(232,234,240,0.6)", lineHeight: 1.9, marginBottom: 40 }}>
              I'm open to frontend and full-stack opportunities, freelance projects, or collaborations. 
              Drop a message and let's build something great together!
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: "📧", label: "Email", value: "vinotkum123@gmail.com", href: "mailto:vinotkum123@gmail.com" },
                { icon: "📱", label: "Phone", value: "+91 63812 17533", href: "tel:+916381217533" },
                { icon: "in", label: "LinkedIn", value: "vinoth-kumar-k", href: "https://www.linkedin.com/in/vinoth-kumar-k-0694322b6" },
                { icon: "📍", label: "Location", value: "Chennai (Velachery), Tamil Nadu" },
              ].map(c => (
                <div key={c.label} className="contact-row" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(0,245,196,0.08)", border: "1px solid rgba(0,245,196,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0,
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, color: "rgba(232,234,240,0.4)", fontFamily: "DM Mono, monospace" }}>{c.label}</div>
                    {c.href
                      ? <a className="contact-value" href={c.href} style={{ color: accent, fontWeight: 600, textDecoration: "none", fontSize: 15 }}>{c.value}</a>
                      : <div className="contact-value" style={{ fontWeight: 600, fontSize: 15 }}>{c.value}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-card" style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20, padding: "36px 32px",
          }}>
            <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 24 }}>Send a Message</h3>
            {["Your Name", "Your Email"].map(ph => (
              <input key={ph} placeholder={ph} style={{
                width: "100%", background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
                padding: "14px 16px", color: "#e8eaf0", fontFamily: "Syne, sans-serif",
                fontSize: 14, marginBottom: 16, outline: "none",
              }} />
            ))}
            <textarea placeholder="Your Message" rows={4} style={{
              width: "100%", background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
              padding: "14px 16px", color: "#e8eaf0", fontFamily: "Syne, sans-serif",
              fontSize: 14, marginBottom: 20, outline: "none", resize: "vertical",
            }} />
            <button style={{
              width: "100%", background: `linear-gradient(135deg, ${accent}, ${accent2})`,
              border: "none", borderRadius: 10, padding: "16px",
              color: "#080c14", fontFamily: "Syne, sans-serif", fontWeight: 800,
              fontSize: 15, cursor: "pointer", letterSpacing: "0.5px",
            }}>Send Message ✉️</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        textAlign: "center", padding: "32px 8%",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        color: "rgba(232,234,240,0.35)", fontSize: 13,
        fontFamily: "DM Mono, monospace",
      }}>
        Designed & Built by <span style={{ color: accent }}>Vinoth Kumar K</span> · 2025 · Chennai
      </footer>
    </div>
  );
}

function SectionHeader({ title, highlight, accent }) {
  return (
    <div>
      <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-1.5px" }}>
        {title}{" "}
        <span style={{
          background: `linear-gradient(135deg, ${accent}, #7b61ff)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>{highlight}</span>
      </h2>
      <div style={{ width: 60, height: 4, background: `linear-gradient(90deg, ${accent}, #7b61ff)`, borderRadius: 99, marginTop: 16 }} />
    </div>
  );
}
