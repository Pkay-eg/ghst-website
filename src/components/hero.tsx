"use client";

import { ArrowRight, Check } from "@/components/icons";
import { HeroReservesCard } from "@/components/hero-reserves-card";

const WEWIRE_URL = "https://www.wewire.com";

export function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="display display-xl">
              The Ghana Cedi,
              <br />
              <em>onchain.</em>
            </h1>
            <p className="lede">
              GHST is a fully-reserved digital Cedi for businesses and developers. Mint,
              redeem, and settle 1:1 with traditional Ghana Cedis - 24/7, in seconds, for
              fractions of a penny.
            </p>
            <div className="hero-ctas">
              <a href={WEWIRE_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
                Get GHST <ArrowRight />
              </a>
            </div>
            <div className="hero-trust">
              <span>
                <span className="tick">
                  <Check size={10} />
                </span>{" "}
                1:1 reserves
              </span>
              <span>
                <span className="tick">
                  <Check size={10} />
                </span>{" "}
                Monthly attestation
              </span>
              <span>
                <span className="tick">
                  <Check size={10} />
                </span>{" "}
                ERC-20 on Base
              </span>
            </div>
          </div>

          <HeroReservesCard />
        </div>
      </div>
    </section>
  );
}
