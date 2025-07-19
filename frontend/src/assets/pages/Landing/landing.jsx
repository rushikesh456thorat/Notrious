import { useState, useEffect } from "react";
import {
  Check,
  Star,
  Zap,
  Globe,
  Shield,
  Rocket,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import "./landing.css";
import Icon from "../../icon/icon";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "how-it-works",
        "features",
        "reviews",
        "pricing",
        "faq",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleRegister = () => {
    navigate("/signup");
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="company-name">
              <img src="/notrious.jpg" alt="Company Logo" />
              <label>Notrious</label>
            </div>

            {/* Desktop Navigation */}
            <div className="desktop-nav">
              <div className="nav-links">
                {[
                  { name: "How It Works", id: "how-it-works" },
                  { name: "Features", id: "features" },
                  { name: "Reviews", id: "reviews" },
                  { name: "Pricing", id: "pricing" },
                  { name: "FAQ", id: "faq" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-link ${
                      activeSection === item.id ? "active" : ""
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                <button className="primary-button xm" onClick={handleRegister}>
                  Start Free Trial
                  <ArrowRight className="button-icon" size={20} />
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="mobile-menu-button">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="menu-toggle"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <div className="mobile-nav-content">
              {[
                { name: "How It Works", id: "how-it-works" },
                { name: "Features", id: "features" },
                { name: "Reviews", id: "reviews" },
                { name: "Pricing", id: "pricing" },
                { name: "FAQ", id: "faq" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="mobile-nav-link"
                >
                  {item.name}
                </button>
              ))}
              <button className="primary-button xm" onClick={handleRegister}>
                Start Free Trial
                <ArrowRight className="button-icon" size={20} />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Create Shopify Product Pages
              <span className="hero-title-highlight">Instantly with AI</span>
            </h1>
            <p className="hero-subtitle">
              Transform any product link into a beautiful, conversion-optimized
              Shopify product page in seconds. No coding required, no design
              skills needed.
            </p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={handleRegister}>
                Start Free Trial
                <ArrowRight className="button-icon" size={20} />
              </button>
              <button className="secondary-button">Watch Demo</button>
            </div>

            {/* Trust Indicators */}
            <div className="trust-indicators">
              <p className="trust-text">
                Trusted by 10,000+ Shopify merchants worldwide
              </p>
              <div className="trust-logos">
                <div className="trust-logo">
                  <div className="logo-box ">
                    <Icon icon="shopify" />
                  </div>
                  <span className="logo-text">Shopify</span>
                </div>
                <div className="trust-logo">
                  <div className="logo-box orange">
                    <Icon icon="amazon" />
                  </div>
                  <span className="logo-text">Amazon</span>
                </div>
                <div className="trust-logo">
                  <div className="logo-box purple">
                    <Icon icon="meta" />
                  </div>
                  <span className="logo-text">Meta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              From product URL to live Shopify page in just 3 simple steps
            </p>
          </div>

          <div className="steps-grid">
            {[
              {
                step: "01",
                title: "Paste Product URL",
                description:
                  "Simply paste any product URL from Amazon, AliExpress, or any other marketplace. Our AI instantly analyzes the product.",
                icon: <Globe className="step-icon" />,
              },
              {
                step: "02",
                title: "AI Magic Happens",
                description:
                  "Our advanced AI extracts product details, optimizes descriptions, selects the best images, and creates SEO-friendly content automatically.",
                icon: <Zap className="step-icon" />,
              },
              {
                step: "03",
                title: "Customize & Publish",
                description:
                  "Fine-tune your product page with our drag-and-drop editor, then publish directly to your Shopify store with one click.",
                icon: <Rocket className="step-icon" />,
              },
            ].map((step, index) => (
              <div key={index} className="step-container">
                <div className={`step-card ${index < 2 ? "has-arrow" : ""}`}>
                  <div className="step-header">
                    <div className="step-icon-container">{step.icon}</div>
                    <span className="step-number">{step.step}</span>
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="step-arrow">
                    <ArrowRight className="arrow-icon" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-description">
              Everything you need to create high-converting product pages
            </p>
          </div>

          <div className="features-grid">
            {[
              {
                icon: <Zap className="feature-icon" />,
                title: "One-Click Import",
                description:
                  "Import products from Amazon, AliExpress, and 50+ other marketplaces instantly.",
              },
              {
                icon: <Shield className="feature-icon" />,
                title: "AI-Powered Optimization",
                description:
                  "Our AI optimizes product titles, descriptions, and images for maximum conversions.",
              },
              {
                icon: <Globe className="feature-icon" />,
                title: "Direct Shopify Integration",
                description:
                  "Seamlessly publish to your Shopify store without any technical knowledge required.",
              },
              {
                icon: <Star className="feature-icon" />,
                title: "SEO Optimized",
                description:
                  "Every page is automatically optimized for search engines to drive organic traffic.",
              },
              {
                icon: <Rocket className="feature-icon" />,
                title: "High-Converting Templates",
                description:
                  "Choose from 20+ professionally designed templates proven to convert.",
              },
              {
                icon: <Check className="feature-icon" />,
                title: "Drag & Drop Editor",
                description:
                  "Customize your pages with our intuitive visual editor. No coding required.",
              },
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-container">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="reviews-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-description">
              Join thousands of successful merchants who&apos;ve transformed their
              stores
            </p>
          </div>

          <div className="reviews-grid">
            {[
              {
                name: "Aman Sharma",
                role: "Store Owner",
                review:
                  "Built 50+ product pages in a day with Notrious! The AI is incredibly smart and saves me hours of work. My conversion rates have increased by 40%.",
                rating: 5,
                avatar: "AS",
              },
              {
                name: "Meera Patel",
                role: "Dropshipper",
                review:
                  "It's like magic – paste a link, and boom! Page ready. The templates are gorgeous and the SEO optimization is top-notch. Highly recommended!",
                rating: 5,
                avatar: "MP",
              },
              {
                name: "Rahul Kumar",
                role: "E-commerce Manager",
                review:
                  "The direct Shopify integration is seamless. I can import products from multiple sources and have them live on my store in minutes. Game changer!",
                rating: 5,
                avatar: "RK",
              },
              {
                name: "Priya Singh",
                role: "Online Retailer",
                review:
                  "The drag-and-drop editor is intuitive and powerful. I can customize everything to match my brand perfectly. Customer support is excellent too!",
                rating: 5,
                avatar: "PS",
              },
              {
                name: "Vikash Gupta",
                role: "Entrepreneur",
                review:
                  "ROI is incredible. The time I save using Notrious allows me to focus on marketing and growing my business. Worth every penny!",
                rating: 5,
                avatar: "VG",
              },
              {
                name: "Sneha Reddy",
                role: "Digital Marketer",
                review:
                  "The SEO optimization features are outstanding. My product pages rank higher on Google and drive more organic traffic. Loving it!",
                rating: 5,
                avatar: "SR",
              },
            ].map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <div className="review-avatar">{review.avatar}</div>
                  <div>
                    <h4 className="review-name">{review.name}</h4>
                    <p className="review-role">{review.role}</p>
                  </div>
                </div>
                <div className="review-rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="star-icon" />
                  ))}
                </div>
                <p className="review-text">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pricing-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Choose Your Plan</h2>
            <p className="section-description">
              Start free, scale as you grow. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="pricing-grid">
            {[
              {
                name: "Launch",
                price: "₹999",
                period: "per month",
                description: "Perfect for testing the waters",
                features: [
                  "Connect to Shopify and Meta (Facebook/Instagram) accounts",
                  "Import up to 50 products per month",
                  "Access to basic high-converting templates for product pages",
                  "Create up to 10 ad templates per month",
                  "Basic analytics on imported product performance",
                  "Email support",
                ],
                cta: "Start Now",
                popular: false,
              },
              {
                name: "Growth",
                price: "₹2999",
                period: "per month",
                description: "Best for growing businesses",
                features: [
                  "Connect up to 3 Shopify and Meta accounts",
                  "Import up to 200 products per month",
                  "Access to premium product page templates",
                  "Create up to 50 ad templates per month",
                  "Advanced analytics with product and ad performance tracking",
                  "A/B testing for product pages and ads",
                  "Priority email support",
                ],
                cta: "Start Now",
                popular: true,
              },
              {
                name: "Scale",
                price: "₹7999",
                period: "per month",
                description: "For established enterprises",
                features: [
                  "Unlimited Shopify and Meta account connections",
                  "Unlimited product imports",
                  "Full access to all product page and ad templates, including custom templates",
                  "Unlimited ad templates and campaigns",
                  "Advanced performance analytics with optimization insights",
                  "Custom integrations and dedicated API access",
                  "24/7 priority support and a dedicated account manager",
                ],
                cta: "Start Now",
                popular: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`pricing-card ${plan.popular ? "popular" : ""}`}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <span>Most Popular</span>
                  </div>
                )}
                <div className="pricing-header">
                  <h3 className="pricing-title">{plan.name}</h3>
                  <p className="pricing-description">{plan.description}</p>
                  <div className="pricing-price">
                    <span className="price">{plan.price}</span>
                    <span className="period">/{plan.period}</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="feature-item">
                      <Check className="feature-check" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`pricing-button ${
                    plan.popular ? "primary" : "secondary"
                  }`}
                onClick={handleRegister}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq-section">
        <div className="faq-container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-description">
              Everything you need to know about Notrious
            </p>
          </div>

          <div className="faq-list">
            {[
              {
                question: "Do I need a Shopify store to use Notrious?",
                answer:
                  "Yes, Notrious is designed specifically for Shopify merchants. We connect directly to your Shopify account to seamlessly publish your product pages. If you don't have a Shopify store yet, you can sign up for one and then connect it to Notrious.",
              },
              {
                question:
                  "Can I import products from Amazon and other marketplaces?",
                answer:
                  "Absolutely! Notrious supports importing products from 50+ marketplaces including Amazon, AliExpress, eBay, Walmart, and many more. Simply paste the product URL and our AI will handle the rest.",
              },
              {
                question: "How does the AI optimization work?",
                answer:
                  "Our advanced AI analyzes the source product and optimizes the title, description, images, and metadata for maximum conversions. It also ensures SEO best practices are followed to help your products rank better in search results.",
              },
              {
                question: "Can I customize the generated product pages?",
                answer:
                  "Yes! While our AI creates a great starting point, you have full control to customize every aspect using our drag-and-drop editor. You can modify text, images, layout, colors, and more to match your brand perfectly.",
              },
              {
                question: "Is there a free trial available?",
                answer:
                  "Yes, we offer a free Launch plan that includes 50 product pages per month forever. For our paid plans, we offer a 14-day free trial so you can test all premium features risk-free.",
              },
              {
                question: "What kind of support do you provide?",
                answer:
                  "We provide comprehensive support including email support for all users, priority support for Growth plan users, and 24/7 phone support for Scale plan users. We also have extensive documentation and video tutorials.",
              },
              {
                question: "Can I cancel my subscription anytime?",
                answer:
                  "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your account will remain active until the end of your current billing period.",
              },
              {
                question: "How secure is my data?",
                answer:
                  "We take security very seriously. All data is encrypted in transit and at rest. We're SOC 2 compliant and follow industry best practices for data protection. We never store your Shopify credentials - we use secure OAuth integration.",
              },
            ].map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="company-name">
                <img src="/notrious.jpg" alt="Company Logo" />
                <label>Notrious</label>
              </div>
            </div>
            <div className="footer-actions">
              <button className="footer-button">Start Your Free Trial</button>
              <div className="footer-links">
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
                <a href="#" className="footer-link">
                  Terms of Service
                </a>
                <a href="#" className="footer-link">
                  Contact Us
                </a>
              </div>
            </div>
            <p className="footer-copyright">
              © 2025 Notrious. All rights reserved. Built with ❤️ for Shopify
              merchants.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
