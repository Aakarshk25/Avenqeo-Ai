import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  ChartNoAxesCombined,
  Clock3,
  MessageCircle,
  Network,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Workflow,
} from 'lucide-react'
import './ConnectedIntelligenceDemo.css'

const scenarios = [
  {
    id: 'instagram-support',
    label: 'Instagram DM',
    platform: 'Instagram',
    view: 'chat',
    agent: 'Customer Support AI',
    responsibility: 'Product and order questions',
    contact: 'Maya Chen',
    handle: '@maya.chen',
    initials: 'MC',
    incoming: 'Hey! Could you check whether order #4821 is still arriving Friday?',
    context: 'Order #4821 · In transit · ETA Friday',
    response: 'Hi Maya! Order #4821 is with the courier and is still estimated to arrive Friday. I can share your tracking link if you need it.',
    steps: ['Intent identified: delivery status', 'Order context retrieved', 'Reply sent in the sample conversation'],
    apps: ['Instagram', 'Shopify', 'CRM'],
    stateLabel: 'Completed',
    outcome: 'Routine delivery question handled automatically in this sample. No live account was accessed.',
  },
  {
    id: 'facebook-community',
    label: 'Facebook comments',
    platform: 'Facebook',
    view: 'comments',
    agent: 'Community AI',
    responsibility: 'Community questions and feedback',
    contact: 'Jordan Lee',
    initials: 'JL',
    post: 'Meet a clearer way to keep customer conversations moving.',
    incoming: 'Would this work for a team with several support channels?',
    response: 'Hi Jordan! Yes, teams can coordinate requests across supported channels. I can share a quick overview of how the workflow is set up.',
    steps: ['Comment intent classified', 'Approved product details matched', 'Public reply sent in the sample page'],
    apps: ['Facebook', 'CRM', 'Analytics'],
    stateLabel: 'Reply sent',
    outcome: 'The sample reply is posted in this demonstration only. No live page was changed.',
  },
  {
    id: 'whatsapp-support',
    label: 'WhatsApp support',
    platform: 'WhatsApp',
    view: 'chat',
    agent: 'Customer Support AI',
    responsibility: 'Secure support and request routing',
    contact: 'Priya Nair',
    handle: '+1 (415) 555-0134',
    initials: 'PN',
    incoming: 'I need to update the delivery address for my order. Can you help?',
    context: 'Support request #2714 · Address change',
    response: 'I can help, Priya. For account security, a team member needs to verify the address change. I prepared a handoff with your order details.',
    steps: ['Intent identified: address change', 'Security rule checked', 'Routed to a human specialist'],
    apps: ['WhatsApp', 'CRM', 'Operations'],
    stateLabel: 'Specialist handoff',
    stateType: 'handoff',
    outcome: 'The sensitive address change is routed for identity verification instead of being changed automatically.',
  },
  {
    id: 'campaign-launch',
    label: 'Campaign launch',
    platform: 'Marketing workspace',
    view: 'campaign',
    agent: 'Marketing AI',
    responsibility: 'Campaign planning and content drafts',
    campaign: 'Regional productivity launch',
    brief: 'Introduce a new productivity feature to regional small-business audiences.',
    incoming: 'Prepare channel-ready launch content from the approved campaign brief.',
    response: 'Launch theme: Make room for better work. Draft channel-specific captions with a clear product benefit and an approval-ready call to action.',
    steps: ['Campaign brief reviewed', 'Audience themes organized', 'Channel drafts prepared in workspace'],
    apps: ['Instagram', 'Facebook', 'Analytics'],
    stateLabel: 'Prepared',
    outcome: 'Channel-ready drafts are prepared in this sample. The campaign has not been published.',
  },
  {
    id: 'operations-review',
    label: 'Operations task',
    platform: 'Operations board',
    view: 'operations',
    agent: 'Operations AI',
    responsibility: 'Tasks, dependencies and approvals',
    vendor: 'Northstar Office Supply',
    incoming: 'Prepare vendor onboarding #842 for launch.',
    response: 'The onboarding checklist is ready. Finance approval is still required before launch, and the request is prepared for its assigned reviewer.',
    steps: ['Request mapped to onboarding', 'Documents and dependencies checked', 'Finance decision required before activation'],
    apps: ['Operations', 'CRM', 'Finance'],
    stateLabel: 'Human decision',
    needsHumanDecision: true,
    outcome: 'Vendor activation is a material business decision. Finance sign-off is required before launch.',
  },
]

const roleNames = ['Customer Support AI', 'Community AI', 'Marketing AI', 'Operations AI']

