import React from 'react'
import { Header, Footer } from './components/Layout'
import { ScrollToTopAndAskAI } from './components/ScrollToTopAndAskAI'
import Home from './pages/Home'

export default function App() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Home />
      </main>
      <Footer />
      <ScrollToTopAndAskAI />
    </>
  )
}

