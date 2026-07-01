"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const WEWIRE_URL = "https://www.wewire.com";

export function Nav() {
  const path = usePathname();
  const onSubpage = path === "/about" || path === "/contact";
  const homeHref = onSubpage ? "/" : "#";

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href={homeHref} className="nav-logo">
          <span className="nav-logo-mark" aria-hidden />
          <span>GHST</span>
        </Link>
        <nav className="nav-links">
          <Link href={homeHref}>Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="nav-actions">
          <a href={WEWIRE_URL} target="_blank" rel="noreferrer" className="nav-cta">
            Get GHST
          </a>
        </div>
      </div>
    </header>
  );
}
