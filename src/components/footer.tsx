"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const path = usePathname();
  const onSubpage = path === "/about" || path === "/contact";
  const home = onSubpage ? "/" : "";
  const h = (frag: string) => (onSubpage ? `${home}${frag}` : frag);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link href={home || "#"} className="nav-logo">
              <span className="nav-logo-mark" aria-hidden />
              <span>GHST</span>
            </Link>
            <p>The Ghana Cedi, onchain. Issued by Cede Stable Ltd. Primary broker: WeWire.</p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <a href={h("#how")}>How it works</a>
            <a href={h("#economy")}>24-hour economy</a>
            <a href={h("#reserves")}>Reserves</a>
            <a href={h("#chains")}>Chains</a>
            <a href={h("#developers")}>Developers</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h4>Partners</h4>
            <a href="https://www.wewire.com" target="_blank" rel="noreferrer">
              WeWire (Broker)
            </a>
            <a href="https://docs.wewire.com" target="_blank" rel="noreferrer">
              Developer Docs
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Cede Stable Ltd. All rights reserved.</span>
          <span>Brokered by WeWire · Attested by BNA Chartered Accountants</span>
        </div>
      </div>
    </footer>
  );
}
