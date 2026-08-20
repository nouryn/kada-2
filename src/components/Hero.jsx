function Hero({ productCount }) {
  return (
    <section className="hero-section" id="top">
      <div className="hero-copy-block">
        <p className="eyebrow">A pocketful of everyday magic</p>
        <h1>
          Small things.
          <br />
          <em>Big delight.</em>
        </h1>
        <p className="hero-copy">
          A cheerful collection of {productCount} useful little objects, chosen
          to make your desk, home, and daily rituals feel a bit more special.
        </p>
        <a className="shop-link" href="#shop">
          Wander into the shop <span>→</span>
        </a>
      </div>
      <div className="hero-still-life" aria-hidden="true">
        <span className="hero-flower">✿</span>
        <span className="hero-bag">👜</span>
        <span className="hero-cup">☕</span>
        <span className="hero-sparkle">✦</span>
        <p>made for slow days</p>
      </div>
    </section>
  );
}

export default Hero;