function AppMark({ app }) {
  if (app === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.8" cy="6.5" r="1.1" fill="currentColor" />
      </svg>
    )
  }

  if (app === 'Facebook') {
    return <span className="demo-facebook-glyph" aria-hidden="true">f</span>
  }

  if (app === 'WhatsApp') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.2 11.7a8.2 8.2 0 0 1-12 7.2L4 20l1.3-4A8.2 8.2 0 1 1 20.2 11.7Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M8.3 7.9c.3-.5.6-.5.9-.4l1 1.8c.1.2 0 .5-.2.7l-.6.6c.5 1 1.4 1.8 2.5 2.3l.6-.6c.2-.2.4-.3.7-.2l1.8.9c.3.1.3.5.2.8-.2.7-.9 1.1-1.7 1-2.8-.3-5.9-3.3-6.1-6.1-.1-.4.3-.8.9-.8Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (app === 'Shopify') return <ShoppingBag aria-hidden="true" />
  if (app === 'CRM' || app === 'Analytics') return app === 'CRM' ? <Network aria-hidden="true" /> : <ChartNoAxesCombined aria-hidden="true" />
  if (app === 'Finance') return <ShieldCheck aria-hidden="true" />
  if (app === 'Operations') return <Workflow aria-hidden="true" />
  return <MessageCircle aria-hidden="true" />
}

function AppBadge({ app }) {
  const className = app.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return (
    <span className={`demo-app-badge is-${className}`}>
      <span className="demo-app-mark"><AppMark app={app} /></span>
      <span>{app}</span>
    </span>
  )
}

function MockAvatar({ initials, className = '' }) {
  return <span className={`mock-avatar ${className}`} aria-hidden="true">{initials}</span>
}

function MessagePreview({ scenario }) {
  const isWhatsApp = scenario.platform === 'WhatsApp'

  return (
    <div className={`mock-chat-surface${isWhatsApp ? ' is-whatsapp' : ' is-instagram'}`}>
      <div className="mock-contact-row">
        <MockAvatar initials={scenario.initials} />
        <span className="mock-contact-copy">
          <strong>{scenario.contact}</strong>
          <small>{scenario.handle}</small>
        </span>
        <span className="mock-online-state"><span /> Sample conversation</span>
      </div>
      <div className="mock-chat-messages">
        <span className="mock-timestamp">TODAY · 10:42 AM</span>
        <div className="mock-message-bubble">
          <p>{scenario.incoming}</p>
          <time>10:42</time>
        </div>
        <div className="mock-context-line">
          <CheckCircle2 size={14} aria-hidden="true" />
          <span>{scenario.context}</span>
        </div>
        <div className="mock-agent-typing">
          <span className="mock-typing-dots"><i /><i /><i /></span>
          <span>{scenario.agent} is preparing a response</span>
        </div>
      </div>
      <div className="mock-message-composer">
        <span>Write a message...</span>
        <span className="mock-send-button"><ArrowRight size={14} aria-hidden="true" /></span>
      </div>
    </div>
  )
}

function FacebookPreview({ scenario }) {
  return (
    <div className="facebook-preview-card">
      <div className="facebook-page-row">
        <span className="facebook-page-mark"><AppMark app="Facebook" /></span>
        <span><strong>Avenqeo AI</strong><small>Public post · 2h</small></span>
        <span className="facebook-sample-label">SAMPLE</span>
      </div>
      <p className="facebook-post-copy">{scenario.post}</p>
      <div className="facebook-post-art">
        <span>AVENQEO AI</span>
        <strong>Make every conversation count.</strong>
        <small>AI employees, working together.</small>
      </div>
      <div className="facebook-reaction-row">
        <span>♡ 24 reactions</span>
        <span>5 comments</span>
      </div>
      <div className="facebook-comment-row">
        <MockAvatar initials={scenario.initials} />
        <span className="facebook-comment-copy">
          <strong>{scenario.contact}</strong>
          <span>{scenario.incoming}</span>
          <small>Like · Reply · 2 min</small>
        </span>
      </div>
      <div className="facebook-action-row" aria-label="Sample Facebook interactions">
        <span>Like</span><span>Comment</span><span>Share</span>
      </div>
    </div>
  )
}

