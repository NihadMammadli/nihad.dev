import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './index.module.css'
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiTerminal,
  FiCode,
  FiLayers,
  FiCpu,
  FiDatabase,
  FiZap,
  FiBarChart2,
  FiBookOpen,
  FiAward,
  FiGlobe,
  FiFolder,
  FiBriefcase,
  FiUser,
  FiFileText,
  FiHeart,
  FiExternalLink,
  FiTag,
  FiCheckCircle,
  FiTrendingUp,
} from 'react-icons/fi'
import type { IconType } from 'react-icons'

interface ExperienceItem {
  role: string
  period: string
  company: string
  location: string
  summary: string
  tech: string[]
  responsibilities: string[]
  achievements: string[]
}

interface ProjectItem {
  name: string
  subtitle: string
  description: string
  link?: string
  modules?: string[]
  features?: string[]
  contributions: string[]
  tech: string[]
}

interface SkillGroup {
  icon: IconType
  category: string
  items: string[]
}

interface EducationItem {
  degree: string
  school: string
  location: string
  period: string
  honors?: string
  focus: string[]
}

interface LanguageItem {
  name: string
  level: string
  pct: number
}

interface AchievementItem {
  title: string
  country: string
  year: number
  score: string
  description: string
  impact: string[]
}

interface ResearchItem {
  title: string
  year: number
  publisher: string
  link: string
  abstract: string
  problem_statement: string
  contributions: string[]
  methods: string[]
  keywords: string[]
}

const TYPING_SPEED = 50
const INTRO_TEXT = 'NIHAD MAMMADLI'

const about = `
Frontend Engineer with nearly 4 years of professional experience designing and building complex, high-performance web applications. Specialized in React ecosystem, scalable frontend architecture, and enterprise UI development.

Experienced in building large-scale B2B platforms, procurement systems, and ERP solutions used in production environments. Strong background in performance optimization, reusable component systems, and modern state management patterns.

Comfortable working across the full development lifecycle — from system architecture and UI design systems to backend integration, testing strategies, and CI/CD pipelines.

Currently leading frontend development initiatives, mentoring engineers, driving architectural decisions, and collaborating with cross-functional teams to deliver scalable enterprise-grade products.
`

const experience: ExperienceItem[] = [
  {
    role: 'Lead Frontend Developer',
    period: 'Nov 2025 – Present',
    company: 'Prodigitrack',
    location: 'Baku, Azerbaijan',

    summary:
      'Leading frontend architecture and development for enterprise procurement platforms used by corporate clients.',

    tech:
      ['React', 'TypeScript', 'TanStack Query', 'TanStack Table', 'Ant Design', 'Node.js', 'Docker', 'Nginx'],

    responsibilities: [
      'Lead frontend engineering efforts including task planning, architecture design, and code review processes',
      'Drive technical decision making for frontend stack, scalability, and maintainability',
      'Coordinate closely with backend engineers, product managers, and UI/UX designers',
      'Mentor and guide junior and mid-level frontend developers'
    ],

    achievements: [
      'Refactored legacy frontend architecture improving maintainability and reducing technical debt',
      'Standardized internal UI component library used across multiple enterprise modules',
      'Improved application performance and bundle size through lazy loading and optimized rendering',
      'Implemented scalable API integration patterns with caching and query management'
    ]
  },

  {
    role: 'Frontend Developer',
    period: 'Aug 2024 – Oct 2025',
    company: 'Prodigitrack',
    location: 'Baku, Azerbaijan',

    summary:
      'Developed complex frontend systems for a modular B2B supply chain and procurement management platform.',

    tech:
      ['React', 'TypeScript', 'Ant Design', 'TanStack Query', 'TanStack Table', 'Jest', 'React Testing Library'],

    responsibilities: [
      'Built interactive enterprise dashboards and data-heavy tables for procurement workflows',
      'Integrated REST APIs and implemented efficient client-side data caching',
      'Developed reusable UI components following atomic design principles',
      'Implemented accessibility-focused responsive layouts'
    ],

    achievements: [
      'Reduced data table rendering time through virtualization and optimized state management',
      'Introduced automated unit testing improving reliability of critical components',
      'Improved cross-browser consistency across Chrome, Firefox, and Safari'
    ]
  },

  {
    role: 'Frontend Developer',
    period: 'Jan 2023 – Jul 2024',
    company: 'ERP-Intel',
    location: 'Baku, Azerbaijan',

    summary:
      'Worked on enterprise ERP system covering finance, HR, warehouse, and operational management modules.',

    tech:
      ['React', 'Redux Toolkit', 'Material UI', 'Vue.js', 'Node.js', 'Express', 'Docker', 'Nginx', 'Cypress'],

    responsibilities: [
      'Developed complex UI workflows for finance, HR, and warehouse management modules',
      'Built backend REST APIs using Node.js and Express',
      'Maintained deployment infrastructure and containerization using Docker',
      'Implemented automated E2E testing pipelines'
    ],

    achievements: [
      'Developed dynamic role-based permission system for secure multi-department access',
      'Reduced manual QA effort by introducing Cypress E2E testing workflows',
      'Optimized frontend state management using Redux Toolkit'
    ]
  },

  {
    role: 'Frontend Developer',
    period: 'Jun 2022 – Dec 2022',
    company: 'Freelancer',
    location: 'Baku, Azerbaijan',

    summary:
      'Delivered full-stack web solutions for small businesses and startup clients.',

    tech:
      ['React', 'TypeScript', 'Redux', 'Node.js', 'Express', 'MySQL', 'PostgreSQL'],

    responsibilities: [
      'Designed and implemented responsive web interfaces',
      'Developed REST APIs and backend services',
      'Built reusable component libraries for faster feature development'
    ],

    achievements: [
      'Delivered multiple projects from concept to production',
      'Established scalable state management patterns for client applications'
    ]
  }
]

