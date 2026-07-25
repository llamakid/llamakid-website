import React from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'
import { posts, formatDate } from '../lib/posts'
import { useHead, SITE_URL } from '../lib/head'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)

  useHead(post ? {
    title: post.title,
    description: post.summary,
    path: `/blog/${slug}`,
    type: 'article',
    publishedTime: post.date,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      dateModified: post.date,
      url: `${SITE_URL}/blog/${slug}`,
      author: { '@type': 'Person', name: 'Nate Guy', url: SITE_URL },
    },
  } : { title: 'Post not found', path: `/blog/${slug}`, noindex: true })

  if (!post) {
    return (
      <div className="blog-container">
        <Link to="/blog" className="back-link">← Blog</Link>
        <h1>Post not found</h1>
        <p>This post doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="blog-container">
      <Link to="/blog" className="back-link">← Blog</Link>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="blog-post-header">
          <p className="blog-date">{formatDate(post.date)}</p>
          <h1>{post.title}</h1>
        </div>
        <div className="blog-prose">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </motion.div>
    </div>
  )
}
