import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollToPlugin);

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  isNDA: boolean;
  githubUrl?: string;
  liveUrl?: string;
}

interface Skill {
  name: string;
  level: number; // 0–100
}

interface SkillGroup {
  category: string;
  icon: string;
  skills: Skill[];
}

interface Experience {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
}

interface ContactField {
  label: string;
  value: string;
  icon: string;
  href?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    icon: "🏢",
    title: "USIL, BOSS IM",
    description:
      "Enterprise React dashboard to monitor telecom circuits and devices in real time. Built with Next.js, integrated with REST APIs, and optimised for performance at scale.",
    tags: ["Next.js", "Redux", "TypeScript", "REST APIs", "Tailwind CSS"],
    isNDA: true,
  },
  {
    icon: "🎵",
    title: "CRUD Beat",
    description:
      "Full-stack React application with comprehensive CRUD operations. Handled complex data flows with Redux and built developer & testing tooling.",
    tags: ["React", "Express.js", "REST APIs", "Redux", "Node.js"],
    isNDA: true,
  },
  {
    icon: "📚",
    title: "CRUD Academy",
    description:
      "Educational platform with Course, Student, and Tutor management. Role-based access control, RESTful backend integration, and responsive UI.",
    tags: ["React", "TypeScript", "Role-Based Access", "REST APIs"],
    isNDA: true,
  },
];

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    icon: "⚛️",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "Redux", level: 75 },
    ],
  },
  {
    category: "Styling & UI",
    icon: "🎨",
    skills: [
      { name: "Tailwind CSS", level: 90 },
      { name: "Responsive Design", level: 92 },
      { name: "CSS3 / SCSS", level: 85 },
      { name: "Accessibility", level: 70 },
    ],
  },
  {
    category: "Tools & Backend",
    icon: "🛠️",
    skills: [
      { name: "Node.js / Express", level: 72 },
      { name: "REST APIs", level: 88 },
      { name: "Git / GitHub", level: 85 },
      { name: "Figma", level: 70 },
      { name: "Agile / Scrum", level: 75 },
    ],
  },
];

