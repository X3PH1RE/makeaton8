import './Newsletter.css'
import matLogo from '../assets/MAT new logo.png'

function Newsletter() {

  return (
    <div className="newsletter-page">
      {/* Decorative elements */}
      <div className="newsletter-bg-pattern"></div>
      <div className="newsletter-glow newsletter-glow-1"></div>
      <div className="newsletter-glow newsletter-glow-2"></div>
      
      <div className="newsletter-content">
        {/* Logo */}
        <a href="/" className="newsletter-logo-link">
          <img src={matLogo} alt="Make-A-Ton" className="newsletter-logo" />
        </a>
        
        {/* Header */}
        <div className="newsletter-header">
          <h1 className="newsletter-title">Stay in the Loop</h1>
          <p className="newsletter-subtitle">
            Get the latest updates, announcements, and exclusive content from Make-A-Ton <br/>(and obv the tea too!)
          </p>
        </div>
        
        {/* Form Container */}
        <div className="newsletter-form-container">
          <iframe
            src="https://tally.so/embed/Pdp6GB?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="424"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Sign Up for the Make-A-Ton TEA!"
            style={{ background: 'transparent' }}
          ></iframe>
        </div>
        
        {/* Footer */}
        <div className="newsletter-footer">
          <p>No spam, just exciting updates. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  )
}

export default Newsletter

