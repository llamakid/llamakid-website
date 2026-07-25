import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { logConsoleArt } from './lib/consoleArt'
import '@fontsource/schibsted-grotesk/700.css'
import '@fontsource/schibsted-grotesk/800.css'
import './styles.css'

logConsoleArt()

createRoot(document.getElementById('root')).render(<App />)
