import './helpandsupport.css';

const HelpAndSupport = () => {
  return (
    <div className="help-container">
      <h1 className="help-title">Help & Support</h1>
      <p className="help-subtitle">
        Welcome to  Notrious&apos;s Help Center. We&apos;re here to support your journey in building high-converting Shopify product pages.
      </p>

      <section className="help-section">
        <h2>🛠 Common Topics</h2>
        <ul>
          <li>Connecting your Shopify store to  Notrious</li>
          <li>Importing product data from existing Shopify listings</li>
          <li>Using pre-designed templates</li>
          <li>Publishing product pages to your live store</li>
          <li>Setting up Shopify API credentials</li>
          <li>Managing store permissions and access tokens</li>
        </ul>
      </section>

      <section className="help-section">
        <h2>📬 Contact Support</h2>
        <p>If you&apos;re stuck, confused, or facing a technical issue, don&apos;t hesitate to reach out.</p>
        <p>
          📧 Email us at: <a href="mailto:support@ Notrious.com">support@ Notrious.com</a>
        </p>
        <p>We aim to respond within 24 hours on business days.</p>
      </section>

      <section className="help-section">
        <h2>💡 Tips</h2>
        <ul>
          <li>Use high-quality images for better conversion</li>
          <li>Preview your pages before publishing</li>
          <li>Ensure the correct API scopes are granted</li>
          <li>Keep your templates organized by category</li>
        </ul>
      </section>

      <section className="help-section">
        <h2>❓ Frequently Asked Questions</h2>
        <ul>
          <li><strong>Q: How long does it take to connect my store?</strong><br/>
          A: Typically less than 5 minutes with the right permissions.</li>
          <li><strong>Q: Can I use custom templates?</strong><br/>
          A: Yes, you can create and save your own templates.</li>
          <li><strong>Q: Is there a limit to product imports?</strong><br/>
          A: No, you can import your entire product catalog.</li>
        </ul>
      </section>

      <footer className="help-footer">
        © {new Date().getFullYear()}  Notrious. All rights reserved.
      </footer>
    </div>
  );
};

export default HelpAndSupport;