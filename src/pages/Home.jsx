import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Mail,
  MessageSquareText,
  Pause,
  Play,
  RefreshCw,
  ShieldCheck,
  Users,
} from 'lucide-react'

const challenges = [
  {
    id: 'repetitive',
    number: '01',
    title: 'Repetitive Tasks',
    text: 'Too much time spent on everyday manual work.',
    problem: 'Teams are trapped in volume-heavy task loops where even small processes consume large amounts of time.',
    difficulty: 'High-volume requests repeatedly compete for the same team attention.',
    detail: 'An AI employee can sort requests, gather context and prepare the next action for human review.',
    metric: 'High task volume',
  },
  {
    id: 'disconnected',
    number: '02',
    title: 'Disconnected Workflows',
    text: 'Business processes spread across different systems.',
    problem: 'Critical work sits across email, spreadsheets, support tools and internal documents with no clear path between them.',
    difficulty: 'Ownership and context are lost between tools and handoffs.',
    detail: 'An AI employee can connect the steps, keep task status visible and route work to the right owner.',
    metric: 'Fragmented execution',
  },
  {
    id: 'capacity',
    number: '03',
    title: 'Limited Capacity',
    text: 'Growing responsibilities with limited operational resources.',
    problem: 'Teams are expected to do more while staffing stays flat, creating delays and overlooked tasks.',
    difficulty: 'Growing queues make it harder to keep priority work moving.',
    detail: 'An AI employee can triage routine work and surface exceptions so people can focus their attention.',
    metric: 'Growing backlog',
  },
  {
    id: 'focus',
    number: '04',
    title: 'Less Strategic Focus',
    text: 'Less time for planning, innovation and growth.',
    problem: 'Daily process friction leaves teams with less time for planning, experimentation and long-term improvement.',
    difficulty: 'Reactive coordination leaves little space for strategic work.',
    detail: 'An AI employee can coordinate recurring tasks and give teams more room to plan and improve.',
    metric: 'Strategic delay',
  },
]

