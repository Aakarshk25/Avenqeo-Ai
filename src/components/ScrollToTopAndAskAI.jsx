import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUp, Sparkles, MessageSquare, X, Send, Bot, User, CheckCircle2 } from 'lucide-react'

export function ScrollToTopAndAskAI() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am AVENQEO AI Assistant. How can I help you explore our intelligent digital employees or coordinate your workflows today?'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 280) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }
    window.addEventListener('scroll', checkScroll, { passive: true })
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])

  useEffect(() => {
    if (dialogOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, dialogOpen])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleSend = (e) => {
    e?.preventDefault()
    if (!inputValue.trim()) return

    const userText = inputValue.trim()
    const userMsg = { id: Date.now(), sender: 'user', text: userText }
    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    // Contextual responses matching Avenqeo AI theme
    setTimeout(() => {
      let botReply = "Thank you for asking! AVENQEO AI builds specialised digital employees (Customer Support, Marketing, Operations, and Community) with human oversight and continuous governance."
      const lower = userText.toLowerCase()
      if (lower.includes('price') || lower.includes('cost') || lower.includes('consult')) {
        botReply = "Our solutions are tailored to your company's operational needs. You can click 'Book a Demo' in the navigation bar to discuss custom scopes with our team."
      } else if (lower.includes('support') || lower.includes('customer')) {
        botReply = "Our Customer Support AI classifies incoming tickets, checks policy in real-time, drafts responses, and prepares escalations for human approval."
      } else if (lower.includes('security') || lower.includes('privacy') || lower.includes('safe') || lower.includes('governance')) {
        botReply = "Security and responsible control are native: we enforce permission tiering, deterministic guardrails, and audit logs with human-in-the-loop sign-offs."
      } else if (lower.includes('workforce') || lower.includes('hire') || lower.includes('employee')) {
        botReply = "We provide four specialized digital employees designed to coordinate and scale recurring operations seamlessly across your existing tool stack."
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: botReply }])
      setIsTyping(false)
    }, 850)
  }

  return (
    <>
      {/* Floating Action Button Cluster */}
      <div className="floating-actions-dock" aria-label="Quick actions">
        {/* Ask AI Button */}
        <motion.button
          type="button"
          className="float-action-btn ask-ai-btn"
          aria-label="Ask AI Assistant"
          title="Ask AI Assistant"
          onClick={() => setDialogOpen((open) => !open)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <span className="btn-ai-glow" />
          <Sparkles className="sparkle-icon" size={17} />
          <span className="ask-ai-label">Ask AI</span>
        </motion.button>

        {/* Scroll To Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              type="button"
              className="float-action-btn scroll-top-btn"
              aria-label="Scroll back to top"
              title="Scroll to top"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.6, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 15 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Ask AI Dialogue Box / Modal */}
      <AnimatePresence>
        {dialogOpen && (
          <div className="ai-dialog-backdrop" onClick={() => setDialogOpen(false)}>
            <motion.div
              className="ai-dialog-window"
              role="dialog"
              aria-modal="true"
              aria-label="Ask AI Dialogue"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {/* Header */}
              <div className="ai-dialog-header">
                <div className="ai-dialog-branding">
                  <div className="ai-dialog-avatar">
                    <Bot size={18} />
                    <span className="ai-pulse-dot" />
                  </div>
                  <div>
                    <h3 className="ai-dialog-title">
                      AVENQEO <span>AI Assistant</span>
                    </h3>
                    <span className="ai-dialog-subtitle">Intelligent Workforce Companion</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="ai-dialog-close"
                  onClick={() => setDialogOpen(false)}
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Status / Quick Tags */}
              <div className="ai-dialog-chips">
                <span className="ai-chip">Human-in-the-Loop</span>
                <span className="ai-chip">Governed Operations</span>
                <span className="ai-chip">Real-time Context</span>
              </div>

              {/* Chat Message Body */}
              <div className="ai-dialog-body">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`ai-message-row ${msg.sender === 'user' ? 'is-user' : 'is-bot'}`}
                  >
                    <div className="ai-message-avatar">
                      {msg.sender === 'user' ? <User size={13} /> : <Bot size={13} />}
                    </div>
                    <div className="ai-message-bubble">
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="ai-message-row is-bot">
                    <div className="ai-message-avatar">
                      <Bot size={13} />
                    </div>
                    <div className="ai-message-bubble typing-bubble">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggested Questions */}
              <div className="ai-quick-questions">
                <button
                  type="button"
                  className="quick-q-btn"
                  onClick={() => {
                    setInputValue('What AI employees do you offer?')
                  }}
                >
                  Workforce capabilities
                </button>
                <button
                  type="button"
                  className="quick-q-btn"
                  onClick={() => {
                    setInputValue('How does responsible human review work?')
                  }}
                >
                  Governance & approvals
                </button>
                <button
                  type="button"
                  className="quick-q-btn"
                  onClick={() => {
                    setInputValue('How can I book a consultation?')
                  }}
                >
                  Book consultation
                </button>
              </div>

              {/* Input Form */}
              <form className="ai-dialog-input-bar" onSubmit={handleSend}>
                <input
                  type="text"
                  placeholder="Ask anything about our AI workforce..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  className="ai-send-btn"
                  disabled={!inputValue.trim()}
                  aria-label="Send query"
                >
                  <Send size={15} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
