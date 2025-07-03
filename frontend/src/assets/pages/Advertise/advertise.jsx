import { toast } from 'react-toastify';
import './advertise.css'
const Advertise = () => {
  return (
    <div className="advertise-container">
      <div className="advertise-content">
        <div className="coming-soon">
          <h2>Advertise With Us</h2>
          <p>Exciting advertising opportunities coming soon!</p>
          <div className="countdown">
            <span className="countdown-item">
              <span className="number">N/A</span>
              <span className="label">Days</span>
            </span>
            <span className="countdown-item">
              <span className="number">N/A</span>
              <span className="label">Hours</span>
            </span>
            <span className="countdown-item">
              <span className="number">N/A</span>
              <span className="label">Minutes</span>
            </span>
          </div>
          <button className="notify-btn"onClick={()=>{toast.success('We will notify you!')}}>Notify Me When Live</button>
        </div>
      </div>
    </div>
  )
}

export default Advertise;