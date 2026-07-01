import { ArrowRight, Check } from "@/components/icons";

const FEATURES = [
  "ERC-20 standard · ethers / viem compatible",
  "Mint & redeem GHST 1:1 through WeWire",
  "REST API and webhooks via WeWire",
  "Sandbox environment for testing",
];

export function Developers() {
  return (
    <section className="section" id="developers">
      <div className="container">
        <div className="dev-grid">
          <div>
            <div className="eyebrow-label">For institutions &amp; developers</div>
            <h2 className="display display-md" style={{ marginTop: 14 }}>
              An ERC-20 you can <em>build on.</em>
            </h2>
            <p className="lede" style={{ marginTop: 18, maxWidth: 480 }}>
              GHST is a standard ERC-20 on Base, read and transfer it from any wallet, SDK, or
              smart-contract toolkit. <strong>All minting, redemption, and institutional
              integration is brokered through WeWire</strong>, the appointed primary broker
              for GHST.
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "32px 0 0",
                display: "grid",
                gap: 12,
              }}
            >
              {FEATURES.map((x, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    fontSize: 14,
                    color: "var(--ink-2)",
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 999,
                      background: "var(--purple-soft)",
                      color: "var(--purple)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Check size={11} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="https://docs.wewire.com" target="_blank" rel="noreferrer" className="btn btn-ink btn-sm">
                Integrate via WeWire <ArrowRight size={14} />
              </a>
              <a href="https://www.wewire.com/contact" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                Talk to broker
              </a>
            </div>
          </div>

          <div className="code-window">
            <div className="code-head">
              <div className="code-dots">
                <i />
                <i />
                <i />
              </div>
              <div className="code-tab">transfer.ts</div>
            </div>
            <pre className="code-body" style={{ margin: 0 }}>
              <span className="com">// Send GHST on Base, ERC-20 standard</span>
              {"\n"}
              <span className="kw">import</span>
              {" { createWalletClient, http } "}
              <span className="kw">from</span>
              {" "}
              <span className="str">&quot;viem&quot;</span>
              {"\n"}
              <span className="kw">import</span>
              {" { base } "}
              <span className="kw">from</span>
              {" "}
              <span className="str">&quot;viem/chains&quot;</span>
              {"\n\n"}
              <span className="kw">const</span>
              {" "}
              <span className="var">GHST</span>
              {" = "}
              <span className="str">&quot;0x2094…513fbb&quot;</span>
              {"\n\n"}
              <span className="kw">await</span>
              {" "}
              <span className="var">client</span>
              {"."}
              <span className="fn">writeContract</span>
              {"({\n  address: "}
              <span className="var">GHST</span>
              {",\n  abi: erc20Abi,\n  functionName: "}
              <span className="str">&quot;transfer&quot;</span>
              {",\n  args: [recipient, "}
              <span className="fn">parseUnits</span>
              {"("}
              <span className="str">&quot;500&quot;</span>
              {", "}
              <span className="num">6</span>
              {")],\n})\n\n"}
              <span className="com">// → settled in ~3.2s, fee ≈ $0.000005</span>
              {"\n"}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
