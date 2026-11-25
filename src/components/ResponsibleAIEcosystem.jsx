import React, { useEffect, useId, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import {
  Bot,
  ClipboardList,
  Headset,
  LockKeyhole,
  Megaphone,
  MessageCircle,
  Sparkles,
  UserRoundCheck,
  Workflow,
} from 'lucide-react'
import { siClaude, siGithubcopilot, siGooglegemini } from 'simple-icons'
import './ResponsibleAIEcosystem.css'

const agentNodes = [
  {
    id: 'support',
    name: 'Customer Support AI',
    shortName: 'Support AI',
    purpose: 'Answers customer questions and routes sensitive requests.',
    icon: Headset,
    pattern: 'left-one',
  },
  {
    id: 'marketing',
    name: 'Marketing AI',
    shortName: 'Marketing AI',
    purpose: 'Prepares campaign drafts from an approved brief.',
    icon: Megaphone,
    pattern: 'left-two',
  },
  {
    id: 'operations',
    name: 'Operations AI',
    shortName: 'Operations AI',
    purpose: 'Coordinates tasks, owners, and exception handling.',
    icon: Workflow,
    pattern: 'left-three',
  },
  {
    id: 'community',
    name: 'Community AI',
    shortName: 'Community AI',
    purpose: 'Organizes community questions and drafts replies.',
    icon: MessageCircle,
    pattern: 'left-four',
  },
]

const applicationNodes = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    purpose: 'Example AI assistant; availability depends on configuration.',
    brandColor: '#10A37F',
    pattern: 'right-one',
  },
  {
    id: 'claude',
    name: 'Claude AI',
    purpose: 'Example AI assistant; availability depends on configuration.',
    icon: siClaude,
    pattern: 'right-two',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    purpose: 'Example AI assistant; availability depends on configuration.',
    icon: siGooglegemini,
    pattern: 'right-three',
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    purpose: 'Example AI assistant; availability depends on configuration.',
    icon: siGithubcopilot,
    pattern: 'right-four',
  },
]

const activityPatterns = [
  ['support', 'chatgpt', 'operations', 'copilot'],
  ['marketing', 'copilot', 'community', 'gemini'],
  ['support', 'claude', 'marketing', 'chatgpt'],
]

const desktopConnections = [
  { nodeId: 'chatgpt', d: 'M 120 112 C 245 112, 282 255, 420 310' },
  { nodeId: 'claude', d: 'M 120 236 C 245 236, 300 292, 420 310' },
  { nodeId: 'gemini', d: 'M 120 360 C 245 360, 300 330, 420 310' },
  { nodeId: 'copilot', d: 'M 120 465 C 245 465, 282 355, 420 310' },
  { nodeId: 'support', d: 'M 204 545 C 260 445, 310 370, 420 310' },
  { nodeId: 'marketing', d: 'M 468 545 C 450 445, 435 370, 420 310' },
  { nodeId: 'operations', d: 'M 732 545 C 615 445, 515 370, 420 310' },
  { nodeId: 'community', d: 'M 996 545 C 765 445, 575 370, 420 310' },
]

const mobileConnections = [
  { nodeId: 'chatgpt', d: 'M 90 89 C 90 160, 145 220, 180 305' },
  { nodeId: 'claude', d: 'M 270 89 C 270 160, 215 220, 180 305' },
  { nodeId: 'gemini', d: 'M 90 186 C 90 230, 145 260, 180 305' },
  { nodeId: 'copilot', d: 'M 270 186 C 270 230, 215 260, 180 305' },
  { nodeId: 'support', d: 'M 90 640 C 90 525, 145 415, 180 305' },
  { nodeId: 'marketing', d: 'M 270 640 C 270 525, 215 415, 180 305' },
  { nodeId: 'operations', d: 'M 90 714 C 90 550, 145 440, 180 305' },
  { nodeId: 'community', d: 'M 270 714 C 270 550, 215 440, 180 305' },
]

const responsibleControls = [
  {
    title: 'Defined boundaries',
    detail: 'Permission-aware orchestration and data protection',
    icon: LockKeyhole,
  },
  {
    title: 'People in control',
    detail: 'Human review for major decisions and exceptions',
    icon: UserRoundCheck,
  },
  {
    title: 'Traceable execution',
    detail: 'Execution monitoring and audit records',
    icon: ClipboardList,
  },
]

