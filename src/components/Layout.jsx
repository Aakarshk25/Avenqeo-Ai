import React from 'react'
import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  { label: 'AI Workforce', href: '#workforce' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Product Demo', href: '#product-experience' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Industries', href: '#industries' },
  { label: 'Responsible AI', href: '#responsible-ai' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner container">
        <a className="brand" href="#home" aria-label="AVENQEO AI home" onClick={closeMenu}>
          <img className="brand-logo" src="/avenqeo-logo.png" alt="Avenqeo AI" />
        </a>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="primary-navigation" className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="nav-consultation" href="#contact" onClick={closeMenu}>Book a Demo</a>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#home">Home</a>
          {NAV_ITEMS.filter((item) => item.label !== 'Contact').map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} All rights reserved.</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  )
}
