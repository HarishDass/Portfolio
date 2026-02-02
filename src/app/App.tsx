import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import {
  Download, ExternalLink, Mail, MapPin, Phone, Code2, Sparkles,
  Briefcase, FileCode, Database, Layout, Zap, Terminal, Cpu,
  Layers, Globe, ArrowRight, Heart, GraduationCap, Award, CheckCircle2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

// --- Background Components ---

function FloatingParticles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const particles = containerRef.current.querySelectorAll('.particle');
    
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        x: () => `${gsap.utils.random(-100, 100)}%`,
        y: () => `${gsap.utils.random(-100, 100)}%`,
        duration: gsap.utils.random(10, 20),
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: i * 0.2
      });
    });
  }, []);
  useEffect(() => {
  gsap.utils.toArray(".experience-item").forEach((item) => {
    const bullets = item.querySelectorAll("li");

    gsap.from(item, {
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
      },
    });

    gsap.from(bullets, {
      opacity: 0,
      x: -20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 75%",
      },
    });
  });
}, []);
useEffect(() => {
  gsap.utils.toArray(".contact-card").forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: i * 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
    });

    gsap.to(card, {
      y: -6,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.3,
    });
  });
}, []);
useEffect(() => {
  gsap.utils.toArray("#skills .p-6").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(card, {
        rotationY: x / 20,
        rotationX: -y / 20,
        transformPerspective: 800,
        duration: 0.3,
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.4,
      });
    });
  });
}, []);
useEffect(() => {
  gsap.utils.toArray("nav button").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { y: -2, duration: 0.2 });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { y: 0, duration: 0.2 });
    });
  });
}, []);


  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