function CampaignPreview({ scenario }) {
  return (
    <div className="campaign-preview-card">
      <div className="campaign-preview-topline">
        <span>CAMPAIGN BRIEF</span>
        <span className="campaign-draft-status"><span /> Draft</span>
      </div>
      <h3>{scenario.campaign}</h3>
      <p>{scenario.brief}</p>
      <div className="campaign-field">
        <span>REQUEST</span>
        <strong>{scenario.incoming}</strong>
      </div>
      <div className="campaign-content-preview">
        <div className="campaign-channel-row">
          <AppBadge app="Instagram" />
          <AppBadge app="Facebook" />
        </div>
        <strong>Make space for better work.</strong>
        <span>Draft copy · Audience: small businesses</span>
      </div>
    </div>
  )
}

function OperationsPreview({ scenario }) {
  return (
    <div className="operations-preview-card">
      <div className="operations-preview-topline">
        <span>VENDOR ONBOARDING · #842</span>
        <span className="operations-review-status"><Clock3 size={12} /> Review</span>
      </div>
      <div className="operations-vendor">
        <span className="operations-vendor-mark"><ShoppingBag size={18} aria-hidden="true" /></span>
        <span><strong>{scenario.vendor}</strong><small>New supplier · Launch checklist</small></span>
      </div>
      <div className="operations-checklist">
        <div><CheckCircle2 size={15} /><span>Business details verified</span><small>Done</small></div>
        <div><CheckCircle2 size={15} /><span>Required documents attached</span><small>Done</small></div>
        <div className="is-pending"><Clock3 size={15} /><span>Finance approval</span><small>Pending</small></div>
      </div>
      <div className="operations-note">
        <ShieldCheck size={14} aria-hidden="true" />
        <span>Human decision required before vendor activation</span>
      </div>
    </div>
  )
}

function ScenarioSource({ scenario }) {
  if (scenario.view === 'comments') return <FacebookPreview scenario={scenario} />
  if (scenario.view === 'campaign') return <CampaignPreview scenario={scenario} />
  if (scenario.view === 'operations') return <OperationsPreview scenario={scenario} />
  return <MessagePreview scenario={scenario} />
}

