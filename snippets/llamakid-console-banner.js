/**
 * Portable "LLAMAKID" devtools console banner — drop this file into any
 * project and call it once on load to print a colored ASCII wordmark
 * (sky blue "LLAMA" + orange "KID") plus an optional tagline underneath.
 *
 * Usage (ES module / bundler project — Vite, webpack, Next.js, etc.):
 *   import { llamakidConsoleBanner } from './llamakid-console-banner.js'
 *   llamakidConsoleBanner('Made by llamakid.com')
 *
 * Usage (plain <script> tag, no bundler):
 *   1. Delete the `export` keyword below.
 *   2. <script src="llamakid-console-banner.js"></script>
 *      <script>llamakidConsoleBanner('Made by llamakid.com')</script>
 *   (or just add type="module" to the script tag and keep the export)
 *
 * Notes:
 * - font-family: monospace is required in the %c styles — without it,
 *   Safari's console falls back to a proportional font and the
 *   box-drawing characters drift out of column alignment.
 * - This is plain colored text (no images), so it renders identically
 *   in Chrome, Firefox, and Safari's Web Inspector.
 */
export function llamakidConsoleBanner(tagline) {
  const banner = `
%c██╗     ██╗      █████╗ ███╗   ███╗ █████╗ %c██╗  ██╗██╗██████╗
%c██║     ██║     ██╔══██╗████╗ ████║██╔══██╗%c██║ ██╔╝██║██╔══██╗
%c██║     ██║     ███████║██╔████╔██║███████║%c█████╔╝ ██║██║  ██║
%c██║     ██║     ██╔══██║██║╚██╔╝██║██╔══██║%c██╔═██╗ ██║██║  ██║
%c███████╗███████╗██║  ██║██║ ╚═╝ ██║██║  ██║%c██║  ██╗██║██████╔╝
%c╚══════╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝%c╚═╝  ╚═╝╚═╝╚═════╝
%c                                           %c                   `

  const blue = 'color:#4a9ab5; font-family: monospace; font-weight: bold;'
  const orange = 'color:#e05c1a; font-family: monospace; font-weight: bold;'

  console.log(
    banner,
    blue, orange,
    blue, orange,
    blue, orange,
    blue, orange,
    blue, orange,
    blue, orange,
    blue, orange
  )

  if (tagline) {
    console.log(`%c${tagline}`, 'color: #9a9a96; font-size: 13px;')
  }
}
