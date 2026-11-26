import React from 'react'

const POLICY_TITLES = {
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
  cookies: 'Cookie Policy',
  security: 'Data Privacy & Security',
}

export default function LegalPolicy({ type }) {
  const title = POLICY_TITLES[type]

  return (
    <section className="content-page">
      <div className="container content-page-inner legal-draft">
        <span className="section-label">LEGAL &amp; TRUST</span>
        <h1>{title}</h1>
        <p className="legal-draft-notice">Draft — requires legal review before publication</p>
        <div className="content-page-copy">
          <p>
            This page is a draft notice, not a complete or approved {title.toLowerCase()}. Avenqeo AI has not provided the policy details needed to publish a final version here.
          </p>
          <p>
            Replace this notice with content reviewed and approved by qualified legal counsel before relying on or publishing this policy.
          </p>
        </div>
      </div>
    </section>
  )
}