const projects: ProjectItem[] = [
  {
    name: 'DMP',
    subtitle: 'Digital Modular Procurement Platform',

    description:
      'Enterprise procurement platform enabling organizations to manage sourcing, vendor evaluation, demand planning, and contract lifecycle management within a modular architecture.',

    modules: [
      'Sourcing',
      'Vendor Management',
      'Demand Planning',
      'Contract Lifecycle Management',
      'Procurement Analytics'
    ],

    contributions: [
      'Developed core frontend architecture for procurement workflows',
      'Built reusable component library @dmp-tech/ui using Storybook',
      'Implemented advanced table systems with sorting, filtering, pagination, and dynamic columns',
      'Designed scalable state management patterns for multi-module integration'
    ],

    tech: [
      'React',
      'TypeScript',
      'TanStack Query',
      'TanStack Table',
      'Ant Design',
      'Storybook'
    ]
  },

  {
    name: 'ERP Intel',
    subtitle: 'Enterprise Resource Planning Platform',

    description:
      'Comprehensive ERP system providing operational tools for finance management, HR operations, timesheets, contract management, and warehouse logistics.',

    modules: [
      'Finance',
      'HR',
      'Timesheets',
      'Contracts',
      'Warehouse Management'
    ],

    contributions: [
      'Developed dynamic role-based access control system',
      'Implemented enterprise UI components across multiple modules',
      'Integrated backend APIs for real-time operational data'
    ],

    tech: [
      'React',
      'Redux Toolkit',
      'Material UI',
      'Node.js',
      'Express'
    ]
  },

  {
    name: 'Damla Group Website',
    subtitle: 'Corporate Business Website',

    link: 'https://damla-group.com/',

    description:
      'Corporate website developed for Damla Group showcasing company services, projects, and corporate information with a modern responsive interface.',

    contributions: [
      'Designed and developed responsive frontend architecture',
      'Implemented modern UI/UX focused on corporate branding and usability',
      'Optimized page loading performance and SEO-friendly structure',
      'Ensured cross-device responsiveness for desktop, tablet, and mobile users'
    ],

    tech: [
      'React',
      'TypeScript',
      'Responsive Design',
      'SEO Optimization',
      'Modern CSS'
    ]
  },

  {
    name: 'MansaMidas',
    subtitle: 'Algorithmic Trading Bot with Machine Learning',

    description:
      'Quantitative trading research project that analyzes cryptocurrency market data and generates trading signals using machine learning and technical indicators.',

    features: [
      'Automated market data collection from Binance API',
      'Feature engineering using technical indicators (RSI, MACD, SMA, EMA)',
      'Time-series based prediction models for short-term price movements',
      'Backtesting framework for evaluating trading strategies',
      'Signal generation for long/short trading opportunities'
    ],

    contributions: [
      'Designed data processing pipelines for financial time-series data',
      'Implemented feature engineering using technical indicators',
      'Trained regression models for price prediction',
      'Developed simulation environment for strategy evaluation'
    ],

    tech: [
      'Python',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Binance API',
      'Time Series Analysis',
      'Machine Learning'
    ]
  }
]

