export function AboutHero() {
  return (
    <section className="hero" style={{ paddingBottom: "clamp(40px, 5vw, 64px)" }}>
      <div className="container">
        <div style={{ maxWidth: 780 }}>
          <div className="eyebrow-pill">
            <span className="live-dot" aria-hidden />
            Cede Stable Ltd · Issuer of GHST
          </div>
          <h1 className="display display-xl" style={{ marginTop: 20 }}>
            Built in Ghana,
            <br />
            for the <em>Ghanaian economy.</em>
          </h1>
          <p className="lede" style={{ marginTop: 24, maxWidth: 620 }}>
            Cede Stable Ltd is a wholly Ghanaian-owned blockchain company building digital
            financial infrastructure for West Africa, starting with GHST, the Ghana Cedi
            onchain.
          </p>
        </div>
      </div>
    </section>
  );
}
