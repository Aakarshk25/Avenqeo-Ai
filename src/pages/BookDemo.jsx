import React from 'react'
import { Clock3, ShieldCheck, Video } from 'lucide-react'
import CalBooking from '../components/CalBooking'
import './BookDemo.css'

const demoHighlights = [
  { icon: Clock3, title: '30-minute personalised walkthrough' },
  { icon: Video, title: 'Online meeting with our team' },
  { icon: ShieldCheck, title: 'Human-supervised AI workforce' },
]

export default function BookDemo() {
  return (
    <section className="booking-page" id="book-a-demo">
      <div className="container booking-page-layout">
        <aside className="booking-info-panel" aria-labelledby="booking-info-title">
          <span className="booking-page-eyebrow">PERSONALISED DEMO</span>
          <h1 id="booking-info-title">Let&apos;s Build What&apos;s Next.</h1>
          <p className="booking-info-description">
            Discover how intelligent digital employees can help your business work smarter, streamline operations and grow faster.
          </p>

          <ul className="booking-info-highlights">
            {demoHighlights.map(({ icon: Icon, title }) => (
              <li key={title}>
                <span className="booking-highlight-icon"><Icon size={17} aria-hidden="true" /></span>
                <strong>{title}</strong>
              </li>
            ))}
          </ul>

          <p className="booking-info-note">Choose a convenient time to meet our team.</p>
        </aside>

        <section className="booking-calendar-panel" aria-labelledby="booking-calendar-title">
          <header className="booking-calendar-header">
            <h2 id="booking-calendar-title">Choose Your Date &amp; Time</h2>
          </header>
          <CalBooking />
        </section>
      </div>
    </section>
  )
}
