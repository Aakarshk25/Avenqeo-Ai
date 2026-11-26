import React from 'react'
import { Link } from 'react-router-dom'

const QUESTIONS = [
  {
    question: 'What are Avenqeo AI digital employees?',
    answer: 'They are specialised AI assistants designed around business functions such as customer support, marketing, operations and community work.',
  },
  {
    question: 'How do they work with our team?',
    answer: 'The experience is designed to keep work visible, with review, approval and escalation steps where people need to stay involved.',
  },
  {
    question: 'What kinds of work can they support?',
    answer: 'Examples on this site include sorting support requests, preparing marketing content, coordinating operational handoffs and supporting community conversations.',
  },
  {
    question: 'Does the product demonstration connect to live accounts?',
    answer: 'No. The on-page product demonstration is simulated; it does not connect to live accounts, messages or third-party actions.',
  },
  {
    question: 'How can I discuss a potential use case?',
    answer: 'Book a demo to talk through your team’s needs and explore whether the Avenqeo AI approach is a fit.',
  },
]

export default function FAQ() {
  return (
    <section className="content-page">
      <div className="container content-page-inner">
        <span className="section-label">FAQ</span>
        <h1>Frequently asked questions</h1>
        <p className="content-page-lead">A little more about Avenqeo AI and how its demonstrations work.</p>
        <div className="faq-list">
          {QUESTIONS.map(({ question, answer }) => (
            <article className="faq-item" key={question}>
              <h2>{question}</h2>
              <p>{answer}</p>
            </article>
          ))}
        </div>
        <Link className="button button-primary" to="/book-a-demo">Book a Demo</Link>
      </div>
    </section>
  )
}