const agents = [
  {
    id: 'customer-support',
    number: '01',
    name: 'Customer Support AI',
    category: 'Customer experience and service',
    shortSummary: 'Handles customer conversations with context, consistency and speed.',
    description: 'Designed to manage customer conversations, understand intent and coordinate service workflows with approved knowledge sources.',
    capabilities: ['Answer support enquiries using approved knowledge', 'Classify requests and detect urgency', 'Retrieve account and order context', 'Draft responses and escalate when needed'],
    task: 'Customer reports “I need a refund on my order placed last week.”',
    reasoning: ['Identify the customer and order context', 'Check refund policy and account history', 'Draft a policy-based response', 'Escalate when compensation exceeds policy'],
    progress: ['Intent matched', 'Order verified', 'Policy check', 'Response drafted'],
    outcome: 'The refund request is resolved within policy and the customer receives a clear follow-up with a status timeline.',
    accent: 'support',
    tone: '#5aa8ff',
    demo: {
      label: 'Approval queue',
      status: 'Awaiting review',
      steps: ['Inbox triage', 'Context retrieved', 'Response drafted', 'Human check'],
    },
  },
  {
    id: 'marketing',
    number: '02',
    name: 'Marketing AI',
    category: 'Marketing strategy and campaign coordination',
    shortSummary: 'Turns campaign objectives into content plans, ideas and reporting.',
    description: 'Supports marketing teams with research, content preparation, campaign planning and performance reporting using approved inputs.',
    capabilities: ['Research market and competitor signals', 'Generate campaign concepts and messaging', 'Prepare social content calendar drafts', 'Summarise performance trends for review'],
    task: 'Launch a regional campaign for a new AI productivity feature.',
    reasoning: ['Review campaign objectives and audience inputs', 'Build campaign themes and content pillars', 'Draft social copy and content calendar', 'Prepare an approval-ready summary'],
    progress: ['Audience brief', 'Campaign themes', 'Content drafts', 'Approval review'],
    outcome: 'The campaign concept is ready for review with messaging, pillars and draft content mapped across channels.',
    accent: 'marketing',
    tone: '#6470ff',
    demo: {
      label: 'Campaign routing',
      status: 'Awaiting approval',
      steps: ['Audience brief', 'Asset plan', 'Draft content', 'Human sign-off'],
    },
  },
  {
    id: 'operations',
    number: '03',
    name: 'Operations AI',
    category: 'Operations management and execution',
    shortSummary: 'Coordinates recurring tasks, deadlines and workflow steps across teams.',
    description: 'Organises operational requests, monitors shared workflows and keeps responsibilities visible across business activity.',
    capabilities: ['Track pending requests and deadlines', 'Coordinate service workflows', 'Organise documentation and tasks', 'Flag issues and route them appropriately'],
    task: 'A vendor onboarding request is waiting on four approvals before launch.',
    reasoning: ['Map the request to the right workflow', 'Check dependencies and documentation', 'Create a task owner plan', 'Track blockers and escalate exceptions'],
    progress: ['Request logged', 'Workflow checks', 'Approvals pending', 'Launch summary'],
    outcome: 'The onboarding timeline is structured, missing approvals are surfaced and the next owners are clearly assigned.',
    accent: 'operations',
    tone: '#26b3a5',
    demo: {
      label: 'Operational flow',
      status: 'Processing',
      steps: ['Request intake', 'Dependency check', 'Assigned workflow', 'Launch recap'],
    },
  },
  {
    id: 'hr',
    number: '04',
    name: 'HR AI',
    category: 'Recruitment and people operations',
    shortSummary: 'Helps organise hiring, onboarding and employee request triage.',
    description: 'Supports HR teams by structuring candidate information, coordinating interviews and managing policy-based employee requests.',
    capabilities: ['Organise candidate applications', 'Summarise candidate fit against job criteria', 'Coordinate interview scheduling', 'Support onboarding and policy retrieval'],
    task: 'Three candidates have completed interviews for a product role and need review.',
    reasoning: ['Compare candidate records with job criteria', 'Pull structured interview notes', 'Prepare a ranked hiring brief', 'Coordinate next decisions and scheduling'],
    progress: ['Applications reviewed', 'Interview notes pulled', 'Candidate ranking', 'Scheduling'],
    outcome: 'Candidate summaries and interview notes are consolidated so HR can review fit and next steps faster.',
    accent: 'hr',
    tone: '#ff9a4d',
    demo: {
      label: 'Hiring workflow',
      status: 'Ready for review',
      steps: ['Candidate review', 'Interview notes', 'Ranking summary', 'Scheduling'],
    },
  },
]

const workflowStages = ['Understand', 'Decide', 'Execute', 'Report']

const industries = [
  { name: 'Banking and Financial Services', description: 'Support onboarding, service triage and policy-driven customer journeys.' },
  { name: 'Healthcare', description: 'Coordinate patient-facing service workflows while supporting approved operational processes.' },
  { name: 'Retail and E-commerce', description: 'Manage support volume, fulfilment updates and campaign coordination across teams.' },
  { name: 'Education', description: 'Assist with admissions, department requests and student support administration.' },
  { name: 'Manufacturing', description: 'Track operational tasks, vendor follow-ups and recurring process coordination.' },
  { name: 'Real Estate', description: 'Organise buyer communications, workflow coordination and document handling.' },
  { name: 'IT and Technology', description: 'Support internal operations, service processes and workflow execution at scale.' },
  { name: 'Professional Services', description: 'Help teams manage client requests, internal operations and knowledge-heavy work.' },
]

const integrationTypes = [
  'Communication and Email Applications',
  'CRM and Sales Platforms',
  'HR and Recruitment Systems',
  'Business Management Software',
  'Data Warehouses and Analytics',
  'Productivity and Collaboration Applications',
]

