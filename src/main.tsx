import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import logo from './assets/Andamologo.png'

const favicon = document.querySelector<HTMLLinkElement>("link[rel~='icon']")
if (favicon) {
  favicon.href = logo
} else {
  const link = document.createElement('link')
  link.rel = 'icon'
  link.href = logo
  document.head.appendChild(link)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
