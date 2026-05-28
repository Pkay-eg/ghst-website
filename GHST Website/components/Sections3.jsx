const { useState: useState3 } = React;

// ─── DEVELOPERS (code) ───
function Developers() {
  return (
    <section className="section" id="developers">
      <div className="container">
        <div className="dev-grid">
          <div>
            <div className="eyebrow-label">For institutions & developers</div>
            <h2 className="display display-md" style={{ marginTop: 14 }}>
              An ERC-20 you can <em>build on.</em>
            </h2>
            <p className="lede" style={{ marginTop: 18, maxWidth: 480 }}>
              GHST is a standard ERC-20 on Base, read and transfer it from any wallet, SDK, or smart-contract toolkit. <strong>All minting, redemption, and institutional integration is brokered through WeWire</strong>, the appointed primary broker for GHST.
            </p>
            <ul style={{
              listStyle: 'none', padding: 0, margin: '32px 0 0',
              display: 'grid', gap: 12
            }}>
              {[
              "ERC-20 standard · ethers / viem compatible",
              "Mint & redeem GHST 1:1 through WeWire",
              "REST API and webhooks via WeWire",
              "Sandbox environment for testing"].
              map((x, i) =>
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 14, color: 'var(--ink-2)' }}>
                  <span style={{
                  width: 18, height: 18, borderRadius: 999,
                  background: 'var(--purple-soft)',
                  color: 'var(--purple)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}><Check size={11} /></span>
                  {x}
                </li>
              )}
            </ul>
            <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://docs.wewire.com" target="_blank" rel="noreferrer" className="btn btn-ink btn-sm">Integrate via WeWire <ArrowRight size={14} /></a>
              <a href="https://www.wewire.com/contact" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">Talk to broker</a>
            </div>
          </div>

          <div className="code-window">
            <div className="code-head">
              <div className="code-dots"><i /><i /><i /></div>
              <div className="code-tab">transfer.ts</div>
            </div>
            <pre className="code-body" style={{ margin: 0 }}>
{`
`}<span className="com">// Send GHST on Base, ERC-20 standard</span>{`
`}<span className="kw">import</span>{` { createWalletClient, http } `}<span className="kw">from</span>{` `}<span className="str">"viem"</span>{`
`}<span className="kw">import</span>{` { base } `}<span className="kw">from</span>{` `}<span className="str">"viem/chains"</span>{`

`}<span className="kw">const</span>{` `}<span className="var">GHST</span>{` = `}<span className="str">"0x2094…513fbb"</span>{`

`}<span className="kw">await</span>{` `}<span className="var">client</span>{`.`}<span className="fn">writeContract</span>{`({
  address: `}<span className="var">GHST</span>{`,
  abi: erc20Abi,
  functionName: `}<span className="str">"transfer"</span>{`,
  args: [recipient, `}<span className="fn">parseUnits</span>{`(`}<span className="str">"500"</span>{`, `}<span className="num">6</span>{`)],
})

`}<span className="com">// → settled in ~3.2s, fee ≈ $0.000005</span>{`
`}
            </pre>
          </div>
        </div>
      </div>
    </section>);

}

// ─── FAQ ───
const FAQ_ITEMS = [
{ q: "What is GHST?", a: "GHST is a fully-reserved digital Cedi. Each token is backed 1:1 by Ghana Cedis held in segregated reserve accounts, enabling fast, low-cost payments, remittances, and DeFi onchain." },
{ q: "How is GHST reserved?", a: "Reserves are split 50/50 between trust accounts at UMB Ghana and OmniBSIC Bank, and short-dated treasury bills managed by Constant Capital. Reserves are attested monthly by BNA Chartered Accountants." },
{ q: "Which blockchain is GHST on?", a: "GHST is live on Base, an Ethereum L2 by Coinbase. Stellar support is on the roadmap to enable lower-cost cross-border settlement for our remittance partners." },
{ q: "How do I get GHST?", a: "WeWire is the appointed primary broker for GHST. Institutions and businesses mint, redeem, and integrate directly through WeWire. Retail users can acquire GHST via authorised ecosystem partners, exchanges, or peer-to-peer transfers." },
{ q: "What are the fees?", a: "GHST itself has no protocol fee. Transactions on Base cost approximately $0.000005 in gas, with settlement in 3–5 seconds. Issuance and redemption fees vary by partner." }];


function FAQ() {
  const [open, setOpen] = useState3(0);
  return (
    <section className="section section-tight" id="faq">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <div className="eyebrow-label">FAQ</div>
          <h2 className="display display-md" style={{ marginTop: 14 }}>
            Common <em>questions.</em>
          </h2>
        </div>
        <div className="faq-wrap">
          {FAQ_ITEMS.map((f, i) =>
          <div className={`faq-item ${open === i ? 'open' : ''}`} key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <span className="faq-toggle" aria-hidden><Plus size={14} /></span>
              </button>
              <div className="faq-a">{f.a}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─── CTA ───
function CTA() {
  const stats = useOnchainStats();
  const bars = stats?.monthlyMintBars;
  const volumeText = stats?.monthlyMintVolume != null
    ? fmtMintVolume(stats.monthlyMintVolume)
    : (stats?.mintVolumeLive === false ? "—" : "…");
  const barItems = bars || Array.from({ length: 12 }, () => null);
  const firstLabel = bars?.[0]?.label || "Jan";
  const lastLabel = bars?.[bars.length - 1]?.label || "Dec";

  return (
    <section className="container" id="get">
      <div className="cta">
        <div className="cta-inner">
          <div>
            <div className="eyebrow-label">Get started</div>
            <h2 className="display display-lg" style={{ marginTop: 16 }}>
              Build on the <em>Cedi</em>.
            </h2>
            <p>
              For institutions: mint and redeem at scale. For developers: drop GHST into any ERC-20 toolkit. For everyone else: send Cedis anywhere, 24/7.
            </p>
            <div className="cta-actions">
              <a href="https://www.wewire.com" target="_blank" rel="noreferrer" className="btn btn-cream">Get GHST <ArrowRight /></a>
            </div>
          </div>
          <div className="cta-aside">
            <div className="cta-aside-label">Monthly mint volume</div>
            <div className="cta-aside-value">
              <span className="sym">₵</span>{volumeText}
            </div>
            <div className="cta-aside-bars">
              {barItems.map((bar, i) =>
                <i
                  key={i}
                  className={bar?.active ? "active" : ""}
                  style={bar ? { height: `${Math.round(bar.height * 100)}%` } : undefined}
                  title={bar ? `${bar.label}: ₵${Math.round(bar.volume).toLocaleString()}` : undefined}
                />
              )}
            </div>
            <div style={{ marginTop: 14, fontSize: 12, color: "rgba(255,255,255,0.5)", display: "flex", justifyContent: "space-between" }}>
              <span>{firstLabel}</span><span>{lastLabel}</span>
            </div>
            {stats?.mintVolumeLive &&
              <div style={{ marginTop: 10, fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
                {stats.mintVolumeSource === "basescan" ? "Live from" : "Mint events on"}{" "}
                <a
                  href={`https://basescan.org/token/${GHST_CONTRACT}#events`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "rgba(199,187,255,0.9)" }}>
                  Basescan
                </a>
              </div>
            }
          </div>
        </div>
      </div>
    </section>);

}

