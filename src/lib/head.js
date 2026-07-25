import { useEffect } from 'react'

export const SITE_URL = 'https://llamakid.com'
export const DEFAULT_TITLE = 'Nate Guy — Portfolio'
export const DEFAULT_DESCRIPTION = 'Nate Guy — developer & designer. React, web, iOS, AI automation.'
export const DEFAULT_IMAGE = `${SITE_URL}/assets/nateHeader.jpg`

function setMetaTag(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', url)
}

function setJsonLd(data) {
  const id = 'page-jsonld'
  let el = document.getElementById(id)
  if (!data) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Sets document title, meta description, canonical/OG tags, and an optional
 * page-specific JSON-LD block. Runs client-side, and is captured by the
 * build-time prerender script so crawlers see the real values in the HTML.
 */
export function useHead({ title, description, path = '/', image, jsonLd } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — llamakid.com` : DEFAULT_TITLE
    const desc = description || DEFAULT_DESCRIPTION
    const url = `${SITE_URL}${path}`
    const imageUrl = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_IMAGE

    document.title = fullTitle
    setMetaTag('name', 'description', desc)
    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:title', fullTitle)
    setMetaTag('property', 'og:description', desc)
    setMetaTag('property', 'og:url', url)
    setMetaTag('property', 'og:image', imageUrl)
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setCanonical(url)
    setJsonLd(jsonLd)
  }, [title, description, path, image, jsonLd])
}
