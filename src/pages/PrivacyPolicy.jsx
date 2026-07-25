import React from 'react'
import { useParams, Link } from 'react-router-dom'
import policies from '../data/privacy.json'
import { useHead } from '../lib/head'

export default function PrivacyPolicy() {
  const { slug } = useParams()
  const policy = policies.find(p => p.slug === slug)

  useHead(policy ? {
    title: `${policy.appName} Privacy Policy`,
    description: `Privacy policy for ${policy.appName}, last updated ${policy.lastUpdated}.`,
    path: `/privacy/${slug}`,
  } : { title: 'Policy not found', path: `/privacy/${slug}` })

  if (!policy) {
    return (
      <div className="privacy-container">
        <Link to="/" className="back-link">← Back</Link>
        <h1>Policy Not Found</h1>
        <p>No privacy policy found for this app.</p>
      </div>
    )
  }

  return (
    <div className="privacy-container">
      <Link to="/" className="back-link">← llamakid.com</Link>
      <div className="privacy-header">
        <h1>{policy.appName}</h1>
        <p className="privacy-subtitle">Privacy Policy</p>
        <p className="privacy-date">Last updated: {policy.lastUpdated}</p>
      </div>

      <div className="privacy-body">
        {policy.sections.map(s => (
          <div key={s.heading} className="privacy-section">
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
