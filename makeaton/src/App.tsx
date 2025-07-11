import './App.css'
import webviewImage from '../assets/webview.png'
import kathakaliImage from '../assets/kathakali.png'
import circleTextImage from '../assets/circle-text.png'

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