const governancePillars = ['Permissions and access controls', 'Human approval', 'Execution records', 'Data protection', 'Exception escalation', 'Monitoring']

function SectionLabel({ children }) {
  return <span className="section-label">{children}</span>
}

function HeroDashboard() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progressStep, setProgressStep] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (paused || prefersReducedMotion) return undefined
    const timer = window.setInterval(() => {
      setProgressStep((current) => {
        if (current >= 3) {
          setActiveIndex((index) => (index + 1) % agents.length)
          return 0
        }
        return current + 1
      })
    }, 1500)
    return () => window.clearInterval(timer)
  }, [paused, prefersReducedMotion])

  const activeAgent = agents[activeIndex]

  return (
    <motion.div
      className="hero-dashboard"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
    >
      <div className="dashboard-shell">
        <div className="dashboard-header">
          <div className="dashboard-header-label">
            <span className="status-pill status-pill-live">Illustrative workflow</span>
            <span className="dashboard-title">AVENQEO AI</span>
          </div>
          <button
            type="button"
            className="icon-toggle"
            aria-label={paused ? 'Play dashboard workflow' : 'Pause dashboard workflow'}
            onClick={() => setPaused((state) => !state)}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>

        <div className="dashboard-overview">
          <div className="overview-card overview-primary">
            <span className="panel-kicker">WORKFORCE</span>
            <strong>{agents.length} specialised employees</strong>
            <div className="mini-bars">
              <span className="mini-bar active" />
              <span className="mini-bar" />
              <span className="mini-bar" />
              <span className="mini-bar" />
            </div>
          </div>

          <div className="overview-card overview-activity">
            <div className="tiny-row">
              <span className="tiny-dot" />
              <span>{activeAgent.name}</span>
            </div>
            <div className="tiny-row">
              <span className="tiny-dot muted" />
              <span>{activeAgent.demo.label}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="employee-stack">
            {agents.map((agent, index) => (
              <div key={agent.id} className={`employee-row ${index === activeIndex ? 'is-active' : ''}`}>
                <span className="employee-bullet" style={{ background: agent.tone }} />
                <div>
                  <strong>{agent.name}</strong>
                  <small>{index === activeIndex ? workflowStages[progressStep] : 'Ready'}</small>
                </div>
                {index === activeIndex && <span className="employee-state-dot" aria-hidden="true" />}
              </div>
            ))}
          </div>

          <div className="task-panel">
            <div className="panel-header-row">
              <span>Incoming task</span>
              <span className="chip chip-info">{activeAgent.number}</span>
            </div>
            <p>{activeAgent.task}</p>

            <div className="progress-list">
              {activeAgent.reasoning.map((step, index) => (
                <div key={step} className={`progress-item ${index < progressStep ? 'done' : index === progressStep ? 'is-current' : ''}`}>
                  <span className="step-circle">{index + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="task-progress" aria-label={`Workflow ${progressStep + 1} of 4`}>
              <span style={{ width: `${((progressStep + 1) / 4) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="result-panel">
          <div className="panel-header-row">
            <span>Outcome</span>
            <span className="approval-status"><ShieldCheck size={13} /> Human review</span>
          </div>
          <p>{activeAgent.outcome}</p>
        </div>
      </div>
    </motion.div>
  )
}

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-layout">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionLabel>THE NEXT ERA OF WORK IS HERE.</SectionLabel>
          <h1>
            Your next best hire
            <br className="desktop-break" />
            might not be human.
          </h1>
          <p className="hero-description">
            Meet a new generation of intelligent digital employees. Designed to take on business responsibilities, execute workflows and work alongside the people who move your organisation forward.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#workforce">
              Explore the AI Workforce <ArrowRight size={16} />
            </a>
            <a className="button button-outline" href="#contact">
              Book a Consultation
            </a>
          </div>
          <p className="hero-tagline">Four specialised roles. Endless possibilities. One intelligent direction.</p>
        </motion.div>

        <HeroDashboard />
      </div>

      <div className="hero-bottomline container" aria-hidden="true">
        <span>AVENQEO AI | Built for what comes after next.</span>
        <span>INTELLIGENT WORKFORCE</span>
      </div>
    </section>
  )
}

function BusinessChallenge() {
  const [selectedChallenge, setSelectedChallenge] = useState(challenges[0].id)
  const activeChallenge = challenges.find((challenge) => challenge.id === selectedChallenge) || challenges[0]

  return (
    <section className="section challenge-section" id="solutions">
      <div className="container">
        <SectionLabel>THE BUSINESS CHALLENGE</SectionLabel>
        <div className="section-heading challenge-heading">
          <h2>Businesses are growing. Work is growing faster.</h2>
          <p>
            As businesses expand, responsibilities multiply across customer service, marketing, HR and operations. The challenge is not just volume — it is the complexity of coordinating work across teams and systems.
          </p>
        </div>

        <div className="challenge-layout">
          <div className="challenge-selector">
            {challenges.map((challenge) => (
              <button
                key={challenge.id}
                type="button"
                className={`challenge-option ${challenge.id === selectedChallenge ? 'is-selected' : ''}`}
                onClick={() => setSelectedChallenge(challenge.id)}
              >
                <span className="option-number">{challenge.number}</span>
                <div>
                  <strong>{challenge.title}</strong>
                  <small>{challenge.text}</small>
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeChallenge.id}
              className="challenge-visual"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="challenge-demo-heading">
                <span className="panel-kicker">{activeChallenge.metric}</span>
                <h3>{activeChallenge.title}</h3>
              </div>
              <div className="challenge-demo-grid">
                <div className="challenge-demo-item">
                  <span className="demo-item-label">The challenge</span>
                  <p>{activeChallenge.problem}</p>
                </div>
                <div className="challenge-demo-item">
                  <span className="demo-item-label">Where work gets stuck</span>
                  <p>{activeChallenge.difficulty}</p>
                </div>
                <div className="challenge-demo-item challenge-demo-assist">
                  <span className="demo-item-label"><Bot size={14} /> How an AI employee can help</span>
                  <p>{activeChallenge.detail}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="philosophy-panel" id="about">
          <div className="philosophy-copy">
            <SectionLabel>THE AVENQEO PHILOSOPHY</SectionLabel>
            <h2>Don&apos;t just automate tasks. Rethink the workforce.</h2>
            <p>
              People and intelligent digital employees can work together to move organisations forward. AI should expand human capability, not represent a blanket replacement for people.
            </p>
          </div>
          <div className="philosophy-visual" aria-label="Human teams and AI employees coordinate work toward shared outcomes">
            <div className="philosophy-orbit orbit-one" />
            <div className="philosophy-orbit orbit-two" />
            <div className="philosophy-node philosophy-human">
              <span className="philosophy-icon"><Users size={17} /></span>
              <span><strong>Human team</strong><small>Judgement &amp; direction</small></span>
            </div>
            <div className="philosophy-node philosophy-ai">
              <span className="philosophy-icon"><Bot size={17} /></span>
              <span><strong>AI employees</strong><small>Workflow coordination</small></span>
            </div>
            <div className="philosophy-outcome">
              <CheckCircle2 size={16} />
              <span>Shared outcomes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkforceSelector() {
  const [activeId, setActiveId] = useState(agents[0].id)
  const activeAgent = agents.find((agent) => agent.id === activeId) || agents[0]

  return (
    <section className="section workforce-section" id="workforce">
      <div className="container">
        <SectionLabel>MEET THE WORKFORCE</SectionLabel>
        <div className="section-heading workforce-heading">
          <h2>Four specialised employees. One intelligent workforce.</h2>
          <p>
            Each employee is designed around a distinct business function so teams can expand capacity without losing clarity, control or context.
          </p>
        </div>

        <div className="workforce-layout">
          <div className="employee-list">
            {agents.map((agent) => (
              <button
                key={agent.id}
                type="button"
                className={`employee-tab ${agent.id === activeId ? 'is-selected' : ''}`}
                onClick={() => setActiveId(agent.id)}
              >
                <span className="employee-number">{agent.number}</span>
                <div className="employee-tab-copy">
                  <strong>{agent.name}</strong>
                  <small>{agent.category}</small>
                </div>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeAgent.id}
              className="employee-detail"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
            >
              <div className="detail-topline">
                <span className="detail-tag">{activeAgent.number}</span>
                <span className="detail-status">Operational focus</span>
              </div>

              <h3>{activeAgent.name}</h3>
              <p>{activeAgent.description}</p>

              <div className="detail-grid">
                <div className="detail-stack">
                  <span className="mini-label">Key capabilities</span>
                  <ul>
                    {activeAgent.capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                </div>
                <div className="detail-stack">
                  <span className="mini-label">Example workflow</span>
                  <ul>
                    {activeAgent.reasoning.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function ProductDemo() {
  const [activeId, setActiveId] = useState(agents[0].id)
  const [demoStep, setDemoStep] = useState(0)
  const [demoPlaying, setDemoPlaying] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  const activeAgent = agents.find((agent) => agent.id === activeId) || agents[0]

  useEffect(() => {
    if (!demoPlaying || prefersReducedMotion) return undefined
    const timer = window.setInterval(() => {
      setDemoStep((current) => (current + 1) % Math.max(activeAgent.demo.steps.length, 1))
    }, 1400)
    return () => window.clearInterval(timer)
  }, [activeId, demoPlaying, activeAgent.demo.steps.length, prefersReducedMotion])

  useEffect(() => {
    setDemoStep(0)
  }, [activeId])

  const handleReplay = () => {
    setDemoStep(0)
    setDemoPlaying(true)
  }

  return (
    <section className="section product-section" id="product-experience">
      <div className="container">
        <SectionLabel>SEE INTELLIGENT EMPLOYEES AT WORK</SectionLabel>
        <div className="section-heading product-heading">
          <h2>See intelligent employees at work.</h2>
          <p>
            This illustrative interface shows how an AI employee can interpret inputs, guide a workflow and surface a clear human-ready outcome without pretending to be a live connected system.
          </p>
        </div>

        <div className="product-demo">
          <div className="demo-tabs" role="tablist" aria-label="AI employee demos">
            {agents.map((agent) => (
              <button
                key={agent.id}
                type="button"
                className={`demo-tab ${agent.id === activeId ? 'is-active' : ''}`}
                onClick={() => setActiveId(agent.id)}
                role="tab"
                aria-selected={agent.id === activeId}
              >
                <span className={`tab-dot ${agent.accent}`} />
                {agent.name}
              </button>
            ))}
          </div>

          <div className="demo-surface">
            <div className="demo-header">
              <div>
                <p className="demo-kicker">Illustrative product demonstration — not a live connected system.</p>
                <h3>{activeAgent.name}</h3>
              </div>
              <div className="demo-controls">
                <button type="button" className="control-button" onClick={() => setDemoPlaying((state) => !state)}>
                  {demoPlaying ? <Pause size={14} /> : <Play size={14} />}
                  {demoPlaying ? 'Pause' : 'Play'}
                </button>
                <button type="button" className="control-button secondary" onClick={handleReplay}>
                  <RefreshCw size={14} />
                  Replay
                </button>
              </div>
            </div>

            <div className="demo-grid">
              <div className="demo-panel conversation-panel">
                <div className="panel-header-row">
                  <span>Inbox</span>
                  <span className="chip chip-neutral">{activeAgent.number}</span>
                </div>
                <div className="message-list">
                  <div className="message-card incoming">
                    <strong>Incoming request</strong>
                    <p>{activeAgent.task}</p>
                  </div>
                  <div className="message-card ai">
                    <strong>AI response</strong>
                    <p>{activeAgent.shortSummary}</p>
                  </div>
                </div>
              </div>

              <div className="demo-panel workflow-panel">
                <div className="panel-header-row">
                  <span>Current workflow</span>
                  <span className="chip chip-info">{activeAgent.demo.label}</span>
                </div>
                <div className="workflow-track">
                  {activeAgent.demo.steps.map((step, index) => (
                    <div key={step} className={`workflow-marker ${index <= demoStep ? 'is-active' : ''}`}>
                      <span>{index + 1}</span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="demo-lower-row">
              <div className="demo-panel status-panel">
                <div className="panel-header-row">
                  <span>Progress</span>
                  <span className="chip chip-success">{activeAgent.demo.status}</span>
                </div>
                <div className="status-stack">
                  {activeAgent.progress.map((item, index) => (
                    <div key={item} className={`status-item ${index <= demoStep ? 'done' : ''}`}>
                      <span className="status-bullet" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="demo-panel outcome-panel">
                <div className="panel-header-row">
                  <span>Outcome</span>
                  <span className="chip chip-warning">Human review</span>
                </div>
                <p>{activeAgent.outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.4 })
  const prefersReducedMotion = useReducedMotion()
  const [workflowStep, setWorkflowStep] = useState(0)

  useEffect(() => {
    if (!inView) return undefined
    if (prefersReducedMotion) {
      setWorkflowStep(5)
      return undefined
    }

    const delay = workflowStep === 5 ? 1800 : workflowStep === 0 ? 650 : 850
    const timer = window.setTimeout(() => {
      setWorkflowStep((step) => (step >= 5 ? 0 : step + 1))
    }, delay)
    return () => window.clearTimeout(timer)
  }, [inView, prefersReducedMotion, workflowStep])

  return (
    <section className="section execution-section" id="how-it-works" ref={ref}>
      <div className="container">
        <SectionLabel>HOW IT WORKS</SectionLabel>
        <div className="workflow-demo">
          <motion.div
            className="workflow-task-card"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.35 }}
          >
            <span className="workflow-card-label"><MessageSquareText size={14} /> Incoming request</span>
            <strong>Prepare a response to a customer request</strong>
            <small>Customer Support AI · Request #2048</small>
          </motion.div>
          <div className="workflow-main" style={{ '--workflow-progress': `${workflowStep >= 5 ? 100 : Math.max(0, ((workflowStep - 1) / 3) * 100)}%` }}>
            <div className="workflow-stage-list">
              {workflowStages.map((stage, index) => (
                <div className={`workflow-stage ${workflowStep >= index + 1 ? 'is-active' : ''}`} key={stage}>
                  <span className="stage-dot">{workflowStep > index + 1 ? <CheckCircle2 size={14} /> : index + 1}</span>
                  <span className="stage-name">{stage}</span>
                </div>
              ))}
            </div>
            <div className="workflow-progress-track" aria-hidden="true">
              <span className="workflow-progress-fill" />
              <span className="workflow-progress-indicator" />
            </div>
          </div>
          <div className="workflow-result-slot">
            <AnimatePresence mode="wait">
              {workflowStep >= 5 && (
                <motion.div
                  className="workflow-result-card"
                  initial={{ opacity: 0, x: 10, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 8, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="result-check"><CheckCircle2 size={18} /></span>
                  <span><strong>Completed outcome</strong><small>Draft prepared for human review</small></span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
          <h2>Intelligence shouldn&apos;t belong to just one industry.</h2>
          <p>
            Every organisation has distinct work patterns, service expectations and process pressures. AVENQEO AI is designed to support a wide range of business environments, with the right guardrails and workflows in place.
          </p>
        </div>

        <div className="industry-grid">
          {industries.map((industry, index) => (
            <motion.article
              key={industry.name}
              className="industry-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
            >
              <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{industry.name}</h3>
              <p>{industry.description}</p>
            </motion.article>
          ))}
        </div>
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
            AVENQEO AI is designed to work alongside existing systems in a way that respects current processes, permissions and business logic.
          </p>
        </div>

        <div className="integration-diagram" aria-label="Business systems connected to AI employees">
          <div className="diagram-node center-node">
            <span>AVENQEO</span>
            <strong>AI Workforce</strong>
          </div>
          {integrationTypes.map((type, index) => (
            <div key={type} className={`diagram-node outer-node node-${index + 1}`}>
              {type}
            </div>
          ))}
        </div>

        <div className="integration-grid">
          {integrationTypes.map((type) => (
            <article className="integration-card" key={type}>
              <span className="integration-mark" aria-hidden="true">↗</span>
              <h3>{type}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ResponsibleAI() {
  const [approvalState, setApprovalState] = useState('pending')
  const [activityLog, setActivityLog] = useState(['AI request submitted', 'Waiting for human approval'])

  const handleDecision = (decision) => {
    const nextState = decision === 'approve' ? 'approved' : 'rejected'
    setApprovalState(nextState)
    setActivityLog((current) => [
      nextState === 'approved' ? 'Action approved by human reviewer' : 'Action rejected by human reviewer',
      ...current,
    ].slice(0, 3))
  }

  return (
    <section className="section governance-section" id="responsible-ai">
      <div className="container">
        <SectionLabel>RESPONSIBLE AI EXECUTION</SectionLabel>
        <div className="section-heading governance-heading">
          <h2>Intelligent execution needs responsible control.</h2>
          <p>
            AI can support speed and efficiency, but it must operate within clear boundaries and human oversight. Permissions, approvals and records are part of the system design, not an afterthought.
          </p>
        </div>

        <div className="governance-demo">
          <div className="governance-board">
            <div className="governance-topbar">
              <div className="tiny-row">
                <ShieldCheck size={14} />
                <span>Approval request</span>
              </div>
              <span className="chip chip-info">Human review</span>
            </div>

            <div className="approval-request">
              <p>Operations AI requests a workflow action for vendor onboarding approval.</p>
              <div className="approval-meta">
                <span>Permission level: Standard</span>
                <span>Risk: Medium</span>
              </div>
            </div>

            <div className="approval-actions">
              <button type="button" className="decision-button approve" onClick={() => handleDecision('approve')}>
                Approve
              </button>
              <button type="button" className="decision-button reject" onClick={() => handleDecision('reject')}>
                Reject
              </button>
            </div>
          </div>

          <div className="governance-panel">
            <div className="panel-header-row">
              <span>Execution record</span>
              <span className="chip chip-success">{approvalState === 'approved' ? 'Approved' : approvalState === 'rejected' ? 'Rejected' : 'Pending'}</span>
            </div>
            <div className="record-list">
              {governancePillars.map((pillar) => (
                <div key={pillar} className="record-item">
                  <CheckCircle2 size={14} />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
            <div className="activity-log">
              {activityLog.map((entry) => (
                <div key={entry} className="log-line">
                  {entry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="final-cta-section" id="contact">
      <div className="container">
        <div className="final-cta-panel">
          <SectionLabel>LET&apos;S BUILD WHAT&apos;S NEXT</SectionLabel>
          <h2>The future of your workforce starts with a conversation.</h2>
          <p>Discover how intelligent digital employees could fit into your business.</p>
          <div className="cta-row">
            <a className="button button-primary" href="mailto:hello@avenqeo.ai">
              <Mail size={16} /> Book a Consultation
            </a>
          </div>
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
      <WorkforceSelector />
      <ProductDemo />
      <HowItWorks />
      <Industries />
      <ConnectedIntelligence />
      <ResponsibleAI />
      <FinalCTA />
    </>
  )
}
