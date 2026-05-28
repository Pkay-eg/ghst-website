import React from "react";
import { createRoot } from "react-dom/client";

import { Nav } from "../../.build/components/Sections1.jsx";
import { Footer } from "../../.build/components/Sections3.jsx";
import {
  AboutHero,
  Mission,
  CompanyStructure,
  Leadership,
  AboutCTA,
} from "../../.build/components/AboutSections.jsx";

function App() {
  return (
    <>
      <Nav />
      <main>
        <AboutHero />
        <Mission />
        <CompanyStructure />
        <Leadership />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
