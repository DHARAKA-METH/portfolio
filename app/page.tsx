"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUp, BookOpen, Download, ExternalLink, Home, Menu, Moon, Sun, Volume2, VolumeX, X } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub, SiInstagram, SiTiktok, SiX, SiYoutube } from "react-icons/si";

const skills = [
  { title: "Backend", items: ["Java", "Spring Boot", "REST APIs", "Spring Security"] },
  { title: "Database", items: ["MySQL", "PostgreSQL", "MongoDB"] },
  { title: "DevOps & Cloud", items: ["Docker", "GitHub Actions", "Linux", "AWS (Basics)"] },
  { title: "Frontend", items: ["HTML", "CSS", "JavaScript", "Bootstrap"] },
];

const projects = [
  { title: "MindSpace", period: ["Mar 2025", "May 2025"], role: "Backend Developer", description: "A mental wellness platform connecting people with round-the-clock support, mood tracking, and practical resources.", mark: "MS", color: "bg-[#5E5A8A]" },
  { title: "Smart Tourist Platform", period: ["Jan 2025", "Mar 2025"], role: "Backend Developer", description: "A tourism platform with destination discovery, booking, reviews, and real-time recommendations.", mark: "ST", color: "bg-[#256D6A]" },
  { title: "JESA 2026 Registration Portal", period: ["Mar 2025", "May 2025"], role: "Backend Developer", description: "A secure web application registration portal with email verification, role-based access, and data export.", mark: "J6", color: "bg-[#C24E28]" },
];

const technologies = ["Java", "Spring Boot", "MySQL", "REST APIs", "Spring Security"];
const chipClass = "inline-flex min-h-8 items-center rounded-[5px] border border-[#D8DAD4] px-[11px] py-[7px] font-mono text-xs leading-none font-medium text-[#20221F] dark:border-[#363932] dark:text-[#F2F3EE]";

function TechChips({ items = technologies }: { items?: string[] }) {
  return <div className="flex flex-wrap gap-2">{items.map((item) => <span className={chipClass} key={item}>{item}</span>)}</div>;
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return <button className="grid size-8 place-items-center rounded-[5px] text-[#62675F] transition-colors duration-150 hover:bg-[#F2F2EC] hover:text-[#C2410C] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#F97316] dark:text-[#A6ABA1] dark:hover:bg-[#232520] dark:hover:text-[#FF7043] dark:focus-visible:outline-[#FF8A65]" onClick={onClick} aria-label={label}>{children}</button>;
}

