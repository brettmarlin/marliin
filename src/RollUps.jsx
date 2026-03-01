import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ═══ HOOKS ═══ */
function useInView(opts = {}) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          o.unobserve(el);
        }
      },
      { threshold: 0.12, ...opts }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

/* ═══ COMPONENTS ═══ */
function R({ children, delay = 0, className = "" }) {
  const [ref, v] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(36px)",
        transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}s, transform .9s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Logo() {
  return (
    <Link to="/">
      <img
        src="/images/marliin-logo.png"
        alt="Marliin"
        width={83}
        height={20}
        style={{ display: "block", height: 20, width: "auto" }}
      />
    </Link>
  );
}

const A = "#B8652A";
const CAL = "https://calendar.app.google/ZBtcWj5AGEhxoN197";

const PROBLEMS = [
  {
    icon: "⚠️",
    title: "Process Chaos",
    desc: "Every acquired company runs differently. Five locations, five ways of doing the same thing. No visibility into what's actually happening on the ground.",
    bg: "#FEE2E2"
  },
  {
    icon: "📊",
    title: "Manual Reporting",
    desc: "Spreadsheets emailed weekly. Data that's already stale by the time you see it. No real-time pulse on the business you just bought.",
    bg: "#FED7AA"
  },
  {
    icon: "💸",
    title: "Hidden Margin Leakage",
    desc: "Inefficiencies compound across locations. Small process gaps become big P&L problems. You know synergies exist — you just can't find them.",
    bg: "#FEF08A"
  },
  {
    icon: "🐌",
    title: "Integration Drag",
    desc: "Every integration takes longer than planned. Key employees burn out on manual work. The thesis that justified the deal starts slipping.",
    bg: "#E9D5FF"
  },
];

const SOLUTIONS = [
  {
    icon: "📋",
    title: "Process Audit",
    desc: "Deep-dive into how each location actually operates. Document the gaps, find the patterns.",
    bg: "#DBEAFE"
  },
  {
    icon: "⚙️",
    title: "Workflow Automation",
    desc: "Build automations that eliminate manual work. Connect systems, reduce errors, free up your team.",
    bg: "#D1FAE5"
  },
  {
    icon: "📈",
    title: "Real-Time Dashboards",
    desc: "Live visibility across all locations. Track the metrics that matter, catch problems early.",
    bg: "#E9D5FF"
  },
  {
    icon: "🎯",
    title: "Measured Outcomes",
    desc: "We track the results. Hours saved, errors reduced, margins improved. Real ROI, not promises.",
    bg: "#FED7AA"
  },
];

const STEPS = [
  {
    num: "1",
    title: "Audit",
    desc: "We embed with your teams to document how work actually gets done. Map processes, identify bottlenecks, quantify the opportunity.",
    items: ["Process documentation", "Gap analysis", "ROI roadmap"],
    color: A
  },
  {
    num: "2",
    title: "Build",
    desc: "We design and deploy automations that eliminate manual work. Connect your systems, standardize workflows, build your operational backbone.",
    items: ["Custom automations", "System integrations", "Dashboard setup"],
    color: "#5C7A5E"
  },
  {
    num: "3",
    title: "Optimize",
    desc: "We monitor, measure, and continuously improve. Track outcomes, identify new opportunities, compound your operational gains.",
    items: ["Performance tracking", "Ongoing improvements", "Scale playbook"],
    color: "#7C3AED"
  },
];

const PRICING = [
  {
    title: "Discovery",
    subtitle: "Process audit & roadmap",
    price: "$15-25k",
    period: "one-time",
    items: [
      "2-3 week engagement",
      "Full process documentation",
      "Gap & opportunity analysis",
      "Prioritized automation roadmap",
      "ROI projections"
    ],
    featured: false
  },
  {
    title: "Implementation",
    subtitle: "Build & deploy automations",
    price: "$50-150k",
    period: "project",
    items: [
      "2-4 month engagement",
      "Custom workflow automations",
      "System integrations",
      "Real-time dashboards",
      "Team training & handoff"
    ],
    featured: true
  },
  {
    title: "Ongoing",
    subtitle: "Continuous optimization",
    price: "$5-15k",
    period: "/month",
    items: [
      "Monthly retainer",
      "Performance monitoring",
      "Iteration & improvements",
      "New automation builds",
      "Priority support"
    ],
    featured: false
  },
];

