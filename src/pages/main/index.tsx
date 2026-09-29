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
  FiMonitor,
  FiServer,
  FiUsers,
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
Senior Frontend Engineer with 5+ years of experience building complex, data-heavy React and TypeScript applications for enterprise clients, currently leading a frontend team of 5.

Full-stack capable: backend services and REST APIs with Node.js/Express and Python/Django, with relational data modelling in PostgreSQL and MySQL.

Delivers end to end, from architecture to production: Docker, Nginx, TLS, CI/CD pipelines, and separate staging and production environments on Linux.

Solid foundation in data and machine learning (Python, Pandas, NumPy, scikit-learn), backed by a Computer Science degree and an MSc in Data Science in progress.
`

const experience: ExperienceItem[] = [
  {
    role: 'Lead Frontend Developer',
    period: 'Nov 2025 – Present',
    company: 'Prodigitrack',
    location: 'Baku, Azerbaijan',

    summary:
      'Leading a team of 5 frontend engineers on an enterprise-grade B2B procurement platform, and designing, building, and deploying full-stack products end to end.',

    tech:
      ['React', 'TypeScript', 'TanStack Query', 'TanStack Table', 'Ant Design', 'Next.js', 'Django', 'Wagtail', 'PostgreSQL', 'Docker', 'Nginx'],

    responsibilities: [
      'Lead a team of 5 frontend engineers, coordinating task planning, code reviews, and technical decision-making',
      'Collaborate closely with product owners, designers, and backend teams',
      'Design, build, and deploy full-stack products from architecture to production'
    ],

    achievements: [
      'Refactored the entire frontend codebase to improve performance, scalability, and long-term maintainability',
      'Finalized and standardized the UI Kit of 20+ reusable components, establishing design consistency and best practices across the application',
      'Delivered a production-ready, enterprise-grade B2B platform now used by 3+ large enterprises',
      'Shipped two full-stack products end to end: the company website dmpservice.ai (Next.js + Wagtail CMS) and the internal platform Hermes (Django + React)'
    ]
  },

  {
    role: 'Frontend Developer',
    period: 'Aug 2024 – Oct 2025',
    company: 'Prodigitrack',
    location: 'Baku, Azerbaijan',

    summary:
      'Developed dynamic, responsive frontend interfaces for a B2B supply chain web application serving large enterprises.',

    tech:
      ['React', 'TypeScript', 'Ant Design', 'TanStack Query', 'TanStack Table', 'Jest', 'React Testing Library'],

    responsibilities: [
      'Built dynamic, responsive interfaces with React, TypeScript, and Ant Design',
      'Developed data-heavy views with TanStack Table and server state management with TanStack Query',
      'Implemented unit and integration tests with Jest and React Testing Library'
    ],

    achievements: [
      'Introduced comprehensive testing strategies that improved application reliability and maintainability',
      'Delivered fully responsive designs with a strong focus on accessibility',
      'Ensured consistent performance across all major browsers'
    ]
  },

  {
    role: 'Frontend Developer',
    period: 'Aug 2022 – Aug 2024',
    company: 'ERP-Intel',
    location: 'Baku, Azerbaijan',

    summary:
      'Built interfaces with complex business logic for an enterprise resource planning system covering finance, HR, timesheet, contract, and warehouse modules.',

    tech:
      ['React', 'Redux Toolkit', 'Material UI', 'Vue.js', 'Node.js', 'Express', 'Docker', 'Nginx', 'Cypress'],

    responsibilities: [
      'Designed and developed complex user interfaces with React, Redux Toolkit, Material UI, and Vue.js',
      'Developed backend APIs and services with Node.js and Express',
      'Led DevOps efforts: containerization with Docker, deployment and server configuration with Nginx, and Linux CLI operations'
    ],

    achievements: [
      'Implemented a dynamic role-based permission system for granular user access control and secure data operations',
      'Established Cypress testing workflows to ensure end-to-end quality and prevent regressions'
    ]
  },

  {
    role: 'Frontend Developer',
    period: 'Jul 2021 – Jul 2022',
    company: 'Freelancer',
    location: 'Baku, Azerbaijan',

    summary:
      'Delivered custom frontend solutions and backend services for clients, with a focus on responsive and user-friendly design.',

    tech:
      ['React', 'TypeScript', 'Redux', 'Context API', 'Node.js', 'Express', 'MySQL', 'PostgreSQL'],

    responsibilities: [
      'Delivered custom frontend solutions primarily with React, TypeScript, and Redux',
      'Developed backend services and APIs with Node.js and Express, integrating MySQL and PostgreSQL databases'
    ],

    achievements: [
      'Built reusable components and managed application state with Redux and Context API for scalability',
      'Delivered responsive, user-friendly designs for clients'
    ]
  }
]

const projects: ProjectItem[] = [
  {
    name: 'DMP',
    subtitle: 'Digital Modular Procurement Platform',

    description:
      'Modular procurement system covering sourcing, demand planning, and contract management, used by 3+ large enterprises.',

    modules: [
      'Sourcing',
      'Demand Planning',
      'Contract Management'
    ],

    contributions: [
      'Built and maintained the frontend of the procurement platform',
      'Developed the custom UI component library @dmp-tech/ui with 20+ components, documented in Storybook',
      'Ensured design consistency and scalability across modules through the shared component library'
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
    name: 'dmpservice.ai',
    subtitle: 'Company Website & Headless CMS (Full-Stack, Self-Deployed)',

    link: 'https://dmpservice.ai/',

    description:
      'Company website rebuilt from a signed-off 52-page static prototype onto a CMS: Next.js 16 / React 19 renders every public page, while Wagtail / Django serves the admin and JSON API, backed by PostgreSQL.',

    features: [
      'Every page editable without a deploy: publishing in the CMS updates the live page in about a second through tag-based cache revalidation',
      'Slug changes create 301 redirects automatically',
      'Technical SEO: editable titles, meta descriptions, canonicals, robots and Open Graph tags, JSON-LD, a sitemap, and 410 responses for retired WordPress URLs'
    ],

    contributions: [
      'Built the Next.js frontend and the Wagtail / Django backend end to end',
      'Deployed staging and production on one VM with Docker Compose behind a shared Nginx edge with TLS and S3-compatible media storage',
      'Set up CI/CD: a push to main deploys staging, a version tag deploys production',
      'Built an automated verification suite: visual-fidelity diffs against the prototype, browser render checks on all 52 routes, link checks, SEO assertions, and post-deploy smoke tests'
    ],

    tech: [
      'Next.js 16',
      'React 19',
      'Wagtail',
      'Django',
      'PostgreSQL',
      'Docker Compose',
      'Nginx',
      'CI/CD'
    ]
  },

  {
    name: 'Hermes',
    subtitle: 'Internal Knowledge & Team Platform (Full-Stack, Self-Deployed)',

    description:
      "DMP's internal platform: a company handbook with review before publication, a team directory with a who-to-ask matrix, learning paths with progress tracking, and an IT support queue.",

    features: [
      'Article approval workflow with revisions, threaded comments, and mentions',
      'PostgreSQL full-text search that respects access rules',
      'Team directory with a who-to-ask matrix',
      'Learning paths with progress tracking',
      'IT support ticket queue'
    ],

    contributions: [
      'Built the platform with Django + DRF, PostgreSQL, Redis, and a React + TypeScript frontend',
      'Designed a single object-level access model that governs onboarding scope, project visibility, contribution rights, and ticket access',
      'Implemented cookie-based JWT auth with CSRF protection',
      'Documented the API with OpenAPI (drf-spectacular) and covered it with a pytest suite including end-to-end journeys',
      'Deployed with Gunicorn, Nginx, TLS, and multi-stage Docker builds'
    ],

    tech: [
      'Django',
      'Django REST Framework',
      'PostgreSQL',
      'Redis',
      'React',
      'TypeScript',
      'Docker',
      'Nginx',
      'Pytest'
    ]
  },

  {
    name: 'ERP Intel',
    subtitle: 'Enterprise Resource Planning Platform',

    description:
      'Large-scale ERP system providing operational tools for finance management, HR operations, timesheets, contract management, and warehouse logistics.',

    modules: [
      'Finance',
      'HR',
      'Timesheets',
      'Contracts',
      'Warehouse Management'
    ],

    contributions: [
      'Implemented a dynamic role-based permission system for granular user access control and secure data operations',
      'Built user interfaces with complex business logic across multiple modules',
      'Developed backend APIs and services with Node.js and Express'
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
    name: 'Damla Group',
    subtitle: 'Corporate Website (Full-Stack)',

    link: 'https://damla-group.com/',

    description:
      'Corporate website built end to end: a public marketing site plus a Django backend running the blog, careers, and contact features.',

    features: [
      '9 pages built from about 20 reusable components',
      'Per-route SEO meta tags (Open Graph, Twitter cards, canonicals) managed through a custom hook',
      'Blog with tags, filtering, search, and pagination',
      'Job application and contact submission endpoints'
    ],

    contributions: [
      'Developed a responsive React 19 + TypeScript frontend with Vite and Ant Design',
      'Built a Django REST Framework API on PostgreSQL for blog posts, job applications, and contact submissions',
      'Set up a Django Admin panel with a CKEditor 5 rich-text editor so non-technical staff publish on their own, with media on AWS S3',
      'Containerized the backend with Docker, Gunicorn, and WhiteNoise'
    ],

    tech: [
      'React 19',
      'TypeScript',
      'Vite',
      'Ant Design',
      'Django',
      'Django REST Framework',
      'PostgreSQL',
      'AWS S3',
      'Docker'
    ]
  },

  {
    name: 'Energy Service Group',
    subtitle: 'Corporate Website',

    description:
      'Responsive corporate website for an Azerbaijani energy services company, showcasing its projects, partners, certifications, and licenses.',

    features: [
      'Project portfolio with detail pages',
      'Filterable photo and video gallery',
      'Contact form',
      'Scroll-triggered reveal and counter animations'
    ],

    contributions: [
      'Designed and built the website with React, TypeScript, Vite, and React Router',
      'Created a reusable component library and a CSS design-token system (CSS Modules) to keep the visual language consistent'
    ],

    tech: [
      'React',
      'TypeScript',
      'Vite',
      'React Router',
      'CSS Modules'
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
    category: 'Languages',
    items: [
      'TypeScript',
      'JavaScript (ES6+)',
      'Python',
      'SQL',
      'HTML5',
      'CSS3',
      'C/C++',
      'C# (basic)'
    ]
  },

  {
    icon: FiMonitor,
    category: 'Frontend',
    items: [
      'React 19',
      'Next.js (SSR/ISR)',
      'Vite',
      'React Router',
      'Redux Toolkit',
      'TanStack Query',
      'TanStack Table',
      'Context API',
      'Custom Hooks',
      'Vue.js (basic)'
    ]
  },

  {
    icon: FiLayers,
    category: 'UI & Design Systems',
    items: [
      'Ant Design',
      'MUI',
      'Tailwind CSS',
      'CSS Modules',
      'Storybook',
      'npm Component Libraries',
      'Design Tokens',
      'Charts'
    ]
  },

  {
    icon: FiTerminal,
    category: 'Backend & APIs',
    items: [
      'Node.js',
      'Express',
      'Django',
      'Django REST Framework',
      'Wagtail CMS',
      'REST',
      'OpenAPI / Swagger',
      'JWT Auth',
      'RBAC / Permissions'
    ]
  },

  {
    icon: FiDatabase,
    category: 'Databases & Storage',
    items: [
      'PostgreSQL',
      'MySQL',
      'Redis',
      'Django ORM',
      'Full-Text Search',
      'AWS S3',
      'S3-Compatible Storage'
    ]
  },

  {
    icon: FiServer,
    category: 'DevOps & Deployment',
    items: [
      'Docker',
      'Docker Compose',
      'Multi-Stage Builds',
      'Nginx',
      'Gunicorn',
      'TLS / Certbot',
      'CI/CD',
      'Linux',
      'Git'
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
      'Selenium',
      'Pytest',
      'E2E Testing'
    ]
  },

  {
    icon: FiZap,
    category: 'Performance & SEO',
    items: [
      'Core Web Vitals',
      'Code Splitting',
      'Lazy Loading',
      'Caching & ISR',
      'Technical SEO & JSON-LD',
      'Accessibility',
      'Cross-Browser'
    ]
  },

  {
    icon: FiBarChart2,
    category: 'Data & ML',
    items: [
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Machine Learning Fundamentals'
    ]
  },

  {
    icon: FiUsers,
    category: 'Leadership',
    items: [
      'Team Leadership (5 engineers)',
      'Code Reviews',
      'Technical Planning',
      'Cross-Functional Collaboration'
    ]
  }
]

const education: EducationItem[] = [
  {
    degree: 'MSc in Data Science',
    school: 'Azerbaijan State University of Economics (UNEC)',
    location: 'Baku, Azerbaijan',
    period: '2025 – 2026 (Expected)',

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
    period: '2020 – 2024',

    honors: "Dean's List",

    focus: [
      'Calculus',
      'Data Structures & Algorithms',
      'Machine Learning',
      'Artificial Intelligence',
      'Digital Logic Design',
      'Linear Algebra',
      'Discrete Structures',
      'Software Design Patterns',
      'Database Systems',
      'Distributed Systems'
    ]
  }
]

const languages: LanguageItem[] = [
  { name: 'English', level: 'Advanced (C1)', pct: 90 },
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
                SENIOR FRONTEND ENGINEER
                <span className={styles.tagDot}> // </span>
                5+ YEARS
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