function AnimatedConnection({ connection, isActive, pathId, animate, isMobile }) {
  return (
    <g className={`rai-connection${isActive ? ' is-active' : ''}`}>
      <path id={pathId} className="rai-connection__path" d={connection.d} />
      <circle className="rai-connection__source" r="3.5">
        <animateMotion
          dur="5.6s"
          begin={`${(desktopConnections.findIndex((item) => item.nodeId === connection.nodeId) % 4) * -1.1}s`}
          repeatCount="indefinite"
          calcMode="spline"
          keyPoints="0;1"
          keyTimes="0;1"
          keySplines="0.4 0 0.2 1"
          path={connection.d}
          style={{ display: animate ? undefined : 'none' }}
        />
      </circle>
      <circle className="rai-connection__endpoint" cx={isMobile ? 180 : 420} cy={isMobile ? 305 : 310} r="3.5" />
    </g>
  )
}

function CentralAvenqeoBot({ isActive }) {
  return (
    <div
      className={`rai-hub${isActive ? ' is-active' : ''}`}
      role="group"
      aria-label="Avenqeo AI central orchestration hub"
    >
      <span className="rai-hub__orbit rai-hub__orbit--outer" aria-hidden="true" />
      <span className="rai-hub__orbit rai-hub__orbit--inner" aria-hidden="true" />
      <span className="rai-hub__bot">
        <Bot size={34} strokeWidth={1.7} aria-hidden="true" />
        <span className="rai-hub__bot-signal" />
      </span>
      <img className="rai-hub__brand" src="/avenqeo-logo.png" alt="Avenqeo AI" />
      <span className="rai-hub__caption">Orchestration hub</span>
    </div>
  )
}

function ConversationPreview() {
  return (
    <div className="rai-conversation" role="group" aria-label="Sample campaign conversation, illustrative only">
      <div className="rai-conversation__header">
        <span className="rai-conversation__app">
          <Sparkles size={15} aria-hidden="true" />
        </span>
        <span className="rai-conversation__title">
          <strong>ChatGPT workspace</strong>
          <span>Illustrative assistant session</span>
        </span>
        <span className="rai-conversation__sample">PREVIEW</span>
      </div>
      <div className="rai-conversation__body">
        <div className="rai-conversation__message rai-conversation__message--user">
          Turn this week&apos;s product notes into a launch announcement for Friday.
        </div>
        <div className="rai-conversation__message rai-conversation__message--ai">
          I prepared a draft from the approved notes. It&apos;s ready for your team to review before publishing.
        </div>
        <div className="rai-conversation__draft">
          <span className="rai-conversation__draft-icon">
            <Sparkles size={15} aria-hidden="true" />
          </span>
          <span className="rai-conversation__draft-copy">
            <strong>Launch announcement draft</strong>
            <small>Campaign content · Not published</small>
          </span>
          <span className="rai-conversation__draft-state">Review</span>
        </div>
      </div>
      <div className="rai-conversation__footer">
        <span className="rai-conversation__agent-icon"><Megaphone size={13} aria-hidden="true" /></span>
        Marketing AI
        <span className="rai-conversation__footer-dot" />
        Draft prepared
      </div>
    </div>
  )
}

function AgentNode({ node, isActive }) {
  const Icon = node.icon

  return (
    <div
      className={`rai-node rai-node--agent rai-node--${node.pattern}${isActive ? ' is-active' : ''}`}
      role="group"
      tabIndex={0}
      aria-label={`${node.name}. ${node.purpose}`}
    >
      <span className="rai-node__icon"><Icon size={17} strokeWidth={1.8} aria-hidden="true" /></span>
      <span className="rai-node__copy">
        <span className="rai-node__name">{node.shortName}</span>
        <span className="rai-node__kind">AI employee</span>
      </span>
      <span className="rai-node__activity" aria-hidden="true" />
    </div>
  )
}

function ApplicationNode({ node, isActive }) {
  const icon = node.icon

  return (
    <div
      className={`rai-node rai-node--app rai-node--${node.pattern}${isActive ? ' is-active' : ''}`}
      role="group"
      tabIndex={0}
      aria-label={`${node.name}. ${node.purpose}`}
    >
      <span className="rai-node__icon rai-node__icon--brand" style={{ '--brand-color': node.brandColor || `#${icon.hex}` }}>
        {icon ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={icon.path} fill="currentColor" />
          </svg>
        ) : (
          <Sparkles size={17} strokeWidth={1.9} aria-hidden="true" />
        )}
      </span>
      <span className="rai-node__name">{node.name}</span>
      <span className="rai-node__activity" aria-hidden="true" />
    </div>
  )
}

