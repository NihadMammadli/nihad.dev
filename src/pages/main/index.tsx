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
} from 'react-icons/fi'
import type { IconType } from 'react-icons'

const TYPING_SPEED = 50
const INTRO_TEXT = 'NIHAD MAMMADLI'

const experience = [
  {
    role: 'Lead Frontend Developer',
    period: 'Nov 2025 – Present',
    company: 'Prodigitrack',
    location: 'Baku, Azerbaijan',
    points: [
      'Leading frontend engineering team — task planning, code reviews, technical decisions',
      'Refactored entire frontend codebase for performance and scalability',
      'Finalized and standardized the UI Kit with reusable components and design consistency',
      'Collaborated with product owners, designers, and backend teams for enterprise-grade delivery',
    ],
  },
  {
    role: 'Frontend Developer',
    period: 'Aug 2024 – Oct 2025',
    company: 'Prodigitrack',
    location: 'Baku, Azerbaijan',
    points: [
      'Built dynamic interfaces with React, TypeScript, Ant Design, TanStack Table/Query for B2B supply chain app',
      'Implemented testing strategies with Jest and React Testing Library',
      'Delivered fully responsive designs with accessibility focus across all major browsers',
    ],
  },
  {
    role: 'Frontend Developer',
    period: 'Jan 2023 – Jul 2024',
    company: 'ERP-Intel',
    location: 'Baku, Azerbaijan',
    points: [
      'Designed complex UIs with React, Redux Toolkit, Material UI, and Vue.js for enterprise resource planning',
      'Developed backend APIs with Node.js and Express',
      'Led DevOps — Docker, Nginx, Linux CLI operations',
      'Established E2E testing workflows using Cypress',
    ],
  },
  {
    role: 'Frontend Developer',
    period: 'Jun 2022 – Dec 2023',
    company: 'Freelancer',
    location: 'Baku, Azerbaijan',
    points: [
      'Delivered custom frontend solutions with React, TypeScript, and Redux',
      'Built backend services with Node.js, Express, MySQL, and PostgreSQL',
      'Created reusable component libraries with scalable state management',
    ],
  },
]

const projects = [
  {
    name: 'DMP',
    subtitle: 'Digital Modular Procurement',
    points: [
      'Built and maintained frontend of a modular procurement system — sourcing, demand planning, contract management',
      'Developed custom UI component library @dmp-tech/ui with Storybook for design consistency across modules',
    ],
  },
  {
    name: 'ERP Intel',
    subtitle: 'Enterprise Resource Planning',
    points: [
      'Contributed to large-scale ERP with Finance, HR, Timesheet, Contract, and Warehouse modules',
      'Implemented dynamic role-based permission system for granular access control',
    ],
  },
]

const skills: { category: string; icon: IconType; items: string[] }[] = [
  { category: 'Frontend', icon: FiCode, items: ['React', 'TypeScript', 'Redux (RTK)', 'JS (ES6+)', 'Ant Design', 'MUI', 'Tailwind', 'TanStack', 'Charts', 'Vue.js'] },
  { category: 'Architecture', icon: FiLayers, items: ['Hooks', 'Custom Hooks', 'Context API', 'Scalable Design', 'Lazy Loading'] },
  { category: 'Testing', icon: FiTerminal, items: ['Jest', 'RTL', 'Cypress', 'Puppeteer', 'Selenium', 'Playwright'] },
  { category: 'Backend & DevOps', icon: FiDatabase, items: ['Node.js', 'Express', 'REST', 'MySQL', 'PostgreSQL', 'Docker', 'CI/CD', 'Nginx', 'Git', 'Linux'] },
  { category: 'Performance', icon: FiZap, items: ['Responsive UI', 'Cross-browser', 'Web Vitals'] },
  { category: 'Data', icon: FiBarChart2, items: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'] },
]

const education = [
  {
    degree: 'MSc in Data Science',
    school: 'Azerbaijan State University of Economics (UNEC)',
    period: '2025 – 2026 (expected)',
  },
  {
    degree: 'BSc in Computer Science',
    school: 'ADA University, Baku',
    period: '2020 – 2024',
    honors: "Dean's List",
    coursework: 'Data Structures & Algorithms · Machine Learning · AI · Software Design Patterns · Database Systems · Distributed Systems',
  },
]

const languages = [
  { name: 'Azerbaijani', level: 'Native', pct: 100 },
  { name: 'English', level: 'Advanced', pct: 90 },
  { name: 'Russian', level: 'Fluent', pct: 95 },
  { name: 'Turkish', level: 'Fluent', pct: 95 },
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
                3+ YEARS
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
                <p>Frontend Developer with 3+ years of hands-on experience building dynamic, high-logic applications using React, JavaScript, and Node.js. Proficient in responsive, user-centric interfaces with modern frameworks. Experienced in backend integration, RESTful APIs, CI/CD pipelines, and cross-functional team collaboration.</p>
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
                      <ul className={styles.cardList}>
                        {job.points.map((point, j) => (
                          <li key={j}>{point}</li>
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
                      <h3 className={styles.projectName}>{project.name}</h3>
                      <span className={styles.projectSub}>{project.subtitle}</span>
                      <ul className={styles.cardList}>
                        {project.points.map((point, j) => (
                          <li key={j}>{point}</li>
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
                    {edu.coursework && <p className={styles.coursework}>{edu.coursework}</p>}
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
          </main>
        )}

        {/* FOOTER */}
        {showContent && (
          <footer className={styles.footer}>
            <div className={styles.footerLine} />
            <span>&copy; 2024 NIHAD MAMMADLI</span>
            <span className={styles.cursor}>_</span>
          </footer>
        )}
      </div>
    </div>
  )
}

export default Main