const skills: SkillGroup[] = [
  {
    icon: FiCode, 
    category: 'Frontend Engineering',
    items: [
      'React',
      'TypeScript',
      'JavaScript (ES6+)',
      'Redux Toolkit',
      'TanStack Query',
      'TanStack Table',
      'Ant Design',
      'Material UI',
      'Tailwind CSS',
      'Vue.js'
    ]
  },

  {
    icon: FiLayers,
    category: 'Frontend Architecture',
    items: [
      'Component Architecture',
      'Reusable UI Systems',
      'Custom Hooks',
      'Context API',
      'State Management Patterns',
      'Code Splitting',
      'Lazy Loading'
    ]
  },

  {
    icon: FiCheckCircle,
    category: 'Testing & Quality',
    items: [
      'Jest',
      'React Testing Library',
      'Cypress',
      'Playwright',
      'Puppeteer',
      'Selenium'
    ]
  },

  {
    icon: FiTerminal,
    category: 'Backend & APIs',
    items: [
      'Node.js',
      'Express',
      'REST APIs',
      'Authentication',
      'Database Integration'
    ]
  },

  {
    icon: FiDatabase,
    category: 'Infrastructure & DevOps',
    items: [
      'Docker',
      'CI/CD Pipelines',
      'Nginx',
      'Git',
      'Linux CLI'
    ]
  },

  {
    category: 'Performance & Optimization',
    icon: FiZap,
    items: [
      'Web Vitals Optimization',
      'Responsive Design',
      'Cross-Browser Compatibility',
      'Bundle Optimization',
      'Rendering Performance'
    ]
  },

  {
    category: 'Data & Machine Learning',
    icon: FiBarChart2,
    items: [
      'Python',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Time Series Analysis'
    ]
  }
]

const education: EducationItem[] = [
  {
    degree: 'MSc in Data Science',
    school: 'Azerbaijan State University of Economics (UNEC)',
    location: 'Baku, Azerbaijan',
    period: '2025 – 2027 (Expected)',

    focus: [
      'Machine Learning',
      'Deep Learning',
      'Statistical Modeling',
      'Data Visualization',
      'Natural Language Processing'
    ]
  },

  {
    degree: 'BSc in Computer Science',
    school: 'ADA University',
    location: 'Baku, Azerbaijan',
    period: '2020 – 2025',

    honors: "Dean's List",

    focus: [
      'Data Structures and Algorithms',
      'Distributed Systems',
      'Machine Learning',
      'Database Systems',
      'Software Architecture',
      'Web Development'
    ]
  }
]

const languages: LanguageItem[] = [
  { name: 'English', level: 'Advanced', pct: 90 },
  { name: 'Russian', level: 'Fluent', pct: 95 },
  { name: 'Turkish', level: 'Fluent', pct: 95 },
  { name: 'Azerbaijani', level: 'Native', pct: 100 },
]

