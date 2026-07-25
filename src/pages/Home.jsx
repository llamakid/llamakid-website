import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import projects from '../data/projects.json'
import { useHead, DEFAULT_DESCRIPTION } from '../lib/head'
import HeroBackground from '../components/HeroBackground'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

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

const linkPropsFor = (p) => {
  const hasLink = p.link && p.link !== '#'
  const isInternal = hasLink && p.link.startsWith('/')
  return { hasLink, isInternal }
}

const ProjectCard = ({ p }) => {
  const { hasLink, isInternal } = linkPropsFor(p)

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

const MotionLink = motion(Link)

const ProductRow = ({ p }) => {
  const { hasLink, isInternal } = linkPropsFor(p)
  const Tag = isInternal ? MotionLink : motion.a
  const tagProps = isInternal
    ? { to: p.link }
    : {
        href: hasLink ? p.link : undefined,
        target: hasLink ? '_blank' : undefined,
        rel: 'noreferrer',
        style: !hasLink ? { cursor: 'default', pointerEvents: 'none' } : {},
      }

  return (
    <Tag className="product-row" variants={fadeUp} {...tagProps}>
      <div className="product-row-media">
        {p.image && <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" />}
      </div>
      <div className="product-row-body">
        <div className="card-header-row">
          <h3>{p.title}</h3>
          {p.year && <span className="card-year">{p.year}</span>}
        </div>
        <p>{p.summary}</p>
        <div className="tags">
          {p.tags?.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </Tag>
  )
}

export default function Home() {
  useHead({ title: null, description: DEFAULT_DESCRIPTION, path: '/' })

  const products = projects.filter(p => p.type === 'product')
  const clientWork = projects.filter(p => p.type === 'client')

  return (
    <main className="container">
      {/* Hero */}
      <section className="hero" id="top">
        <HeroBackground />
        <div className="hero-content">
          <h1 className="hero-name"><span className="name-first">Nate</span> <span className="name-last">Guy</span></h1>
          <p className="hero-tagline">
            Developer &amp; designer building web and iOS products for 14+ years.
          </p>
          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">View Work</a>
            <a href="#contact" className="btn btn-ghost">Get in Touch</a>
          </div>
        </div>
      </section>

      {/* About */}
      <motion.section
        id="about"
        className="section"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
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
      </motion.section>

      {/* Work */}
      <motion.section
        id="work"
        className="section"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <h2>Selected Work</h2>
        <p className="section-sub">Products I've built and shipped, plus client &amp; agency work.</p>

        <h3 className="work-subheading">Products</h3>
        <motion.div
          className="product-rows"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {products.map(p => <ProductRow key={p.title} p={p} />)}
        </motion.div>

        <h3 className="work-subheading">Client &amp; Agency Work</h3>
        <motion.div
          className="grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {clientWork.map(p => (
            <motion.div key={p.title} variants={fadeUp}>
              <ProjectCard p={p} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Contact */}
      <motion.section
        id="contact"
        className="section"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
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
      </motion.section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Nate Guy</span>
        <span className="footer-sep">·</span>
        <a href="/privacy/example-app" className="footer-link">Privacy Policies</a>
      </footer>
    </main>
  )
}
