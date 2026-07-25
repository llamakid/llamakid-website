import React from 'react'
import { Link } from 'react-router-dom'
import projects from '../data/projects.json'
import { useHead, DEFAULT_DESCRIPTION } from '../lib/head'

const CardInner = ({ p }) => (
  <>
    <div className="thumb">
      {p.image && <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" />}
    </div>
    <div className="card-body">
      <div className="card-header-row">
        <h3>{p.title}</h3>
        {p.year && <span className="card-year">{p.year}</span>}
      </div>
      <p>{p.summary}</p>
      <div className="tags">
        {p.tags?.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  </>
)

const ProjectCard = ({ p }) => {
  const hasLink = p.link && p.link !== '#'
  const isInternal = hasLink && p.link.startsWith('/')

  if (isInternal) {
    return <Link className="card" to={p.link}><CardInner p={p} /></Link>
  }

  return (
    <a
      className="card"
      href={hasLink ? p.link : undefined}
      target={hasLink ? '_blank' : undefined}
      rel="noreferrer"
      style={!hasLink ? { cursor: 'default', pointerEvents: 'none' } : {}}
    >
      <CardInner p={p} />
    </a>
  )
}

export default function Home() {
  useHead({ title: null, description: DEFAULT_DESCRIPTION, path: '/' })

  return (
    <main className="container">
      {/* Hero */}
      <section className="hero" id="top">
        <h1 className="hero-name"><span className="name-first">Nate</span> <span className="name-last">Guy</span></h1>
        <p className="hero-tagline">
          Developer &amp; designer building web and iOS products for 14+ years.
        </p>
        <div className="hero-actions">
          <a href="#work" className="btn btn-primary">View Work</a>
          <a href="#contact" className="btn btn-ghost">Get in Touch</a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <h2>About</h2>
        <div className="about-wrap">
          <div className="about-text">
            <p>
              I build web apps, enterprise platforms, and AI-powered tools — with a focus on making
              technology feel simple and human. Currently working at a web agency, shipping everything
              from marketing sites to complex enterprise systems, with a growing focus on AI tools and
              workflows.
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
      </section>

      {/* Work */}
      <section id="work" className="section">
        <h2>Selected Work</h2>
        <p className="section-sub">A mix of client work, side projects, and experiments.</p>
        <div className="grid">
          {projects.map(p => <ProjectCard key={p.title} p={p} />)}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <h2>Get in Touch</h2>
        <p className="section-sub">Have a project, role, or collaboration in mind?</p>
        <div className="contact-links">
          <a href="mailto:itsnateguy@gmail.com" className="contact-link">
            <span className="contact-icon">✉</span>
            itsnateguy@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/nathanguy/" target="_blank" rel="noreferrer" className="contact-link">
            <span className="contact-icon">in</span>
            LinkedIn
          </a>
          <a href="https://github.com/llamakid" target="_blank" rel="noreferrer" className="contact-link">
            <span className="contact-icon">gh</span>
            GitHub
          </a>
        </div>
      </section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Nate Guy</span>
        <span className="footer-sep">·</span>
        <a href="/privacy/example-app" className="footer-link">Privacy Policies</a>
      </footer>
    </main>
  )
}