export default function RollUps() {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMob(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", color: "#1A1714", background: "#FAF7F2" }}>
      <style>{`
        .nf { position:fixed;top:0;left:0;right:0;z-index:100;transition:all .4s cubic-bezier(.16,1,.3,1);backdrop-filter:${scrolled ? "blur(20px)" : "none"};background:${scrolled ? "#FAF7F2E8" : "transparent"};border-bottom:${scrolled ? "1px solid #1A171410" : "1px solid transparent"} }
        .sf { font-family:'Cormorant Garamond',Georgia,serif }
        .si { font-family:'Cormorant Garamond',Georgia,serif;font-style:italic }
        .hx { font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.8rem,7vw,5.5rem);font-weight:300;line-height:1.05;letter-spacing:-0.02em }
        .hl { font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2rem,4vw,3.5rem);font-weight:400;line-height:1.15;letter-spacing:-0.01em }
        .hm { font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.4rem,2.5vw,1.9rem);font-weight:500;line-height:1.2 }
        .hs { font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.2rem,2vw,1.5rem);font-weight:500;line-height:1.3 }
        .bl { font-size:clamp(1rem,1.2vw,1.12rem);line-height:1.72;color:#1A1714A0;font-weight:300 }
        .bs { font-size:.82rem;line-height:1.6;color:#1A171480;font-weight:400;letter-spacing:.04em;text-transform:uppercase }
        .ac { color:${A} }
        .bp { display:inline-flex;align-items:center;gap:8px;padding:16px 36px;background:${A};color:#FAF7F2;font-size:.88rem;font-weight:500;letter-spacing:.04em;text-transform:uppercase;border:none;cursor:pointer;transition:all .3s ease;text-decoration:none }
        .bp:hover { opacity:.88;transform:translateY(-1px) }
        .bo { display:inline-flex;align-items:center;gap:8px;padding:14px 34px;background:transparent;color:#1A1714;font-size:.88rem;font-weight:500;letter-spacing:.04em;text-transform:uppercase;border:1.5px solid #1A171428;cursor:pointer;transition:all .3s ease;text-decoration:none }
        .bo:hover { border-color:${A};color:${A} }
        .dv { width:56px;height:1px;background:${A} }
        .sc { padding:clamp(80px,12vw,160px) clamp(24px,5vw,80px) }
        .sd { background:#1A1714;color:#FAF7F2 }
        .sd .bl { color:#FAF7F2B0 }
        .sd .bs { color:#FAF7F290 }
        .sw { background:#F4F0EA }
        .mw { max-width:1200px;margin:0 auto }
        .mn { max-width:800px;margin:0 auto }
        .g2 { display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,4vw,40px) }
        .g3 { display:grid;grid-template-columns:repeat(3,1fr);gap:28px }
        .g4 { display:grid;grid-template-columns:repeat(4,1fr);gap:24px }
        @media(max-width:968px) { .g4{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:768px) { .g2,.g3,.g4{grid-template-columns:1fr} .dm{display:none!important} .sc{padding:56px 20px} .mob-btn{display:block!important} }
        .cd { padding:36px;border:1px solid #1A171410;transition:all .4s ease;position:relative;overflow:hidden;background:#FAF7F2 }
        .cd::before { content:'';position:absolute;top:0;left:0;width:100%;height:3px;background:${A};transform:scaleX(0);transform-origin:left;transition:transform .4s ease }
        .cd:hover::before { transform:scaleX(1) }
        .cd:hover { border-color:#1A171420 }
        .nl { font-size:.8rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:#1A171490;cursor:pointer;border:none;background:none;transition:color .2s;padding:0;text-decoration:none }
        .nl:hover { color:${A} }
        .mm { display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:200;background:#FAF7F2;flex-direction:column;align-items:center;justify-content:center;gap:32px }
        .pc { padding:36px;border:1px solid #1A171415;transition:all .3s ease;display:flex;flex-direction:column;height:100% }
        .pc:hover { border-color:${A}40 }
        .pc.featured { background:${A};color:#FAF7F2;border-color:${A} }
        .pc.featured .bl { color:#FAF7F2B0 }
        .pc.featured .bs { color:#FAF7F290 }
        .step { padding:40px;background:#1A171408;border:1px solid #FAF7F218;position:relative }
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav className="nf">
        <div className="mw" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px clamp(24px,5vw,80px)" }}>
          <div style={{ cursor: "pointer", zIndex: 201 }}><Logo /></div>
          <div className="dm" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <Link className="nl" to="/solutions">Solutions</Link>
            <button className="nl" onClick={() => go("how-it-works")}>How It Works</button>
            <button className="nl" onClick={() => go("pricing")}>Pricing</button>
            <a className="nl" href={`mailto:brett@marliin.com?subject=Roll-Up%20Automation%20Inquiry`} style={{ color: A }}>Book Intro Call →</a>
          </div>
          <button className="mob-btn" onClick={() => setMob(!mob)} style={{ display: "none", zIndex: 201, background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "#1A1714" }}>
            {mob ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {mob && (
        <div className="mm" style={{ display: "flex" }}>
          <Link className="nl" style={{ fontSize: "1.1rem" }} to="/solutions" onClick={() => setMob(false)}>Solutions</Link>
          <button className="nl" style={{ fontSize: "1.1rem" }} onClick={() => go("how-it-works")}>How It Works</button>
          <button className="nl" style={{ fontSize: "1.1rem" }} onClick={() => go("pricing")}>Pricing</button>
          <a className="bp" href={`mailto:brett@marliin.com?subject=Roll-Up%20Automation%20Inquiry`}>Book Intro Call</a>
        </div>
      )}

      {/* ═══ HERO ═══ */}
      <section className="sc" style={{ minHeight: "80vh", display: "flex", alignItems: "center", paddingTop: 120 }}>
        <div className="mw" style={{ width: "100%" }}>
          <R>
            <p className="bs" style={{ marginBottom: 24 }}>Roll-Up Automation Services</p>
          </R>
          <R delay={0.1}>
            <h1 className="hx" style={{ marginBottom: 32 }}>
              <span style={{ display: "block" }}>Turn Acquisitions Into</span>
              <span style={{ display: "block", color: A }}>Operating Leverage</span>
            </h1>
          </R>
          <R delay={0.2}>
            <p className="bl" style={{ maxWidth: 640, marginBottom: 48 }}>
              AI-powered process audit, workflow automation, and real-time dashboards for roll-up operators and PE firms consolidating fragmented industries.
            </p>
          </R>
          <R delay={0.3}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a className="bp" href={`mailto:brett@marliin.com?subject=Roll-Up%20Automation%20Inquiry`}>Book Intro Call</a>
              <button className="bo" onClick={() => go("how-it-works")}>See How It Works</button>
            </div>
          </R>
        </div>
      </section>

      {/* ═══ PROBLEM ═══ */}
      <section className="sc sw">
        <div className="mw">
          <R>
            <p className="bs" style={{ marginBottom: 16 }}>The Challenge</p>
            <h2 className="hl" style={{ marginBottom: 16 }}>The Post-Acquisition Reality</h2>
            <p className="bl" style={{ maxWidth: 560, marginBottom: 56 }}>
              You closed the deal. Now comes the hard part.
            </p>
          </R>
          <div className="g2">
            {PROBLEMS.map((p, i) => (
              <R key={i} delay={i * 0.08}>
                <div className="cd">
                  <div style={{ width: 48, height: 48, background: p.bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: "1.4rem" }}>
                    {p.icon}
                  </div>
                  <h3 className="hs" style={{ marginBottom: 12 }}>{p.title}</h3>
                  <p className="bl" style={{ fontSize: ".95rem" }}>{p.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOLUTION ═══ */}
      <section className="sc">
        <div className="mw">
          <R>
            <p className="bs" style={{ marginBottom: 16 }}>The Solution</p>
            <h2 className="hl" style={{ marginBottom: 16 }}>AI-Powered Integration,<br /><span className="ac">Measured Results</span></h2>
            <p className="bl" style={{ maxWidth: 640, marginBottom: 56 }}>
              We map your processes, automate the repetitive work, and give you dashboards that show exactly what's happening — and what's improving.
            </p>
          </R>
          <div className="g4">
            {SOLUTIONS.map((s, i) => (
              <R key={i} delay={i * 0.08}>
                <div style={{ textAlign: "center", padding: 24 }}>
                  <div style={{ width: 64, height: 64, background: s.bg, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "1.8rem" }}>
                    {s.icon}
                  </div>
                  <h3 className="hs" style={{ marginBottom: 10 }}>{s.title}</h3>
                  <p className="bl" style={{ fontSize: ".9rem" }}>{s.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="sc sd">
        <div className="mw">
          <R>
            <p className="bs" style={{ marginBottom: 16 }}>Process</p>
            <h2 className="hl" style={{ marginBottom: 16 }}>How It Works</h2>
            <p className="bl" style={{ maxWidth: 640, marginBottom: 56 }}>
              A structured approach to turning operational chaos into competitive advantage.
            </p>
          </R>
          <div className="g3">
            {STEPS.map((step, i) => (
              <R key={i} delay={i * 0.1}>
                <div className="step">
                  <div style={{ width: 48, height: 48, background: step.color, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, fontSize: "1.2rem", fontWeight: 700, color: "#FAF7F2" }}>
                    {step.num}
                  </div>
                  <h3 className="hm" style={{ marginBottom: 16 }}>{step.title}</h3>
                  <p className="bl" style={{ marginBottom: 20, fontSize: ".95rem" }}>{step.desc}</p>
                  {step.items.map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                      <span style={{ color: step.color, fontSize: ".9rem" }}>✓</span>
                      <span className="bl" style={{ fontSize: ".88rem" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="sc">
        <div className="mw">
          <R>
            <p className="bs" style={{ marginBottom: 16 }}>Investment</p>
            <h2 className="hl" style={{ marginBottom: 16 }}>Pricing</h2>
            <p className="bl" style={{ maxWidth: 640, marginBottom: 56 }}>
              Structured engagements with clear deliverables. Outcome-based options available.
            </p>
          </R>
          <div className="g3">
            {PRICING.map((tier, i) => (
              <R key={i} delay={i * 0.1}>
                <div className={`pc ${tier.featured ? 'featured' : ''}`}>
                  {tier.featured && (
                    <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#1A1714", color: "#FAF7F2", fontSize: ".72rem", fontWeight: 600, padding: "4px 12px", borderRadius: 20, letterSpacing: ".04em" }}>
                      MOST POPULAR
                    </div>
                  )}
                  <div style={{ marginBottom: 24 }}>
                    <h3 className="hm" style={{ marginBottom: 4 }}>{tier.title}</h3>
                    <p className="bl" style={{ fontSize: ".88rem" }}>{tier.subtitle}</p>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <span className="sf" style={{ fontSize: "2.2rem", fontWeight: 600 }}>{tier.price}</span>
                    <span className="bl" style={{ fontSize: ".88rem", marginLeft: 8 }}>{tier.period}</span>
                  </div>
                  <div style={{ flex: 1, marginBottom: 24 }}>
                    {tier.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                        <span style={{ color: tier.featured ? "#FAF7F2" : "#5C7A5E", fontSize: ".9rem", marginTop: 2 }}>✓</span>
                        <span className="bl" style={{ fontSize: ".9rem" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={`mailto:brett@marliin.com?subject=Roll-Up%20${tier.title}%20Inquiry`}
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "14px 24px",
                      background: tier.featured ? "#FAF7F2" : "transparent",
                      color: tier.featured ? A : "#1A1714",
                      border: tier.featured ? "none" : "1.5px solid #1A171428",
                      fontSize: ".88rem",
                      fontWeight: 500,
                      textDecoration: "none",
                      transition: "all .3s ease"
                    }}
                  >
                    Get Started
                  </a>
                </div>
              </R>
            ))}
          </div>
          <R delay={0.4}>
            <div style={{ marginTop: 48, padding: "32px 40px", background: "linear-gradient(135deg, #F4F0EA 0%, #FAF7F2 100%)", borderRadius: 8, textAlign: "center" }}>
              <h3 className="hm" style={{ marginBottom: 8 }}>Outcome-Based Pricing Available</h3>
              <p className="bl" style={{ maxWidth: 640, margin: "0 auto" }}>
                For the right engagements, we'll tie our fees to measurable results — hours saved, costs reduced, revenue gained. We only win when you do.
              </p>
            </div>
          </R>
        </div>
      </section>

      {/* ═══ CASE STUDIES PLACEHOLDER ═══ */}
      <section className="sc sw">
        <div className="mn" style={{ textAlign: "center" }}>
          <R>
            <p className="bs" style={{ marginBottom: 16 }}>Proof</p>
            <h2 className="hl" style={{ marginBottom: 16 }}>Case Studies</h2>
            <p className="bl" style={{ marginBottom: 32 }}>Real results from real consolidators.</p>
          </R>
          <R delay={0.1}>
            <div style={{ padding: 48, border: "1px dashed #1A171420", borderRadius: 8, background: "#FAF7F2" }}>
              <div style={{ width: 64, height: 64, background: "#F4F0EA", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "1.6rem" }}>
                📄
              </div>
              <p className="bl">Case study coming soon. We're documenting results from our first engagements.</p>
            </div>
          </R>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="sc sd" style={{ minHeight: "50vh", display: "flex", alignItems: "center" }}>
        <div className="mn" style={{ textAlign: "center", width: "100%" }}>
          <R>
            <h2 className="hx" style={{ marginBottom: 24 }}>
              Ready to Turn Your Roll-Up Into an <span style={{ color: A }}>Operating Machine?</span>
            </h2>
          </R>
          <R delay={0.1}>
            <p className="bl" style={{ maxWidth: 540, margin: "0 auto 40px" }}>
              Let's talk about your portfolio and where automation can create the most value.
            </p>
          </R>
          <R delay={0.2}>
            <a className="bp" href={`mailto:brett@marliin.com?subject=Roll-Up%20Automation%20Inquiry`} style={{ fontSize: "1rem", padding: "20px 48px" }}>
              Book Intro Call
            </a>
          </R>
          <R delay={0.3}>
            <p style={{ marginTop: 24, fontSize: ".85rem", color: "#FAF7F260" }}>Usually respond within 24 hours</p>
          </R>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: "40px clamp(24px,5vw,80px)", borderTop: "1px solid #1A171412" }}>
        <div className="mw" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <Logo />
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="mailto:brett@marliin.com" style={{ fontSize: ".8rem", color: "#1A171470", textDecoration: "none", letterSpacing: ".04em" }}>Contact ↗</a>
            <Link to="/" style={{ fontSize: ".8rem", color: "#1A171470", textDecoration: "none", letterSpacing: ".04em" }}>Marliin.com ↗</Link>
            <span style={{ fontSize: ".8rem", color: "#1A171450" }}>© 2026 Marliin</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