export default function HomePage() {
  const [dark, setDark] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileFlipped, setProfileFlipped] = useState(false);

  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);

  return (
    <main className="min-h-screen bg-[#FAFAF7] font-sans text-[15px] leading-[1.7] text-[#20221F] transition-colors duration-[220ms] dark:bg-[#10110F] dark:text-[#F2F3EE]">
      <div className="mx-auto flex h-14 w-[calc(100%_-_40px)] max-w-[900px] items-center justify-between md:hidden">
        <a className="font-mono text-sm font-bold text-[#C2410C] dark:text-[#FF7043]" href="#hero">DM.</a>
        <IconButton label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}</IconButton>
      </div>
      {menuOpen && <nav className="mx-auto flex w-[calc(100%_-_40px)] max-w-[900px] gap-5 border-b border-[#E5E6E1] py-3 font-mono text-xs dark:border-[#282B26] md:hidden" aria-label="Mobile navigation"><a href="#hero">Home</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav>}

      <div className="mx-auto w-[calc(100%_-_40px)] max-w-[900px] pb-[100px] pt-10 md:w-[calc(100%_-_48px)] md:pb-[100px] md:pt-16">
        <section className="mb-14 flex scroll-mt-7 items-start gap-3 md:mb-20 md:min-h-0 md:gap-3" id="hero">
          <button
            className="group shrink-0 cursor-pointer rounded-md [perspective:1000px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F97316] dark:focus-visible:outline-[#FF8A65]"
            onMouseEnter={() => setProfileFlipped(true)}
            onMouseLeave={() => setProfileFlipped(false)}
            onClick={() => setProfileFlipped(!profileFlipped)}
            aria-label="Show Dharaka Meth logo"
            aria-pressed={profileFlipped}
          >
            <span className={`relative block size-[60px] transform-3d transition-transform duration-[220ms] ${profileFlipped ? "rotate-y-180" : ""}`}>
              <Image className="absolute inset-0 size-full rounded-md object-cover backface-hidden" src="/profile.png" alt="Dharaka Meth" width={60} height={60} priority />
              <Image className="absolute inset-0 size-full rotate-y-180 rounded-md object-cover backface-hidden" src="/logo.png" alt="Dharaka Meth logo" width={60} height={60} />
            </span>
          </button>
          <div className="ml-3 gap-2">
            <h1 className="mt-2.5 font-mono text-lg leading-[1.2] font-bold tracking-[-.04em]">Dharaka Meth</h1>
            <p className="mt-0 font-mono text-base leading-6 font-medium text-[#62675F] dark:text-[#A6ABA1]">Aspiring Backend &amp; DevOps Engineer</p>
          </div>

        </section>
        <div className="mt-[-50px]">
            <p className="max-w-[510px] text-sm font-bold text-[#62675F] [font-family:var(--font-courier-prime)] dark:text-[#A6ABA1] md:text-[15px]">I build reliable backend systems and practical digital products.</p>
          <div className="mt-[18px] flex flex-wrap gap-3 md:mt-6"><a className="rounded-md border border-[#C2410C] bg-[#C2410C] px-[18px] py-3 font-mono text-[13px] leading-none font-medium text-white transition duration-150 hover:-translate-y-px hover:border-[#9A3412] hover:bg-[#9A3412] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#F97316] dark:border-[#FF7043] dark:bg-[#FF7043] dark:text-[#17100C] dark:hover:border-[#FF8A65] dark:hover:bg-[#FF8A65]" href="#projects">View Projects</a><a className="inline-flex items-center gap-2 rounded-md border border-[#D8DAD4] px-[18px] py-3 font-mono text-[13px] leading-none font-medium transition duration-150 hover:-translate-y-px hover:bg-[#F2F2EC] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#F97316] dark:border-[#363932] dark:hover:bg-[#232520]" href="/documents/dharaka-meth-cv.pdf" download><Download className="size-[14px] stroke-[1.75]" />Download CV</a></div>
          <div className="mt-[18px] flex gap-[26px] font-mono text-xs md:mt-6"><a className="inline-flex items-center gap-1.5 hover:text-[#C2410C] dark:hover:text-[#FF7043]" href="https://github.com" target="_blank" rel="noreferrer">GitHub <ExternalLink className="size-3 stroke-[1.75]" /></a><a className="inline-flex items-center gap-1.5 hover:text-[#C2410C] dark:hover:text-[#FF7043]" href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn <ExternalLink className="size-3 stroke-[1.75]" /></a></div>
        </div>

        <section className="mt-14 scroll-mt-7 md:mt-20" id="about"><SectionTitle>About Me</SectionTitle><p className="mb-3 max-w-[700px] text-[#62675F] dark:text-[#A6ABA1]">BICT (Hons) undergraduate at the University of Sri Jayewardenepura.</p><p className="max-w-[700px] text-[#62675F] dark:text-[#A6ABA1]">Aspiring backend developer, passionate about building reliable systems and exploring DevOps and cloud technologies.</p></section>
        <section className="mt-14 scroll-mt-7 md:mt-20" id="skills"><SectionTitle>Skills</SectionTitle><div className="grid gap-[26px] py-1 md:grid-cols-2 md:gap-x-16 md:gap-y-8 md:px-3">{skills.map((skill) => <div key={skill.title}><h3 className="mb-2.5 font-mono text-[13px] leading-[1.4] font-semibold">{skill.title}</h3><TechChips items={skill.items} /></div>)}</div></section>
        <section className="mt-14 scroll-mt-7 md:mt-20" id="experience"><SectionTitle>Experience / My Work</SectionTitle><Timeline><TimelineItem period={["Mar 2025", "May 2025"]}><h3 className="font-mono text-base leading-[1.4] font-semibold">JESA 2026 Registration Portal</h3><p className="mt-1 mb-1.5 font-mono text-xs leading-[1.5] font-medium">Backend Developer</p><p className="mb-[7px] text-[#62675F] dark:text-[#A6ABA1]">Built a secure web application registration portal for JESA 2026 with email verification, role-based access, and data export.</p><TechChips /></TimelineItem></Timeline></section>
        <section className="mt-14 scroll-mt-7 md:mt-20" id="projects"><SectionTitle>Featured Projects</SectionTitle><Timeline>{projects.map((project) => <TimelineItem period={project.period} key={project.title}><div className="group md:flex md:gap-[18px]"><div className={`relative mb-[14px] grid h-[126px] w-full place-items-center overflow-hidden rounded-md text-[25px] leading-none font-bold tracking-[-.08em] text-white md:mb-0 md:h-[105px] md:w-[126px] md:shrink-0 ${project.color}`}><div className="absolute h-[110px] w-[110px] translate-x-7 -translate-y-9 rounded-full border border-white/45" /><strong className="relative transition duration-[220ms] group-hover:-translate-y-1.5 group-hover:opacity-0">{project.mark}</strong><span className="absolute flex translate-y-1.5 items-center gap-1.5 font-mono text-[11px] leading-none font-medium opacity-0 transition duration-[220ms] group-hover:translate-y-0 group-hover:opacity-100">Explore <ExternalLink className="size-[13px]" /></span></div><div><h3 className="font-mono text-base leading-[1.4] font-semibold">{project.title}</h3><p className="mt-1 mb-1.5 font-mono text-xs leading-[1.5] font-medium">{project.role}</p><p className="mb-[7px] text-[#62675F] dark:text-[#A6ABA1]">{project.description}</p><TechChips /></div></div></TimelineItem>)}</Timeline></section>
        <section className="mt-14 scroll-mt-7 md:mt-20" id="volunteer"><SectionTitle>Volunteer Experience</SectionTitle><Timeline><TimelineItem period={["Oct 2024", "Nov 2024"]}><Volunteer name="IEEE Student Branch - USJ" role="Web Volunteer" description="Assisted in web development and digital solutions for student activities." /></TimelineItem><TimelineItem period={["Sep 2024", "Nov 2024"]}><Volunteer name="Code For Tomorrow (USJ)" role="Volunteer Developer" description="Supported development and testing sessions for school students." /></TimelineItem></Timeline></section>
        <footer className="mt-14 border-t border-[#E5E6E1] pt-6 dark:border-[#282B26] md:mt-20" id="contact"><div className="flex items-start justify-between gap-5"><div className="flex flex-wrap gap-3 text-[#62675F] dark:text-[#A6ABA1] md:gap-4"><Social href="https://github.com" label="GitHub"><SiGithub /></Social><Social href="https://x.com" label="X"><SiX /></Social><Social href="https://linkedin.com" label="LinkedIn"><FaLinkedin /></Social><Social href="https://youtube.com" label="YouTube"><SiYoutube /></Social><Social href="https://tiktok.com" label="TikTok"><SiTiktok /></Social><Social href="https://instagram.com" label="Instagram"><SiInstagram /></Social></div><div className="flex gap-2"><IconButton label={soundOn ? "Mute sound" : "Enable sound"} onClick={() => setSoundOn(!soundOn)}>{soundOn ? <Volume2 className="size-[18px] stroke-[1.75]" /> : <VolumeX className="size-[18px] stroke-[1.75]" />}</IconButton><IconButton label={dark ? "Use light mode" : "Use dark mode"} onClick={() => setDark(!dark)}>{dark ? <Sun className="size-[18px] stroke-[1.75]" /> : <Moon className="size-[18px] stroke-[1.75]" />}</IconButton></div></div><div className="mt-[22px] flex flex-col justify-between gap-2 font-mono text-xs text-[#898E86] dark:text-[#7D8279] md:flex-row"><p>© 2025 Dharaka Meth. All rights reserved.</p><a className="inline-flex items-center gap-1.5 hover:text-[#C2410C] dark:hover:text-[#FF7043]" href="#hero">Back to top <ArrowUp className="size-3 stroke-[1.75]" /></a></div><a className="mt-2 inline-block font-mono text-xs text-[#898E86] hover:text-[#C2410C] dark:text-[#7D8279] dark:hover:text-[#FF7043]" href="#hero">Privacy</a></footer>
      </div>
      <nav className="fixed bottom-6 left-1/2 z-10 flex w-[calc(100%_-_28px)] max-w-[350px] -translate-x-1/2 rounded-xl border border-[#D8DAD4] bg-[#FFFFFF]/92 p-1.5 shadow-[0_10px_32px_rgb(0_0_0_/_12%)] backdrop-blur-md dark:border-[#363932] dark:bg-[#181A17]/92" aria-label="Primary navigation"><NavLink href="#hero" active><Home /><span>Home</span></NavLink><NavLink href="https://github.com"><SiGithub /><span>GitHub</span></NavLink><NavLink href="https://linkedin.com"><FaLinkedin /><span>LinkedIn</span></NavLink><NavLink href="#contact"><BookOpen /><span>Blog</span></NavLink></nav>
    </main>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) { return <h2 className="mb-[18px] flex items-center gap-3 font-mono text-xl leading-[1.4] font-semibold tracking-[-.03em] after:h-px after:flex-1 after:bg-[#E5E6E1] dark:after:bg-[#282B26]">{children}</h2>; }