function CodeRain() {
  const containerRef = useRef(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]()";

  useEffect(() => {
    const columns = containerRef.current.querySelectorAll('.code-column');
    
    columns.forEach((col, i) => {
      gsap.to(col, {
        y: "100vh",
        duration: gsap.utils.random(4, 7),
        repeat: -1,
        delay: i * 0.3,
        ease: "none",
        onRepeat: function() {
          col.textContent = chars[Math.floor(Math.random() * chars.length)];
        }
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="code-column absolute text-blue-500 font-mono text-xs"
          style={{ left: `${(i / 15) * 100}%` }}
        >
          {chars[Math.floor(Math.random() * chars.length)]}
        </div>
      ))}
    </div>
  );
}

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="w-full h-full">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-300" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

// --- UI Components ---

function SkillBadge({ skill, index, groupIndex }) {
  const badgeRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(badgeRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        delay: groupIndex * 0.05 + index * 0.02,
        scrollTrigger: {
          trigger: badgeRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );

    // Hover animation
    const badge = badgeRef.current;
    badge.addEventListener('mouseenter', () => {
      gsap.to(badge, {
        scale: 1.1,
        y: -4,
        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    });
    badge.addEventListener('mouseleave', () => {
      gsap.to(badge, {
        scale: 1,
        y: 0,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
  }, [index, groupIndex]);

  return (
    <span
      ref={badgeRef}
      className="inline-block px-4 py-2 bg-white text-slate-700 rounded-lg shadow-sm text-sm cursor-default border border-slate-100"
    >
      {skill}
    </span>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    // Scroll reveal animation
    gsap.fromTo(card,
      { opacity: 0, y: 50, rotationX: -15 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // Interactive hover effects
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(card.querySelector('.project-icon'), {
        scale: 1.2,
        rotation: 360,
        duration: 0.6,
        ease: "back.out(1.7)"
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(card.querySelector('.project-icon'), {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    });

    // Parallax effect on scroll
    gsap.to(card, {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
      style={{ perspective: "1000px" }}
    >
      <div className="project-icon w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-blue-600">
        <project.icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold mb-3">{project.name}</h3>
      <p className="text-slate-600 text-sm mb-4 leading-relaxed">{project.problem}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase rounded">{t}</span>
        ))}
      </div>
      <div className="space-y-2 mb-6">
        {project.highlights.map((h) => (
          <div key={h} className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-3 h-3 text-green-500" /> {h}
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400 italic">Key Contributions: {project.contribution}</p>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const progressBarRef = useRef(null);
  const heroRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  // Custom cursor with GSAP
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('button, a, .skill-badge, .project-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 1.5, duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
      });
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  // Progress bar animation
  useEffect(() => {
    gsap.to(progressBarRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
      }
    });
  }, []);

  // Hero animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.from(heroRef.current.querySelector('.hero-icon'), {
      scale: 0,
      rotation: -180,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
    .from(heroRef.current.querySelector('h1'), {
      opacity: 0,
      y: 50,
      duration: 1
    }, "-=0.4")
    .from(heroRef.current.querySelector('h2'), {
      opacity: 0,
      y: 30,
      duration: 0.8
    }, "-=0.6")
    .from(heroRef.current.querySelectorAll('.hero-icon-small'), {
      scale: 0,
      rotation: 360,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .from(heroRef.current.querySelector('.hero-location'), {
      opacity: 0,
      y: 20,
      duration: 0.6
    }, "-=0.3");

    // Floating animation for hero icons
    gsap.to(heroRef.current.querySelectorAll('.hero-icon-small'), {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      ease: "sine.inOut"
    });

    // Code snippets floating animation
    const snippets = heroRef.current.querySelectorAll('.code-snippet');
    snippets.forEach((snippet, i) => {
      gsap.fromTo(snippet,
        { opacity: 0, y: 50 },
        {
          opacity: 0.2,
          y: 0,
          duration: 1,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: snippet,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.to(snippet, {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5
      });
    });
  }, []);

  // Section tracking with Intersection Observer
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${sectionId}`, offsetY: 80 },
      ease: "power3.inOut"
    });
  };

  // Text animations for section titles
  useEffect(() => {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach((title) => {
      gsap.from(title, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Split text animation (optional, for dramatic effect)
      const text = title.textContent;
      title.innerHTML = text.split('').map(char => 
        `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');

      gsap.from(title.querySelectorAll('span'), {
        opacity: 0,
        y: 50,
        rotationX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });
  }, []);

  const projects = [
    {
      name: "USIL, BOSS IM",
      problem: "Enterprise React-based dashboard to monitor telecom circuits and devices used in US telecom operations",
      tech: ["Next.js", "Redux", "TypeScript", "Tailwind CSS", "REST APIs"],
      contribution: "Built dynamic forms, interactive maps, and real-time data visualizations. Optimized UI performance by improving component structure (25% improvement)",
      icon: Globe,
      highlights: ["Real-time Monitoring", "Interactive Maps", "Performance Optimized"],
    },
    {
      name: "CRUD Beat",
      problem: "Full-stack application with React frontend integrated with Express REST APIs for comprehensive CRUD operations",
      tech: ["React.js", "Express.js", "REST APIs", "Node.js"],
      contribution: "Developed dashboards, landing pages, and data-driven UI components. Implemented loading, success, and error states for improved UX",
      icon: Database,
      highlights: ["Full CRUD Operations", "Clean Architecture", "API Integration"],
    },
    {
      name: "CRUD Academy",
      problem: "Educational platform with Course, Student, and Tutor management featuring role-based access control",
      tech: ["React.js", "TypeScript", "Role-based Access"],
      contribution: "Built frontend modules with reusable UI components. Implemented role-based access control and collaborated with backend for API integration",
      icon: Layout,
      highlights: ["Role-based Access", "Modular Design", "Secure Flows"],
    },
  ];

  const skillGroups = [
    { category: "Frontend", skills: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"] },
    { category: "Styling & UI", skills: ["Tailwind CSS", "Responsive Design", "Accessibility", "GSAP"] },
    { category: "State & Data", skills: ["Redux", "Context API", "REST APIs", "JSON"] },
    { category: "Backend", skills: ["Node.js", "Express.js", "API Integration"] },
    { category: "Tools", skills: ["Git", "GitHub", "Vite", "Agile/Scrum", "Code Reviews"] },
  ];

  const experiences = [
    {
      company: "Aanrudix",
      role: "Software Engineer",
      period: "Jun 2025 – Dec 2025",
      location: "Chennai, India",
      bullets: [
        "Developed responsive web interfaces using React.js and Next.js for enterprise telecom projects",
        "Translated UI/UX designs into pixel-perfect, reusable components",
        "Integrated frontend with REST APIs, handling complex data flows",
        "Optimized performance, improving page load times by ~25%",
        "Collaborated in Agile environments with cross-functional teams"
      ]
    },
    {
      company: "CRUD Operations Private Limited",
      role: "Associate Software Engineer",
      period: "Jun 2023 – Jun 2025",
      location: "Chennai, India",
      bullets: [
        "Built dynamic React frontend applications with modern UI patterns",
        "Implemented role-based UI rendering and secure auth flows",
        "Participated in code reviews to maintain high code quality",
        "Worked directly with backend teams for seamless API integration"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 cursor-none selection:bg-blue-100">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="hidden lg:block fixed w-8 h-8 border-2 border-blue-500 rounded-full pointer-events-none z-[200] -translate-x-1/2 -translate-y-1/2" />
      <div ref={cursorDotRef} className="hidden lg:block fixed w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-[200] -translate-x-1/2 -translate-y-1/2" />

      {/* Progress Bar */}
      <div 
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            className="text-xl font-bold text-blue-600 cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            HK
          </div>
          <div className="hidden md:flex gap-8">
            {["About", "Projects", "Skills", "Experience", "Education", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === item.toLowerCase() ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="hero" 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden"
      >
        <FloatingParticles />
        <CodeRain />
        <AnimatedGrid />
        
        {/* Floating Code Snippets */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
          {[
            { code: "const render = () => {}", top: "15%", left: "10%" },
            { code: "<Component />", top: "25%", right: "15%" },
            { code: "useState()", top: "60%", left: "8%" },
            { code: "useEffect(() => {})", top: "70%", right: "12%" },
          ].map((snippet, index) => (
            <div
              key={index}
              className="code-snippet absolute text-blue-600 font-mono text-sm bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded shadow-lg"
              style={{ top: snippet.top, left: snippet.left, right: snippet.right }}
            >
              {snippet.code}
            </div>
          ))}
        </div>

        <div className="max-w-4xl w-full text-center relative z-10">
          <div>
            <Sparkles className="hero-icon w-8 h-8 text-blue-500 mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900">
              Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Harish Kamaladoss</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-slate-700 font-light mb-8">Frontend Developer (React.js)</h2>
            
            <div className="flex items-center justify-center gap-6 mb-12">
              {[Code2, Terminal, Database, Zap].map((Icon, i) => (
                <Icon key={i} className="hero-icon-small w-8 h-8 text-blue-500/70" />
              ))}
            </div>
            
            <p className="hero-location text-lg text-slate-600 flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" /> India | Open to Singapore Relocation
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Cpu className="w-8 h-8 text-blue-600" />
              <h2 className="section-title text-4xl font-bold">About Me</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Frontend Developer with 2+ years of experience building responsive, high-performance web applications using React.js, JavaScript (ES6+), and modern frontend tooling. Strong experience translating UI/UX designs into reusable, pixel-perfect components, integrating REST APIs, and optimizing applications for performance.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Proficient in <span className="font-bold text-slate-900">React.js, Next.js, TypeScript, Tailwind CSS, and Redux</span>. Eligible for Employment Pass (EP) sponsorship in Singapore and open to immediate relocation.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-slate-500">(Projects are private and under NDA)</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-4xl font-bold text-center mb-16">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group, i) => (
              <div key={group.category} className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                <h3 className="font-bold mb-4 text-blue-600">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => (
                    <SkillBadge key={skill} skill={skill} index={si} groupIndex={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-4xl font-bold text-center mb-16">Professional Experience</h2>
          <div className="space-y-12">
            {experiences.map((job, i) => (
              <div 
                key={job.company}
                className="experience-item relative pl-8 border-l-2 border-blue-200"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white" />
                <h3 className="text-xl font-bold">{job.company}</h3>
                <div className="flex justify-between text-sm text-blue-600 font-medium mb-4">
                  <span>{job.role}</span>
                  <span>{job.period}</span>
                </div>
                <ul className="space-y-2 text-slate-600 text-sm">
                  {job.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-2">
                      <span>•</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-4xl font-bold text-center mb-16">Education</h2>
          <div className="education-card p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 shadow-sm">
            <div className="flex items-start gap-6">
              <GraduationCap className="w-12 h-12 text-blue-600" />
              <div>
                <h3 className="text-2xl font-bold mb-1">Bachelor of Technology (BTech)</h3>
                <p className="text-blue-600 font-semibold mb-2">Information Technology</p>
                <p className="text-slate-600 mb-4">Mookambigai College of Engineering, India</p>
                <div className="grid grid-cols-2 gap-4">
                  {["Computer Science Foundation", "Web Technologies", "Problem Solving", "Academic Excellence"].map(q => (
                    <div key={q} className="flex items-center gap-2 text-sm text-slate-500">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> {q}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title text-4xl font-bold mb-6">Get In Touch</h2>
          <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
            I'm currently open to new opportunities, especially in Singapore. Eligible for Employment Pass (EP) sponsorship and available for immediate relocation.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Mail, label: "Email", value: "harishdaas2002@gmail.com", href: "mailto:harishdaas2002@gmail.com" },
              { icon: Phone, label: "Phone", value: "+91-6374094085", href: "tel:+916374094085" },
              { icon: ExternalLink, label: "LinkedIn", value: "Connect Online", href: "https://www.linkedin.com/in/harish-dass-aa6979228/" }
            ].map((c) => (
              <a 
                key={c.label} 
                href={c.href}
                target={c.label === "LinkedIn" ? "_blank" : "_self"}
                rel="noreferrer"
                className="contact-card p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10"
              >
                <c.icon className="w-6 h-6 text-blue-400 mx-auto mb-4" />
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">{c.label}</div>
                <div className="text-sm font-medium">{c.value}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}