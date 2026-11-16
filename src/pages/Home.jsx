import React from 'react'

const challenges = [
  {
    number: '01',
    title: 'Repetitive Tasks',
    text: 'Too much time spent on everyday manual work.',
  },
  {
    number: '02',
    title: 'Disconnected Workflows',
    text: 'Business processes spread across different systems.',
  },
  {
    number: '03',
    title: 'Limited Capacity',
    text: 'Growing responsibilities with limited operational resources.',
  },
  {
    number: '04',
    title: 'Less Strategic Focus',
    text: 'Less time for planning, innovation and growth.',
  },
]

const agents = [
  {
    number: '01',
    name: 'Customer Support AI',
    category: 'Customer experience and service',
    description: 'Handles enquiries, understands customer intent and supports service workflows.',
    slug: 'customer-support',
  },
  {
    number: '02',
    name: 'Sales AI',
    category: 'Revenue and relationship management',
    description: 'Organises leads, supports qualification and helps teams follow up.',
    slug: 'sales',
  },
  {
    number: '03',
    name: 'HR AI',
    category: 'Recruitment and people operations',
    description: 'Supports candidate coordination, onboarding and everyday HR requests.',
    slug: 'hr',
  },
  {
    number: '04',
    name: 'Operations AI',
    category: 'Process management and execution',
    description: 'Coordinates tasks, tracks deadlines and organises operational workflows.',
    slug: 'operations',
  },
  {
    number: '05',
    name: 'Marketing AI',
    category: 'Marketing strategy and campaign operations',
    description: 'Supports research, content planning and campaign activities.',
    slug: 'marketing',
  },
  {
    number: '06',
    name: 'Data Analyst AI',
    category: 'Data analysis and business intelligence',
    description: 'Turns authorised business data into reports, trends and insights.',
    slug: 'data-analyst',
  },
]

const executionSteps = [
  {
    number: '01',
    title: 'UNDERSTAND',
    text: 'Interpret the task, context and business objective.',
  },
  {
    number: '02',
    title: 'DECIDE',
    text: 'Determine an appropriate action within assigned rules and permissions.',
  },
  {
    number: '03',
    title: 'EXECUTE',
    text: 'Perform approved tasks through connected applications and systems.',
  },
  {
    number: '04',
    title: 'REPORT',
    text: 'Communicate outcomes, record activity and escalate exceptions.',
  },
]

const industries = [
  'Banking and Financial Services',
  'Healthcare',
  'Retail and E-commerce',
  'Education',
  'Manufacturing',
  'Real Estate',
  'IT and Technology',
  'Professional Services',
]

const integrationTypes = [
  'Communication and Email Applications',
  'CRM and Sales Platforms',
  'HR and Recruitment Systems',
  'Business Management Software',
  'Data Warehouses and Analytics',
  'Productivity and Collaboration Applications',
]

function SectionLabel({ children }) {
  return <span className="section-label">{children}</span>
}

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-layout">
        <div className="hero-copy">
          <SectionLabel>THE NEXT ERA OF WORK IS HERE.</SectionLabel>
          <h1>Your next best hire<br className="desktop-break" /> might not be human.</h1>
          <p className="hero-description">
            Meet a new generation of intelligent digital employees. Designed to take on business responsibilities, execute workflows and work alongside the people who move your organisation forward.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#workforce">Explore the AI Workforce</a>
            <a className="button button-outline" href="#contact">Book a Consultation</a>
          </div>
          <p className="hero-tagline">Six specialised roles. Endless possibilities. One intelligent direction.</p>
        </div>

        <div className="hero-visual" aria-label="AVENQEO AI, the intelligent workforce">
          <div className="ai-identity-card">
            <h2>AVENQEO AI</h2>
            <p className="ai-identity-subtitle">THE INTELLIGENT<br />WORKFORCE</p>
            <div className="concentric-rings" aria-hidden="true">
              <span className="ring ring-one" />
              <span className="ring ring-two" />
              <span className="ring ring-three" />
            </div>
            <p className="ai-identity-caption">Human ambition. Artificial intelligence.</p>
          </div>
        </div>
      </div>
      <div className="hero-bottomline container" aria-hidden="true">
        <span>AVENQEO AI&nbsp; | &nbsp;Built for what comes after next.</span>
        <span>INTELLIGENT WORKFORCE</span>
      </div>
    </section>
  )
}

