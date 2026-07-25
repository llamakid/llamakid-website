import { useEffect } from 'react'

export const SITE_URL = 'https://llamakid.com'
export const DEFAULT_TITLE = 'Nate Guy — Portfolio'
export const DEFAULT_DESCRIPTION = 'Nate Guy — developer & designer. React, web, iOS, AI automation.'
export const DEFAULT_IMAGE = `${SITE_URL}/assets/nateHeader.jpg`

export function computeHeadValues({ title, description, path = '/', image, jsonLd, type = 'website', publishedTime, noindex = false } = {}) {
  const fullTitle = title ? `${title} — llamakid.com` : DEFAULT_TITLE
  const desc = description || DEFAULT_DESCRIPTION
  const url = `${SITE_URL}${path}`
  const imageUrl = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_IMAGE
  return {
    title: fullTitle,
    description: desc,
    url,
    image: imageUrl,
    jsonLd: jsonLd || null,
    type,
    publishedTime: publishedTime || null,
    robots: noindex ? 'noindex, follow' : null,
  }
}

// Set synchronously during render (see useHead below) so the build-time SSR
// pass can read it right after renderToStaticMarkup finishes, with no need
// to duplicate per-page head logic in the prerender script.
let lastHead = null
export function getLastHead() {
  return lastHead
}

function setMetaTag(attr, key, content) {
  const el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!content) {
    if (el) el.remove()
    return
  }
  if (el) {
    el.setAttribute('content', content)
    return
  }
  const newEl = document.createElement('meta')
  newEl.setAttribute(attr, key)
  newEl.setAttribute('content', content)
  document.head.appendChild(newEl)
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
 * page-specific JSON-LD block. The DOM writes happen client-side via effect;
 * the build-time prerender script instead reads getLastHead() right after
 * server-rendering the page, since effects don't run during SSR.
 */
export function useHead(opts = {}) {
  const values = computeHeadValues(opts)
  lastHead = values

  useEffect(() => {
    document.title = values.title
    setMetaTag('name', 'description', values.description)
    setMetaTag('property', 'og:type', values.type)
    setMetaTag('property', 'og:title', values.title)
    setMetaTag('property', 'og:description', values.description)
    setMetaTag('property', 'og:url', values.url)
    setMetaTag('property', 'og:image', values.image)
    setMetaTag('property', 'article:published_time', values.publishedTime)
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'robots', values.robots)
    setCanonical(values.url)
    setJsonLd(values.jsonLd)
  })
}
