
import './subscription.css';

const Success = () => {
  return (
    <div className="success-wrapper">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h2 className="success-title">Payment Successful!</h2>
        <p className="success-message">
          Thank you for subscribing. Your account has been upgraded and is now active.
        </p>
        <a className="success-btn" href="/dashboard">
          Go to Dashboard
        </a>
      </div>
    </div>
  );
};

export default Success;
