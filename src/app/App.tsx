import { useState, useEffect, useRef, memo, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "motion/react";
import {
  Download, ExternalLink, Mail, MapPin, Phone, Code2, Sparkles,
  Briefcase, FileCode, Database, Layout, Zap, Terminal, Cpu,
  Layers, Globe, ArrowRight, Heart, GraduationCap, Award, CheckCircle2,
} from "lucide-react";

// --- Optimized Background Components (Memoized to prevent re-renders) ---

const FloatingParticles = memo(() => {
  const particles = useMemo(() => [...Array(20)], []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
          }}
          animate={{
            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
});

const AnimatedGrid = memo(() => (
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
));

const CodeRain = memo(() => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]()";
  const columns = 15;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {[...Array(columns)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-blue-500 font-mono text-xs"
          style={{ left: `${(i / columns) * 100}%`, willChange: 'transform' }}
          initial={{ y: -100 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: Math.random() * 3 + 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
        >
          {chars[Math.floor(Math.random() * chars.length)]}
        </motion.div>
      ))}
    </div>
  );
});

// --- UI Components ---

function SkillBadge({ skill, index, groupIndex }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay: groupIndex * 0.05 + index * 0.02,
      }}
      whileHover={{
        scale: 1.1,
        y: -2,
        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)",
      }}
      className="px-4 py-2 bg-white text-slate-700 rounded-lg shadow-sm text-sm cursor-default border border-slate-100 transition-colors hover:border-blue-200"
    >
      {skill}
    </motion.span>
  );
}

function AnimatedIcon({ Icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.2, rotate: 360 }}
    >
      <Icon className="w-8 h-8 text-blue-500" />
    </motion.div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Optimized Intersection Observer for Section Tracking
  useEffect(() => {
    const options = { rootMargin: "-40% 0px -40% 0px", threshold: 0 };
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    const sections = ["hero", "about", "projects", "skills", "experience", "education", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => scrollToSection('hero')}>
            HK
          </motion.div>
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
                  <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
        <FloatingParticles />
        <CodeRain />
        <AnimatedGrid />
        
        {/* Floating Code Snippets */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 hidden lg:block">
          {[
            { code: "const render = () => {}", top: "15%", left: "10%", delay: 0 },
            { code: "<Component />", top: "25%", right: "15%", delay: 0.5 },
            { code: "useState()", top: "60%", left: "8%", delay: 1 },
            { code: "useEffect(() => {})", top: "70%", right: "12%", delay: 1.5 },
          ].map((snippet, index) => (
            <motion.div
              key={index}
              className="absolute text-blue-600 font-mono text-sm bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded shadow-lg"
              style={{ top: snippet.top, left: snippet.left, right: snippet.right }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: snippet.delay }}
            >
              {snippet.code}
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl w-full text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Sparkles className="w-8 h-8 text-blue-500 mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900">
              Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Harish Kamaladoss</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-slate-700 font-light mb-8">Frontend Developer (React.js)</h2>
            
            <div className="flex items-center justify-center gap-6 mb-12">
              {[Code2, Terminal, Database, Zap].map((Icon, i) => (
                <motion.div key={i} whileHover={{ scale: 1.2, rotate: 10 }}>
                  <Icon className="w-8 h-8 text-blue-500/70" />
                </motion.div>
              ))}
            </div>
            
            <p className="text-lg text-slate-600 flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" /> India | Open to Singapore Relocation
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <Cpu className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl font-bold">About Me</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Frontend Developer with 2+ years of experience building responsive, high-performance web applications using React.js, JavaScript (ES6+), and modern frontend tooling. Strong experience translating UI/UX designs into reusable, pixel-perfect components, integrating REST APIs, and optimizing applications for performance.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Proficient in <span className="font-bold text-slate-900">React.js, Next.js, TypeScript, Tailwind CSS, and Redux</span>. Eligible for Employment Pass (EP) sponsorship in Singapore and open to immediate relocation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-slate-500">(Projects are private and under NDA)</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "USIL, BOSS IM",
                problem: "Enterprise React-based dashboard to monitor telecom circuits and devices used in US telecom operations",
                tech: ["Next.js", "Redux","TypeScript", "Tailwind CSS", "REST APIs"],
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
            ].map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-blue-600">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: "Frontend", skills: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"] },
              { category: "Styling & UI", skills: ["Tailwind CSS", "Responsive Design", "Accessibility", "Framer Motion"] },
              { category: "State & Data", skills: ["Redux", "Context API", "REST APIs", "JSON"] },
              { category: "Backend", skills: ["Node.js", "Express.js", "API Integration"] },
              { category: "Tools", skills: ["Git", "GitHub", "Vite", "Agile/Scrum", "Code Reviews"] },
            ].map((group, i) => (
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
          <h2 className="text-4xl font-bold text-center mb-16">Professional Experience</h2>
          <div className="space-y-12">
            {[
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
            ].map((job, i) => (
              <motion.div 
                key={job.company} 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-blue-200"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white" />
                <h3 className="text-xl font-bold">{job.company}</h3>
                <div className="flex justify-between text-sm text-blue-600 font-medium mb-4">
                  <span>{job.role}</span>
                  <span>{job.period}</span>
                </div>
                <ul className="space-y-2 text-slate-600 text-sm">
                  {job.bullets.map((b, bi) => <li key={bi} className="flex gap-2"><span>•</span>{b}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Education</h2>
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 shadow-sm"
          >
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
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
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
                className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10"
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