const EXPERIENCES: Experience[] = [
  {
    role: "Software Engineer",
    company: "Aanrudix",
    dates: "Jun 2025 – Dec 2025",
    bullets: [
      "Developed responsive web interfaces using React.js and Next.js for enterprise telecom projects.",
      "Translated UI/UX designs into pixel-perfect, reusable components.",
      "Integrated frontend with REST APIs, handling complex data flows seamlessly.",
      "Collaborated in Agile environments with cross-functional teams.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "CRUD Operations Private Limited",
    dates: "Jan 2023 – Jun 2025",
    bullets: [
      "Built dynamic React frontends with modern UI patterns and seamless API integration.",
      "Optimised performance — improved page load times by ~25%.",
      "Participated in code reviews and maintained high code quality standards.",
      "Worked directly with backend teams for end-to-end feature delivery.",
    ],
  },
];

const CONTACT_FIELDS: ContactField[] = [
  {
    label: "Email",
    value: "harishdass2002@gmail.com",
    icon: "✉️",
    href: "mailto:harishdass2002@gmail.com",
  },
  { label: "Phone", value: "+91-6374994855", icon: "📞" },
  { label: "LinkedIn", value: "linkedin.com/in/harish", icon: "💼", href: "https://www.linkedin.com/in/harish-dass-aa6979228/" },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Returns true once the element has scrolled into view. */
function useInView(
  threshold = 0.15,
): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null!);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// ─── Sub-Components ───────────────────────────────────────────────────────────

/** Wraps children in a div that fades + slides up when scrolled into view. */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ${delay}ms cubic-bezier(.4,0,.2,1), transform 0.7s ${delay}ms cubic-bezier(.4,0,.2,1)`,
      }}
    >
      {children}
    </div>
  );
}

/** Animated progress bar that fills when scrolled into view. */
function SkillBar({ name, level }: Skill) {
  const [ref, inView] = useInView(0.3);
  return (
    <div
      ref={ref}
      className="flex items-center justify-between py-2.5 border-b border-[#1e2d4d] last:border-0"
    >
      <span className="text-sm text-[#c4cfe3]">{name}</span>
      <div className="w-20 h-1.5 bg-[#1e2d4d] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg,#4f6ff5,#7b8ff7)",
            width: inView ? `${level}%` : "0%",
            transition: "width 1.2s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </div>
    </div>
  );
}

/** Single project card. */
function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative bg-[#162236] border border-[#1e2d4d] rounded-[14px] p-7 flex flex-col h-full overflow-hidden"
        style={{
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          borderColor: hovered ? "rgba(79,111,245,0.4)" : "#1e2d4d",
          boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.3)" : "none",
          transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* top-edge gradient bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background: "linear-gradient(90deg,#4f6ff5,#6366f1)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s",
          }}
        />

        {/* header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="w-11 h-11 rounded-[12px] bg-[rgba(79,111,245,0.12)] border border-[rgba(79,111,245,0.2)] flex items-center justify-center text-xl">
            {project.icon}
          </div>
          {!project.isNDA && (
            <div className="flex gap-2.5">
              <a
                href={project.githubUrl}
                className="text-[#8e9bb5] hover:text-[#4f6ff5] transition-colors text-base"
              >
                ⬡
              </a>
              <a
                href={project.liveUrl}
                className="text-[#8e9bb5] hover:text-[#4f6ff5] transition-colors text-base"
              >
                ↗
              </a>
            </div>
          )}
        </div>

        {/* badge */}
        {project.isNDA ? (
          <span className="text-xs text-[#8e9bb5] italic opacity-60 mb-2">
            🔒 NDA — details limited
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 bg-[rgba(52,211,153,0.1)] border border-[rgba(52,211,153,0.25)] px-2.5 py-0.5 rounded-full text-xs text-[#34d399] font-semibold mb-2 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" /> Open
            Source
          </span>
        )}

        <h4 className="font-bold text-base mb-2">{project.title}</h4>
        <p className="text-[#8e9bb5] text-[0.84rem] leading-[1.55] flex-grow">
          {project.description}
        </p>

        {/* tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[rgba(79,111,245,0.1)] border border-[rgba(79,111,245,0.18)] px-2.5 py-0.5 rounded-md text-[0.73rem] text-[#7b8ff7] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* bottom links for open source */}
        {!project.isNDA && (
          <div className="flex gap-4 mt-4">
            <a
              href={project.githubUrl}
              className="text-[#8e9bb5] hover:text-[#4f6ff5] text-[0.82rem] transition-colors"
            >
              ⬡ GitHub
            </a>
            <a
              href={project.liveUrl}
              className="text-[#8e9bb5] hover:text-[#4f6ff5] text-[0.82rem] transition-colors"
            >
              ↗ Live Demo
            </a>
          </div>
        )}
      </div>
    </Reveal>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Portfolio() {
  // ── Nav shrink on scroll ──
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#about");

  const NAV_ITEMS = [
    ["About", "#about"],
    ["Projects", "#projects"],
    ["Skills", "#skills"],
    ["Experience", "#experience"],
    ["Education", "#education"],
    ["Contact", "#contact"],
  ];

  // smooth scroll
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveSection(id);
  };

  // scroll + active section detection
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      let current = "#about";
      NAV_ITEMS.forEach(([, id]) => {
        const section = document.querySelector(id);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);


  // ── Morphing blob keyframes injected once ──
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes morphBlob {
        0%   { border-radius: 40% 60% 55% 45% / 55% 45% 55% 45%; }
        50%  { border-radius: 55% 45% 40% 60% / 45% 55% 60% 40%; }
        100% { border-radius: 60% 40% 50% 50% / 50% 60% 40% 50%; }
      }
      @keyframes floatBadge { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
      @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.4; } }
      @keyframes scrollLine { 0%,100% { opacity:1; transform:scaleY(1); } 50% { opacity:.3; transform:scaleY(.6); } }
      @keyframes floatOrb { to { transform:translate(60px,40px) scale(1.1); } }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // ── Shared input style ──
  const inputStyle: React.CSSProperties = {
    background: "#162236",
    border: "1px solid #1e2d4d",
    borderRadius: "10px",
    padding: "13px 16px",
    color: "#fff",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
  };

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#0f1729",
        color: "#fff",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ── Google Font link ── */}
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ── Nav ── */}
      <nav
      className="fixed top-0 w-full z-[100] flex items-center justify-between"
      style={{
        padding: scrolled ? "12px 40px" : "18px 40px",
        background: "rgba(15,23,41,0.75)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(79,111,245,0.15)",
        transition: "padding 0.4s",
      }}
    >
      <span
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "1.3rem",
          color: "#4f6ff5",
        }}
      >
        HK
      </span>

      <ul className="flex gap-8 list-none">
        {NAV_ITEMS.map(([label, id]) => {
          const isActive = activeSection === id;

          return (
            <li key={id}>
              <a
                href={id}
                onClick={(e) => handleNavClick(e, id)}
                style={{
                  fontSize: "0.88rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#4f6ff5" : "#c4cfe3",
                  textDecoration: "none",
                  position: "relative",
                  cursor: "pointer",
                  transition: "color 0.25s",
                }}
              >
                {label}

                {/* underline */}
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: -6,
                    width: "100%",
                    height: 2,
                    background: "#4f6ff5",
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.3s ease",
                  }}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center"
        style={{ padding: "120px 40px 80px" }}
      >
        {/* Gradient orbs */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 500,
            height: 500,
            background: "#4f6ff5",
            filter: "blur(120px)",
            opacity: 0.18,
            top: -120,
            left: -100,
            animation: "floatOrb 8s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 400,
            height: 400,
            background: "#6366f1",
            filter: "blur(120px)",
            opacity: 0.18,
            bottom: -80,
            right: -80,
            animation: "floatOrb 8s ease-in-out infinite alternate",
            animationDelay: "-4s",
          }}
        />

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7"
          style={{
            background: "rgba(79,111,245,0.12)",
            border: "1px solid rgba(79,111,245,0.25)",
            fontSize: "0.82rem",
            color: "#7b8ff7",
            fontWeight: 500,
          }}
        >
          <span
            className="w-2 h-2 rounded-full bg-[#34d399]"
            style={{
              boxShadow: "0 0 6px #34d399",
              animation: "pulse 2s infinite",
            }}
          />
          Available for relocation · Singapore EP eligible
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.8rem, 7vw, 5.2rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-2px",
          }}
        >
          I build{" "}
          <span style={{ color: "#4f6ff5" }}>
            fast,
            <br />
            pixel-perfect
          </span>{" "}
          web apps.
        </h1>

        {/* Sub */}
        <p
          className="mt-5 max-w-xl text-[#8e9bb5]"
          style={{ fontSize: "1.08rem", lineHeight: 1.7 }}
        >
          Harish Kamaladoss — a React-focused frontend developer turning complex
          designs into responsive, high-performance interfaces. Currently open
          to roles in Singapore.
        </p>

        {/* Hero tags */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-7">
          {[
            "⚛️ React & Next.js",
            "🎨 Tailwind CSS",
            "🔧 TypeScript",
            "📍 India → Singapore",
          ].map((t) => (
            <span
              key={t}
              className="px-3.5 py-1.5 rounded-full text-[0.82rem] text-[#c4cfe3]"
              style={{ background: "#162236", border: "1px solid #1e2d4d" }}
            >
              {t}
            </span>
          ))}
        </div>

      </section>

      {/* ── Section label helper ── */}
      {/* inline below each section */}

      {/* ── About ── */}
      <section
        id="about"
        className="max-w-5.5xl mx-auto"
        style={{ padding: "100px 40px" }}
      >
        <Reveal>
          <div className="text-center mb-14">
            <span className="block text-[0.78rem] font-semibold uppercase tracking-[3px] text-[#4f6ff5] mb-2">
              About Me
            </span>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "2.4rem",
                fontWeight: 800,
                letterSpacing: "-1px",
              }}
            >
              The person behind the code
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <Reveal className="flex justify-center">
            <div className="relative flex items-center justify-center">
              <div
                className="flex items-center justify-center"
                style={{
                  width: 260,
                  height: 260,
                  background: "linear-gradient(135deg,#4f6ff5,#6366f1)",
                  animation: "morphBlob 8s ease-in-out infinite alternate",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: "90%",
                    height: "90%",
                    background: "#162236",
                    fontSize: "4.5rem",
                    borderRadius: "inherit",
                  }}
                >
                  👨‍💻
                </div>
              </div>
              {/* floating badges */}
              <div
                className="absolute flex items-center gap-2 px-3 py-2 rounded-[12px] text-[0.78rem] font-semibold whitespace-nowrap"
                style={{
                  background: "#162236",
                  border: "1px solid #1e2d4d",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                  top: 10,
                  right: -30,
                  animation: "floatBadge 4s ease-in-out infinite",
                }}
              >
                <span>⚡</span> 2+ yrs experience
              </div>
              <div
                className="absolute flex items-center gap-2 px-3 py-2 rounded-[12px] text-[0.78rem] font-semibold whitespace-nowrap"
                style={{
                  background: "#162236",
                  border: "1px solid #1e2d4d",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                  bottom: 20,
                  left: -40,
                  animation: "floatBadge 5s ease-in-out infinite reverse",
                }}
              >
                <span>📍</span> Open to relocation
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={150}>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "1.8rem",
                fontWeight: 800,
                marginBottom: 18,
              }}
            >
              Hey there 👋
            </h3>
            <p className="text-[#8e9bb5] text-[0.95rem] mb-4">
              I'm a frontend developer who genuinely enjoys the craft — turning
              a rough Figma mockup into something that feels alive in the
              browser. I care about the details: smooth transitions,
              pixel-perfect layouts, and code that the next developer won't
              curse.
            </p>
            <p className="text-[#8e9bb5] text-[0.95rem] mb-4">
              With <span className="text-white font-semibold">2+ years</span> in
              production React apps, I've worked across the stack — from
              building enterprise dashboards to{" "}
              <span className="text-white font-semibold">
                optimising page load times by 25%
              </span>
              . I thrive in cross-functional teams and love collaborating
              closely with designers and backend engineers.
            </p>
            <p className="text-[#8e9bb5] text-[0.95rem]">
              When I'm not coding, I'm experimenting with new frameworks or
              diving into{" "}
              <span className="text-white font-semibold">
                performance optimisation
              </span>{" "}
              and{" "}
              <span className="text-white font-semibold">accessibility</span> —
              because great UX shouldn't be a privilege.
            </p>
            {/* highlight box */}
            <div
              className="mt-6 px-5 py-4 rounded-r-[10px] text-[0.88rem] text-[#c4cfe3]"
              style={{
                background: "rgba(79,111,245,0.08)",
                borderLeft: "3px solid #4f6ff5",
              }}
            >
              📌 I'm currently{" "}
              <span style={{ color: "#34d399", fontWeight: 600 }}>
                open to opportunities
              </span>{" "}
              in Singapore. Eligible for an Employment Pass (EP) and ready to
              relocate immediately.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Projects ── */}
      <section
        id="projects"
        className="max-w-5.5xl mx-auto"
        style={{ padding: "100px 40px" }}
      >
        <Reveal>
          <div className="text-center mb-14">
            <span className="block text-[0.78rem] font-semibold uppercase tracking-[3px] text-[#4f6ff5] mb-2">
              Projects
            </span>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "2.4rem",
                fontWeight: 800,
                letterSpacing: "-1px",
              }}
            >
              What I've built
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-3 gap-5">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      {/* ── Skills ── */}
      <section
        id="skills"
        className="max-w-5.5xl mx-auto"
        style={{ padding: "100px 40px" }}
      >
        <Reveal>
          <div className="text-center mb-14">
            <span className="block text-[0.78rem] font-semibold uppercase tracking-[3px] text-[#4f6ff5] mb-2">
              Skills
            </span>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "2.4rem",
                fontWeight: 800,
                letterSpacing: "-1px",
              }}
            >
              Technologies I work with
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-3 gap-5">
          {SKILL_GROUPS.map((group) => (
            <Reveal key={group.category}>
              <div className="bg-[#162236] border border-[#1e2d4d] rounded-[14px] p-6">
                <h4 className="text-[0.9rem] font-bold text-[#4f6ff5] uppercase tracking-[1px] mb-5">
                  {group.icon} {group.category}
                </h4>
                {group.skills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Experience ── */}
      <section
        id="experience"
        className="max-w-5.5xl mx-auto"
        style={{ padding: "100px 40px" }}
      >
        <Reveal>
          <div className="text-center mb-14">
            <span className="block text-[0.78rem] font-semibold uppercase tracking-[3px] text-[#4f6ff5] mb-2">
              Experience
            </span>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "2.4rem",
                fontWeight: 800,
                letterSpacing: "-1px",
              }}
            >
              Where I've worked
            </h2>
          </div>
        </Reveal>

        <div className="relative" style={{ paddingLeft: 40 }}>
          {/* vertical line */}
          <div
            className="absolute"
            style={{
              left: 16,
              top: 0,
              bottom: 0,
              width: 2,
              background: "linear-gradient(to bottom,#4f6ff5,transparent)",
            }}
          />

          {EXPERIENCES.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 100}>
              <div className="relative mb-11 last:mb-0">
                {/* dot */}
                <div
                  className="absolute"
                  style={{
                    left: -32,
                    top: 6,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#4f6ff5",
                    border: "3px solid #0f1729",
                    boxShadow: "0 0 10px rgba(79,111,245,0.5)",
                  }}
                />

                <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                  <h4 className="font-bold text-[1.05rem]">{exp.role}</h4>
                  <span
                    className="text-[0.8rem] text-[#4f6ff5] px-2.5 py-1 rounded-md"
                    style={{ background: "rgba(79,111,245,0.1)" }}
                  >
                    {exp.dates}
                  </span>
                </div>
                <p className="text-[#7b8ff7] text-[0.88rem] font-medium mb-2">
                  {exp.company}
                </p>
                <ul className="text-[#8e9bb5] text-[0.84rem] leading-[1.7] space-y-1">
                  {exp.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="relative"
                      style={{ paddingLeft: 18 }}
                    >
                      <span
                        className="absolute text-[#4f6ff5]"
                        style={{ left: 0 }}
                      >
                        ▸
                      </span>{" "}
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Education ── */}
      <section
        id="education"
        className="max-w-5.5xl mx-auto"
        style={{ padding: "100px 40px" }}
      >
        <Reveal>
          <div className="text-center mb-14">
            <span className="block text-[0.78rem] font-semibold uppercase tracking-[3px] text-[#4f6ff5] mb-2">
              Education
            </span>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "2.4rem",
                fontWeight: 800,
                letterSpacing: "-1px",
              }}
            >
              Academic background
            </h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="flex gap-8 items-start bg-[#162236] border border-[#1e2d4d] rounded-[14px] p-9">
            <div
              className="w-16 h-16 flex-shrink-0 rounded-[16px] flex items-center justify-center text-[1.8rem]"
              style={{
                background: "rgba(79,111,245,0.12)",
                border: "1px solid rgba(79,111,245,0.2)",
              }}
            >
              🎓
            </div>
            <div>
              <h4 className="font-bold text-[1.1rem] mb-1">
                Bachelor of Technology (B.Tech)
              </h4>
              <p className="text-[#7b8ff7] text-[0.88rem] font-medium mb-1">
                Information Technology
              </p>
              <p className="text-[#8e9bb5] text-[0.84rem] mb-3.5">
                Mookaambika College of Engineering, India
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "💡 Computer Science Foundation",
                  "🌐 Web Technologies",
                  "🧩 Problem Solving",
                  "⭐ Academic Excellence",
                ].map((h) => (
                  <span
                    key={h}
                    className="px-3 py-1 rounded-md text-[0.78rem] text-[#c4cfe3]"
                    style={{
                      background: "rgba(79,111,245,0.08)",
                      border: "1px solid rgba(79,111,245,0.15)",
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="max-w-5.5xl mx-auto"
        style={{ padding: "100px 40px" }}
      >
        <Reveal>
          <div className="text-center mb-14">
            <span className="block text-[0.78rem] font-semibold uppercase tracking-[3px] text-[#4f6ff5] mb-2">
              Contact
            </span>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "2.4rem",
                fontWeight: 800,
                letterSpacing: "-1px",
              }}
            >
              Let's work together
            </h2>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <div className="flex flex-col w-full text-center justify-center">
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  marginBottom: 14,
                }}
              >
                Get in touch
              </h3>

              <p className="text-[#8e9bb5] text-[0.93rem] mb-10">
                I'm currently open to new opportunities, especially in
                Singapore.
                <br /> If you think we'd be a good fit, feel free to reach out
                directly — I usually respond within a day.
              </p>
            </div>
            {/* Contact cards */}
            <div className="flex gap-5 items-center">
              {CONTACT_FIELDS.map((field) => (
                <a
                  key={field.label}
                  href={field.href || "#"}
                  className="w-full flex items-center gap-4 px-5 py-4 rounded-[14px] no-underline"
                  style={{
                    background: "#162236",
                    border: "1px solid #1e2d4d",
                    transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
                  }}
                  target="_blank"
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "#4f6ff5";
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = "0 12px 30px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "#1e2d4d";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-[12px] flex items-center justify-center text-[1.1rem]"
                    style={{
                      background: "rgba(79,111,245,0.12)",
                      border: "1px solid rgba(79,111,245,0.25)",
                    }}
                  >
                    {field.icon}
                  </div>

                  <div className="text-left">
                    <div className="text-[0.75rem] text-[#8e9bb5] uppercase tracking-[1px]">
                      {field.label}
                    </div>
                    <div className="text-[0.95rem] font-medium text-white">
                      {field.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* CTA */}
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="border-t border-[#1e2d4d] text-center text-[#8e9bb5]"
        style={{ padding: "32px 40px", fontSize: "0.82rem" }}
      >
        © 2026 Harish Kamaladoss · Built with care
      </footer>
    </div>
  );
}
