import { useState } from "react";

const footerFeatures = {
  hello: {
    icon: "💌",
    eyebrow: "Tiny mailbox",
    title: "Send us a little hello",
    copy: "Questions, kind notes, and photos of neighborhood cats are all warmly accepted.",
  },
  shipping: {
    icon: "🐰",
    eyebrow: "Bunny Post",
    title: "Packed with paws & care",
    copy: "Pretend parcels leave our studio in 1–2 days. Delivery takes 3–5 daydreams, or slightly longer if Bunny stops for carrots.",
  },
  instagram: {
    icon: "📸",
    eyebrow: "@formandfable",
    title: "Our tiny social nook",
    copy: "A pretend feed full of studio crumbs, fresh flowers, and products behaving suspiciously photogenic.",
  },
};

function Footer() {
  const [activeFeature, setActiveFeature] = useState(null);
  const [enquiry, setEnquiry] = useState({ name: "", email: "", message: "" });
  const [enquiryStatus, setEnquiryStatus] = useState("form");
  const feature = activeFeature ? footerFeatures[activeFeature] : null;

  const openFeature = (name) => {
    setActiveFeature(name);
    if (name === "hello") {
      setEnquiry({ name: "", email: "", message: "" });
      setEnquiryStatus("form");
    }
  };

  const closeFeature = () => {
    setActiveFeature(null);
    setEnquiryStatus("form");
  };

  const updateEnquiry = ({ target }) => {
    setEnquiry((current) => ({ ...current, [target.name]: target.value }));
  };

  const sendEnquiry = (event) => {
    event.preventDefault();
    setEnquiryStatus("sending");
    window.setTimeout(() => setEnquiryStatus("sent"), 2100);
  };

  const resetEnquiry = () => {
    setEnquiry({ name: "", email: "", message: "" });
    setEnquiryStatus("form");
  };

  return (
    <>
      <footer className="site-footer" id="about">
        <div>
          <a className="brand footer-brand" href="#top">
            <span>✿</span> FORM & FABLE
          </a>
          <div className="footer-story">
            <h2>A Tale of Small Things</h2>
            <p>
              Every fairy tale begins with a little magic. Ours began with spare
              yarn, scattered beads, paper sketches, and the stubborn belief
              that beautiful things deserve to exist.
            </p>
            <p>
              From those humble beginnings grew Form &amp; Fable, a home for
              handmade stories and curious treasures.{" "}
              <span aria-hidden="true">✨</span>
            </p>
          </div>
        </div>
        <div className="footer-links" aria-label="More information">
          <button onClick={() => openFeature("hello")}>
            Say hello <span>💌</span>
          </button>
          <button onClick={() => openFeature("shipping")}>
            Shipping <span>🐰</span>
          </button>
          <button onClick={() => openFeature("instagram")}>
            Instagram <span>✦</span>
          </button>
        </div>
        <small>© 2026 Form &amp; Fable · packed with care ♡</small>
      </footer>

      {feature && (
        <div
          className="footer-popup-layer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="footer-popup-title"
        >
          <button
            className="footer-popup-backdrop"
            onClick={closeFeature}
            aria-label="Close popup"
          />
          <div className={`footer-popup footer-popup-${activeFeature}`}>
            <button
              className="footer-popup-close"
              onClick={closeFeature}
              aria-label="Close popup"
            >
              ×
            </button>
            <span className="footer-popup-sparkle sparkle-one">✦</span>
            <span className="footer-popup-sparkle sparkle-two">✿</span>
            <div className="footer-popup-icon">{feature.icon}</div>
            <span>{feature.eyebrow}</span>
            <h2 id="footer-popup-title">{feature.title}</h2>
            <p>{feature.copy}</p>
            {activeFeature === "hello" && enquiryStatus === "form" && (
              <form className="enquiry-form" onSubmit={sendEnquiry}>
                <label>
                  Your name
                  <input
                    name="name"
                    value={enquiry.name}
                    onChange={updateEnquiry}
                    placeholder="Little visitor"
                    required
                  />
                </label>
                <label>
                  Your email
                  <input
                    name="email"
                    type="email"
                    value={enquiry.email}
                    onChange={updateEnquiry}
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label>
                  Your tiny note
                  <textarea
                    name="message"
                    value={enquiry.message}
                    onChange={updateEnquiry}
                    placeholder="What would you like the pigeon to carry?"
                    rows="3"
                    required
                  />
                </label>
                <button className="enquiry-send" type="submit">
                  Send by white pigeon <span aria-hidden="true">🕊️</span>
                </button>
              </form>
            )}
            {activeFeature === "hello" && enquiryStatus === "sending" && (
              <div
                className="pigeon-flight-scene"
                role="status"
                aria-live="polite"
              >
                <span className="pigeon-cloud cloud-one">☁</span>
                <span className="pigeon-cloud cloud-two">☁</span>
                <div className="flying-pigeon">
                  <span>🕊️</span>
                  <i>💌</i>
                </div>
                <p>Your enquiry is taking flight…</p>
              </div>
            )}
            {activeFeature === "hello" && enquiryStatus === "sent" && (
              <div className="enquiry-success" role="status" aria-live="polite">
                <div className="landed-pigeon">
                  🕊️<span>💌</span>
                </div>
                <h3>Safely delivered!</h3>
                <p>
                  Thank you, {enquiry.name.trim().split(" ")[0]}. Our imaginary
                  postmaster has your note.
                </p>
                <button type="button" onClick={resetEnquiry}>
                  Send another little note
                </button>
              </div>
            )}
            {activeFeature === "shipping" && (
              <div className="shipping-mini-route">
                <span>🏡 Studio</span>
                <i>· · · ✦ · · ·</i>
                <span>📦 You</span>
              </div>
            )}
            {activeFeature === "instagram" && (
              <div className="mini-feed">
                <span>🌷</span>
                <span>🧵</span>
                <span>☕</span>
              </div>
            )}
            <small>
              {activeFeature === "hello"
                ? "Pretend delivery—nothing leaves this browser. No pigeons were inconvenienced."
                : activeFeature === "instagram"
                  ? "Demo only—no scrolling required."
                  : "No pigeons were inconvenienced."}
            </small>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
