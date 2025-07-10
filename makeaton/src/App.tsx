import './App.css'
import webviewImage from '../assets/webview.png'
import brushstrokeImage from '../assets/brushstroke.png'

function App() {
  return (
    <div className="app-container">
      <img 
        src={webviewImage} 
        alt="Background" 
        className="background-image"
      />
      <h1 className="make-a-ton-text">
        Make<br />
        A<br />
        Ton
      </h1>
      <p className="hackathon-subtitle">
        South India's Biggest{' '}
        <span className="hackathon-word">
          Hackathon
        </span>
      </p>
    </div>
  )
}

export default App
