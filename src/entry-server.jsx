import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppShell } from './App'
import { getLastHead } from './lib/head'

export function render(url) {
  const body = renderToStaticMarkup(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>
  )
  return { body, head: getLastHead() }
}
