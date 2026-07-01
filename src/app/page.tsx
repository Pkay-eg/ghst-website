import { Hero } from "@/components/hero";
import { PartnerStrip } from "@/components/partner-strip";
import { TrustGrid } from "@/components/trust-grid";
import { HowItWorks } from "@/components/how-it-works";
import { Economy } from "@/components/economy";
import { Reserves } from "@/components/reserves";
import { StatsStrip } from "@/components/stats-strip";
import { Multichain } from "@/components/multichain";
import { Developers } from "@/components/developers";
import { FAQ } from "@/components/faq";
import { CTA } from "@/components/cta";

export default function Home() {
  return (
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
  );
}
