import React from 'react'
import { Link } from 'react-router-dom'
import { posts, formatDate } from '../lib/posts'
import { useHead } from '../lib/head'

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
        <h1>Blog</h1>
        <p className="blog-subtitle">Building things, writing about it.</p>
      </div>
      {posts.length === 0 ? (
        <p className="blog-empty">Nothing here yet.</p>
      ) : (
        <div className="blog-list">
          {posts.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-list-item">
              <span className="blog-date">{formatDate(post.date)}</span>
              <h2>{post.title}</h2>
              {post.summary && <p>{post.summary}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
