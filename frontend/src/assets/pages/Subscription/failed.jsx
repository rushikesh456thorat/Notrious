
import './subscription.css';

const Failed = () => {
  return (
    <div className="failed-wrapper">
      <div className="failed-card">
        <div className="failed-icon">❌</div>
        <h2 className="failed-title">Payment Failed</h2>
        <p className="failed-message">
          Unfortunately, your payment did not go through. Please try again or use a different payment method.
        </p>
        <a className="failed-btn" href="/subscription">
          Try Again
        </a>
      </div>
    </div>
  );
};

export default Failed;
