import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import { Nav, Hero, PartnerStrip, TrustGrid } from "../../.build/components/Sections1.jsx";
import { HowItWorks, Reserves, StatsStrip, Multichain } from "../../.build/components/Sections2.jsx";
import { Economy } from "../../.build/components/Economy.jsx";
import { Developers, FAQ, CTA, Footer, Tweaks } from "../../.build/components/Sections3.jsx";

const DEFAULTS = {
  density: "balanced",
  hero: "orb",
};

function App() {
  const [tweaks, setTweaks] = useState(DEFAULTS);

  useEffect(() => {
    document.body.dataset.density = tweaks.density;
  }, [tweaks]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PartnerStrip />
        <TrustGrid />
        <HowItWorks />
        <Economy />
        <Reserves />
        <StatsStrip />
        <Multichain />
        <Developers />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <Tweaks tweaks={tweaks} onChange={setTweaks} />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
