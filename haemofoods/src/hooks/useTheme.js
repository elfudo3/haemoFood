// theme hook — manages light/dark mode with localStorage + system-preference fallback
// the initial class on <html> is set by an inline script in index.html to avoid flash
import { useState, useEffect } from 'react'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  //first visit — match the OS preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  //sync the <html> class and persist the user's choice whenever theme changes
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem('theme', theme)
    } catch { /* private mode etc. — ignore */ }
  }, [theme])

  //follow OS preference live, but only until the user makes a manual choice
  useEffect(() => {
    //if the user already set a preference, don't override it
    if (localStorage.getItem('theme')) return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => setTheme(e.matches ? 'dark' : 'light')
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [])

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
