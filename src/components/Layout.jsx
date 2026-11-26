import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { siFacebook, siInstagram } from 'simple-icons'

const NAV_ITEMS = [
  { label: 'AI Workforce', href: '#workforce' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'AI Ecosystem', href: '#integrations' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Product Demo', href: '#product-experience' },
  { label: 'Industries', href: '#industries' },
  { label: 'Responsible AI', href: '#responsible-ai' },
  { label: 'Contact', href: '#contact' },
]

const FOOTER_COLUMNS = [
  {
    title: 'AI Solutions',
    links: [
      { label: 'Customer Support AI', to: '/#customer-support' },
      { label: 'Marketing AI', to: '/#marketing' },
      { label: 'Operations AI', to: '/#operations' },
      { label: 'Community AI', to: '/#community' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'AI Workforce', to: '/#workforce' },
      { label: 'AI Ecosystem', to: '/#about' },
      { label: 'How It Works', to: '/#how-it-works' },
      { label: 'Product Experience', to: '/#product-experience' },
      { label: 'Industries', to: '/#industries' },
      { label: 'Responsible AI', to: '/#responsible-ai' },
      { label: 'Integrations', to: '/#integrations' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact Us', to: '/#contact' },
      { label: 'Book a Demo', to: '/book-a-demo' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'Legal & Trust',
    links: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms of Service', to: '/terms-of-service' },
      { label: 'Cookie Policy', to: '/cookie-policy' },
      { label: 'Data Privacy & Security', to: '/data-privacy-security' },
    ],
  },
]

const SOCIAL_NETWORKS = [
  {
    label: 'LinkedIn',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.999 20.452H3.67V9h3.33v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  { label: siInstagram.title, path: siInstagram.path },
  { label: siFacebook.title, path: siFacebook.path },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

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
        <Link className="brand" to="/#home" aria-label="AVENQEO AI home" onClick={closeMenu}>
          <img className="brand-logo" src="/avenqeo-logo-transparent.png" alt="Avenqeo AI" />
        </Link>

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
            <Link key={item.href} to={pathname === '/' ? item.href : `/${item.href}`} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
          <Link
            className="nav-consultation"
            to="/book-a-demo"
            onClick={closeMenu}
          >
            Book a Demo
          </Link>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-block">
          <Link className="footer-brand" to="/#home" aria-label="Avenqeo AI home">
            <img className="footer-brand-logo" src="/avenqeo-logo-transparent.png" alt="" />
          </Link>
          <p className="footer-description">
            Avenqeo AI brings intelligent workflows together to help businesses support better, market smarter, operate efficiently and build stronger communities.
          </p>
          <p className="footer-tagline">Built for what comes after next.</p>
          <p className="footer-availability">Built for 24/7 Operations</p>
          <div className="footer-social" aria-label="Social media">
            <span className="footer-social-title">Social</span>
            <div className="footer-social-icons">
              {SOCIAL_NETWORKS.map((network) => (
                <span
                  className="footer-social-icon"
                  key={network.label}
                  role="img"
                  aria-label={`${network.label} profile not linked`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d={network.path} />
                  </svg>
                </span>
              ))}
            </div>
            <p>Official social profiles aren&apos;t linked yet.</p>
          </div>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {FOOTER_COLUMNS.map((column) => (
            <div className="footer-column" key={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}><Link to={link.to}>{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 Avenqeo AI. All rights reserved.</span>
        <nav aria-label="Legal and contact links">
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms-of-service">Terms</Link>
          <Link to="/#contact">Contact</Link>
        </nav>
      </div>
    </footer>
  )
}
