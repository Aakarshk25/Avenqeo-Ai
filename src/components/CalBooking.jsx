import React, { useEffect, useRef, useState } from 'react'
import { getCalApi } from '@calcom/embed-react'
import './CalBooking.css'

const CAL_LINK = 'avenqeo-ai/30min'
const CAL_NAMESPACE = 'avenqeo-demo'
const CAL_EMBED_URL = 'https://app.cal.com/embed/embed.js'

const calTheme = {
  theme: 'dark',
  cssVarsPerTheme: {
    dark: {
      'cal-brand': '#22c55e',
      'cal-brand-emphasis': '#16a34a',
      'cal-brand-text': '#052e16',
      'cal-text': '#cbd5e1',
      'cal-text-emphasis': '#f8fafc',
      'cal-text-subtle': '#94a3b8',
      'cal-text-muted': '#64748b',
      'cal-text-inverted': '#0b1220',
      'cal-bg': '#0b1220',
      'cal-bg-emphasis': '#14241d',
      'cal-bg-subtle': '#111e2c',
      'cal-bg-muted': '#0a111b',
      'cal-bg-inverted': '#f8fafc',
      'cal-border': '#263747',
      'cal-border-emphasis': '#22c55e',
      'cal-border-subtle': '#1e2d3d',
      'cal-border-booker': '#1e3341',
      radius: '12px',
    },
  },
}

function CalendarSkeleton() {
  return (
    <div className="cal-embed-skeleton" aria-hidden="true">
      <div className="cal-skeleton-details">
        <span className="cal-skeleton-block cal-skeleton-title" />
        <span className="cal-skeleton-block cal-skeleton-subtitle" />
        <span className="cal-skeleton-block cal-skeleton-short" />
      </div>
      <div className="cal-skeleton-booker">
        <div className="cal-skeleton-calendar">
          <span className="cal-skeleton-block cal-skeleton-month" />
          <div className="cal-skeleton-weekdays">
            {Array.from({ length: 7 }, (_, index) => <span className="cal-skeleton-block" key={index} />)}
          </div>
          <div className="cal-skeleton-dates">
            {Array.from({ length: 35 }, (_, index) => <span className="cal-skeleton-block" key={index} />)}
          </div>
        </div>
        <div className="cal-skeleton-times">
          {Array.from({ length: 7 }, (_, index) => <span className="cal-skeleton-block" key={index} />)}
        </div>
      </div>
    </div>
  )
}

export default function CalBooking() {
  const [embedState, setEmbedState] = useState('loading')
  const [attempt, setAttempt] = useState(0)
  const embedRef = useRef(null)

  useEffect(() => {
    const container = embedRef.current
    if (!container) return undefined

    let active = true
    let ready = false
    let failed = false
    let calApi
    let readyHandler
    let failedHandler
    let embedObserver
    let bookingIframe
    let iframeLoadHandler

    container.replaceChildren()

    const timeoutId = window.setTimeout(() => {
      if (active && !ready) {
        failed = true
        setEmbedState('error')
      }
    }, 20000)

    const markReady = () => {
      if (!active || failed || ready) return
      ready = true
      window.clearTimeout(timeoutId)
      setEmbedState('ready')
    }

    const checkIframeReady = () => {
      if (!bookingIframe) return
      const visible = window.getComputedStyle(bookingIframe).visibility !== 'hidden'
      if (visible && bookingIframe.getBoundingClientRect().height > 0) markReady()
    }

    const markFailed = () => {
      if (!active || ready) return
      failed = true
      window.clearTimeout(timeoutId)
      setEmbedState('error')
    }

    const observeBookingIframe = () => {
      const iframe = container.querySelector('iframe')
      if (iframe && iframe !== bookingIframe) {
        if (bookingIframe && iframeLoadHandler) {
          bookingIframe.removeEventListener('load', iframeLoadHandler)
        }
        bookingIframe = iframe
        iframeLoadHandler = checkIframeReady
        iframe.addEventListener('load', iframeLoadHandler)
      }
      checkIframeReady()
    }

    const initializeCal = async () => {
      try {
        calApi = await getCalApi({ embedJsUrl: CAL_EMBED_URL, namespace: CAL_NAMESPACE })
        if (!active) return

        readyHandler = markReady
        failedHandler = markFailed
        embedObserver = new MutationObserver(observeBookingIframe)
        embedObserver.observe(container, {
          attributes: true,
          attributeFilter: ['style'],
          childList: true,
          subtree: true,
        })

        calApi('on', { action: 'bookerReady', callback: readyHandler })
        calApi('on', { action: 'linkReady', callback: readyHandler })
        calApi('on', { action: 'linkFailed', callback: failedHandler })
        calApi('ui', calTheme)
        calApi('inline', {
          elementOrSelector: container,
          calLink: CAL_LINK,
          config: { layout: 'month_view', theme: 'dark' },
        })
        observeBookingIframe()
      } catch (error) {
        console.error('Unable to initialize the Cal.com booking embed.', error)
        markFailed()
      }
    }

    initializeCal()

    return () => {
      active = false
      window.clearTimeout(timeoutId)
      embedObserver?.disconnect()
      if (bookingIframe && iframeLoadHandler) {
        bookingIframe.removeEventListener('load', iframeLoadHandler)
      }

      if (calApi && readyHandler) {
        calApi('off', { action: 'bookerReady', callback: readyHandler })
        calApi('off', { action: 'linkReady', callback: readyHandler })
      }
      if (calApi && failedHandler) {
        calApi('off', { action: 'linkFailed', callback: failedHandler })
      }
      container.replaceChildren()
    }
  }, [attempt])

  const retryEmbed = () => {
    setEmbedState('loading')
    setAttempt((currentAttempt) => currentAttempt + 1)
  }

  return (
    <div className="cal-booking-embed">
      <div className="cal-inline-embed" ref={embedRef} />
      {embedState === 'loading' && (
        <div className="cal-embed-state" role="status" aria-live="polite">
          <CalendarSkeleton />
          <span className="cal-sr-only">Loading live booking availability.</span>
        </div>
      )}
      {embedState === 'error' && (
        <div className="cal-embed-state cal-embed-error" role="alert">
          <p>We couldn&apos;t load the calendar. Please try again.</p>
          <button type="button" onClick={retryEmbed}>Retry calendar</button>
        </div>
      )}
    </div>
  )
}
