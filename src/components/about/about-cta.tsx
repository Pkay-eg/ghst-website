import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export function AboutCTA() {
  return (
    <section className="container">
      <div className="cta">
        <div className="cta-inner">
          <div>
            <div className="eyebrow-label">Work with us</div>
            <h2 className="display display-lg" style={{ marginTop: 16 }}>
              Help build the
              <br />
              <em>Cedi onchain.</em>
            </h2>
            <p>
              We&apos;re hiring across engineering, operations, and compliance. If you want to
              help build digital financial infrastructure for Ghana and West Africa, get in
              touch.
            </p>
            <div className="cta-actions">
              <Link href="/contact" className="btn btn-cream">
                Contact the team <ArrowRight />
              </Link>
            </div>
          </div>
          <div className="cta-aside">
            <div className="cta-aside-label">Headquartered in</div>
            <div className="cta-aside-value" style={{ fontSize: 28 }}>
              Accra, Ghana
            </div>
            <div
              style={{
                marginTop: 20,
                fontSize: 13,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.55,
              }}
            >
              Cede Stable Ltd is registered in Ghana.
              <br />
              Wholly Ghanaian-owned.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
