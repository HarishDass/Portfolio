import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "motion/react";
import {
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Code2,
  Sparkles,
  Briefcase,
  FileCode,
  Database,
  Layout,
  Zap,
  Terminal,
  Cpu,
  Layers,
  Globe,
  ArrowRight,
  Heart,
  GraduationCap,
  Award,
  CheckCircle2,
} from "lucide-react";


// Floating Particles Component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
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
}

// Animated Background Grid
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="w-full h-full">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <motion.path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-blue-300"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

// Code Rain Effect
function CodeRain() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]()";
  const columns = 20;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {[...Array(columns)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-blue-500 font-mono text-xs"
          style={{ left: `${(i / columns) * 100}%` }}
          initial={{ y: -100 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {chars[Math.floor(Math.random() * chars.length)]}
        </motion.div>
      ))}
    </div>
  );
}

// Skill Badge with Animation
function SkillBadge({ skill, index, groupIndex }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: groupIndex * 0.1 + index * 0.05,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.15,
        y: -5,
        rotateZ: [0, -5, 5, 0],
        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
      }}
      className="px-4 py-2 bg-white text-slate-700 rounded-lg shadow-sm text-sm cursor-default hoverable relative overflow-hidden group"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{skill}</span>
    </motion.span>
  );
}

// Animated Icon
function AnimatedIcon({ Icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 200,
        damping: 10,
      }}
      whileHover={{
        scale: 1.2,
        rotate: 360,
        transition: { duration: 0.5 },
      }}
    >
      <Icon className="w-8 h-8 text-blue-500" />
    </motion.div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "projects",
        "skills",
        "experience",
        "education",
        "contact",
      ];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white relative overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="text-xl font-semibold text-slate-800 hoverable"
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              animate={{
                color: ["#1e293b", "#2563eb", "#7c3aed", "#1e293b"],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              HK
            </motion.span>
          </motion.div>
          <div className="hidden md:flex gap-8">
            {[
              "About",
              "Projects",
              "Skills",
              "Experience",
              "Education",
              "Contact",
            ].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm transition-colors hoverable relative ${
                  activeSection === item.toLowerCase()
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden"
      >
        <FloatingParticles />
        <CodeRain />
        <AnimatedGrid />

        {/* Floating Code Snippets */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {[
            {
              code: "const render = () => {}",
              top: "15%",
              left: "10%",
              delay: 0,
            },
            { code: "<Component />", top: "25%", right: "15%", delay: 0.5 },
            { code: "useState()", top: "60%", left: "8%", delay: 1 },
            {
              code: "useEffect(() => {})",
              top: "70%",
              right: "12%",
              delay: 1.5,
            },
            { code: "npm install", top: "40%", left: "5%", delay: 2 },
            { code: "git commit -m", top: "50%", right: "8%", delay: 2.5 },
          ].map((snippet, index) => (
            <motion.div
              key={index}
              className="absolute text-blue-600 font-mono text-xs md:text-sm bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded shadow-lg"
              style={{
                top: snippet.top,
                left: snippet.left,
                right: snippet.right,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: snippet.delay,
                ease: "easeInOut",
              }}
            >
              {snippet.code}
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl w-full text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-block mb-4"
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.2, 1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <Sparkles className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl mb-6 text-slate-900">
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Hi, I'm{" "}
              </motion.span>
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                Harish Kamaladoss
              </motion.span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-4"
          >
            <motion.h2
              className="text-2xl md:text-3xl text-slate-700"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Frontend Developer (React.js)
            </motion.h2>

            {/* Tech Stack Icons Animation */}
            <motion.div className="flex items-center justify-center gap-4 mt-6">
              {[
                { Icon: Code2, color: "text-blue-500", delay: 0 },
                { Icon: Terminal, color: "text-green-500", delay: 0.1 },
                { Icon: Database, color: "text-purple-500", delay: 0.2 },
                { Icon: Zap, color: "text-yellow-500", delay: 0.3 },
              ].map(({ Icon, color, delay }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.6 + delay,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  className="hoverable"
                >
                  <Icon className={`w-7 h-7 ${color}`} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-slate-600 mb-12 flex items-center justify-center gap-2"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="w-5 h-5" />
            </motion.div>
            India | Open to Singapore Relocation
          </motion.p>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 px-6 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden"
      >
        <FloatingParticles />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div className="flex items-center justify-center gap-3 mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Cpu className="w-8 h-8 text-blue-600" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl text-slate-900"
              >
                About Me
              </motion.h2>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Terminal className="w-8 h-8 text-purple-600" />
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-slate-600 leading-relaxed mb-4"
            >
              Frontend Developer with 2+ years of experience building
              responsive, high-performance web applications using React.js,
              JavaScript (ES6+), and modern frontend tooling. Strong experience
              translating UI/UX designs into reusable, pixel-perfect components,
              integrating REST APIs, and optimizing applications for performance
              and scalability.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-slate-600 leading-relaxed"
            >
              Experienced working with cross-functional teams in Agile
              environments. Proficient in{" "}
              <motion.strong
                className="text-slate-900"
                whileHover={{ scale: 1.05, color: "#2563eb" }}
                style={{ display: "inline-block" }}
              >
                React.js, Next.js, TypeScript, Tailwind CSS, Redux, and REST
                APIs
              </motion.strong>
              . Eligible for Employment Pass (EP) sponsorship in Singapore and
              open to immediate relocation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
      >
        {/* Diagonal Stripes Pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="w-full h-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #3b82f6 0px, #3b82f6 20px, transparent 20px, transparent 40px)",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "40px 40px"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
        <AnimatedGrid />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div className="flex items-center justify-center gap-3 mb-4">
              <AnimatedIcon Icon={Briefcase} delay={0.2} />
              <h2 className="text-4xl text-slate-900">Featured Projects</h2>
            </motion.div>
            <motion.p
              className="text-lg text-slate-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Enterprise and production applications I've built
            </motion.p>
            <motion.p
              className="text-sm text-slate-500 mt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              (Projects are private and under NDA)
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "USIL, BOSS IM",
                problem:
                  "Enterprise React-based dashboard to monitor telecom circuits and devices used in US telecom operations",
                tech: ["React.js", "Redux", "Tailwind CSS", "REST APIs"],
                contribution:
                  "Built dynamic forms, interactive maps, and real-time data visualizations. Optimized UI performance by improving component structure and reducing unnecessary re-renders (25% improvement)",
                icon: Globe,
                highlights: [
                  "Real-time Monitoring",
                  "Interactive Maps",
                  "Performance Optimized",
                ],
              },
              {
                name: "CRUD Beat",
                problem:
                  "Full-stack application with React frontend integrated with Express REST APIs for comprehensive CRUD operations",
                tech: ["React.js", "Express.js", "REST APIs", "Node.js"],
                contribution:
                  "Developed dashboards, landing pages, and data-driven UI components. Implemented loading, success, and error states for improved UX",
                icon: Database,
                highlights: [
                  "Full CRUD Operations",
                  "Clean Architecture",
                  "API Integration",
                ],
              },
              {
                name: "CRUD Academy",
                problem:
                  "Educational platform with Course, Student, and Tutor management featuring role-based access control",
                tech: [
                  "React.js",
                  "Next.js",
                  "TypeScript",
                  "Role-based Access",
                ],
                contribution:
                  "Built frontend modules with reusable UI components. Implemented role-based access control and collaborated with backend for API integration",
                icon: Layout,
                highlights: [
                  "Role-based Access",
                  "Modular Design",
                  "Secure Flows",
                ],
              },
            ].map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 50, rotateY: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -12,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                  rotateY: 5,
                }}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hoverable group"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                  <div className="w-full h-full flex items-center justify-center relative">
                    <motion.div
                      animate={{
                        y: [0, -15, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative z-10"
                    >
                      <project.icon className="w-24 h-24 text-blue-400 opacity-60" />
                    </motion.div>

                    {/* Orbiting Icons */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0"
                    >
                      {[0, 120, 240].map((angle, i) => (
                        <motion.div
                          key={i}
                          className="absolute top-1/2 left-1/2"
                          style={{
                            transform: `rotate(${angle}deg) translateX(60px)`,
                          }}
                        >
                          <Code2 className="w-6 h-6 text-purple-400 opacity-40" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />

                  {/* Private Project Badge */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="text-white/90 text-sm font-medium bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      Private Project
                    </motion.span>
                  </div>
                </div>

                <div className="p-6">
                  <motion.h3
                    className="text-xl mb-3 text-slate-900 font-semibold"
                    whileHover={{ x: 5, color: "#2563eb" }}
                  >
                    {project.name}
                  </motion.h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {project.problem}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.highlights.map((highlight, i) => (
                      <motion.span
                        key={highlight}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                        className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {highlight}
                      </motion.span>
                    ))}
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs hoverable font-medium"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-500 text-xs mb-4">
                    <strong className="text-slate-700">
                      Key Contributions:
                    </strong>{" "}
                    {project.contribution}
                  </p>

                  <motion.div
                    className="flex items-center gap-2 text-blue-600 text-sm font-medium group-hover:gap-3 transition-all"
                    whileHover={{ x: 5 }}
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-24 px-6 bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/30 relative overflow-hidden"
      >
        {/* Hexagon Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hexagons"
                x="0"
                y="0"
                width="50"
                height="43.4"
                patternUnits="userSpaceOnUse"
              >
                <motion.polygon
                  points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>
        <CodeRain />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div className="flex items-center justify-center gap-3 mb-4">
              <AnimatedIcon Icon={Layers} delay={0.2} />
              <h2 className="text-4xl text-slate-900">Skills & Technologies</h2>
            </motion.div>
            <motion.p
              className="text-lg text-slate-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Modern technologies I use to build exceptional web applications
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                category: "Frontend Technologies",
                skills: [
                  "React.js",
                  "Next.js",
                  "JavaScript (ES6+)",
                  "TypeScript",
                  "HTML5",
                  "CSS3",
                ],
              },
              {
                category: "Styling & Design",
                skills: [
                  "Tailwind CSS",
                  "Responsive Design",
                  "Accessibility (a11y)",
                  "UI/UX Implementation",
                ],
              },
              {
                category: "State Management",
                skills: ["Redux", "Context API", "Component Architecture"],
              },
              {
                category: "Backend & APIs",
                skills: [
                  "REST APIs",
                  "Node.js",
                  "Express.js",
                  "JSON",
                  "API Integration",
                ],
              },
              {
                category: "Tools & Workflow",
                skills: [
                  "Git",
                  "GitHub",
                  "Vite",
                  "Agile/Scrum",
                  "Code Reviews",
                ],
              },
            ].map((group, groupIndex) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-xl hoverable"
              >
                <motion.h3
                  className="text-xl mb-4 text-slate-900 flex items-center gap-2 font-semibold"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-blue-600 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: groupIndex * 0.2,
                    }}
                  />
                  {group.category}
                </motion.h3>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill, skillIndex) => (
                    <SkillBadge
                      key={skill}
                      skill={skill}
                      index={skillIndex}
                      groupIndex={groupIndex}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section
        id="experience"
        className="py-24 px-6 bg-gradient-to-b from-slate-50 via-purple-50/20 to-white relative overflow-hidden"
      >
        {/* Wave Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <motion.path
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, y: [0, 20, 0] }}
              transition={{
                pathLength: { duration: 2 },
                y: { duration: 5, repeat: Infinity },
              }}
            />
            <motion.path
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, y: [0, -15, 0] }}
              transition={{
                pathLength: { duration: 2, delay: 0.5 },
                y: { duration: 6, repeat: Infinity, delay: 1 },
              }}
            />
          </svg>
        </div>
        <FloatingParticles />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div className="flex items-center justify-center gap-3 mb-4">
              <AnimatedIcon Icon={Briefcase} delay={0.2} />
              <h2 className="text-4xl text-slate-900">
                Professional Experience
              </h2>
            </motion.div>
            <motion.p
              className="text-lg text-slate-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              My journey in frontend and full-stack development
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Animated Timeline line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 origin-top hidden md:block"
            />

            {/* Animated particles along timeline */}
            <motion.div
              animate={{ y: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-7 top-0 w-1 h-1 bg-blue-400 rounded-full hidden md:block"
            />

            {[
              {
                company: "Aanrudix",
                location: "Chennai, India",
                role: "Software Engineer",
                period: "Jun 2025 – Dec 2025",
                description: [
                  "Developed responsive, user-friendly web interfaces using React.js, Next.js, and Tailwind CSS for enterprise and US telecom projects",
                  "Translated UI/UX designs into pixel-perfect, reusable components, ensuring cross-browser and cross-device compatibility",
                  "Integrated frontend applications with REST APIs, handling asynchronous data flow and error states",
                  "Implemented state management using Redux and Context API for scalable application architecture",
                  "Optimized application performance by reducing unnecessary re-renders, improving page load time by ~25%",
                  "Collaborated closely with product managers, designers, and backend engineers in an Agile environment",
                ],
              },
              {
                company: "CRUD Operations Private Limited",
                location: "Chennai, India",
                role: "Associate Software Engineer",
                period: "Jun 2023 – Jun 2025",
                description: [
                  "Built dynamic frontend applications using React.js and Next.js with modern UI patterns",
                  "Developed reusable UI components and followed clean coding practices",
                  "Worked with backend teams to integrate APIs and display real-time data",
                  "Implemented role-based UI rendering and secure frontend flows",
                  "Participated in code reviews and improved UI consistency and maintainability",
                ],
              },
            ].map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative md:pl-20 pb-12 last:pb-0"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.2 + 0.2,
                    type: "spring",
                  }}
                  whileHover={{ scale: 1.3 }}
                  className="absolute left-6 top-2 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-lg hidden md:block hoverable"
                >
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    className="absolute inset-0 bg-blue-400 rounded-full opacity-50"
                  />
                </motion.div>

                <motion.div
                  whileHover={{
                    x: 8,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  }}
                  className="bg-white p-6 rounded-xl shadow-lg transition-all hoverable group"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                    <div>
                      <motion.h3
                        className="text-xl text-slate-900 font-semibold"
                        whileHover={{ x: 5, color: "#2563eb" }}
                      >
                        {exp.company}
                      </motion.h3>
                      <motion.p
                        className="text-blue-600 font-medium"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + 0.3 }}
                      >
                        {exp.role}
                      </motion.p>
                      <p className="text-sm text-slate-500 mt-1">
                        {exp.location}
                      </p>
                    </div>
                    <motion.span
                      className="text-sm text-slate-500 flex items-center gap-1 mt-2 md:mt-0"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Briefcase className="w-4 h-4" />
                      {exp.period}
                    </motion.span>
                  </div>
                  <ul className="text-slate-600 space-y-2 mt-4">
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + 0.4 + i * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.span
                          className="text-blue-600 mt-1.5"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        >
                          •
                        </motion.span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="py-24 px-6 bg-gradient-to-br from-white via-emerald-50/20 to-blue-50/30 relative overflow-hidden"
      >
        {/* Dots Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <motion.circle
                  cx="15"
                  cy="15"
                  r="2"
                  fill="#3b82f6"
                  animate={{ r: [2, 3, 2], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <AnimatedGrid />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div className="flex items-center justify-center gap-3 mb-4">
              <AnimatedIcon Icon={GraduationCap} delay={0.2} />
              <h2 className="text-4xl text-slate-900">Education</h2>
            </motion.div>
            <motion.p
              className="text-lg text-slate-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Academic background and qualifications
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
            }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl shadow-lg hoverable"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <GraduationCap className="w-12 h-12 text-blue-600" />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-2xl text-slate-900 font-semibold mb-2"
                      whileHover={{ x: 5, color: "#2563eb" }}
                    >
                      Bachelor of Technology (BTech)
                    </motion.h3>
                    <p className="text-lg text-blue-600 font-medium mb-1">
                      Information Technology
                    </p>
                    <p className="text-slate-600">
                      Mookambigai College of Engineering, India
                    </p>
                    <motion.p
                      className="text-slate-500 text-sm mt-2 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Award className="w-4 h-4" />
                      Graduated: 2023
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Highlights */}
            <motion.div
              className="mt-6 pt-6 border-t border-slate-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-sm font-semibold text-slate-700 mb-3">
                Key Qualifications
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Strong foundation in Computer Science & IT",
                  "Practical experience during academic projects",
                  "Focus on web technologies and development",
                  "Problem-solving and analytical skills",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        {/* Radial Gradient Background */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-50 via-purple-50 to-pink-50 opacity-60" />

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
            style={{ top: "20%", left: "10%" }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
            style={{ bottom: "20%", right: "10%" }}
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <FloatingParticles />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="flex items-center justify-center gap-3 mb-4">
              <AnimatedIcon Icon={Mail} delay={0.2} />
              <h2 className="text-4xl text-slate-900">Get In Touch</h2>
            </motion.div>
            <motion.p
              className="text-lg text-slate-600 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              I'm currently open to new opportunities, especially in Singapore.
            </motion.p>
            <motion.p
              className="text-base text-slate-500 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Eligible for Employment Pass (EP) sponsorship • Available for
              immediate relocation
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "harishdaas2002@gmail.com",
                  link: "mailto:harishdaas2002@gmail.com",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91-6374094085",
                  link: "tel:+916374094085",
                },
                {
                  icon: ExternalLink,
                  label: "LinkedIn",
                  value: "Connect with me",
                  link: "https://www.linkedin.com/in/harish-dass-aa6979228/",
                },
              ].map((contact, index) => (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, y: 30, rotateY: -90 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, rotateY: 5, scale: 1.05 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 cursor-pointer hoverable group"
                  onClick={() =>
                    contact.link &&
                    window.open(
                      contact.link,
                      contact.label === "Email" || contact.label === "Phone"
                        ? "_self"
                        : "_blank",
                    )
                  }
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="mb-3"
                  >
                    <contact.icon className="w-8 h-8 text-blue-600 mx-auto" />
                  </motion.div>
                  <h3 className="text-sm text-slate-500 mb-1">
                    {contact.label}
                  </h3>
                  <p className="text-slate-900 text-sm break-words group-hover:text-blue-600 transition-colors">
                    {contact.value}
                  </p>

                  <motion.div
                    className="mt-2 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