function ConnectedIntelligenceDemo() {
  const sectionRef = useRef(null)
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false)
  const isInView = useInView(sectionRef, { once: false, amount: 0.12 })
  const activeScenario = scenarios[activeScenarioIndex]
  const needsHumanDecision = Boolean(activeScenario.needsHumanDecision)
  const isPaused = isHovered || hasKeyboardFocus

  useEffect(() => {
    if (!isInView || isPaused) return undefined

    const timer = window.setTimeout(() => {
      setActiveScenarioIndex((index) => (index + 1) % scenarios.length)
    }, 15000)

    return () => window.clearTimeout(timer)
  }, [activeScenarioIndex, isInView, isPaused])

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setHasKeyboardFocus(false)
    }
  }

  const rotationMessage = !isInView
    ? 'Auto-rotation pauses off-screen'
    : isPaused
      ? 'Auto-rotation paused while you explore'
      : 'Scenarios rotate every 15 seconds'

  return (
    <section
      ref={sectionRef}
      className={`section workforce-demo-section${isInView ? ' is-in-view' : ''}`}
      id="integrations"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDownCapture={() => setHasKeyboardFocus(false)}
      onFocusCapture={(event) => {
        if (event.target.matches(':focus-visible')) setHasKeyboardFocus(true)
      }}
      onBlurCapture={handleBlur}
    >
      <div className="container">
        <div className="workforce-demo-layout">
          <div className="workforce-demo-copy">
            <span className="workforce-demo-eyebrow">CONNECTED INTELLIGENCE · PRODUCT DEMO</span>
            <h2>One AI workforce. Ready for real-world work.</h2>
            <p>
              Explore sample conversations and workflows across familiar business apps. Specialist AI employees prepare the next step, with review and approval kept visible.
            </p>
            <div className="workforce-role-list" aria-label="AI employee responsibilities">
              {roleNames.map((role) => (
                <span key={role}><span aria-hidden="true" />{role}</span>
              ))}
            </div>
            <div className="workforce-demo-disclaimer">
              <span className="disclaimer-indicator" />
              <span><strong>Simulated demonstration</strong><small>No live accounts, messages or third-party actions are connected.</small></span>
            </div>
          </div>

          <div className="workforce-demo-product">
            <div className="demo-product-topbar">
              <div className="demo-product-brand">
                <span className="demo-product-brand-icon"><Bot size={17} aria-hidden="true" /></span>
                <span><strong>AVENQEO AI</strong><small>Workforce preview</small></span>
              </div>
              <span className="demo-product-status"><span /> SAMPLE DATA</span>
            </div>

            <div className="demo-scenario-picker" role="group" aria-label="Choose a product demonstration">
              {scenarios.map((scenario, index) => (
                <button
                  key={scenario.id}
                  type="button"
                  className={`demo-scenario-button${index === activeScenarioIndex ? ' is-active' : ''}`}
                  aria-pressed={index === activeScenarioIndex}
                  onClick={() => setActiveScenarioIndex(index)}
                >
                  <span className={`demo-scenario-mark is-${scenario.platform.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                    <AppMark app={scenario.platform} />
                  </span>
                  <span className="demo-scenario-label">
                    <strong>{scenario.label}</strong>
                    <small>{scenario.agent.replace(' AI', '')}</small>
                  </span>
                </button>
              ))}
            </div>

            <div className="demo-rotation-meta">
              <span>SCENARIO {String(activeScenarioIndex + 1).padStart(2, '0')} / {String(scenarios.length).padStart(2, '0')}</span>
              <span>{rotationMessage}</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeScenario.id}
                className="demo-workspace"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <div className="demo-source-panel">
                  <div className="demo-panel-heading">
                    <span><AppMark app={activeScenario.platform} />{activeScenario.platform}</span>
                    <small>SIMULATED INTERFACE</small>
                  </div>
                  <ScenarioSource scenario={activeScenario} />
                </div>

                <div className="demo-agent-panel">
                  <div className="demo-agent-heading">
                    <span className="demo-agent-avatar"><Bot size={17} aria-hidden="true" /></span>
                    <span className="demo-agent-copy">
                      <small>ASSIGNED SPECIALIST</small>
                      <strong>{activeScenario.agent}</strong>
                      <span>{activeScenario.responsibility}</span>
                    </span>
                    <span className={`demo-agent-state${activeScenario.stateType ? ` is-${activeScenario.stateType}` : ''}${needsHumanDecision ? ' is-review' : ' is-complete'}`}>
                      <span />{activeScenario.stateLabel}
                    </span>
                  </div>

                  <div className="demo-processing-list" aria-label="Simulated workflow progress">
                    {activeScenario.steps.map((step, index) => {
                      const completeStep = !needsHumanDecision || index < activeScenario.steps.length - 1
                      const currentStep = needsHumanDecision && index === activeScenario.steps.length - 1

                      return (
                        <div className={`demo-processing-step${completeStep ? ' is-complete' : ''}${currentStep ? ' is-current' : ''}`} key={step}>
                          <span className="demo-step-indicator">
                            {completeStep ? <Check size={12} aria-hidden="true" /> : index + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className={`demo-response-card${needsHumanDecision ? ' is-human-review' : ''}`}>
                    <div className={`demo-response-heading${needsHumanDecision ? ' is-human-review' : ''}`}>
                      <span><Sparkles size={14} aria-hidden="true" /> Simulated outcome</span>
                      <span>{needsHumanDecision ? 'MAJOR DECISION' : 'DONE IN DEMO'}</span>
                    </div>
                    <p>{activeScenario.response}</p>
                    {needsHumanDecision ? (
                      <div className="demo-human-review-state">
                        <ShieldCheck size={16} aria-hidden="true" />
                        <span><strong>Human decision required</strong><small>{activeScenario.outcome}</small></span>
                      </div>
                    ) : (
                      <div className="demo-completion-state">
                        <CheckCircle2 size={16} aria-hidden="true" />
                        <span>{activeScenario.outcome}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="demo-connected-apps">
              <span className="demo-connected-label">APPS IN THIS SAMPLE WORKFLOW</span>
              <div className="demo-connected-list">
                {activeScenario.apps.map((app) => <AppBadge app={app} key={app} />)}
              </div>
            </div>
          </div>
        </div>

        <div className="workforce-demo-benefits">
          <article>
            <span className="demo-benefit-icon"><Bot size={17} aria-hidden="true" /></span>
            <span><strong>Specialists with clear roles</strong><small>Customer support, community, marketing and operations examples.</small></span>
          </article>
          <article>
            <span className="demo-benefit-icon"><Network size={17} aria-hidden="true" /></span>
            <span><strong>Context moves with the task</strong><small>See sample messages become structured, review-ready workflows.</small></span>
          </article>
          <article>
            <span className="demo-benefit-icon"><ShieldCheck size={17} aria-hidden="true" /></span>
            <span><strong>Human oversight where it matters</strong><small>Routine work moves ahead; significant decisions stay with people.</small></span>
          </article>
        </div>
      </div>
    </section>
  )
}

export default ConnectedIntelligenceDemo
