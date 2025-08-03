import './App.css'
import webviewImage from '../assets/webview.png'
import kathakaliImage from '../assets/kathakali.png'
import circleTextImage from '../assets/circle-text.png'
import MagicBento from './MagicBento'

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
        Ton <span className="version-text">8.0</span>
      </h1>
      <p className="hackathon-subtitle">
        South India's Biggest{' '}
        <span className="hackathon-word">
          Hackathon
        </span>
      </p>
            <div className="prizes-text">Prizes</div>
      <div className="activities-section">
        <h2 className="activities-heading">Activities and Events</h2>
        <MagicBento 
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="92, 0, 35"
        />
      </div>
      <img 
        src={circleTextImage} 
        alt="Circle Text" 
        className="circle-text"
      />
      <img 
        src={kathakaliImage} 
        alt="Kathakali Shadow" 
        className="kathakali-shadow"
      />
      <img 
        src={kathakaliImage} 
        alt="Kathakali" 
        className="kathakali-image"
      />
    </div>
  )
}

export default App
