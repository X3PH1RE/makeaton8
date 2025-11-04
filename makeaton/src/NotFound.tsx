import './App.css'

function NotFound() {
  return (
    <div className="app-container">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '2rem',
        color: '#fff'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          marginBottom: '1rem',
          fontFamily: 'var(--font-display, sans-serif)'
        }}>
          oops, we think you got lost!
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.5rem)',
          marginBottom: '2rem',
          opacity: 0.9
        }}>
          The page you're looking for doesn't exist.
        </p>
        <a 
          href="https://makeaton.in" 
          style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            backgroundColor: '#5C0023',
            border: '2px solid rgba(245, 245, 220, 0.8)',
            borderRadius: '8px',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
          }}
        >
          Go to makeaton.in
        </a>
      </div>
    </div>
  )
}

export default NotFound