const research: ResearchItem[] = [
  {
    title: "Analysis and Evaluation of the Contestant's Progress in Real-time Coding Contests",

    year: 2024,

    publisher: "ResearchGate",

    link: "https://www.researchgate.net/publication/382141626_Analysis_and_Evaluation_of_the_Contestant's_Progress_in_Real-time_Coding_Contests",

    abstract:
      "This research analyzes contestant behavior and performance progression in real-time programming contests. The study focuses on improving fairness and accuracy in evaluating submissions by addressing challenges such as code similarity detection, plagiarism identification, and behavioral analysis of participants during competitions.",

    problem_statement:
      "Many competitive programming platforms lack robust mechanisms for detecting plagiarism and evaluating contestant progress beyond simple submission scoring. This limitation can compromise fairness and the credibility of competition results.",

    contributions: [
      "Proposed a framework for analyzing contestant progress during live coding contests",
      "Introduced methods for detecting code similarity and potential plagiarism patterns",
      "Analyzed behavioral patterns of contestants through submission timing and progress tracking",
      "Demonstrated how advanced analytical techniques can improve fairness and transparency in coding competitions"
    ],

    methods: [
      "Code similarity analysis",
      "Behavioral analysis of submissions",
      "Contestant progress tracking",
      "Statistical evaluation of contest activity"
    ],

    keywords: [
      "Competitive Programming",
      "Code Similarity Detection",
      "Plagiarism Detection",
      "Contest Analytics",
      "Programming Contest Evaluation"
    ]
  }
]
const achievements: AchievementItem[] = [
  {
    title: 'National University Entrance Exam',
    country: 'Azerbaijan',
    year: 2020,
    score: '682 / 700',
    description:
      'Achieved one of the highest scores in the Azerbaijani national university entrance examination, demonstrating exceptional analytical, mathematical, and logical reasoning abilities.',
    impact: [
      'Placed among top-performing applicants nationwide',
      'Qualified for admission to highly competitive Computer Science program'
    ]
  }
]

const interests = [
  'Algorithmic Trading',
  'Machine Learning',
  'Time Series Forecasting',
  'System Architecture',
  'Competitive Programming',
  'Distributed Systems',
  'Performance Engineering',
  'Quantitative Finance'
]