// ─── FOOTER ───
function Footer() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const onSubpage = /About\.html|Contact\.html/i.test(path);
  const home = onSubpage ? "GHST%20Landing.html" : "";
  const h = (frag) => onSubpage ? `${home}${frag}` : frag;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href={home || "#"} className="nav-logo">
              <span className="nav-logo-mark" aria-hidden />
              <span>GHST</span>
            </a>
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
            <a href="About.html">About</a>
            <a href="Contact.html">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Partners</h4>
            <a href="https://www.wewire.com" target="_blank" rel="noreferrer">WeWire (Broker)</a>
            <a href="https://docs.wewire.com" target="_blank" rel="noreferrer">Developer Docs</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Cede Stable Ltd. All rights reserved.</span>
          <span>Brokered by WeWire · Attested by BNA Chartered Accountants</span>
        </div>
      </div>
    </footer>);

}

// ─── TWEAKS PANEL ───
function Tweaks({ tweaks, onChange }) {
  const [visible, setVisible] = useState3(false);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setVisible(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  if (!visible) return null;

  const set = (key, val) => {
    onChange({ ...tweaks, [key]: val });
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
  };

  const row = (label, key, opts) =>
  <div className="tweaks-row">
      <label>{label}</label>
      <div className="tweaks-opts">
        {opts.map((o) =>
      <button
        key={o.v}
        className={tweaks[key] === o.v ? 'active' : ''}
        onClick={() => set(key, o.v)}>
        {o.l}</button>
      )}
      </div>
    </div>;


  return (
    <div className="tweaks-panel">
      <h5>Tweaks</h5>
      {row('Density', 'density', [
      { v: 'compact', l: 'Compact' },
      { v: 'balanced', l: 'Balanced' },
      { v: 'airy', l: 'Airy' }]
      )}
    </div>);

}

Object.assign(window, { Developers, FAQ, CTA, Footer, Tweaks });