function Timeline({ children }: { children: React.ReactNode }) { return <div className="relative ml-1 before:absolute before:top-[9px] before:bottom-2 before:left-0 before:w-px before:bg-[#D8DAD4] dark:before:bg-[#363932] md:ml-3">{children}</div>; }
function TimelineItem({ period, children }: { period: string[]; children: React.ReactNode }) { return <article className="relative grid grid-cols-[83px_1fr] gap-3 pb-8 pl-[17px] last:pb-0 before:absolute before:top-[7px] before:-left-1 before:size-[9px] before:rounded-full before:bg-[#20221F] dark:before:bg-[#F2F3EE] md:grid-cols-[108px_1fr] md:gap-[18px] md:pl-5"><p className="font-mono text-xs leading-[1.5] text-[#62675F] dark:text-[#A6ABA1]">{period[0]} -<br />{period[1]}</p><div>{children}</div></article>; }
function Volunteer({ name, role, description }: { name: string; role: string; description: string }) { return <div className="md:flex md:justify-between md:gap-5"><div><h3 className="font-mono text-base leading-[1.4] font-semibold">{name}</h3><p className="mt-1 mb-1.5 font-mono text-xs leading-[1.5] font-medium">{role}</p><p className="text-[#62675F] dark:text-[#A6ABA1]">{description}</p></div><a className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[#C2410C] dark:text-[#FF7043] md:mt-0 md:self-center" href="#contact">Certificate <ExternalLink className="size-3 stroke-[1.75]" /></a></div>; }
function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) { return <a className="grid size-5 place-items-center transition-colors hover:text-[#C2410C] dark:hover:text-[#FF7043] [&_svg]:size-5" href={href} aria-label={label}>{children}</a>; }
function NavLink({ href, active = false, children }: { href: string; active?: boolean; children: React.ReactNode }) { return <a className={`flex h-11 flex-1 items-center justify-center gap-[7px] rounded-[7px] px-1 font-mono text-[11px] leading-none font-medium transition-colors hover:bg-[#F2F2EC] hover:text-[#20221F] dark:hover:bg-[#232520] dark:hover:text-[#F2F3EE] [&_svg]:size-[18px] ${active ? "bg-[#20221F] text-[#FAFAF7] dark:bg-[#F2F3EE] dark:text-[#10110F]" : "text-[#62675F] dark:text-[#A6ABA1]"}`} href={href}>{children}</a>; }
