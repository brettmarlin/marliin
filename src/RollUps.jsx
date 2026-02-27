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

/* ═══ CONSTANTS ═══ */
const A = "#B8652A"; // Marliin copper accent
const CAL = "https://calendar.app.google/ZBtcWj5AGEhxoN197";

/* ═══ DATA ═══ */
const PROBLEMS = [
  {
    icon: "⚠️",
    color: "#E53E3E",
    title: "Process Chaos",
    desc: "Every acquired company runs differently. Five locations, five ways of doing the same thing. No visibility into what's actually happening on the ground."
  },
  {
    icon: "📊",
    color: "#DD6B20",
    title: "Manual Reporting",
    desc: "Spreadsheets emailed weekly. Data that's already stale by the time you see it. No real-time pulse on the business you just bought."
  },
  {
    icon: "💸",
    color: "#D69E2E",
    title: "Hidden Margin Leakage",
    desc: "Inefficiencies compound across locations. Small process gaps become big P&L problems. You know synergies exist—you just can't find them."
  },
  {
    icon: "⏳",
    color: "#805AD5",
    title: "Integration Drag",
    desc: "Every integration takes longer than planned. Key employees burn out on manual work. The thesis that justified the deal starts slipping."
  }
];

const SOLUTIONS = [
  {
    icon: "📋",
    title: "Process Audit",
    desc: "Deep-dive into how each location actually operates. Document the gaps, find the patterns."
  },
  {
    icon: "⚙️",
    title: "Workflow Automation",
    desc: "Build automations that eliminate manual work. Connect systems, reduce errors, free up your team."
  },
  {
    icon: "📈",
    title: "Real-Time Dashboards",
    desc: "Live visibility across all locations. Track the metrics that matter, catch problems early."
  },
  {
    icon: "🎯",
    title: "Measured Outcomes",
    desc: "We track the results. Hours saved, errors reduced, margins improved. Real ROI, not promises."
  }
];

const PHASES = [
  {
    num: "01",
    title: "Audit",
    desc: "We embed with your teams to document how work actually gets done. Map processes, identify bottlenecks, quantify the opportunity.",
    items: ["Process documentation", "Gap analysis", "ROI roadmap"]
  },
  {
    num: "02",
    title: "Build",
    desc: "We design and deploy automations that eliminate manual work. Connect your systems, standardize workflows, build your operational backbone.",
    items: ["Custom automations", "System integrations", "Dashboard setup"]
  },
  {
    num: "03",
    title: "Optimize",
    desc: "We monitor, measure, and continuously improve. Track outcomes, identify new opportunities, compound your operational gains.",
    items: ["Performance tracking", "Ongoing improvements", "Scale playbook"]
  }
];

const PRICING = [
  {
    name: "Discovery",
    subtitle: "Process audit & roadmap",
    price: "$15-25k",
    term: "one-time",
    items: ["2-3 week engagement", "Full process documentation", "Gap & opportunity analysis", "Prioritized automation roadmap", "ROI projections"],
    featured: false
  },
  {
    name: "Implementation",
    subtitle: "Build & deploy automations",
    price: "$50-150k",
    term: "project",
    items: ["2-4 month engagement", "Custom workflow automations", "System integrations", "Real-time dashboards", "Team training & handoff"],
    featured: true
  },
  {
    name: "Ongoing",
    subtitle: "Continuous optimization",
    price: "$5-15k",
    term: "/month",
    items: ["Monthly retainer", "Performance monitoring", "Iteration & improvements", "New automation builds", "Priority support"],
    featured: false
  }
];

