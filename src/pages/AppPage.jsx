import React from 'react'
import { useParams, Link } from 'react-router-dom'
import apps from '../data/apps.json'
import projects from '../data/projects.json'
import { useHead, SITE_URL } from '../lib/head'

function osFor(slug) {
  const project = projects.find(p => p.link === `/apps/${slug}`)
  const tags = project?.tags || []
  if (tags.includes('macOS')) return 'macOS'
  if (tags.includes('watchOS')) return 'iOS, watchOS'
  return 'iOS'
}

export default function AppPage() {
  const { slug } = useParams()
  const app = apps.find(a => a.slug === slug)

  useHead(app ? {
    title: app.subtitle ? `${app.name} — ${app.subtitle}` : app.name,
    description: app.tagline || app.description?.[0],
    path: `/apps/${slug}`,
    image: app.icon,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: app.name,
      description: app.tagline || app.description?.[0],
      url: `${SITE_URL}/apps/${slug}`,
      applicationCategory: 'GameApplication',
      operatingSystem: osFor(slug),
      author: { '@type': 'Person', name: 'Nate Guy', url: SITE_URL },
      ...(app.appStoreUrl && !app.appStoreUrl.startsWith('REPLACE_') ? { installUrl: app.appStoreUrl } : {}),
    },
  } : { title: 'App not found', path: `/apps/${slug}` })

  if (!app) {
    return (
      <div className="app-container">
        <Link to="/" className="back-link">← llamakid.com</Link>
        <h1>App Not Found</h1>
        <p>No app found for this address.</p>
      </div>
    )
  }

  const screenshots = app.screenshots || []
  const hasStoreUrl = app.appStoreUrl && !app.appStoreUrl.startsWith('REPLACE_')

  return (
    <div className="app-container">
      <Link to="/" className="back-link">← llamakid.com</Link>

      <div className="app-hero">
        {app.icon && <img className="app-icon" src={app.icon} alt={`${app.name} app icon`} />}
        <div className="app-hero-text">
          <h1>
            {app.name}
            {app.subtitle && <span className="app-subtitle"> — {app.subtitle}</span>}
          </h1>
          {app.tagline && <p className="app-tagline">{app.tagline}</p>}
          {hasStoreUrl && (
            <a className="btn btn-primary" href={app.appStoreUrl} target="_blank" rel="noopener noreferrer">
              Download on the App Store
            </a>
          )}
        </div>
      </div>

      {screenshots.length > 0 && (
        <div className="app-shots">
          {screenshots.map((src, i) => (
            <img key={i} className="app-shot" src={src} alt={`${app.name} screenshot ${i + 1}`} />
          ))}
        </div>
      )}

      {app.description?.length > 0 && (
        <div className="app-section">
          <h2>About</h2>
          {app.description.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )}

      {app.features?.length > 0 && (
        <div className="app-section">
          <h2>Features</h2>
          <ul className="app-features">
            {app.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      )}

      {app.privacySlug && (
        <div className="app-section">
          <p className="app-privacy-line">
            Read the <Link to={`/privacy/${app.privacySlug}`}>Privacy Policy</Link>.
          </p>
        </div>
      )}

      <div className="app-section">
        <p className="app-support-line">
          For any support needs, please email <a href="mailto:itsnateguy@gmail.com">itsnateguy@gmail.com</a>.
        </p>
      </div>
    </div>
  )
}
