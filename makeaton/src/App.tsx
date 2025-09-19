import './App.css'
import { useEffect, useRef, useState } from 'react'
import webviewImage from '../assets/webview prerelease.png'
import mobileBgImage from '../assets/mobile prerelease.png'
import kathakaliImage from '../assets/kathakali.png'
import circleTextImage from '../assets/circle-text.png'
import matLogo from '../assets/MAT new logo.png'

function App() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])
  const [useMobileBg, setUseMobileBg] = useState(false)

  // Detect mobile/portrait or narrow aspect ratio to decide bg rendering
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px), (orientation: portrait), (max-aspect-ratio: 2/3)')
    const update = () => setUseMobileBg(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    window.addEventListener('resize', update)
    return () => {
      mq.removeEventListener?.('change', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Create trail elements
    const trails: HTMLDivElement[] = []
    for (let i = 0; i < 8; i++) {
      const trail = document.createElement('div')
      trail.className = 'cursor-trail'
      document.body.appendChild(trail)
      trails.push(trail)
    }
    trailsRef.current = trails

    const positions = Array(trails.length).fill(0).map(() => ({ x: 0, y: 0 }))
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      mouseX = clientX
      mouseY = clientY
      
      // Update cursor position
      cursor.style.left = `${clientX}px`
      cursor.style.top = `${clientY}px`

      // Update trail positions with delay
      positions.unshift({ x: clientX, y: clientY })
      positions.pop()

      trails.forEach((trail, index) => {
        const pos = positions[index * 2] // Spread trails more
        if (pos) {
          trail.style.left = `${pos.x}px`
          trail.style.top = `${pos.y}px`
          trail.style.opacity = `${Math.max(0.1, 0.8 - (index * 0.1))}`
          trail.style.transform = `translate(-50%, -50%) scale(${1 - (index * 0.1)})`
        }
      })

      // Create particle effects more frequently
      if (Math.random() < 0.15) {
        createSparkleParticle(clientX, clientY)
      }
      
      if (Math.random() < 0.08) {
        createBrushParticle(clientX, clientY)
      }
    }

    const createSparkleParticle = (x: number, y: number) => {
      const particle = document.createElement('div')
      particle.className = 'cursor-particle particle-sparkle'
      particle.style.left = `${x + (Math.random() - 0.5) * 30}px`
      particle.style.top = `${y + (Math.random() - 0.5) * 30}px`
      document.body.appendChild(particle)

      setTimeout(() => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle)
        }
      }, 2000)
    }

    const createBrushParticle = (x: number, y: number) => {
      const particle = document.createElement('div')
      particle.className = 'cursor-particle particle-brush'
      particle.style.left = `${x + (Math.random() - 0.5) * 40}px`
      particle.style.top = `${y + (Math.random() - 0.5) * 40}px`
      particle.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`
      document.body.appendChild(particle)

      setTimeout(() => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle)
        }
      }, 1500)
    }

    const handleMouseEnter = () => {
      cursor.classList.add('cursor-hover')
    }

    const handleMouseLeave = () => {
      cursor.classList.remove('cursor-hover')
    }

    const handleClick = () => {
      cursor.classList.add('cursor-click')
      
      // Create burst of particles on click
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          createSparkleParticle(mouseX, mouseY)
        }, i * 50)
      }

      setTimeout(() => {
        cursor.classList.remove('cursor-click')
      }, 400)
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('click', handleClick)
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('p, .kathakali-image, .circle-text, .social-link')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleClick)
      trails.forEach(trail => {
        if (document.body.contains(trail)) {
          document.body.removeChild(trail)
        }
      })
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  // Prevent only background image copying and downloading
  useEffect(() => {
    // Prevent right-click context menu only on kathakali images
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('kathakali-image') || target.classList.contains('kathakali-shadow')) {
        e.preventDefault()
        return false
      }
    }
    
    // Prevent drag and drop only on kathakali images
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('kathakali-image') || target.classList.contains('kathakali-shadow')) {
        e.preventDefault()
        return false
      }
    }
    
    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('dragstart', handleDragStart)
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('dragstart', handleDragStart)
    }
  }, [])

  return (
    <div className="app-container">
      <div ref={cursorRef} className="cursor"></div>
      {!useMobileBg && (
        <img 
          src={webviewImage} 
          alt="Background" 
          className="background-image"
        />
      )}
      {useMobileBg && (
        <img
          src={mobileBgImage}
          alt="Background"
          className="mobile-background-image"
        />
      )}
      <img 
        src={matLogo} 
        alt="MAT Logo" 
        className="mat-logo"
      />
      <p className="hackathon-subtitle">
        South India's Biggest{' '}
        <span className="hackathon-word">
          Hackathon
        </span>
      </p>
      <p className="festival-quote">
        If a hackathon<span className="hackathon-text"></span> could be a <span className="festival-text">Festival</span>,<br />
        it'd be <span className="make-a-ton-animated">Make-A-Ton</span>.
      </p>
      <div className="about-text">
        <p>
          For the past seven editions, we’ve brought together <span className="about-highlight">dreamers</span>, <span className="about-highlight">builders</span>, and <span className="about-highlight">innovators</span> to create magic — and if you ask our hackers, they’ll tell you it’s been unforgettable every single time. Each year, Make-a-Ton evolves with fresh ideas, new energy, and bold experiments.
        </p>
        <p>
          This year, we’re rebranding and adding a <span className="about-accent">special twist</span> — a celebration of <span className="about-accent">Kerala’s vibrant culture</span> woven into the festival of innovation. Because why not blend tradition with tomorrow?
        </p>
        <p>
          Recognized as <span className="about-chip">South India's Largest Hackathon</span>, Make-a-Ton is where technology, creativity, and community collide. With an exciting prize pool, cutting-edge gadgets, and coveted internship opportunities on the line, this is more than a hackathon — it’s <span className="about-accent">history in the making</span>.
        </p>
        <p>
          Proudly organized by CITTIC, Make-A-Ton 2025 is back, bigger and brighter than ever. And we want <span className="about-highlight">YOU</span> to be a part of it.
        </p>
      </div>

      {/* Infinite scrolling banner below about section */}
      <div className="scroll-banner" role="img" aria-label="Tracks and Prizes coming soon"></div>
      
      {/* Intersecting sponsor banners with different rotations */}
      <div className="sponsor-banner sponsor-banner-1" role="img" aria-label="Wanna Sponsor US?"></div>
      <div className="sponsor-banner sponsor-banner-2" role="img" aria-label="Wanna Sponsor US?"></div>
      
      {/* Brochure download button */}
      <div className="brochure-section">
        <a 
          href="/Make-A-Ton 8.0 Brochure.pdf"
          download="Make-A-Ton 8.0 Brochure.pdf"
          className="brochure-button"
          aria-label="Download Make-A-Ton 8.0 Brochure"
        >
          <svg className="download-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15.75l-3.75-3.75h2.25V3h3v9h2.25L12 15.75zM3 18.75h18v1.5H3v-1.5z" fill="currentColor"/>
          </svg>
          Check out our Brochure
        </a>
      </div>
      
             {/* Knock Knock text */}
             <p className="knock-knock-text">
               Knock Knock, It is Us!
             </p>
      
      {/* Contact section for Austin Benny */}
      <div className="contact-section">
        <div className="contact-card">
          <div className="contact-header">
            <h3 className="contact-title">Hey there, Future Hacker! 👋</h3>
            <p className="contact-subtitle">Got any doubts?</p>
          </div>
          
          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div className="contact-info">
                <span className="contact-label">Ring-a-ding-ding! </span>
                <a href="tel:+918848008766" className="contact-link">
                  +91 8848008766
                </a>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div className="contact-info">
                <span className="contact-label">Drop us a mail!  </span>
                <a href="mailto:organizer@makeaton.in" className="contact-link">
                    organizer@makeaton.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wanna Connect Text - Desktop */}
      <p className="wanna-connect-text desktop-only">
        wanna connect?
      </p>

      {/* Wanna Connect Text - Mobile */}
      <p className="wanna-connect-text mobile-only">
        wanna connect?
      </p>

      {/* Contact Buttons - Desktop */}
      <div className="contact-buttons desktop-only">
        <a href="tel:+918848008766" className="contact-button call-button">
          📞 Call Us
          <div className="button-subtext">Make sure to say "<em>Hey <strong>Austin!</strong></em>"</div>
        </a>
        <a href="mailto:organizer@makeaton.in" className="contact-button email-button">
          📧 Email Us
        </a>
      </div>

      {/* Contact Buttons - Mobile */}
      <div className="contact-buttons mobile-only">
        <a href="tel:+918848008766" className="contact-button call-button">
          📞 Call Us
          <div className="button-subtext">Make sure to say "<em>Hey <strong>Austin!</strong></em>"</div>
        </a>
        <a href="mailto:organizer@makeaton.in" className="contact-button email-button">
          📧 Email Us
        </a>
      </div>

      <img 
        src={circleTextImage} 
        alt="Circle Text" 
        className="circle-text"
      />
      <img 
        src={kathakaliImage} 
        alt="Kathakali Shadow" 
        className="kathakali-shadow"
      />
      <img 
        src={kathakaliImage} 
        alt="Kathakali" 
        className="kathakali-image"
      />
      
      {/* Social Media Links */}
      <div className="social-media-section">
        <div className="social-links">
          <a 
            href="https://instagram.com/makeaton.cusat" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Follow us on Instagram"
          >
            <svg className="social-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
            </svg>
          </a>
          
          <a 
            href="https://wa.me/919876543210" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Contact us on WhatsApp"
          >
            <svg className="social-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" fill="currentColor"/>
            </svg>
          </a>
          
          <a 
            href="https://t.me/makeaton" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Join us on Telegram"
          >
            <svg className="social-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="currentColor"/>
            </svg>
          </a>
          
          <a 
            href="https://linkedin.com/company/makeaton" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Follow us on LinkedIn"
          >
            <svg className="social-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
            </svg>
          </a>
          
          <a 
            href="https://medium.com/writeabyte" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Follow us on Medium"
          >
            <svg className="social-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Previous Sponsors Section */}
      <h2 className="sponsors-heading">Previous Sponsors</h2>
      <div className="previous-sponsors-section">
        <div className="sponsors-grid">
          <div className="sponsor-item">
            <img src="/sponsors/Eduport.png" alt="Eduport" className="sponsor-logo" />
          </div>
          <div className="sponsor-item">
            <img src="/sponsors/clusterdev.png" alt="ClusterDev" className="sponsor-logo" />
          </div>
          <div className="sponsor-item">
            <img src="/sponsors/aws.png" alt="AWS" className="sponsor-logo" />
          </div>
          <div className="sponsor-item">
            <img src="/sponsors/orkes.png" alt="Orkes" className="sponsor-logo" />
          </div>
          <div className="sponsor-item">
            <img src="/sponsors/agrivator.png" alt="Agrivator" className="sponsor-logo" />
          </div>
          <div className="sponsor-item">
            <img src="/sponsors/mlh.png" alt="MLH" className="sponsor-logo" />
          </div>
          <div className="sponsor-item">
            <img src="/sponsors/balsamiq.png" alt="Balsamiq" className="sponsor-logo" />
          </div>
          <div className="sponsor-item">
            <img src="/sponsors/logitech.png" alt="Logitech" className="sponsor-logo" />
          </div>
          <div className="sponsor-item">
            <img src="/sponsors/cusat_tech.png" alt="CUSAT Tech" className="sponsor-logo" />
          </div>
          <div className="sponsor-item">
            <img src="/sponsors/github.png" alt="GitHub" className="sponsor-logo" />
          </div>
          <div className="sponsor-item">
            <img src="/sponsors/INQ.png" alt="Inq" className="sponsor-logo" />
          </div>
          <div className="sponsor-item">
            <img src="/sponsors/Fulva-transparent.png" alt="Fulva" className="sponsor-logo" />
          </div>
          <div className="sponsor-item">
            <img src="/sponsors/GeeksForGeeks.png" alt="GeeksForGeeks" className="sponsor-logo" />
          </div>
          
          <div className="sponsor-item">
            <img src="/sponsors/Redbull.png" alt="Red Bull" className="sponsor-logo" />
          </div>
          <div className="sponsor-item">
            <img src="/sponsors/xena.png" alt="Xena" className="sponsor-logo" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App