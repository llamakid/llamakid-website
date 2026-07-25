// Post-build step: renders every route to real static HTML using a headless
// browser, so crawlers that don't execute JavaScript (most AI/answer-engine
// bots) see actual page content instead of an empty <div id="root">.
import { chromium } from 'playwright-chromium'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const SITE_URL = 'https://llamakid.com'
const PORT = 4173 + Math.floor(Math.random() * 500)

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.mjs': 'application/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.xml': 'application/xml', '.txt': 'text/plain', '.webp': 'image/webp',
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { meta: {}, content: raw }
  const meta = {}
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) return
    meta[line.slice(0, colonIdx).trim()] = line.slice(colonIdx + 1).trim()
  })
  return { meta, content: match[2].trim() }
}

function collectContent() {
  const routes = [{ path: '/', lastmod: null, priority: '1.0', changefreq: 'monthly' }]

  routes.push({ path: '/blog', lastmod: null, priority: '0.8', changefreq: 'weekly' })
  const postsDir = path.join(rootDir, 'src/posts')
  const posts = []
  for (const file of fs.readdirSync(postsDir)) {
    if (!file.endsWith('.md')) continue
    const slug = file.replace(/\.md$/, '')
    const { meta } = parseFrontmatter(fs.readFileSync(path.join(postsDir, file), 'utf8'))
    routes.push({ path: `/blog/${slug}`, lastmod: meta.date || null, priority: '0.7', changefreq: 'monthly' })
    posts.push({ slug, title: meta.title, summary: meta.summary, date: meta.date })
  }
  posts.sort((a, b) => new Date(b.date) - new Date(a.date))

  const apps = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/apps.json'), 'utf8'))
  for (const app of apps) {
    routes.push({ path: `/apps/${app.slug}`, lastmod: null, priority: '0.6', changefreq: 'monthly' })
  }

  const policies = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/privacy.json'), 'utf8'))
  for (const policy of policies) {
    if (policy.slug === 'example-app') continue // template, not a real page
    routes.push({ path: `/privacy/${policy.slug}`, lastmod: policy.lastUpdated || null, priority: '0.3', changefreq: 'yearly' })
  }

  return { routes, posts, apps }
}

function createStaticServer(root) {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0])
    const tryFiles = [
      path.join(root, urlPath),
      path.join(root, urlPath, 'index.html'),
    ]
    const match = tryFiles.find(f => fs.existsSync(f) && fs.statSync(f).isFile())
    const filePath = match || path.join(root, 'index.html') // SPA fallback
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404
        res.end('Not found')
        return
      }
      res.setHeader('Content-Type', MIME[path.extname(filePath)] || 'application/octet-stream')
      res.end(data)
    })
  })
}

function writeSitemap(routes) {
  const urls = routes.map(r => {
    const loc = `${SITE_URL}${r.path}`
    const lastmodTag = r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : ''
    return `  <url>\n    <loc>${loc}</loc>${lastmodTag}\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
  }).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml)
}

function writeLlmsTxt(posts, apps) {
  const lines = []
  lines.push('# Nate Guy — llamakid.com')
  lines.push('')
  lines.push('> Developer & designer with 14+ years building web and iOS products for pharma, healthcare, and publishing (GE, NFL, Sesame Street). Currently focused on AI-powered React and iOS products, and writing about practical, non-hyped AI use.')
  lines.push('')
  lines.push('## Contact')
  lines.push('')
  lines.push('- Email: itsnateguy@gmail.com')
  lines.push('- LinkedIn: https://www.linkedin.com/in/nathanguy/')
  lines.push('- GitHub: https://github.com/llamakid')
  lines.push('')
  lines.push('## Apps')
  lines.push('')
  for (const app of apps) {
    const desc = app.tagline || app.description?.[0] || ''
    lines.push(`- [${app.name}](${SITE_URL}/apps/${app.slug}): ${desc}`)
  }
  lines.push('')
  lines.push('## Blog')
  lines.push('')
  lines.push('Practical, plain-English posts on AI tools (Claude, ChatGPT, Claude Code) and building software.')
  lines.push('')
  for (const post of posts) {
    lines.push(`- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.summary}`)
  }
  lines.push('')
  fs.writeFileSync(path.join(distDir, 'llms.txt'), lines.join('\n'))
}

async function main() {
  const { routes, posts, apps } = collectContent()
  writeSitemap(routes)
  writeLlmsTxt(posts, apps)

  const server = createStaticServer(distDir)
  await new Promise(resolve => server.listen(PORT, resolve))

  const browser = await chromium.launch()
  const page = await browser.newPage()

  for (const route of routes) {
    const url = `http://localhost:${PORT}${route.path}`
    await page.goto(url, { waitUntil: 'networkidle' })
    await page.waitForSelector('#root h1', { timeout: 10000 })
    const html = await page.content()

    const outDir = route.path === '/' ? distDir : path.join(distDir, route.path)
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(path.join(outDir, 'index.html'), html)
    console.log(`prerendered ${route.path}`)
  }

  await browser.close()
  server.close()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
