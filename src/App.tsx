import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import CountdownCard from './components/CountdownCard'
import FeatureCard from './components/FeatureCard'
import StatCard from './components/StatCard'
import logo from './assets/Andamologo.png'
import welcomeImage from './assets/Welcome.jpeg'
import './App.css'

const LAUNCH_DATE = new Date(2026, 5, 29, 23, 59, 0)

const features = [
  {
    icon: '🚀',
    title: 'Fast Campus Delivery',
    description: 'Fresh groceries from the market to your doorstep across KNUST and nearby halls.',
  },
  {
    icon: '🛒',
    title: 'Market-to-Door Groceries',
    description: 'We deliver high-quality food and groceries sourced from trusted local markets.',
  },
  {
    icon: '📍',
    title: 'Live Tracking',
    description: 'Follow your order in real time from pickup to arrival at your dorm.',
  },
  {
    icon: '📦',
    title: 'Student-Friendly Pricing',
    description: 'Affordable delivery rates designed for KNUST students and campus budgets.',
  },
]

const stats = [
  { value: '2k+', label: 'Student orders' },
  { value: '12', label: 'KNUST routes' },
  { value: '99%', label: 'On-time delivery' },
]

function getCountdown() {
  const now = Date.now()
  const diff = Math.max(0, LAUNCH_DATE.getTime() - now)
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)

  return { days, hours, minutes, seconds }
}

