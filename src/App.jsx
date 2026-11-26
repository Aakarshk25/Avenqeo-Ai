import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Header, Footer } from './components/Layout'
import { ScrollToTopAndAskAI } from './components/ScrollToTopAndAskAI'
import About from './pages/About'
import BookDemo from './pages/BookDemo'
import FAQ from './pages/FAQ'
import Home from './pages/Home'
import LegalPolicy from './pages/LegalPolicy'

function ScrollToHash() {
  const { hash, pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!hash) return undefined
    if (pathname === '/' && hash === '#book-a-demo') {
      navigate('/book-a-demo', { replace: true })
      return undefined
    }

    const targetId = decodeURIComponent(hash.slice(1))
    const frameId = window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId)
      if (!target) return

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [hash, pathname, navigate])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/book-a-demo" element={<BookDemo />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<LegalPolicy type="privacy" />} />
          <Route path="/terms-of-service" element={<LegalPolicy type="terms" />} />
          <Route path="/cookie-policy" element={<LegalPolicy type="cookies" />} />
          <Route path="/data-privacy-security" element={<LegalPolicy type="security" />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopAndAskAI />
    </>
  )
}