/* ═══ MAIN ═══ */
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
        .g2 { display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,6vw,80px) }
        .g3 { display:grid;grid-template-columns:repeat(3,1fr);gap:28px }
        .g4 { display:grid;grid-template-columns:repeat(4,1fr);gap:24px }
        @media(max-width:900px) { .g4{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:768px) { .g2,.g3,.g4{grid-template-columns:1fr} .dm{display:none!important} .sc{padding:56px 20px} .mob-btn{display:block!important} }
        .cd { padding:36px;border:1px solid #1A171410;transition:all .4s ease;position:relative;overflow:hidden;background:#FAF7F2 }
        .cd::before { content:'';position:absolute;top:0;left:0;width:100%;height:3px;background:${A};transform:scaleX(0);transform-origin:left;transition:transform .4s ease }
        .cd:hover::before { transform:scaleX(1) }
        .cd:hover { border-color:#1A171420 }
        .nl { font-size:.8rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:#1A171490;cursor:pointer;border:none;background:none;transition:color .2s;padding:0 }
        .nl:hover { color:${A} }
        .eg { padding:44px;position:relative;background:#FAF7F408;border:1px solid #FAF7F418 }
        .pt { padding:36px;border:1px solid #1A171415;transition:all .3s ease;background:#FAF7F2 }
        .pt:hover { border-color:${A}40 }
        .pt.featured { border-color:${A};background:linear-gradient(135deg, ${A}08 0%, ${A}02 100%) }
        .mm { display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:200;background:#FAF7F2;flex-direction:column;align-items:center;justify-content:center;gap:32px }
        .icon-box { width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:20px }
        .phase-card { padding:40px;background:#FAF7F408;border:1px solid #FAF7F415 }
        .check-item { display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:.9rem;color:#FAF7F2B0 }
        .check-item::before { content:'→';color:${A};font-size:.85rem }
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav className="nf">
        <div className="mw" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px clamp(24px,5vw,80px)" }}>
          <div style={{ cursor: "pointer", zIndex: 201 }}><Logo /></div>
          <div className="dm" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <button className="nl" onClick={() => go("problem")}>The Problem</button>
            <button className="nl" onClick={() => go("solution")}>Solution</button>
            <button className="nl" onClick={() => go("how-it-works")}>How It Works</button>
            <button className="nl" onClick={() => go("pricing")}>Pricing</button>
            <a className="nl" href={CAL} target="_blank" rel="noopener" style={{ color: A }}>Book a Call →</a>
          </div>
          <button className="mob-btn" onClick={() => setMob(!mob)} style={{ display: "none", zIndex: 201, background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "#1A1714" }}>
            {mob ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {mob && (
        <div className="mm" style={{ display: "flex" }}>
          <button className="nl" style={{ fontSize: "1.1rem" }} onClick={() => go("problem")}>The Problem</button>
          <button className="nl" style={{ fontSize: "1.1rem" }} onClick={() => go("solution")}>Solution</button>
          <button className="nl" style={{ fontSize: "1.1rem" }} onClick={() => go("how-it-works")}>How It Works</button>
          <button className="nl" style={{ fontSize: "1.1rem" }} onClick={() => go("pricing")}>Pricing</button>
          <a className="bp" href={CAL} target="_blank" rel="noopener">Book a Call</a>
        </div>
      )}

      {/* ═══ HERO ═══ */}
      <section className="sc" style={{ minHeight: "85vh", display: "flex", alignItems: "center", paddingTop: 120 }}>
        <div className="mw" style={{ width: "100%" }}>
          <R><p className="bs" style={{ marginBottom: 24 }}>Roll-Up Automation Services</p></R>
          <R delay={0.1}>
            <h1 className="hx" style={{ marginBottom: 32 }}>
              Turn Acquisitions Into<br />
              <span className="ac">Operating Leverage</span>
            </h1>
          </R>
          <R delay={0.25}>
            <p className="bl" style={{ maxWidth: 640, marginBottom: 48 }}>
              AI-powered process audit, workflow automation, and real-time dashboards for roll-up operators and PE firms consolidating fragmented industries.
            </p>
          </R>
          <R delay={0.4}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a className="bp" href={CAL} target="_blank" rel="noopener">Book Intro Call</a>
              <button className="bo" onClick={() => go("how-it-works")}>See How It Works</button>
            </div>
          </R>
        </div>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <section id="problem" className="sc sw">
        <div className="mw">
          <R><div className="dv" style={{ marginBottom: 48 }} /></R>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <R><p className="bs" style={{ marginBottom: 16 }}>The Post-Acquisition Reality</p></R>
            <R delay={0.1}><h2 className="hl">You closed the deal.<br /><span className="ac">Now comes the hard part.</span></h2></R>
          </div>
          <div className="g4">
            {PROBLEMS.map((p, i) => (
              <R key={i} delay={i * 0.1}>
                <div className="cd">
                  <div className="icon-box" style={{ background: `${p.color}15` }}>
                    <span>{p.icon}</span>
                  </div>
                  <h3 className="hm" style={{ marginBottom: 12, fontSize: "1.25rem" }}>{p.title}</h3>
                  <p className="bl" style={{ fontSize: ".94rem" }}>{p.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE SOLUTION ═══ */}
      <section id="solution" className="sc">
        <div className="mw">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <R><p className="bs" style={{ marginBottom: 16 }}>The Solution</p></R>
            <R delay={0.1}><h2 className="hl">AI-Powered Integration,<br /><span className="ac">Measured Results</span></h2></R>
            <R delay={0.2}><p className="bl" style={{ maxWidth: 640, margin: "24px auto 0" }}>
              We map your processes, automate the repetitive work, and give you dashboards that show exactly what's happening—and what's improving.
            </p></R>
          </div>
          <div className="g4">
            {SOLUTIONS.map((s, i) => (
              <R key={i} delay={i * 0.1}>
                <div style={{ textAlign: "center", padding: "24px" }}>
                  <div className="icon-box" style={{ background: `${A}15`, margin: "0 auto 20px" }}>
                    <span>{s.icon}</span>
                  </div>
                  <h3 className="hm" style={{ marginBottom: 12, fontSize: "1.15rem" }}>{s.title}</h3>
                  <p className="bl" style={{ fontSize: ".92rem" }}>{s.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="sc sd">
        <div className="mw">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <R><p className="bs" style={{ marginBottom: 16 }}>How It Works</p></R>
            <R delay={0.1}><h2 className="hl">A structured approach to turning<br />operational chaos into <span className="ac">competitive advantage</span>.</h2></R>
          </div>
          <div className="g3">
            {PHASES.map((phase, i) => (
              <R key={i} delay={i * 0.15}>
                <div className="phase-card">
                  <div className="sf" style={{ fontSize: "3rem", fontWeight: 300, color: "#FAF7F215", lineHeight: 1, marginBottom: 16 }}>{phase.num}</div>
                  <h3 className="hm" style={{ marginBottom: 16 }}>{phase.title}</h3>
                  <p className="bl" style={{ fontSize: ".94rem", marginBottom: 24 }}>{phase.desc}</p>
                  {phase.items.map((item, j) => (
                    <div key={j} className="check-item">{item}</div>
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
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <R><p className="bs" style={{ marginBottom: 16 }}>Pricing</p></R>
            <R delay={0.1}><h2 className="hl">Structured engagements.<br /><span className="ac">Clear deliverables.</span></h2></R>
            <R delay={0.2}><p className="bl" style={{ maxWidth: 640, margin: "24px auto 0" }}>
              Outcome-based options available. We only win when you do.
            </p></R>
          </div>
          <div className="g3">
            {PRICING.map((tier, i) => (
              <R key={i} delay={i * 0.1}>
                <div className={`pt ${tier.featured ? 'featured' : ''}`}>
                  {tier.featured && (
                    <div style={{ marginBottom: 20 }}>
                      <span style={{ background: "#1A1714", color: "#FAF7F2", fontSize: ".7rem", fontWeight: 600, padding: "6px 12px", letterSpacing: ".06em", textTransform: "uppercase" }}>Most Popular</span>
                    </div>
                  )}
                  <p className="bs" style={{ marginBottom: 8, textTransform: "none", letterSpacing: ".02em" }}>{tier.subtitle}</p>
                  <h3 className="hm" style={{ marginBottom: 8 }}>{tier.name}</h3>
                  <div style={{ marginBottom: 24 }}>
                    <span className="sf" style={{ fontSize: "2rem", fontWeight: 500 }}>{tier.price}</span>
                    <span style={{ fontSize: ".85rem", color: "#1A171470", marginLeft: 8 }}>{tier.term}</span>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    {tier.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                        <span style={{ color: A, fontSize: ".85rem", marginTop: 2 }}>✓</span>
                        <span className="bl" style={{ fontSize: ".9rem" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <a 
                    href={`mailto:brett@marliin.com?subject=Roll-Up%20${tier.name}%20Inquiry`} 
                    className={tier.featured ? "bp" : "bo"} 
                    style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
                  >
                    Get Started
                  </a>
                </div>
              </R>
            ))}
          </div>
          <R delay={0.4}>
            <div style={{ marginTop: 48, padding: "32px 40px", background: `${A}08`, borderLeft: `3px solid ${A}` }}>
              <h3 className="hm" style={{ marginBottom: 12 }}>Outcome-Based Pricing Available</h3>
              <p className="bl" style={{ margin: 0 }}>
                For the right engagements, we'll tie our fees to measurable results—hours saved, costs reduced, revenue gained. We succeed when you succeed.
              </p>
            </div>
          </R>
        </div>
      </section>

      {/* ═══ CASE STUDIES ═══ */}
      <section className="sc sw">
        <div className="mn" style={{ textAlign: "center" }}>
          <R><p className="bs" style={{ marginBottom: 16 }}>Case Studies</p></R>
          <R delay={0.1}><h2 className="hl" style={{ marginBottom: 24 }}>Real results from<br /><span className="ac">real consolidators</span>.</h2></R>
          <R delay={0.2}>
            <div style={{ padding: "64px 40px", border: "1px dashed #1A171420", background: "#FAF7F2" }}>
              <p className="bl" style={{ margin: 0 }}>
                Case study coming soon. We're documenting results from our first engagements.
              </p>
            </div>
          </R>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="sc sd" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div className="mn" style={{ textAlign: "center", width: "100%" }}>
          <R><p className="bs" style={{ marginBottom: 24 }}>Ready to start?</p></R>
          <R delay={0.1}><h2 className="hx" style={{ marginBottom: 24 }}>Turn Your Roll-Up Into<br /><span className="ac">an Operating Machine</span></h2></R>
          <R delay={0.2}><p className="bl" style={{ maxWidth: 520, margin: "0 auto 48px" }}>
            Let's talk about your portfolio and where automation can create the most value.
          </p></R>
          <R delay={0.3}><a className="bp" href={CAL} target="_blank" rel="noopener" style={{ fontSize: "1rem", padding: "20px 48px" }}>Book Intro Call →</a></R>
          <R delay={0.4}><p style={{ marginTop: 24, fontSize: ".85rem", color: "#FAF7F260" }}>Usually respond within 24 hours</p></R>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: "40px clamp(24px,5vw,80px)", borderTop: "1px solid #1A171412" }}>
        <div className="mw" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <Logo />
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="https://www.linkedin.com/in/brettmarlin/" target="_blank" rel="noopener" style={{ fontSize: ".8rem", color: "#1A171470", textDecoration: "none", letterSpacing: ".04em" }}>LinkedIn ↗</a>
            <a href="https://substack.com/@brettmarlin" target="_blank" rel="noopener" style={{ fontSize: ".8rem", color: "#1A171470", textDecoration: "none", letterSpacing: ".04em" }}>Substack ↗</a>
            <span style={{ fontSize: ".8rem", color: "#1A171450" }}>© 2026 Marliin</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
