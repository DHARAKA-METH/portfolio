"use client";

import { useEffect, useState } from "react";
import {
  ArrowUp,
  BookOpen,
  Download,
  ExternalLink,
  Home,
  Menu,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  SiGithub,
  SiInstagram,
  SiTiktok,
  SiX,
  SiYoutube,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

const skills = [
  { title: "Backend", items: ["Java", "Spring Boot", "REST APIs", "Spring Security"] },
  { title: "Database", items: ["MySQL", "PostgreSQL", "MongoDB"] },
  { title: "DevOps & Cloud", items: ["Docker", "GitHub Actions", "Linux", "AWS (Basics)"] },
  { title: "Frontend", items: ["HTML", "CSS", "JavaScript", "Bootstrap"] },
];

const projects = [
  {
    title: "MindSpace",
    period: "Mar 2025 - May 2025",
    role: "Backend Developer",
    description: "A mental wellness platform connecting people with round-the-clock support, mood tracking, and practical resources.",
    mark: "MS",
    accent: "violet",
  },
  {
    title: "Smart Tourist Platform",
    period: "Jan 2025 - Mar 2025",
    role: "Backend Developer",
    description: "A tourism platform with destination discovery, booking, reviews, and real-time recommendations.",
    mark: "ST",
    accent: "teal",
  },
  {
    title: "JESA 2026 Registration Portal",
    period: "Mar 2025 - May 2025",
    role: "Backend Developer",
    description: "A secure web application registration portal with email verification, role-based access, and data export.",
    mark: "J6",
    accent: "orange",
  },
];

const tech = ["Java", "Spring Boot", "MySQL", "REST APIs", "Spring Security"];

function TechChips({ items = tech }: { items?: string[] }) {
  return <div className="chips">{items.map((item) => <span className="chip" key={item}>{item}</span>)}</div>;
}

export default function HomePage() {
  const [dark, setDark] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main id="top">
      <div className="mobile-bar">
        <a className="brand" href="#hero" onClick={closeMenu}>DM.</a>
        <button className="icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {menuOpen && <nav className="mobile-menu" aria-label="Mobile navigation">
        <a href="#hero" onClick={closeMenu}>Home</a>
        <a href="#projects" onClick={closeMenu}>Projects</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>}

      <div className="portfolio-container">
        <section className="hero" id="hero">
          <div className="portrait" aria-label="Temporary profile placeholder">
            <span>DM</span><i /><b />
          </div>
          <div className="hero-copy">
            <p className="eyebrow">Hello, I&apos;m</p>
            <h1>Dharaka Meth</h1>
            <p className="career-title">Aspiring Backend &amp; DevOps Engineer</p>
            <p className="hero-intro">I build reliable backend systems and practical digital products.</p>
            <div className="hero-actions">
              <a className="button primary-button" href="#projects">View Projects</a>
              <a className="button secondary-button" href="/documents/dharaka-meth-cv.pdf" download><Download /> Download CV</a>
            </div>
            <div className="quick-links">
              <a href="https://github.com" target="_blank" rel="noreferrer">GitHub <ExternalLink /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn <ExternalLink /></a>
            </div>
          </div>
        </section>

        <section id="about">
          <h2>About Me</h2>
          <p>BICT (Hons) undergraduate at the University of Sri Jayewardenepura.</p>
          <p>Aspiring backend developer, passionate about building reliable systems and exploring DevOps and cloud technologies.</p>
        </section>

        <section id="skills">
          <h2>Skills</h2>
          <div className="skills-grid">
            {skills.map((skill) => <div className="skill-group" key={skill.title}><h3>{skill.title}</h3><TechChips items={skill.items} /></div>)}
          </div>
        </section>

        <section id="experience">
          <h2>Experience / My Work</h2>
          <div className="timeline">
            <article className="timeline-item">
              <p className="timeline-date">Mar 2025 -<br />May 2025</p>
              <div className="timeline-content"><h3>JESA 2026 Registration Portal</h3><p className="role">Backend Developer</p><p>Built a secure web application registration portal for JESA 2026 with email verification, role-based access, and data export.</p><TechChips /></div>
            </article>
          </div>
        </section>

        <section id="projects">
          <h2>Featured Projects</h2>
          <div className="timeline">
            {projects.map((project) => <article className="timeline-item project-item" key={project.title}>
              <p className="timeline-date">{project.period.split(" - ")[0]} -<br />{project.period.split(" - ")[1]}</p>
              <div className="project-main">
                <div className={`project-image ${project.accent}`} aria-label={`${project.title} placeholder visual`}><span className="image-detail" /><strong>{project.mark}</strong><em>Explore project <ExternalLink /></em></div>
                <div className="timeline-content"><h3>{project.title}</h3><p className="role">{project.role}</p><p>{project.description}</p><TechChips /></div>
              </div>
            </article>)}
          </div>
        </section>

        <section id="volunteer">
          <h2>Volunteer Experience</h2>
          <div className="timeline">
            <article className="timeline-item"><p className="timeline-date">Oct 2024 -<br />Nov 2024</p><div className="timeline-content volunteer-copy"><div><h3>IEEE Student Branch - USJ</h3><p className="role">Web Volunteer</p><p>Assisted in web development and digital solutions for student activities.</p></div><a href="#contact">Certificate <ExternalLink /></a></div></article>
            <article className="timeline-item"><p className="timeline-date">Sep 2024 -<br />Nov 2024</p><div className="timeline-content volunteer-copy"><div><h3>Code For Tomorrow (USJ)</h3><p className="role">Volunteer Developer</p><p>Supported development and testing sessions for school students.</p></div><a href="#contact">Certificate <ExternalLink /></a></div></article>
          </div>
        </section>

        <footer id="contact">
          <div className="footer-row"><div className="social-links" aria-label="Social links"><a href="https://github.com" aria-label="GitHub"><SiGithub /></a><a href="https://x.com" aria-label="X"><SiX /></a><a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedin /></a><a href="https://youtube.com" aria-label="YouTube"><SiYoutube /></a><a href="https://tiktok.com" aria-label="TikTok"><SiTiktok /></a><a href="https://instagram.com" aria-label="Instagram"><SiInstagram /></a></div><div className="controls"><button className="icon-button" onClick={() => setSoundOn(!soundOn)} aria-label={soundOn ? "Mute sound" : "Enable sound"}>{soundOn ? <Volume2 /> : <VolumeX />}</button><button className="icon-button" onClick={toggleTheme} aria-label={dark ? "Use light mode" : "Use dark mode"}>{dark ? <Sun /> : <Moon />}</button></div></div>
          <div className="footer-row footer-meta"><p>© 2025 Dharaka Meth. All rights reserved.</p><a href="#top">Back to top <ArrowUp /></a></div>
          <a className="privacy" href="#top">Privacy</a>
        </footer>
      </div>

      <nav className="floating-navigation" aria-label="Primary navigation">
        <a className="nav-active" href="#hero"><Home /> <span>Home</span></a>
        <a href="https://github.com" target="_blank" rel="noreferrer"><SiGithub /> <span>GitHub</span></a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /> <span>LinkedIn</span></a>
        <a href="#contact"><BookOpen /> <span>Blog</span></a>
      </nav>
    </main>
  );
}
