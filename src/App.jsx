import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Home from './pages/Home'
import PrivacyPolicy from './pages/PrivacyPolicy'

const Nav = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="nav">
      <Link className="logo" to="/"><span className="logo-llama">llama</span><span className="logo-kid">kid</span></Link>
      {isHome && (
        <nav>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      )}
    </header>
  )
}

function ScrollManager() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href').slice(1)
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy/:slug" element={<PrivacyPolicy />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}
