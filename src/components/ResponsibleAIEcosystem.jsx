import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import {
  ClipboardList,
  LockKeyhole,
  Megaphone,
  Sparkles,
  UserRoundCheck,
} from 'lucide-react'
import { siClaude, siGithubcopilot, siGooglegemini } from 'simple-icons'
import './ResponsibleAIEcosystem.css'

const applicationNodes = [
  { id: 'chatgpt', name: 'ChatGPT', purpose: 'Example AI assistant; availability depends on configuration.', color: '#10A37F' },
  { id: 'claude', name: 'Claude AI', purpose: 'Example AI assistant; availability depends on configuration.', icon: siClaude, color: '#D97757' },
  { id: 'gemini', name: 'Gemini', purpose: 'Example AI assistant; availability depends on configuration.', icon: siGooglegemini, color: '#4285F4' },
  { id: 'copilot', name: 'GitHub Copilot', purpose: 'Example AI assistant; availability depends on configuration.', icon: siGithubcopilot, color: '#151B2C' },
]

const activityPatterns = [
  ['chatgpt', 'copilot'],
  ['copilot', 'gemini'],
  ['claude', 'chatgpt'],
]

const assistantConnections = [
  { id: 'chatgpt', d: 'M 245 104 C 300 104, 315 242, 380 258' },
  { id: 'claude', d: 'M 245 216 C 300 216, 325 248, 380 258' },
  { id: 'gemini', d: 'M 245 328 C 300 328, 325 275, 380 258' },
  { id: 'copilot', d: 'M 245 440 C 300 440, 315 286, 380 258' },
]

const workspaceConnection = 'M 640 258 C 690 258, 715 230, 790 230'

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

function ConnectionLines({ animate }) {
  return (
    <svg className="rai-connections" viewBox="0 0 1200 620" preserveAspectRatio="none" aria-hidden="true">
      <g className="rai-connections__assistants">
        {assistantConnections.map(({ id, d }, index) => (
          <g key={id}>
            <path d={d} />
            {animate && (
              <circle className="rai-connection__pulse" r="3">
                <animateMotion
                  dur="4.8s"
                  begin={`${index * -1.05}s`}
                  repeatCount="indefinite"
                  path={d}
                />
              </circle>
            )}
          </g>
        ))}
      </g>
      <path className="rai-connections__workspace" d={workspaceConnection} />
      {animate && (
        <circle className="rai-connection__pulse" r="3">
          <animateMotion dur="4.8s" begin="-2.4s" repeatCount="indefinite" path={workspaceConnection} />
        </circle>
      )}
    </svg>
  )
}

function CentralAvenqeoBot({ isActive }) {
  return (
    <div
      className={`rai-hub${isActive ? ' is-active' : ''}`}
      role="group"
      aria-label="Avenqeo AI central orchestration hub"
    >
      <img className="rai-hub__brand" src="/avenqeo-logo.png" alt="Avenqeo AI" />
      <span className="rai-hub__caption">Orchestration hub</span>
      <span className="rai-hub__detail">One accountable control layer</span>
    </div>
  )
}

function ConversationPreview() {
  return (
    <div className="rai-conversation" role="group" aria-label="Sample campaign conversation, illustrative only">
      <div className="rai-conversation__header">
        <span className="rai-conversation__app"><Sparkles size={18} aria-hidden="true" /></span>
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
            <Megaphone size={16} aria-hidden="true" />
          </span>
          <span className="rai-conversation__draft-copy">
            <strong>Launch announcement draft</strong>
            <small>Campaign content · Not published</small>
          </span>
          <span className="rai-conversation__draft-state">Review</span>
        </div>
      </div>
      <div className="rai-conversation__footer">
        <span className="rai-conversation__agent-icon"><Megaphone size={14} aria-hidden="true" /></span>
        Marketing AI
        <span className="rai-conversation__footer-dot" />
        Draft prepared
      </div>
    </div>
  )
}

function ApplicationNode({ node, isActive }) {
  return (
    <div
      className={`rai-node rai-node--app${isActive ? ' is-active' : ''}`}
      role="group"
      tabIndex={0}
      aria-label={`${node.name}. ${node.purpose}`}
    >
      <span className="rai-node__icon rai-node__icon--brand" style={{ '--brand-color': node.color }}>
        {node.icon ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={node.icon.path} fill="currentColor" />
          </svg>
        ) : (
          <Sparkles size={19} strokeWidth={1.9} aria-hidden="true" />
        )}
      </span>
      <span className="rai-node__name">{node.name}</span>
    </div>
  )
}

function EcosystemVisualization({ isVisible, shouldReduceMotion }) {
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

  return (
    <div className={`rai-ecosystem${isVisible ? ' is-visible' : ''}${shouldReduceMotion ? ' is-reduced-motion' : ''}`}>
      <div className="rai-ecosystem__frame">
        <div className="rai-ecosystem__topline">
          <span className="rai-ecosystem__legend">
            <span className="rai-ecosystem__legend-dot" />
            Illustrative ecosystem
          </span>
          <span className="rai-ecosystem__note">Connected AI, under human oversight</span>
        </div>

        <div className="rai-ecosystem__diagram" role="group" aria-label="Illustrative Avenqeo AI ecosystem visualization">
          <span className="rai-ecosystem__group-label rai-ecosystem__group-label--apps">AI ASSISTANTS</span>
          <ConnectionLines animate={animate} />
          <div className="rai-ecosystem__assistants">
            {applicationNodes.map((node) => (
              <ApplicationNode key={node.id} node={node} isActive={animate && activeNodes.includes(node.id)} />
            ))}
          </div>
          <CentralAvenqeoBot isActive={animate} />
          <ConversationPreview />
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
            <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
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
