# GHST — Ghana Cedis Token Website

Official website for the Ghana Cedis Token (GHST), a fiat-backed digital representation of the Ghana Cedi built on blockchain infrastructure.

**Issuer:** Cede Stable LTD
**Distribution Partner:** WeWire
**Networks:** Base (live), Stellar (coming soon)
**Base Contract:** `0x2094656c30C064EFae86C1fA1b87DdAB1f513fbb`

## Pages

- **Home** — Hero, key stats, how-it-works, and feature overview
- **Transparency** — Circulating supply, reserve composition, attestation reports, contract addresses
- **Partners** — Banking (Omni Bank), audit (BNA Ghana), asset management (Constants Capital), technology (Fireblocks, Chainalysis, Stellar), distribution (WeWire)
- **Use Cases** — Remittances, merchant payments, government disbursements, supply chain, AfCFTA trade, treasury, DeFi
- **Whitepaper** — Full readable whitepaper with download option
- **Ecosystem** — Where to buy/sell GHST, supported wallets, developer integrations

## Design System

Built with the GHST Figma design system:

- **Primary:** `#785AFF` (Purple)
- **Accent colors:** `#FF5700` (Orange), `#007D6F` (Green), `#0D72FF` (Blue)
- **Typography:** Inter Tight (headings), Inter (body)
- **Dark surfaces:** `#1A1A2E`, `#2D2B55`
- **Light background:** `#F2EFFF`

## Development

Multi-page static site built from the design in `GHST Website/`.

```bash
npm install
npm run build
```

This generates `index.html`, `About.html`, `Contact.html`, and pre-compiled bundles in `dist/`.

Open `index.html` in a browser, or serve the repo root with any static file server.

## Deployment (GitHub Pages)

The site is hosted on GitHub Pages from the `main` branch (repo root).

- **Project URL:** https://pkay-eg.github.io/ghst-website/
- After adding a custom domain in GitHub → Settings → Pages, point DNS at GitHub (see below).

Always run `npm run build` before pushing so `dist/*.js` matches the latest components.

## License

Proprietary — Cede Stable LTD. All rights reserved.
