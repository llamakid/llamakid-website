import React, { useEffect } from 'react'
import projects from './data/projects.json'

const Nav = () => (
  <header className="nav">
    <a className="logo" href="#top">llamakid</a>
    <nav>
      <a href="#about">About</a>
      <a href="#work">Work</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
)

const Section = ({ id, title, children }) => (
  <section id={id} className="section">
    <h2>{title}</h2>
    {children}
  </section>
)

const ProjectCard = ({ p }) => (
  <a className="card" href={p.link} target="_blank" rel="noreferrer">
    <div className="thumb" style={{ backgroundImage: `url(${p.image})` }} />
    <div className="card-body">
      <h3>{p.title}</h3>
      <p>{p.summary}</p>
      <div className="tags">
        {p.tags?.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  </a>
)

export default function App() {
  useEffect(() => {
    // Smooth scroll for in-page anchors
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href').slice(1)
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <a id="top" />
      <Nav />

      <main className="container">
        <Section id="about" title="About">
          <div className="about-wrap">
            <div className="about-text">
              <p>
                Hi, I’m Nate Guy—a developer passionate about turning complex ideas into intuitive digital experiences. Over the last 14+ years, I’ve built web and iOS products for pharma, healthcare, and publishing leaders, from GE’s WWDC-featured app to interactive content for the NFL and Sesame Street. Recently at BigTinCan, I crafted AI-powered React + Veeva CRM/Vault solutions, blending clean design and automation to help teams move and sell faster.
              </p>
            </div>

            <figure className="about-photo">
              <img
                className="about-avatar"
                src="./assets/nateHeader.jpg"
                alt="Portrait of Nate Guy"
                loading="lazy"
              />
            </figure>
          </div>
        </Section>

        <Section id="work" title="Selected Work">
          <div className="grid">
            {projects.map(p => <ProjectCard key={p.title} p={p} />)}
          </div>
        </Section>

        <Section id="contact" title="Get in touch">
          <div className="contact">
            <p>Have a project, role, or collaboration in mind?</p>
            <ul>
              <li>
                <a href="mailto:itsnateguy@gmail.com">itsnateguy@gmail.com</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/nathanguy/" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/llamakid" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
            </ul>

            {/* Optional: EmailJS form (uncomment and plug in your keys)
            <form id="contact-form" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your name" required />
              <input type="email" name="email" placeholder="Your email" required />
              <textarea name="message" placeholder="Tell me about your project" rows="5" />
              <button type="submit">Send</button>
            </form>
            */}
          </div>
        </Section>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Nate Guy</span>
        </footer>
      </main>
    </>
  )
}
