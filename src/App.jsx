import React from 'react'
import { Header, Footer, ScrollToTop } from './components/Layout'
import Home from './pages/Home'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main-content">
        <Home />
      </main>
      <Footer />
    </>
  )
}
