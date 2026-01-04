import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.css'

function Main() {
  const [displayText, setDisplayText] = useState('')
  const fullText = "🚧 This website is under construction 🚧"
  const typingSpeed = 100 
  
  useEffect(() => {
    let currentIndex = 0
    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(timer)
      }
    }, typingSpeed)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        {displayText}
        <span className={styles.cursor}>|</span>
      </h1>
      
      <div className={styles.content}>
        <p className={styles.mainText}>
          Hi! I'm currently building something awesome here.
        </p>
        <p className={styles.subText}>
          This site is being crafted with care. Check back soon to see what's new!
        </p>
      </div>

      <div className={styles.linksContainer}>
        <a 
          href="https://www.linkedin.com/in/nihad-mammadli-a18a55236/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${styles.link} ${styles.linkedIn}`}
        >
          LinkedIn
        </a>
        <a 
          href="https://github.com/NihadMammadli" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${styles.link} ${styles.github}`}
        >
          GitHub
        </a>
        {window.location.hostname === 'localhost' && (
          <Link 
          to="/game"
          className={`${styles.link} ${styles.game}`}
        >
          Game
        </Link>
        )}
      </div>
    </div>
  )
}

export default Main
