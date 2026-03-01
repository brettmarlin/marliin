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

const SOLUTIONS = [
  {
    title: "Industry Consolidation",
    headline: "Turn acquisitions into efficient operations — faster.",
    blurb: "Rolling up family-owned businesses? We baseline each acquisition's workflows within 2 weeks, then build the dashboards and automations that let you scale without bloating overhead. From metal fab to HVAC to dental — if you're consolidating, we make your ops predictable and profitable.",
    cta: "Explore Roll-Ups Services →",
    link: "/roll-ups",
    active: true,
  },
  {
    title: "Startup Team Extension",
    headline: "Before you hire a huge team, see what we can do first.",
    blurb: "One experienced operator + a team of specialized AI agents (product design, engineering, growth) working together to get you to product-market fit. We move fast, make smart decisions, and ship real product — while you focus on customers and fundraising. When you're ready to scale, you'll know exactly what roles to hire.",
    cta: "Coming Soon",
    link: null,
    active: false,
  },
  {
    title: "Supply Chain Compliance",
    headline: "Stop spending months chasing supplier paperwork.",
    blurb: "UFLPA compliance means proving your supply chain is free of forced labor, with documentation from every tier. That's dozens of suppliers, hundreds of documents, and months of back-and-forth emails... unless you automate it. We've helped build AI-powered supply chain mapping at Altana and Sayari. Now we're helping customers automate their internal workflows to make the most of those platforms and remove the pain from document collection.",
    cta: "Coming Soon",
    link: null,
    active: false,
  },
];

export default function Solutions() {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

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
        .mw { max-width:1200px;margin:0 auto }
        .mn { max-width:800px;margin:0 auto }
        .g3 { display:grid;grid-template-columns:repeat(3,1fr);gap:28px }
        @media(max-width:768px) { .g3{grid-template-columns:1fr} .dm{display:none!important} .sc{padding:56px 20px} .mob-btn{display:block!important} }
        .cd { padding:36px;border:1px solid #1A171410;transition:all .4s ease;position:relative;overflow:hidden;background:#FAF7F2;display:flex;flex-direction:column }
        .cd::before { content:'';position:absolute;top:0;left:0;width:100%;height:3px;background:${A};transform:scaleX(0);transform-origin:left;transition:transform .4s ease }
        .cd:hover::before { transform:scaleX(1) }
        .cd:hover { border-color:#1A171420 }
        .nl { font-size:.8rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:#1A171490;cursor:pointer;border:none;background:none;transition:color .2s;padding:0;text-decoration:none }
        .nl:hover { color:${A} }
        .mm { display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:200;background:#FAF7F2;flex-direction:column;align-items:center;justify-content:center;gap:32px }
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav className="nf">
        <div className="mw" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px clamp(24px,5vw,80px)" }}>
          <div style={{ cursor: "pointer", zIndex: 201 }}><Logo /></div>
          <div className="dm" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <Link className="nl" to="/solutions" style={{ color: A }}>Solutions</Link>
            <Link className="nl" to="/#practice">Practice</Link>
            <Link className="nl" to="/#lab">Lab</Link>
            <Link className="nl" to="/#about">About</Link>
            <a className="nl" href={CAL} target="_blank" rel="noopener" style={{ color: A }}>Book a Call →</a>
          </div>
          <button className="mob-btn" onClick={() => setMob(!mob)} style={{ display: "none", zIndex: 201, background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "#1A1714" }}>
            {mob ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {mob && (
        <div className="mm" style={{ display: "flex" }}>
          <Link className="nl" style={{ fontSize: "1.1rem" }} to="/solutions" onClick={() => setMob(false)}>Solutions</Link>
          <Link className="nl" style={{ fontSize: "1.1rem" }} to="/#practice" onClick={() => setMob(false)}>Practice</Link>
          <Link className="nl" style={{ fontSize: "1.1rem" }} to="/#lab" onClick={() => setMob(false)}>Lab</Link>
          <Link className="nl" style={{ fontSize: "1.1rem" }} to="/#about" onClick={() => setMob(false)}>About</Link>
          <a className="bp" href={CAL} target="_blank" rel="noopener">Book a Call</a>
        </div>
      )}

      {/* ═══ HERO ═══ */}
      <section className="sc" style={{ minHeight: "50vh", display: "flex", alignItems: "center", paddingTop: 140 }}>
        <div className="mw" style={{ width: "100%" }}>
          <R>
            <p className="bs" style={{ marginBottom: 24 }}>Solutions</p>
          </R>
          <R delay={0.1}>
            <h1 className="hx" style={{ marginBottom: 32 }}>
              <span style={{ display: "block" }}>Where AI meets</span>
              <span style={{ display: "block", color: A }}>real operations.</span>
            </h1>
          </R>
          <R delay={0.2}>
            <p className="bl" style={{ maxWidth: 640, marginBottom: 32 }}>
              We've built products, led teams, and shipped AI systems at companies like Altana, Carta, and Mixpanel. Now we bring that same discipline to specific, high-impact use cases where AI creates measurable value.
            </p>
          </R>
        </div>
      </section>

      {/* ═══ SOLUTIONS CARDS ═══ */}
      <section className="sc" style={{ paddingTop: 0 }}>
        <div className="mw">
          <R><div className="dv" style={{ marginBottom: 56 }} /></R>
          <div className="g3">
            {SOLUTIONS.map((s, i) => (
              <R key={i} delay={i * 0.1}>
                <div className="cd">
                  <p className="bs" style={{ marginBottom: 20 }}>{s.title}</p>
                  <h3 className="hm" style={{ marginBottom: 16 }}>{s.headline}</h3>
                  <p className="bl" style={{ marginBottom: 28, fontSize: ".94rem", flex: 1 }}>{s.blurb}</p>
                  {s.active ? (
                    <Link 
                      to={s.link} 
                      style={{ 
                        fontSize: ".85rem", 
                        fontWeight: 500, 
                        color: A, 
                        textDecoration: "none",
                        marginTop: "auto"
                      }}
                    >
                      {s.cta}
                    </Link>
                  ) : (
                    <span 
                      style={{ 
                        fontSize: ".85rem", 
                        fontWeight: 500, 
                        color: "#1A171450",
                        marginTop: "auto"
                      }}
                    >
                      {s.cta}
                    </span>
                  )}
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="sc" style={{ minHeight: "50vh", display: "flex", alignItems: "center" }}>
        <div className="mn" style={{ textAlign: "center", width: "100%" }}>
          <R><p className="bs" style={{ marginBottom: 32 }}>Get started</p></R>
          <R delay={0.1}><h2 className="hl" style={{ marginBottom: 24 }}>Have a specific challenge<br /><span className="ac">in mind?</span></h2></R>
          <R delay={0.2}><p className="bl" style={{ maxWidth: 520, margin: "0 auto 40px" }}>Let's talk about where AI can create real value in your operations. Book a call and we'll figure out the right approach together.</p></R>
          <R delay={0.3}><a className="bp" href={CAL} target="_blank" rel="noopener">Book a Strategy Call →</a></R>
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

export { SOLUTIONS };