function EcosystemVisualization({ isVisible, shouldReduceMotion }) {
  const rawId = useId()
  const idPrefix = `rai-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`
  const [activePattern, setActivePattern] = useState(0)
  const activeNodes = activityPatterns[activePattern]
  const animate = isVisible && !shouldReduceMotion

  useEffect(() => {
    if (!animate) return undefined

    const intervalId = window.setInterval(() => {
      setActivePattern((current) => (current + 1) % activityPatterns.length)
    }, 10000)

    return () => window.clearInterval(intervalId)
  }, [animate])

  const renderConnections = (connections, isMobile = false) => connections.map((connection) => {
    const pathId = `${idPrefix}-${isMobile ? 'mobile-' : ''}${connection.nodeId}`
    return (
      <AnimatedConnection
        key={pathId}
        connection={connection}
        pathId={pathId}
        isActive={activeNodes.includes(connection.nodeId)}
        animate={animate}
        isMobile={isMobile}
      />
    )
  })

  return (
    <div className={`rai-ecosystem${isVisible ? ' is-visible' : ''}${shouldReduceMotion ? ' is-reduced-motion' : ''}`}>
      <div className="rai-ecosystem__frame">
        <div className="rai-ecosystem__topline">
          <span className="rai-ecosystem__legend">
            <span className="rai-ecosystem__legend-dot" />
            Illustrative ecosystem
          </span>
          <span className="rai-ecosystem__cycle">Activity pattern 0{activePattern + 1} <span>/ 03</span></span>
        </div>

        <div
          className="rai-ecosystem__diagram"
          role="group"
          aria-label="Illustrative Avenqeo AI ecosystem visualization"
        >
          <span className="rai-ecosystem__group-label rai-ecosystem__group-label--apps">CONNECTED AI ASSISTANTS</span>
          <span className="rai-ecosystem__group-label rai-ecosystem__group-label--agents">SPECIALISED AI EMPLOYEES</span>

          <svg className="rai-connections rai-connections--desktop" viewBox="0 0 1200 620" preserveAspectRatio="none" aria-hidden="true">
            {renderConnections(desktopConnections)}
          </svg>

          <svg className="rai-connections rai-connections--mobile" viewBox="0 0 360 744" preserveAspectRatio="none" aria-hidden="true">
            {renderConnections(mobileConnections, true)}
          </svg>

          {applicationNodes.map((node) => (
            <ApplicationNode key={node.id} node={node} isActive={animate && activeNodes.includes(node.id)} />
          ))}
          <CentralAvenqeoBot isActive={animate} />
          <ConversationPreview />
          {agentNodes.map((node) => (
            <AgentNode key={node.id} node={node} isActive={animate && activeNodes.includes(node.id)} />
          ))}
        </div>
      </div>

      <p className="rai-ecosystem__disclaimer">
        Illustrative connections only. No live accounts, data, or actions are shown; available integrations and controls depend on configuration.
      </p>
    </div>
  )
}

function ResponsibleAIStatus() {
  return (
    <div className="rai-controls">
      <div className="rai-controls__list">
        {responsibleControls.map(({ title, detail, icon: Icon }) => (
          <div className="rai-controls__item" key={title}>
            <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
            <span className="rai-controls__item-copy">
              <strong>{title}</strong>
              <span>{detail}</span>
            </span>
          </div>
        ))}
      </div>
      <p className="rai-controls__note">
        <strong>Responsible by design</strong>
        <span>Controls shown are illustrative; exact capabilities depend on deployment.</span>
      </p>
    </div>
  )
}

export default function ResponsibleAIEcosystem() {
  const sectionRef = useRef(null)
  const isVisible = useInView(sectionRef, { once: false, amount: 0.08 })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section ref={sectionRef} className="section governance-section rai-governance-section" id="responsible-ai">
      <div className="container">
        <div className="rai-showcase">
          <div className="rai-showcase__copy">
            <span className="section-label">RESPONSIBLE AI EXECUTION</span>
            <motion.div
              className="section-heading governance-heading rai-governance-heading"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h2>Intelligent execution needs responsible control.</h2>
              <p>
                AI can support speed and efficiency, but it must operate within clear boundaries and human oversight. Permissions, approvals and records are part of the system design, not an afterthought.
              </p>
            </motion.div>
          </div>
          <EcosystemVisualization isVisible={isVisible} shouldReduceMotion={shouldReduceMotion} />
        </div>
        <ResponsibleAIStatus />
      </div>
    </section>
  )
}
