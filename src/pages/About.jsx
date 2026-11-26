import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <section className="content-page">
      <div className="container content-page-inner">
        <span className="section-label">ABOUT AVENQEO AI</span>
        <h1>Intelligent workflows, built around people.</h1>
        <p className="content-page-lead">
          Avenqeo AI brings intelligent workflows together to help businesses support better, market smarter, operate efficiently and build stronger communities.
        </p>
        <div className="content-page-copy">
          <h2>People and AI, working together</h2>
          <p>
            Avenqeo AI is built around specialised digital employees for customer support, marketing, operations and community work. They are designed to help teams coordinate work while keeping human review and oversight part of the process.
          </p>
          <p>
            Our aim is to expand what people and organisations can accomplish—not to present AI as a blanket replacement for people.
          </p>
        </div>
        <Link className="button button-primary" to="/book-a-demo">Book a Demo</Link>
      </div>
    </section>
  )
}
