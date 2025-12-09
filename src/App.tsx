import { useState, useEffect } from 'react'
import './App.css'

function App() {
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
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '2rem',
        minHeight: '3rem',
        fontFamily: 'monospace'
      }}>
        {displayText}
        <span style={{ animation: 'blink 1s infinite' }}>|</span>
      </h1>
      
      <div style={{ marginBottom: '2rem', maxWidth: '600px' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
          Hi! I'm currently building something awesome here.
        </p>
        <p style={{ color: '#666' }}>
          This site is being crafted with care. Check back soon to see what's new!
        </p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <a 
          href="https://www.linkedin.com/in/nihad-mammadli-a18a55236/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            fontSize: '1.1rem', 
            padding: '0.8rem 1.5rem',
            background: '#0077b5',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'transform 0.2s'
          }}
        >
          LinkedIn
        </a>
        <a 
          href="https://github.com/NihadMammadli" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            fontSize: '1.1rem', 
            padding: '0.8rem 1.5rem',
            background: '#333',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'transform 0.2s'
          }}
        >
          GitHub
        </a>
      </div>
    </div>
  )
}

export default App
