import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.css'

const TYPING_SPEED = 50
const INTRO_TEXT = 'NIHAD MAMMADLI'

const experience = [
  {
    role: 'Lead Frontend Developer',
    period: 'Nov 2025 – Present',
    company: 'Prodigitrack',
    location: 'Baku, Azerbaijan',
    icon: '>>',
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
    icon: '>',
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
    icon: '>',
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
    icon: '>',
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

const skills = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Redux (RTK)', 'JS (ES6+)', 'Ant Design', 'MUI', 'Tailwind', 'TanStack', 'Charts', 'Vue.js'] },
  { category: 'Architecture', items: ['Hooks', 'Custom Hooks', 'Context API', 'Scalable Design', 'Lazy Loading'] },
  { category: 'Testing', items: ['Jest', 'RTL', 'Cypress', 'Puppeteer', 'Selenium', 'Playwright'] },
  { category: 'Backend & DevOps', items: ['Node.js', 'Express', 'REST', 'MySQL', 'PostgreSQL', 'Docker', 'CI/CD', 'Nginx', 'Git', 'Linux'] },
  { category: 'Performance', items: ['Responsive UI', 'Cross-browser', 'Web Vitals'] },
  { category: 'Data', items: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'] },
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

// Neon polygon background
function NeonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([])

  const initNodes = useCallback((w: number, h: number) => {
    const count = Math.floor((w * h) / 25000)
    nodesRef.current = Array.from({ length: Math.min(count, 80) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
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

      const nodes = nodesRef.current
      const maxDist = 180

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
            const alpha = (1 - dist / maxDist) * 0.12
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
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
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
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

  // Random glitch effect on name
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(true)
      setTimeout(() => setGlitchText(false), 150)
    }, 4000 + Math.random() * 3000)
    return () => clearInterval(glitchInterval)
  }, [])

  // Intersection observer for scroll animations
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
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <div className={styles.scanline} />
          <h1 className={`${styles.name} ${glitchText ? styles.glitch : ''}`} data-text={displayText}>
            {displayText}
            <span className={styles.cursor}>_</span>
          </h1>
          {showContent && (
            <div className={styles.headerMeta}>
              <p className={styles.tagline}>
                <span className={styles.tagBracket}>[</span>
                FRONTEND DEVELOPER
                <span className={styles.tagDot}> // </span>
                3+ YEARS
                <span className={styles.tagDot}> // </span>
                BAKU, AZERBAIJAN
                <span className={styles.tagBracket}>]</span>
              </p>
              <div className={styles.contactRow}>
                <span>nihadmammadli03@gmail.com</span>
                <span className={styles.separator}>//</span>
                <span>+994 51 380 25 96</span>
              </div>
              <div className={styles.linksRow}>
                <a href="https://github.com/NihadMammadli" target="_blank" rel="noopener noreferrer">
                  <span className={styles.linkIcon}>&#9654;</span> GitHub
                </a>
                <a href="https://www.linkedin.com/in/nihad-mammadli-a18a55236/" target="_blank" rel="noopener noreferrer">
                  <span className={styles.linkIcon}>&#9654;</span> LinkedIn
                </a>
                {window.location.hostname === 'localhost' && (
                  <Link to="/game">
                    <span className={styles.linkIcon}>&#9654;</span> Game
                  </Link>
                )}
              </div>
            </div>
          )}
        </header>

        {showContent && (
          <main className={styles.main}>
            {/* ABOUT */}
            <section id="summary" ref={setSectionRef('summary')} className={sectionClass('summary')}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.titleDecor}>&lt;</span> ABOUT <span className={styles.titleDecor}>/&gt;</span>
              </h2>
              <div className={styles.aboutCard}>
                <p>Frontend Developer with 3+ years of hands-on experience building dynamic, high-logic applications using React, JavaScript, and Node.js. Proficient in responsive, user-centric interfaces with modern frameworks. Experienced in backend integration, RESTful APIs, CI/CD pipelines, and cross-functional team collaboration.</p>
              </div>
            </section>

            {/* EXPERIENCE */}
            <section id="experience" ref={setSectionRef('experience')} className={sectionClass('experience')}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.titleDecor}>&lt;</span> EXPERIENCE <span className={styles.titleDecor}>/&gt;</span>
              </h2>
              <div className={styles.timeline}>
                {experience.map((job, i) => (
                  <div key={i} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className={styles.cardGlow} />
                    <div className={styles.cardInner}>
                      <div className={styles.cardHeader}>
                        <div>
                          <h3 className={styles.cardTitle}>
                            <span className={styles.cardIcon}>{job.icon}</span> {job.role}
                          </h3>
                          <span className={styles.cardCompany}>{job.company} — {job.location}</span>
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
                <span className={styles.titleDecor}>&lt;</span> PROJECTS <span className={styles.titleDecor}>/&gt;</span>
              </h2>
              <div className={styles.projectsGrid}>
                {projects.map((project, i) => (
                  <div key={i} className={styles.projectCard}>
                    <div className={styles.cardGlow} />
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
                <span className={styles.titleDecor}>&lt;</span> SKILLS <span className={styles.titleDecor}>/&gt;</span>
              </h2>
              <div className={styles.skillsGrid}>
                {skills.map((group) => (
                  <div key={group.category} className={styles.skillCard}>
                    <div className={styles.cardGlow} />
                    <div className={styles.cardInner}>
                      <h4 className={styles.skillCategory}>{group.category}</h4>
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
                <span className={styles.titleDecor}>&lt;</span> EDUCATION <span className={styles.titleDecor}>/&gt;</span>
              </h2>
              {education.map((edu, i) => (
                <div key={i} className={styles.card}>
                  <div className={styles.cardGlow} />
                  <div className={styles.cardInner}>
                    <div className={styles.cardHeader}>
                      <div>
                        <h3 className={styles.cardTitle}>{edu.degree}</h3>
                        <span className={styles.cardCompany}>{edu.school}</span>
                      </div>
                      <span className={styles.cardPeriod}>{edu.period}</span>
                    </div>
                    {edu.honors && <p className={styles.honors}>{edu.honors}</p>}
                    {edu.coursework && <p className={styles.coursework}>{edu.coursework}</p>}
                  </div>
                </div>
              ))}
            </section>

            {/* LANGUAGES */}
            <section id="languages" ref={setSectionRef('languages')} className={sectionClass('languages')}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.titleDecor}>&lt;</span> LANGUAGES <span className={styles.titleDecor}>/&gt;</span>
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
