import React from "react";
import { createRoot } from "react-dom/client";

import { Nav } from "../../.build/components/Sections1.jsx";
import { Footer } from "../../.build/components/Sections3.jsx";
import { ContactHero, ContactForm } from "../../.build/components/ContactSections.jsx";

function App() {
  return (
    <>
      <Nav />
      <main>
        <ContactHero />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
