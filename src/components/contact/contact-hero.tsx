export function ContactHero() {
  return (
    <section className="hero" style={{ paddingBottom: "clamp(32px, 4vw, 56px)" }}>
      <div className="container">
        <div style={{ maxWidth: 760 }}>
          <div className="eyebrow-pill">
            <span className="live-dot" aria-hidden />
            We reply within one business day
          </div>
          <h1 className="display display-xl" style={{ marginTop: 20 }}>
            Get in <em>touch.</em>
          </h1>
          <p className="lede" style={{ marginTop: 24, maxWidth: 580 }}>
            Whether you&apos;re an institution looking to mint, a developer integrating GHST,
            or a partner exploring how digital Cedis fit your business, we&apos;d love to hear
            from you.
          </p>
        </div>
      </div>
    </section>
  );
}
