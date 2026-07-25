import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { posts, formatDate } from '../lib/posts'
import { useHead } from '../lib/head'
import BlogHeaderBackground from '../components/BlogHeaderBackground'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const MotionLink = motion.create(Link)

export default function Blog() {
  useHead({
    title: 'Blog',
    description: 'Building things, writing about it — posts on AI tools, Claude Code, and building products.',
    path: '/blog',
  })

  return (
    <div className="blog-container">
      <Link to="/" className="back-link">← llamakid.com</Link>
      <div className="blog-header">
        <BlogHeaderBackground />
        <div className="blog-header-content">
          <h1>Blog</h1>
          <p className="blog-subtitle">Building things, writing about it.</p>
        </div>
      </div>
      {posts.length === 0 ? (
        <p className="blog-empty">Nothing here yet.</p>
      ) : (
        <motion.div className="blog-list" variants={stagger} initial="hidden" animate="show">
          {posts.map(post => (
            <MotionLink key={post.slug} to={`/blog/${post.slug}`} className="blog-list-item" variants={fadeUp}>
              <span className="blog-date">{formatDate(post.date)}</span>
              <h2>{post.title}</h2>
              {post.summary && <p>{post.summary}</p>}
            </MotionLink>
          ))}
        </motion.div>
      )}
    </div>
  )
}
