/* eslint-disable no-unused-vars */
// src/components/Accounts/connectionguide.jsx
import { useState } from "react";
import "./connectionguide.css";
import { toast } from "react-toastify";
import useGlobalBxStore from "../../zustand/useGlobalBxStore";

const steps = [
  {
    title: "Go to Shopify Admin",
    description: `Click on "Apps" from the sidebar, then select "App and sales channel settings".`,
    image: "/conImage/Connect_1.png",
  },
  {
    title: "Create App",
    description: `Click "Develop apps" (top-right), then "Create an app". Name it "Page Pilot" and click "Create app".`,
    image: "/conImage/Connect_2.png",
  },
  {
    title: "Configure API Scopes",
    description: `Click "Configure Admin API scopes". Enable:\n- 
write_products\n-read_products\n write_themes\n read_themes\nwrite_theme_code\n read_channels\nwrite_publications\n read_publications\n read_product_listings\nThen click "Save".`,
    image: "/conImage/Connect_3.png",
  },
  {
    title: "Install the App",
    description: `Click "Install app" (top-right) and confirm the install in the pop-up.`,
    image: "/conImage/Connect_4.png",
  },
  {
    title: "Get Shopify Token",
    description: `Click "Reveal token once". This is your Shopify Key. Copy and save it!\n\n⚠️ You can't view it again.\n⚠️ Don’t delete the app.`,
    image: "/conImage/Connect_5.png",
    isFinal: true,
  },
];

const ConnectionGuide = () => {
  const [step, setStep] = useState(0);
  const [token, setToken] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const { setIsVisible } = useGlobalBxStore();
  const [loading, setLoading] = useState();

  const next = () => step < steps.length - 1 && setStep(step + 1);
  const back = () => step > 0 && setStep(step - 1);

  const handlePaste = async (type) => {
    try {
      const text = await navigator.clipboard.readText();
      if (type === "token") {
        setToken(text);
      } else if (type === "url") {
        setStoreUrl(text);
      }
    } catch (err) {
      toast.error("Failed to read from clipboard. Please paste manually.");
    }
  };
  const handleSend = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}/api/user/connect/shopify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            accessToken: token,
            storeUrl,
          }),
        }
      );
      const data = await res.json();
      if (data.status == "fail") {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        setIsVisible(true);
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="connection-guide">
      <div className="guide-header">
        <h2>Shopify Connection Guide</h2>
        <p>Follow these steps to connect your Shopify store</p>
      </div>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${(step + 1) * 20}%` }}
        ></div>
        <div className="step-labels">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`step-label ${i === step ? "active" : ""} ${
                i < step ? "completed" : ""
              }`}
              onClick={() => setStep(i)}
            >
              <div className="step-number">{i + 1}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="guide-content">
        <div className="image-container">
          <img
            src={steps[step].image}
            alt={`Step ${step + 1}`}
            className="step-image"
          />
          <div className="step-counter">
            Step {step + 1} of {steps.length}
          </div>
        </div>

        <div className="text-content">
          <h3 className="step-title">{steps[step].title}</h3>
          <p className="step-description">{steps[step].description}</p>

          {steps[step].isFinal && (
            <div className="token-section">
              <div className="input-group">
                <label htmlFor="token">Shopify API Token</label>
                <div className="input-with-icon">
                  <input
                    id="token"
                    type="text"
                    placeholder="Paste your token here"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                  />
                  <button
                    onClick={() => handlePaste("token")}
                    className="copy-btn"
                    title="Paste from clipboard"
                  >
                    Paste Key
                  </button>
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="token">Website Url (Store Url)</label>
                <div className="input-with-icon">
                  <input
                    id="token"
                    type="text"
                    placeholder="Paste your url here"
                    value={storeUrl}
                    onChange={(e) => setStoreUrl(e.target.value)}
                  />
                  <button
                    onClick={() => handlePaste("url")}
                    className="copy-btn"
                    title="Paste from clipboard"
                  >
                    Paste Url
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="step-actions">
        <button
          onClick={back}
          disabled={step === 0}
          className="action-btn back-btn"
        >
          ← Back
        </button>
        {step === steps.length - 1 ? (
          <button className="action-btn finish-btn" onClick={handleSend}>
            {loading ? (
              <span className="spinner"></span>
            ) : (
              <span>Complete Connection</span>
            )}{" "}
          </button>
        ) : (
          <button onClick={next} className="action-btn next-btn">
            Next →
          </button>
        )}
      </div>

      <div className="footer-note">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
        <span>
          Having trouble? <a href="#">Contact Support</a>
        </span>
      </div>
    </div>
  );
};

export default ConnectionGuide;
