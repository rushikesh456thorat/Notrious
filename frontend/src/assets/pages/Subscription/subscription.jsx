import { useState } from "react";
import Icon from "../../icon/icon";
import "./subscription.css";
import { useAuthStore } from "../../zustand/useAuthStore";
import { useEffect } from "react";
import {toast} from 'react-toastify'

const Subscription = () => {
  const [isSubscription, setIsSubscription] = useState(false);
  const [subscribePlan, setSubscribePlan] = useState('');
  const [subscriptionData, setSubscriptionData] = useState(null); // Store full subscription details
  const { authUser } = useAuthStore();
  const [selected, setSelected] = useState("monthly");


  // Plan data organized in a dictionary
  const plans = {
    launch: {
      name: "Launch Plan",
      monthlyPrice: 999,
      yearlyPrice: 700,
      features: [
        "Connect to Shopify and Meta (Facebook/Instagram) accounts",
        "Import up to 50 products per month",
        "Access to basic high-converting templates for product pages",
        "Create up to 10 ad templates per month",
        "Basic analytics on imported product performance",
        "Email support"
      ]
    },
    growth: {
      name: "Growth Booster",
      monthlyPrice: 2999,
      yearlyPrice: 2500,
      features: [
        "Connect up to 3 Shopify and Meta accounts",
        "Import up to 200 products per month",
        "Access to premium product page templates",
        "Create up to 50 ad templates per month",
        "Advanced analytics with product and ad performance tracking",
        "A/B testing for product pages and ads",
        "Priority email support"
      ]
    },
    scale: {
      name: "Scale Pro",
      monthlyPrice: 7999,
      yearlyPrice: 6000,
      features: [
        "Unlimited Shopify and Meta account connections",
        "Unlimited product imports",
        "Full access to all product page and ad templates, including custom templates",
        "Unlimited ad templates and campaigns",
        "Advanced performance analytics with optimization insights",
        "Custom integrations and dedicated API access",
        "24/7 priority support and a dedicated account manager"
      ]
    }
  };

   useEffect(() => {
      const checkSubscription = async () => {
        try {
          const res = await fetch(
            `${
              import.meta.env.VITE_API_DOMAIN
            }/api/user/subscription/status`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          const response = await res.json();
          
          if (response.status == "fail") {
            toast.error("Something went wrong");
          }
          if(response.isSubcriptionActive){
            setIsSubscription(true);
            setSubscribePlan(response.plan);
            // Store full subscription details
            setSubscriptionData({
              plan: response.data.plan,
              expiryDate: response.data.expiry,
              startDate: response.data.startDate,
              billingCycle: response.data.billingCycle || 'yearly',
              // Add any other fields your backend returns
            });
          }else{
            setIsSubscription(false);
            setSubscriptionData(null);
          }
        } catch (error) {
          console.error(error);
          toast.error("Application broke try after some time!");
        }
      };
      checkSubscription();
    }, []);

  // Function to handle plan type selection
  const handlePlanTypeSelect = (type) => {
    setSelected(type);
  };

  const handleSubscribe = async (plan) => {
    console.log(plan);
    const res = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/api/stripe/create-checkout-session`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authUser["email"], plan, billingCycle:selected }),
        credentials: "include",
      }
    );
  
    const data = await res.json();
    window.location.href = await data.url;
  };

  // Get current prices based on selected plan type
  const getCurrentPrices = () => {
    return {
      launch: selected === "monthly" ? plans.launch.monthlyPrice : plans.launch.yearlyPrice,
      growth: selected === "monthly" ? plans.growth.monthlyPrice : plans.growth.yearlyPrice,
      scale: selected === "monthly" ? plans.scale.monthlyPrice : plans.scale.yearlyPrice
    };
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get days remaining until expiry
  const getDaysRemaining = (expiryDate) => {
    if (!expiryDate) return 0;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const currentPrices = getCurrentPrices();

  return (
    <div className="subscription-container">
      <section className="container-header">
        <h2>Subscription</h2>
      </section>
      <section className="subscription-content">
        <div className="subscription-status">
          <p>
            Subscription Status:{" "}
            <span
              className={`subscription-status-span ${
                isSubscription ? "sub-active" : "sub-inactive"
              }`}
            >
              {isSubscription ? "Active" : "Inactive"}
            </span>
          </p>
        </div>

        {/* Current Subscription Details - Show only when subscription is active */}
        {isSubscription && subscriptionData && (
          <div className="current-subscription">
            <h4>Current Subscription</h4>
            <div className="current-plan-card">
              <div className="current-plan-header">
                <div className="current-plan-info">
                  <h5 className="current-plan-name">
                    {plans[subscriptionData.plan]?.name || 'Unknown Plan'}
                  </h5>
                  <p className="current-plan-type">
                    {subscriptionData.billingCycle || 'Monthly'} Plan
                  </p>
                </div>
                <div className="current-plan-status">
                  <div className="days-remaining">
                    <span className="days-count">
                      {getDaysRemaining(subscriptionData.expiryDate)}
                    </span>
                    <span className="days-label">days left</span>
                  </div>
                </div>
              </div>
              
              <div className="subscription-dates">
                <div className="date-item">
                  <span className="date-label">Start Date:</span>
                  <span className="date-value">
                    {formatDate(subscriptionData.startDate)}
                  </span>
                </div>
                <div className="date-item">
                  <span className="date-label">Expires On:</span>
                  <span className="date-value">
                    {formatDate(subscriptionData.expiryDate)}
                  </span>
                </div>
              </div>

              {/* Show current plan features */}
              <div className="current-plan-features">
                <h6>Your Plan Includes:</h6>
                <div className="features-list">
                  {plans[subscriptionData.plan]?.features.slice(0, 3).map((feature, index) => (
                    <div className="feature-item" key={index}>
                      <Icon icon="roundcheck" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {plans[subscriptionData.plan]?.features.length > 3 && (
                    <p className="more-features">
                      +{plans[subscriptionData.plan].features.length - 3} more features
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="subscription-head">
          <h4>{isSubscription ? 'Upgrade Plan' : 'Choose a Plan'}</h4>
          <div className="select-plan-type">
            <button
              className={`select-btn ${
                selected === "monthly" ? "selected" : ""
              }`}
              onClick={() => handlePlanTypeSelect("monthly")}
            >
              Monthly
            </button>
            <button
              className={`select-btn ${
                selected === "yearly" ? "selected" : ""
              }`}
              onClick={() => handlePlanTypeSelect("yearly")}
            >
              Yearly 10% off
            </button>
          </div>
        </div>
        <div className="plan-container">
          {/* Render plans dynamically */}
          {Object.entries(plans).map(([planKey, planData]) => (
            <div 
              className={`plan-item ${
                isSubscription && subscribePlan === planKey ? 'current-plan' : ''
              }`} 
              key={planKey}
            >
              <div className="plan-header">
                <div className="plan-name">
                  {planData.name}
                  {isSubscription && subscribePlan === planKey && (
                    <span className="current-badge">Current</span>
                  )}
                </div>
                <div className="plan-pricing">
                  ₹{currentPrices[planKey]} <span>/month</span>
                </div>
              </div>
              <div className="plan-content">
                {planData.features.map((feature, index) => (
                  <div className="feature" key={index}>
                    <Icon icon="roundcheck" />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              <div className="choose-feild">
                <button
                  className="choose-btn"
                  onClick={() => handleSubscribe(planKey)}
                  disabled={isSubscription && subscribePlan === planKey}
                >
                  <p>
                    {isSubscription && subscribePlan === planKey 
                      ? 'Current Plan' 
                      : isSubscription 
                      ? 'Upgrade' 
                      : 'Choose Plan'
                    }
                  </p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Subscription;