function BusinessChallenge() {
  return (
    <section className="section challenge-section" id="solutions">
      <div className="container">
        <SectionLabel>THE BUSINESS CHALLENGE</SectionLabel>
        <div className="section-heading challenge-heading">
          <h2>Businesses are growing. Work is growing faster.</h2>
          <p>
            As businesses expand, responsibilities multiply across customer enquiries, sales, recruitment, reporting, marketing and everyday operations.
          </p>
        </div>

        <div className="challenge-grid">
          {challenges.map((item) => (
            <article className="challenge-card" key={item.number}>
              <span className="card-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <p className="challenge-conclusion">
          The next evolution isn't about working harder. It's about rethinking how work gets done.
        </p>

        <div className="philosophy-panel" id="about">
          <SectionLabel>THE AVENQEO PHILOSOPHY</SectionLabel>
          <h2>Don't just automate tasks. Rethink the workforce.</h2>
          <p>
            People and intelligent digital employees can work together to move organisations forward. AI should expand human capability, not represent a blanket replacement for people.
          </p>
        </div>
      </div>
    </section>
  )
}

function Workforce() {
  return (
    <section className="section workforce-section" id="workforce">
      <div className="container">
        <SectionLabel>MEET THE WORKFORCE</SectionLabel>
        <div className="section-heading workforce-heading">
          <div>
            <h2>Six roles. One intelligent workforce.</h2>
            <p>
              Specialised AI employees designed around distinct business functions. Select a role to explore its responsibilities and example workflow.
            </p>
          </div>
        </div>

        <div className="agent-grid">
          {agents.map((agent) => (
            <article className="agent-card" key={agent.slug}>
              <span className="agent-number">ROLE {agent.number}</span>
              <h3>{agent.name}</h3>
              <p className="agent-category">{agent.category}</p>
              <p className="agent-description">{agent.description}</p>
              <a className="text-link" href="#contact" aria-label={`Contact AVENQEO AI about ${agent.name}`}>
                Explore role <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="section execution-section" id="how-it-works">
      <div className="container">
        <SectionLabel>HOW IT WORKS</SectionLabel>
        <div className="section-heading">
          <h2>Not just intelligent. Designed to get work done.</h2>
          <p>
            Every AI employee follows a structured process to understand a task, choose an appropriate action, complete approved work and report the outcome.
          </p>
        </div>

        <div className="execution-grid">
          {executionSteps.map((step, index) => (
            <article className="execution-card" key={step.number}>
              <span className="execution-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              {index < executionSteps.length - 1 && <span className="execution-arrow" aria-hidden="true">→</span>}
            </article>
          ))}
        </div>

        <div className="execution-summary">
          <strong>THE AVENQEO EXECUTION CYCLE</strong>
          <span>Understand&nbsp; → &nbsp;Decide&nbsp; → &nbsp;Execute&nbsp; → &nbsp;Report</span>
        </div>
      </div>
    </section>
  )
}

function Industries() {
  return (
    <section className="section industries-section" id="industries">
      <div className="container">
        <SectionLabel>INDUSTRY APPLICATIONS</SectionLabel>
        <div className="section-heading">
          <h2>Intelligence shouldn't belong to just one industry.</h2>
          <p>
            Every industry has unique challenges, workflows and opportunities. Avenqeo aims to support different business environments.
          </p>
        </div>

        <div className="industry-grid">
          {industries.map((industry, index) => (
            <article className="industry-card" key={industry}>
              <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{industry}</h3>
            </article>
          ))}
        </div>

        <p className="industry-note">
          Explore how intelligent digital employees could support the workflows that matter to your organisation.
        </p>
      </div>
    </section>
  )
}

function ConnectedIntelligence() {
  return (
    <section className="section integrations-section" id="integrations">
      <div className="container">
        <SectionLabel>CONNECTED INTELLIGENCE</SectionLabel>
        <div className="section-heading">
          <h2>Your business already has a system. Your AI employees should fit into it.</h2>
          <p>
            Avenqeo is designed to bring intelligent digital employees into existing business environments.
          </p>
        </div>

        <div className="integration-grid">
          {integrationTypes.map((type) => (
            <article className="integration-card" key={type}>
              <span className="integration-mark" aria-hidden="true">↗</span>
              <h3>{type}</h3>
            </article>
          ))}
        </div>

        <p className="integration-disclaimer">Only publish integrations that are implemented and tested.</p>

        <div className="responsible-control">
          <strong>INTELLIGENT EXECUTION NEEDS RESPONSIBLE CONTROL.</strong>
          <p>Permissions <span>•</span> Human approval <span>•</span> Execution records <span>•</span> Data protection <span>•</span> Escalation <span>•</span> Monitoring</p>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="final-cta-section">
      <div className="container">
        <div className="final-cta-panel">
          <SectionLabel>LET'S BUILD WHAT'S NEXT</SectionLabel>
          <h2>The future of your workforce<br className="desktop-break" /> starts with a conversation.</h2>
          <p>Discover how intelligent digital employees could fit into your business.</p>
          <a className="button button-primary" href="#contact">Book a Consultation</a>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <BusinessChallenge />
      <Workforce />
      <HowItWorks />
      <Industries />
      <ConnectedIntelligence />
      <FinalCTA />
    </>
  )
}