function App() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [countdown, setCountdown] = useState(getCountdown())
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const interval = window.setInterval(() => setCountdown(getCountdown()), 1000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.08,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, observerOptions)

    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const countdownItems = useMemo(
    () => [
      { label: 'Days', value: countdown.days },
      { label: 'Hours', value: countdown.hours },
      { label: 'Minutes', value: countdown.minutes },
      { label: 'Seconds', value: countdown.seconds },
    ],
    [countdown],
  )

  async function subscribeEmail(emailAddress: string) {
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    if (!accessKey || accessKey === 'your_access_key_here') {
      console.warn('VITE_WEB3FORMS_ACCESS_KEY is not configured. Falling back to local logging.')
      return new Promise((resolve) => setTimeout(resolve, 900))
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: 'New Waitlist Signup - Andamo Express',
        from_name: 'Andamo Express Website',
        email: emailAddress,
        message: `A new user has joined the waitlist with email: ${emailAddress}`,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to submit waitlist email.')
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || 'Failed to submit waitlist email.')
    }

    return data
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setMessage('Enter a valid email address.')
      return
    }

    setStatus('loading')
    try {
      await subscribeEmail(email)
      setStatus('success')
      setMessage('You’re on the waitlist—get first access to our KNUST launch perks, student discounts, and live delivery alerts.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Unable to subscribe right now. Please try again later.')
    }
  }

  return (
    <div className="app-shell">
      <div className="atmosphere-layer">
        <div className="particle particle--one" />
        <div className="particle particle--two" />
        <div className="particle particle--three" />
        <div className="city-portrait" />
      </div>

      <header className="nav-panel">
        <div className="nav-brand">
          <img src={logo} alt="Andamo Express logo" className="brand-mark" />
          <div>
            <p className="brand-title">Andamo Express</p>
            <p className="brand-subtitle">KNUST grocery & food delivery</p>
          </div>
        </div>

        <nav className="nav-links desktop-only">
          <a href="#features">Features</a>
          <a href="#stats">Stats</a>
          <a href="#footer">Contact</a>
        </nav>

        <button 
          type="button" 
          className="nav-cta desktop-only" 
          onClick={() => document.getElementById('email')?.focus()}
        >
          Join Waitlist
        </button>

        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </button>

        <div className={`mobile-dropdown ${isMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav-links">
            <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#stats" onClick={() => setIsMenuOpen(false)}>Stats</a>
            <a href="#footer" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </nav>
          <button 
            type="button" 
            className="nav-cta mobile-cta" 
            onClick={() => {
              setIsMenuOpen(false);
              document.getElementById('email')?.focus();
            }}
          >
            Join Waitlist
          </button>
        </div>
      </header>

      <main className="page-content">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="hero-badge">Serving KNUST & environs</span>
            <h1 className="hero-heading">
              Market groceries delivered straight to your door.
            </h1>
            <p className="hero-lead">
              Andamo Express brings high-quality, affordable groceries and food to students with live order tracking,
              dependable campus delivery, and a smoother way to shop from the market.
            </p>

            <form className="hero-form" onSubmit={handleSubmit}>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="email-input"
              />
              <button type="submit" className="hero-button" disabled={status === 'loading'}>
                {status === 'loading' ? 'Submitting…' : 'Join Waitlist'}
              </button>
            </form>

            <p className="form-note">No spam. Early testers get priority access and exclusive launch perks.</p>
            {message ? <div className={`message message--${status}`}>{message}</div> : null}

            <div className="countdown-grid">
              {countdownItems.map((item) => (
                <CountdownCard key={item.label} value={item.value} label={item.label} />
              ))}
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-panel__glow" />
            <div className="hero-panel__base">
              <img src={welcomeImage} alt="Welcome to Andamo Express" className="hero-welcome-image" />
              <p className="hero-caption">
                From the market to your dorm door with live tracking, student prices, and reliable campus delivery.
              </p>
            </div>
          </div>
        </section>

        <section id="ambassador" className="ambassador-section">
          <div className="section-header reveal">
            <p className="section-eyebrow">Join the future</p>
            <h2 className="section-title">JOIN THE FUTURE OF CONVENIENCE ⚡</h2>
          </div>

          <div className="ambassador-grid">
            <div className="ambassador-copy reveal reveal-left">
              <p className="ambassador-lead">
                Andamo is looking for committed, hardworking and ambitious students ready to work, grow and build with us as we redefine
                shopping, food and delivery on campus.
              </p>

              <ul className="ambassador-benefits">
                <li>Flexible working hours</li>
                <li>Commission-based earnings</li>
                <li>Hourly opportunities available</li>
                <li>Networking & growth experience</li>
                <li>Be part of something big from the beginning</li>
              </ul>

              <p className="ambassador-note">We are not just building a platform. We are building the future of smarter shopping.</p>

              <a
                className="ambassador-cta"
                href="https://chat.whatsapp.com/GdRU6mMjC7fH3L658gdmFq?mode=gi_t"
                target="_blank"
                rel="noreferrer"
              >
                Join WhatsApp Group
              </a>

              <p className="ambassador-tags">#ANDAMO #JUSTANDAMOIT #SMARTLIVING #FUTUREOFCONVENIENCE #ANDAMOVANGUARD</p>
            </div>

            <div className="ambassador-panel reveal reveal-right">
              <p className="team-heading">TEAM ANDAMO</p>
              <p className="team-note">Healthy Living Shouldn’t Be Difficult.</p>
            </div>
          </div>
        </section>
        <section id="features" className="feature-section">
          <div className="section-header reveal">
            <p className="section-eyebrow">Core capabilities</p>
            <h2 className="section-title">Campus grocery delivery built for KNUST students.</h2>
          </div>

          <div className="feature-grid">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className={`reveal reveal-scale delay-${(index % 4) * 100}`}
              />
            ))}
          </div>
        </section>

        <section id="stats" className="stats-section">
          <div className="stats-card reveal">
            <div className="stats-header reveal">
              <p className="section-eyebrow">Delivery pulse</p>
              <h2 className="stats-title">Live grocery delivery performance for KNUST students.</h2>
            </div>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  className={`reveal reveal-scale delay-${index * 100}`}
                />
              ))}
            </div>
            <p className="stats-note">Fresh groceries, reliable campus routes, and fast live tracking from market to dorm.</p>
          </div>
        </section>
      </main>

      <footer id="footer" className="footer-panel">
        <div className="footer-brand">
          <img src={logo} alt="Andamo Express logo" className="brand-mark small" />
          <div>
            <p>Andamo Express</p>
            <p className="footer-copy">KNUST grocery delivery with live tracking to your dorm.</p>
          </div>
        </div>

        <div className="footer-contact">
          <a href="tel:0208759090" className="contact-item">
            <span className="contact-icon">📱</span>
            <span>0208759090</span>
          </a>
          <a href="mailto:andamoexpressofficial@gmail.com" className="contact-item">
            <span className="contact-icon">✉️</span>
            <span>andamoexpressofficial@gmail.com</span>
          </a>
        </div>

        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Instagram</a>
        </div>
      </footer>
    </div>
  )
}

export default App
