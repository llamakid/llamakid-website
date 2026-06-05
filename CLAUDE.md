# llamakid.com — Claude Context

Personal portfolio site for Nate Guy. React + Vite, deployed statically. No backend.

## Stack

- **React 18** + **Vite 5**
- **react-router-dom v6** for client-side routing
- Plain CSS (`src/styles.css`) — no Tailwind, no component library
- No TypeScript

## Dev

```bash
npm run dev      # starts dev server (usually :5173 or :5174 if port taken)
npm run build    # outputs to dist/
npm run preview  # preview the build locally
```

## File Structure

```
src/
  App.jsx              # Router setup + Nav component
  main.jsx             # Entry point, imports styles.css
  styles.css           # All styles — single file, CSS custom properties
  pages/
    Home.jsx           # Main portfolio page (hero, about, work, contact)
    PrivacyPolicy.jsx  # Template — reads from data/privacy.json by :slug param
  data/
    projects.json      # All project cards — edit this to update the Work section
    privacy.json       # All iOS app privacy policies — add an entry per app
  assets/              # Project screenshot images referenced in projects.json
public/
  favicon.png          # LK logo — sky blue + orange, source of the brand colors
```

## Design System

Two brand colors pulled from the favicon:

| Token         | Value     | Usage                              |
|---------------|-----------|------------------------------------|
| `--orange`    | `#e05c1a` | "kid" in logo, "Guy" in hero name, primary button, hover accents |
| `--sky-text`  | `#4a9ab5` | "llama" in logo, "Nate" in hero name |
| `--sky`       | `#a8d8ea` | Raw favicon blue (too light for text, use sky-text instead) |

Everything else is neutral grays. Avoid introducing new accent colors.

Logo split: `<span class="logo-llama">llama</span><span class="logo-kid">kid</span>`
Hero name split: `<span class="name-first">Nate</span> <span class="name-last">Guy</span>`

## Updating Projects

Edit `src/data/projects.json`. Each entry:

```json
{
  "title": "Project Name",
  "summary": "One or two sentence description.",
  "image": "./assets/yourScreenshot.png",
  "link": "https://example.com",
  "tags": ["React", "Firebase"],
  "year": 2024
}
```

- `link`: use `"#"` if there's no public URL — the card will render without a clickable link
- `image`: drop the screenshot into `src/assets/` and reference it as `./assets/filename.png`
- `year`: optional — shows as a small label on the card
- Order in the JSON = order on the page

## Adding / Updating Privacy Policies

Edit `src/data/privacy.json`. Each entry becomes a page at `/privacy/:slug`.

```json
{
  "slug": "my-app-name",
  "appName": "My App Name",
  "lastUpdated": "2026-06-05",
  "contactEmail": "itsnateguy@gmail.com",
  "collectsData": false,
  "sections": [
    { "heading": "Information We Collect", "body": "..." },
    { "heading": "How We Use Information", "body": "..." },
    { "heading": "Third-Party Services",   "body": "..." },
    { "heading": "Data Retention",         "body": "..." },
    { "heading": "Children's Privacy",     "body": "..." },
    { "heading": "Changes to This Policy", "body": "..." },
    { "heading": "Contact Us",             "body": "..." }
  ]
}
```

The URL to submit to App Store Connect is: `https://yourdomain.com/privacy/my-app-name`

The `example-app` entry in `privacy.json` is a working template — copy it and swap the fields.

## Routing

| Path               | Component       |
|--------------------|-----------------|
| `/`                | `Home.jsx`      |
| `/privacy/:slug`   | `PrivacyPolicy.jsx` — looks up slug in `privacy.json`, shows 404 message if not found |

Nav links only show on the home route (`/`). The privacy page shows a `← llamakid.com` back link instead.

## Deployment

The site builds to static files (`dist/`). For hosting on **Netlify**, add a redirect rule so React Router handles direct URL loads:

```
# public/_redirects
/* /index.html 200
```

Without this, navigating directly to `/privacy/my-app` will 404 on the host.

## Contact Info (currently in the site)

- Email: itsnateguy@gmail.com
- LinkedIn: https://www.linkedin.com/in/nathanguy/
- GitHub: https://github.com/llamakid
