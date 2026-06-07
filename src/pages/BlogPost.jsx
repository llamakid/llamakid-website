import React from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { posts, formatDate } from '../lib/posts'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)

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
      <div className="blog-post-header">
        <p className="blog-date">{formatDate(post.date)}</p>
        <h1>{post.title}</h1>
      </div>
      <div className="blog-prose">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  )
}
