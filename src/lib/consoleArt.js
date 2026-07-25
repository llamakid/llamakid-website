const LOGO_SVG_BASE64 =
  'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NjAiIGhlaWdodD0iMTMwIiB2aWV3Qm94PSIwIDAgNDYwIDEzMCI+CiAgPHRleHQgeD0iNiIgeT0iOTgiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iODAwIiBmb250LXNpemU9IjkwIiBsZXR0ZXItc3BhY2luZz0iLTMiPgogICAgPHRzcGFuIGZpbGw9IiM0YTlhYjUiPmxsYW1hPC90c3Bhbj48dHNwYW4gZmlsbD0iI2UwNWMxYSI+a2lkPC90c3Bhbj4KICA8L3RleHQ+Cjwvc3ZnPgo='

export function logConsoleArt() {
  console.log(
    '%c ',
    `font-size: 1px;
     padding: 65px 230px;
     background: url(data:image/svg+xml;base64,${LOGO_SVG_BASE64}) no-repeat;
     background-size: contain;`
  )
  console.log(
    '%cLooking under the hood? Building something, hiring, or just curious — say hi: itsnateguy@gmail.com',
    'color: #6b6b67; font-size: 13px;'
  )
}
