import { useState, useEffect, useRef } from 'react'
import './App.css'
import SkillCard from './components/SkillCard'
import ProjectCard from './components/ProjectCard'
import { FaJava, FaReact, FaJs, FaHtml5, FaCss3Alt, FaDatabase } from 'react-icons/fa'
import { SiMongodb } from 'react-icons/si'
import emailjs from '@emailjs/browser'



function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [showNavName, setShowNavName] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'
  const formRef = useRef()

  // Scroll detection for navbar name visibility
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero')
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        const scrollPosition = window.scrollY + 100
        setShowNavName(scrollPosition > heroBottom)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for scroll animations and active section tracking
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in')

          // Update active section
          const sectionId = entry.target.id || 'home'
          setActiveSection(sectionId)
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach(el => observer.observe(el))

    const heroSection = document.querySelector('.hero')
    if (heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection('home')
          }
        })
      }, { threshold: 0.5 })

      heroObserver.observe(heroSection)
      return () => {
        observer.disconnect()
        heroObserver.disconnect()
      }
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // EmailJS configuration
    // Replace these with your actual EmailJS credentials
   const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID
const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY


    try {
      // Send email using EmailJS
            await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        { publicKey }
      )


      // Success!
      setSubmitStatus('success')

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      })

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)

    } catch (error) {
      console.error('EmailJS Error:', error)
      setSubmitStatus('error')

      // Hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const skills = [
    { name: 'Java', icon: <FaJava /> },
    { name: 'React Native', icon: <FaReact /> },
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'HTML', icon: <FaHtml5 /> },
    { name: 'CSS', icon: <FaCss3Alt /> },
    { name: 'MySQL', icon: <FaDatabase /> },
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'React ', icon: <FaReact /> }
  ]

  const projects = [
    {
      title: 'LeoAI',
      description: 'An intelligent AI-powered application built with Google Gemini API, featuring a modern and intuitive user interface for seamless AI interactions.',
      tech: ['Gemini API', 'React', 'JavaScript', 'UI/UX','MongoDB','Node.js'],
      liveUrl: '#', 
      repoUrl: 'https://github.com/harishnair3107/LeoAi'  
    },
    {
      title: 'Paysita',
      description: 'A secure and efficient payment application designed to streamline digital transactions with a focus on user experience and security.',
      tech: ['Payment Gateway', 'React Native', 'Node.js', 'MongoDB'],
      liveUrl: '#', 
      repoUrl: 'https://github.com/harishnair3107/paysita'  
    },
     {
      title: 'Charity App',
      description: 'An application for finding and donating to charities.',
      tech: ['Payment Gateway', 'React Native', 'Node.js', 'MongoDB'],
      liveUrl: '#', 
      repoUrl: 'https://github.com/harishnair3107/Charity-Demo-App'  
    }
  ]

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className={`navbar-logo ${showNavName ? 'visible' : ''}`}>
            Harish Nair
          </div>

          <button
            className="navbar-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          <ul className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <li>
              <a
                href="#home"
                className={`navbar-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className={`navbar-link ${activeSection === 'skills' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={`navbar-link ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`navbar-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-background">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Harish Nair</span>
          </h1>
          <p className="hero-subtitle">Full Stack Developer</p>
          <p className="hero-description">
            Passionate about building innovative solutions with modern technologies.
            Specializing in full-stack development and creating seamless user experiences.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about animate-on-scroll">
        <div className="container">
          <h2 className="section-title gradient-text">About Me</h2>
          <div className="about-content">
            <p className="about-text">
              I'm an IT student with a passion for technology and innovation.
              I love building applications that solve real-world problems and create
              meaningful user experiences. With expertise in both web and mobile development,
              I'm constantly learning and exploring new technologies to expand my skill set.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section animate-on-scroll">
        <div className="container">
          <h2 className="section-title gradient-text">Skills & Technologies</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects animate-on-scroll">
        <div className="container">
          <h2 className="section-title gradient-text">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section animate-on-scroll">
        <div className="container">
          <h2 className="section-title gradient-text">Get In Touch</h2>
          <div className="contact-content">
            {/* Success Alert */}
            {submitStatus === 'success' && (
              <div className="status-alert success-alert">
                <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p>Message sent successfully! I'll get back to you soon.</p>
              </div>
            )}

            {/* Error Alert */}
            {submitStatus === 'error' && (
              <div className="status-alert error-alert">
                <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p>Oops! Something went wrong. Please try again.</p>
              </div>
            )}

            <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="form-button" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="button-spinner"></span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title gradient-text">Harish Nair</h3>
              <p className="footer-description">
                Full Stack Developer passionate about creating innovative solutions
                and seamless user experiences.
              </p>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Connect With Me</h4>
              <div className="social-links">
                <a href="https://github.com/harishnair3107/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/harish-nair-a4839528a/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Harish Nair. All rights reserved.
            </p>
            <p className="footer-tagline">
              Built with <span className="heart">❤️</span> and React
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
