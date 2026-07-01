import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { Mission } from "@/components/about/mission";
import { CompanyStructure } from "@/components/about/company-structure";
import { Leadership } from "@/components/about/leadership";
import { AboutCTA } from "@/components/about/about-cta";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <Mission />
      <CompanyStructure />
      <Leadership />
      <AboutCTA />
    </main>
  );
}