// Cyberpunk neon polygon background with red accents
function NeonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number; red: boolean }[]>([])
  const timeRef = useRef(0)

  const initNodes = useCallback((w: number, h: number) => {
    const count = Math.floor((w * h) / 20000)
    nodesRef.current = Array.from({ length: Math.min(count, 100) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      red: Math.random() < 0.35,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
      if (nodesRef.current.length === 0) initNodes(canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)
      timeRef.current += 0.005

      const nodes = nodesRef.current
      const maxDist = 200

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15
            const isRed = nodes[i].red || nodes[j].red
            if (isRed) {
              ctx.strokeStyle = `rgba(255, 30, 50, ${alpha * 0.8})`
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`
            }
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        if (n.red) {
          ctx.fillStyle = 'rgba(255, 30, 50, 0.5)'
          ctx.shadowColor = 'rgba(255, 30, 50, 0.3)'
          ctx.shadowBlur = 6
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
          ctx.shadowColor = 'transparent'
          ctx.shadowBlur = 0
        }
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.red ? 2 : 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0

      // Floating red horizontal glitch lines
      const t = timeRef.current
      for (let i = 0; i < 3; i++) {
        const y = ((Math.sin(t * (0.7 + i * 0.3) + i * 2) + 1) / 2) * h
        ctx.fillStyle = `rgba(255, 30, 50, ${0.015 + Math.sin(t * 2 + i) * 0.01})`
        ctx.fillRect(0, y, w, 1)
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [initNodes])

  return <canvas ref={canvasRef} className={styles.bgCanvas} />
}

function Main() {
  const [displayText, setDisplayText] = useState('')
  const [showContent, setShowContent] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [glitchText, setGlitchText] = useState(false)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  // Typing effect
  useEffect(() => {
    let currentIndex = 0
    const timer = setInterval(() => {
      if (currentIndex <= INTRO_TEXT.length) {
        setDisplayText(INTRO_TEXT.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(timer)
        setTimeout(() => setShowContent(true), 400)
      }
    }, TYPING_SPEED)
    return () => clearInterval(timer)
  }, [])

  // Random glitch effect on name — more aggressive cyberpunk style
  useEffect(() => {
    const triggerGlitch = () => {
      setGlitchText(true)
      setTimeout(() => setGlitchText(false), 200)
    }
    const glitchInterval = setInterval(() => {
      triggerGlitch()
      // Sometimes double-glitch for extra punch
      if (Math.random() < 0.3) {
        setTimeout(triggerGlitch, 300)
      }
    }, 3000 + Math.random() * 4000)
    return () => clearInterval(glitchInterval)
  }, [])

  // Intersection observer
  useEffect(() => {
    if (!showContent) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.08 }
    )
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [showContent])

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el
  }

  const sectionClass = (id: string) =>
    `${styles.section} ${visibleSections.has(id) ? styles.visible : ''}`

  return (
    <div className={styles.page}>
      <NeonBackground />

      {/* Red neon corner accents */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />

      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <div className={styles.scanline} />
          <div className={styles.headerRedBar} />
          <h1 className={`${styles.name} ${glitchText ? styles.glitch : ''}`} data-text={displayText}>
            {displayText}
            <span className={styles.cursor}>_</span>
          </h1>
          {showContent && (
            <div className={styles.headerMeta}>
              <p className={styles.tagline}>
                <span className={styles.tagBracket}>[</span>
                <FiCpu className={styles.inlineIcon} />
                FRONTEND DEVELOPER
                <span className={styles.tagDot}> // </span>
                ~4 YEARS
                <span className={styles.tagDot}> // </span>
                <FiMapPin className={styles.inlineIcon} />
                BAKU, AZERBAIJAN
                <span className={styles.tagBracket}>]</span>
              </p>
              <div className={styles.contactRow}>
                <span className={styles.contactItem}>
                  <FiMail className={styles.contactIcon} />
                  nihadmammadli03@gmail.com
                </span>
                <span className={styles.separator}>//</span>
                <span className={styles.contactItem}>
                  <FiPhone className={styles.contactIcon} />
                  +994 51 380 25 96
                </span>
              </div>
              <div className={styles.linksRow}>
                <a href="https://github.com/NihadMammadli" target="_blank" rel="noopener noreferrer">
                  <FiGithub /> <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/nihad-mammadli-a18a55236/" target="_blank" rel="noopener noreferrer">
                  <FiLinkedin /> <span>LinkedIn</span>
                </a>
              </div>
            </div>
          )}
        </header>

        {showContent && (
          <main className={styles.main}>
            {/* ABOUT */}
            <section id="summary" ref={setSectionRef('summary')} className={sectionClass('summary')}>
              <h2 className={styles.sectionTitle}>
                <FiUser className={styles.sectionIcon} />
                ABOUT
              </h2>
              <div className={styles.aboutCard}>
                <p>{about}</p>
              </div>
            </section>

            {/* EXPERIENCE */}
            <section id="experience" ref={setSectionRef('experience')} className={sectionClass('experience')}>
              <h2 className={styles.sectionTitle}>
                <FiBriefcase className={styles.sectionIcon} />
                EXPERIENCE
              </h2>
              <div className={styles.timeline}>
                {experience.map((job, i) => (
                  <div key={i} className={styles.card}>
                    <div className={styles.cardGlow} />
                    <div className={styles.cardRedStripe} />
                    <div className={styles.cardInner}>
                      <div className={styles.cardHeader}>
                        <div>
                          <h3 className={styles.cardTitle}>{job.role}</h3>
                          <span className={styles.cardCompany}>
                            <FiMapPin className={styles.tinyIcon} />
                            {job.company} — {job.location}
                          </span>
                        </div>
                        <span className={styles.cardPeriod}>{job.period}</span>
                      </div>
                      <p className={styles.cardSummary}>{job.summary}</p>
                      <div className={styles.techTags}>
                        {job.tech.map((t) => (
                          <span key={t} className={styles.techTag}>{t}</span>
                        ))}
                      </div>
                      <h4 className={styles.cardSubheading}>
                        <FiCode className={styles.subheadingIcon} />
                        Responsibilities
                      </h4>
                      <ul className={styles.cardList}>
                        {job.responsibilities.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                      <h4 className={styles.cardSubheading}>
                        <FiZap className={styles.subheadingIcon} />
                        Achievements
                      </h4>
                      <ul className={styles.cardList}>
                        {job.achievements.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" ref={setSectionRef('projects')} className={sectionClass('projects')}>
              <h2 className={styles.sectionTitle}>
                <FiFolder className={styles.sectionIcon} />
                PROJECTS
              </h2>
              <div className={styles.projectsGrid}>
                {projects.map((project, i) => (
                  <div key={i} className={styles.projectCard}>
                    <div className={styles.cardGlow} />
                    <div className={styles.cardRedStripe} />
                    <div className={styles.cardInner}>
                      <div className={styles.projectHeader}>
                        <div>
                          <h3 className={styles.projectName}>{project.name}</h3>
                          <span className={styles.projectSub}>{project.subtitle}</span>
                        </div>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.researchLink}
                          >
                            <FiExternalLink /> Visit
                          </a>
                        )}
                      </div>
                      <p className={styles.cardSummary}>{project.description}</p>
                      <div className={styles.techTags}>
                        {project.tech.map((t) => (
                          <span key={t} className={styles.techTag}>{t}</span>
                        ))}
                      </div>
                      {project.modules && (
                        <>
                          <h4 className={styles.cardSubheading}>
                            <FiLayers className={styles.subheadingIcon} />
                            Modules
                          </h4>
                          <div className={styles.moduleTags}>
                            {project.modules.map((m) => (
                              <span key={m} className={styles.moduleTag}>{m}</span>
                            ))}
                          </div>
                        </>
                      )}
                      {project.features && (
                        <>
                          <h4 className={styles.cardSubheading}>
                            <FiZap className={styles.subheadingIcon} />
                            Features
                          </h4>
                          <ul className={styles.cardList}>
                            {project.features.map((item, j) => (
                              <li key={j}>{item}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      <h4 className={styles.cardSubheading}>
                        <FiCode className={styles.subheadingIcon} />
                        Contributions
                      </h4>
                      <ul className={styles.cardList}>
                        {project.contributions.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SKILLS */}
            <section id="skills" ref={setSectionRef('skills')} className={sectionClass('skills')}>
              <h2 className={styles.sectionTitle}>
                <FiCpu className={styles.sectionIcon} />
                SKILLS
              </h2>
              <div className={styles.skillsGrid}>
                {skills.map((group) => (
                  <div key={group.category} className={styles.skillCard}>
                    <div className={styles.cardGlow} />
                    <div className={styles.cardInner}>
                      <h4 className={styles.skillCategory}>
                        <group.icon className={styles.skillCatIcon} />
                        {group.category}
                      </h4>
                      <div className={styles.skillTags}>
                        {group.items.map((item) => (
                          <span key={item} className={styles.skillTag}>{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section id="education" ref={setSectionRef('education')} className={sectionClass('education')}>
              <h2 className={styles.sectionTitle}>
                <FiBookOpen className={styles.sectionIcon} />
                EDUCATION
              </h2>
              {education.map((edu, i) => (
                <div key={i} className={styles.card}>
                  <div className={styles.cardGlow} />
                  <div className={styles.cardRedStripe} />
                  <div className={styles.cardInner}>
                    <div className={styles.cardHeader}>
                      <div>
                        <h3 className={styles.cardTitle}>{edu.degree}</h3>
                        <span className={styles.cardCompany}>
                          <FiMapPin className={styles.tinyIcon} />
                          {edu.school}
                        </span>
                      </div>
                      <span className={styles.cardPeriod}>{edu.period}</span>
                    </div>
                    {edu.honors && (
                      <p className={styles.honors}>
                        <FiAward className={styles.honorsIcon} />
                        {edu.honors}
                      </p>
                    )}
                    <div className={styles.techTags}>
                      {edu.focus.map((f) => (
                        <span key={f} className={styles.techTag}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* RESEARCH */}
            <section id="research" ref={setSectionRef('research')} className={sectionClass('research')}>
              <h2 className={styles.sectionTitle}>
                <FiFileText className={styles.sectionIcon} />
                RESEARCH
              </h2>
              {research.map((paper, i) => (
                <div key={i} className={styles.card}>
                  <div className={styles.cardGlow} />
                  <div className={styles.cardRedStripe} />
                  <div className={styles.cardInner}>
                    <div className={styles.cardHeader}>
                      <div>
                        <h3 className={styles.cardTitle}>{paper.title}</h3>
                        <span className={styles.cardCompany}>
                          <FiBookOpen className={styles.tinyIcon} />
                          {paper.publisher} — {paper.year}
                        </span>
                      </div>
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.researchLink}
                      >
                        <FiExternalLink /> View
                      </a>
                    </div>
                    <p className={styles.cardSummary}>{paper.abstract}</p>
                    <h4 className={styles.cardSubheading}>
                      <FiZap className={styles.subheadingIcon} />
                      Contributions
                    </h4>
                    <ul className={styles.cardList}>
                      {paper.contributions.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                    <h4 className={styles.cardSubheading}>
                      <FiCpu className={styles.subheadingIcon} />
                      Methods
                    </h4>
                    <div className={styles.techTags}>
                      {paper.methods.map((m) => (
                        <span key={m} className={styles.techTag}>{m}</span>
                      ))}
                    </div>
                    <div className={styles.keywordRow}>
                      <FiTag className={styles.tinyIcon} />
                      {paper.keywords.join(' · ')}
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* ACHIEVEMENTS */}
            <section id="achievements" ref={setSectionRef('achievements')} className={sectionClass('achievements')}>
              <h2 className={styles.sectionTitle}>
                <FiTrendingUp className={styles.sectionIcon} />
                ACHIEVEMENTS
              </h2>
              {achievements.map((item, i) => (
                <div key={i} className={styles.card}>
                  <div className={styles.cardGlow} />
                  <div className={styles.cardRedStripe} />
                  <div className={styles.cardInner}>
                    <div className={styles.cardHeader}>
                      <div>
                        <h3 className={styles.cardTitle}>{item.title}</h3>
                        <span className={styles.cardCompany}>
                          <FiMapPin className={styles.tinyIcon} />
                          {item.country} — {item.year}
                        </span>
                      </div>
                      <span className={styles.achievementScore}>{item.score}</span>
                    </div>
                    <p className={styles.cardSummary}>{item.description}</p>
                    <ul className={styles.cardList}>
                      {item.impact.map((point, j) => (
                        <li key={j}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </section>

            {/* LANGUAGES */}
            <section id="languages" ref={setSectionRef('languages')} className={sectionClass('languages')}>
              <h2 className={styles.sectionTitle}>
                <FiGlobe className={styles.sectionIcon} />
                LANGUAGES
              </h2>
              <div className={styles.langsGrid}>
                {languages.map((lang) => (
                  <div key={lang.name} className={styles.langCard}>
                    <div className={styles.cardGlow} />
                    <div className={styles.cardInner}>
                      <span className={styles.langName}>{lang.name}</span>
                      <span className={styles.langLevel}>{lang.level}</span>
                      <div className={styles.langBar}>
                        <div className={styles.langFill} style={{ width: `${lang.pct}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* INTERESTS */}
            <section id="interests" ref={setSectionRef('interests')} className={sectionClass('interests')}>
              <h2 className={styles.sectionTitle}>
                <FiHeart className={styles.sectionIcon} />
                INTERESTS
              </h2>
              <div className={styles.interestsGrid}>
                {interests.map((interest) => (
                  <div key={interest} className={styles.interestTag}>
                    <FiZap className={styles.interestIcon} />
                    {interest}
                  </div>
                ))}
              </div>
            </section>
          </main>
        )}

        {/* FOOTER */}
        {showContent && (
          <footer className={styles.footer}>
            <div className={styles.footerLine} />
            <span>&copy; 2026 NIHAD MAMMADLI</span>
            <span className={styles.cursor}>_</span>
          </footer>
        )}
      </div>
    </div>
  )
}

export default Main
