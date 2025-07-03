import { useState, useEffect } from "react";
import "./pagestatus.css";

const steps = [
  { left: "Analyzing product", right: "Scanning specifications" },
  { left: "Writing content", right: "Optimizing SEO" },
  { left: "Generating reviews", right: "Analyzing trends" },
  { left: "Finalizing design", right: "Quality checking" },
];

const PageStatus = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progressValues, setProgressValues] = useState(
    Array(steps.length * 2).fill(0)
  );

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1100);

    // Random progress updater for active steps
    const progressTimer = setInterval(() => {
      setProgressValues(prev => {
        const newValues = [...prev];
        // Update current step columns (left and right)
        const leftIndex = currentStep;
        const rightIndex = currentStep + steps.length;
        
        if (newValues[leftIndex] < 100) {
          newValues[leftIndex] = Math.min(
            100, 
            newValues[leftIndex] + Math.floor(Math.random() * 15)
          );
        }
        
        if (newValues[rightIndex] < 100) {
          newValues[rightIndex] = Math.min(
            100, 
            newValues[rightIndex] + Math.floor(Math.random() * 15)
          );
        }
        
        return newValues;
      });
    }, 250);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
    };
  }, [currentStep]);

  const getProgress = (columnIndex, stepIndex) => {
    if (stepIndex < currentStep) return 100;
    if (stepIndex > currentStep) return 0;
    return progressValues[columnIndex === 0 ? stepIndex : stepIndex + steps.length];
  };

  const renderStatusIcon = (stepIndex) => {
    if (stepIndex < currentStep) {
      return <span className="completed-check">✓</span>;
    }
    if (stepIndex === currentStep) {
      return <span className="spinner"></span>;
    }
    return null;
  };

  return (
    <div className="modern-status-container">
      <div className="glass-card">
        <h1 className="status-title">Building Your Premium Product Page</h1>
        <p className="status-subtext">
          Our AI is crafting a masterpiece for your product. 
          This advanced process typically takes just a few moments...
        </p>

        <div className="progress-grid">
          {[0, 1].map((columnIndex) => (
            <div key={columnIndex} className="progress-column">
              {steps.map((step, stepIndex) => (
                <div key={`${columnIndex}-${stepIndex}`} className="progress-item">
                  <div className={`progress-label ${
                    stepIndex < currentStep ? "completed" : 
                    stepIndex === currentStep ? "pu-active" : ""
                  }`}>
                    <span>{columnIndex === 0 ? step.left : step.right}</span>
                    {renderStatusIcon(stepIndex)}
                  </div>
                  <div className="progress-bar-container">
                    <div 
                      className={`progress-bar-fill ${
                        stepIndex < currentStep ? "completed" : ""
                      }`} 
                      style={{ width: `${getProgress(columnIndex, stepIndex)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <img src="/ezgif-5-f18205142b.gif" alt="loading" className="modern-loader" />

        <p className="hint">
          Pro Tip: High-quality images increase conversion rates by up to 30%
        </p>
      </div>
    </div>
  );
};

export default PageStatus;