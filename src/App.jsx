import { useState, useEffect, useRef } from "react";

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
    <img
      src="/images/marliin-wordmark.png"
      alt="Marliin"
      width={83}
      height={20}
      style={{ display: "block", height: 20, width: "auto" }}
    />
  );
}

function PhotoStrip() {
  const images = [
    "/images/sf-bay-sunset.jpg",
    "/images/sf-rooftops.jpg",
    "/images/sf-bay-pano.jpg",
    "/images/sf-golden-gate.jpg",
    "/images/sf-pier.jpg",
    "/images/sf-transamerica.jpg",
  ];
  const doubled = [...images, ...images];
  return (
    <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: 80, height: "100%", background: "linear-gradient(to right, #FAF7F2, transparent)", zIndex: 2 }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: "100%", background: "linear-gradient(to left, #FAF7F2, transparent)", zIndex: 2 }} />
      <div style={{ display: "flex", gap: 12, animation: "sfscroll 60s linear infinite", width: "max-content" }}>
        {doubled.map((src, i) => (
          <img key={i} src={src} alt="San Francisco" loading="lazy" style={{ height: 180, width: "auto", display: "block", opacity: 0.85, filter: "saturate(0.9)" }} />
        ))}
      </div>
    </div>
  );
}

/* ═══ DATA ═══ */
import content from "./data/content.json";

const A = "#B8652A";
const CAL = "https://calendar.app.google/ZBtcWj5AGEhxoN197";

const FALLBACK = {
  creds: [{ name: "Altana AI", role: "Head of Product Design" }, { name: "Carta", role: "Head of Product Design" }, { name: "Mixpanel", role: "Head of Design" }, { name: "Blend", role: "Head of Product Design" }, { name: "AOL", role: "Agency Partner" }],
  cases: [{ title: "Product Strategy Sprint", desc: "A seed-stage founder with a vision and a pitch deck needs to get to a working product and a team plan before their next raise. We align on what to build, prototype it live, and map the path to launch." }, { title: "Agent-Enabled Operations", desc: "A mid-market company wants to understand where AI agents can transform their workflows. We identify the highest-value opportunities, build working proofs of concept, and design the human-in-the-loop roles to sustain them." }, { title: "Team Architecture for AI", desc: "A growing company has hired well but the org chart was designed before agents existed. We redesign team structures, decision flows, and tooling to unlock what a leaner, AI-augmented team can actually deliver." }, { title: "Design System + AI Tooling", desc: "A product team is shipping fast but quality is inconsistent and the design system is fracturing. We rebuild the system with AI-augmented workflows that maintain craft at speed." }],
  labs: [{ title: "MAF Machine", status: "Live", desc: "A training coach for endurance runners doing Maximal Aerobic Function (MAF) training. Integrates with Strava to analyze heart rate zones, track aerobic development, and optimize pacing for marathons and ultra distances.", cap: "Strava API, AI coaching, aerobic analytics", link: "https://maf.marliin.com" }, { title: "Tether", status: "In Development", desc: "A semantic reprogramming platform that uses CBT, ACT, and EMDR methodologies to help people rewire limiting beliefs through the power of their own language. AI meets therapeutic methodology meets behavioral design.", cap: "AI therapeutic methodology, behavioral design", link: null }, { title: "Next Build", status: "Exploring", desc: "Local AI paradigms, OpenClaw, and the frontier of private intelligence infrastructure. Documenting everything as it unfolds.", cap: "Local AI, privacy-first architecture", link: null }],
  logs: [{ date: "Feb 2026", title: "Exploring local AI and OpenClaw", body: "The paradigm of private, local intelligence is accelerating faster than most people realize. Installing, testing, and documenting what this means for companies that need AI but cannot send data to the cloud." }, { date: "Feb 2026", title: "MAF Machine ships to Strava runners", body: "First product in the Lab goes live. An AI training coach for MAF runners, built end-to-end with AI-augmented development. What would have taken a team of four about three weeks took two days. The craft bar did not drop. That is the point." }, { date: "Jan 2026", title: "Launching Marliin: intelligence, added", body: "After 25 years designing products and building teams at companies like Carta, Mixpanel, and Blend, the landscape has shifted enough that one designer with the right agents can deliver what used to require a department. This is the practice built for that moment." }],
};

const CREDS = content?.creds?.length ? content.creds : FALLBACK.creds;
const CASES = content?.cases?.length ? content.cases : FALLBACK.cases;
const LABS = content?.labs?.length ? content.labs : FALLBACK.labs;
const LOGS = content?.logs?.length ? content.logs : FALLBACK.logs;

/* ═══ MAIN ═══ */
export default function App() {
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
        @keyframes sfscroll { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
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
        @media(max-width:768px) { .g2,.g3{grid-template-columns:1fr} .dm{display:none!important} .sc{padding:56px 20px} .mob-btn{display:block!important} }
        .cd { padding:36px;border:1px solid #1A171410;transition:all .4s ease;position:relative;overflow:hidden;background:#FAF7F2 }
        .cd::before { content:'';position:absolute;top:0;left:0;width:100%;height:3px;background:${A};transform:scaleX(0);transform-origin:left;transition:transform .4s ease }
        .cd:hover::before { transform:scaleX(1) }
        .cd:hover { border-color:#1A171420 }
        .le { padding:28px 0;border-bottom:1px solid #FAF7F220 }
        .cr { padding:18px 0;border-bottom:1px solid #1A171412;display:flex;justify-content:space-between;align-items:center }
        .nl { font-size:.8rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:#1A171490;cursor:pointer;border:none;background:none;transition:color .2s;padding:0 }
        .nl:hover { color:${A} }
        .eg { padding:44px;position:relative;background:#FAF7F408;border:1px solid #FAF7F418 }
        .uc { padding:28px 32px;border-left:2px solid ${A}40;margin-bottom:16px;transition:all .3s ease }
        .uc:hover { border-left-color:${A};background:${A}14 }
        .pt { padding:36px;border:1px solid #1A171415;transition:all .3s ease }
        .pt:hover { border-color:${A}40 }
        .mm { display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:200;background:#FAF7F2;flex-direction:column;align-items:center;justify-content:center;gap:32px }
        .avatar { width:140px;height:140px;border-radius:50%;object-fit:cover;border:3px solid #FAF7F2;box-shadow:0 8px 32px #1A171415 }
        .callout { padding:32px 40px;background:${A}0A;border-left:3px solid ${A};margin-top:48px }
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav className="nf">
        <div className="mw" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px clamp(24px,5vw,80px)" }}>
          <div style={{ cursor: "pointer", zIndex: 201 }} onClick={() => go("hero")}><Logo /></div>
          <div className="dm" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <button className="nl" onClick={() => go("practice")}>Practice</button>
            <button className="nl" onClick={() => go("lab")}>Lab</button>
            <button className="nl" onClick={() => go("log")}>Log</button>
            <a className="nl" href={CAL} target="_blank" rel="noopener" style={{ color: A }}>Book a Call →</a>
          </div>
          <button className="mob-btn" onClick={() => setMob(!mob)} style={{ display: "none", zIndex: 201, background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "#1A1714" }}>
            {mob ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {mob && (
        <div className="mm" style={{ display: "flex" }}>
          <button className="nl" style={{ fontSize: "1.1rem" }} onClick={() => go("practice")}>Practice</button>
          <button className="nl" style={{ fontSize: "1.1rem" }} onClick={() => go("lab")}>Lab</button>
          <button className="nl" style={{ fontSize: "1.1rem" }} onClick={() => go("log")}>Log</button>
          <a className="bp" href={CAL} target="_blank" rel="noopener">Book a Call</a>
        </div>
      )}

      {/* ═══ HERO ═══ */}
      <section id="hero" className="sc" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 120 }}>
        <div className="mw" style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 40, flexWrap: "wrap" }}>
            <R><img src="/images/brett-illustrated.jpg" className="avatar" alt="Brett Marlin" /></R>
            <R delay={0.1}><p className="bs">Design-led practice for the agent era</p></R>
          </div>
          <R delay={0.15}>
            <h1 className="hx" style={{ marginBottom: 40 }}>
              <span style={{ display: "block" }}>Experience,</span>
              <span style={{ display: "block", color: A }}>in-the-loop.</span>
            </h1>
          </R>
          <R delay={0.3}>
            <p className="bl" style={{ maxWidth: 580, marginBottom: 48 }}>
              Marliin brings 25 years of design leadership and AI-powered execution to your most important work. Fractional strategic leadership with agent-level execution. For companies building in the agent era who need a partner invested in their outcomes, not a vendor counting hours.
            </p>
          </R>
          <R delay={0.45}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a className="bp" href={CAL} target="_blank" rel="noopener">Book a Strategy Call</a>
              <button className="bo" onClick={() => go("practice")}>How It Works</button>
            </div>
          </R>
        </div>
      </section>

      {/* ═══ THE NAME ═══ */}
      <section className="sc" style={{ paddingTop: 0, paddingBottom: "clamp(60px,8vw,100px)" }}>
        <div className="mw">
          <R><div className="dv" style={{ marginBottom: 48 }} /></R>
          <div className="g2">
            <R>
              <p className="bs" style={{ marginBottom: 16 }}>The Name</p>
              <h2 className="hm">Two letters.<br />Two kinds of intelligence.</h2>
            </R>
            <R delay={0.15}>
              <p className="bl">
                Marliin is Brett Marlin's last name with an extra "i" for intelligence. The double "i" is the brand. One stands for the human designer. Twenty-five years of building products, leading teams, and shipping work that matters. The other stands for the AI agents and tools that now amplify what one expert practitioner can deliver.
              </p>
              <p className="bl" style={{ marginTop: 16 }}>
                In the logo, one dot is solid. The other is a loop. That is the whole philosophy: human craft, amplified by machine intelligence, working in a continuous loop.
              </p>
            </R>
          </div>
        </div>
      </section>

      {/* ═══ BRETT'S STORY ═══ */}
      <section className="sc sw">
        <div className="mw">
          <div className="g2" style={{ alignItems: "center" }}>
            <R>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img src="/images/boston-marathon.jpg" alt="Brett Marlin crossing the Boston Marathon finish line, 2025" style={{ width: "100%", display: "block" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 24px 16px", background: "linear-gradient(transparent, #00000060)", color: "#ffffffCC", fontSize: ".78rem", letterSpacing: ".03em" }}>
                  129th Boston Marathon, 2025
                </div>
              </div>
            </R>
            <R delay={0.15}>
              <p className="bs" style={{ marginBottom: 16 }}>The Builder</p>
              <h2 className="hm" style={{ marginBottom: 20 }}>From Web 1.0 to the agent era.<br />Always at the frontier.</h2>
              <p className="bl" style={{ marginBottom: 16 }}>
                Brett Marlin has spent 25 years chasing what comes next. He started designing for the web in 2000, ran a digital agency for eleven years serving AOL, McKinsey, and Warner Music, then led product design at four unicorn-stage companies: Mixpanel, Carta, Blend, and Altana AI.
              </p>
              <p className="bl" style={{ marginBottom: 16 }}>
                Through every wave of technology (Web 1.0, Web 2.0, Big Data, FinTech, crypto, and now AI) the constant has been the same: get to the frontier, learn how it works, and ship something real.
              </p>
              <p className="bl">
                The same relentless drive shows up off the clock. Brett picked up distance running late and went from his first marathon to crossing the Boston Marathon finish line. Same approach to everything: show up consistently, trust the process, go the distance.
              </p>
            </R>
          </div>
        </div>
      </section>

      {/* ═══ CREDENTIALS ═══ */}
      <section className="sc" style={{ paddingTop: "clamp(60px,8vw,100px)" }}>
        <div className="mw">
          <R><p className="bs" style={{ marginBottom: 36 }}>25 years of building</p></R>
          {CREDS.map((c, i) => (
            <R key={i} delay={i * 0.04}>
              <div className="cr">
                <span className="sf" style={{ fontSize: "clamp(1.3rem,2.5vw,1.75rem)", fontWeight: 500 }}>{c.name}</span>
                <span className="bs" style={{ textTransform: "none", letterSpacing: 0 }}>{c.role}</span>
              </div>
            </R>
          ))}
          <R delay={0.3}>
            <p className="bl" style={{ marginTop: 32, maxWidth: 600 }}>
              Plus Best Buy, Stella Artois, Huffington Post, Warner Music, Vanderbilt, and more. Agency work contributed to StudioNow's $40M acquisition by AOL.
            </p>
          </R>
        </div>
      </section>

      {/* ═══ PRACTICE ═══ */}
      <section id="practice" className="sc sd">
        <div className="mw">
          <R><p className="bs" style={{ marginBottom: 32 }}>Practice</p></R>
          <R delay={0.1}><h2 className="hx" style={{ marginBottom: 24 }}>Fractional leadership.<br /><span style={{ color: A }}>Agent execution.</span></h2></R>
          <R delay={0.2}>
            <p className="bl" style={{ maxWidth: 640, marginBottom: 24 }}>
              Marliin embeds a senior design and product leader, armed with AI agents, directly into your most important work. Strategy, product, teams, and the operating model that sustains them. You get someone who thinks at the executive level and ships at the speed of a full team.
            </p>
          </R>
          <R delay={0.25}>
            <p className="bl" style={{ maxWidth: 640, marginBottom: 80 }}>
              This is not about biting off a big engagement. It starts with a focused sprint. What continues is a loop, tightly integrated with your processes, your culture, and your goals, for as long as you need it.
            </p>
          </R>

          <div className="g2">
            <R>
              <div className="eg">
                <div className="sf" style={{ fontSize: "3.5rem", fontWeight: 300, color: "#FAF7F220", lineHeight: 1, marginBottom: 14 }}>01</div>
                <h3 className="hm" style={{ marginBottom: 16 }}>The Runway</h3>
                <p className="bl" style={{ marginBottom: 24, fontSize: ".95rem" }}>A one-to-two day intensive workshop where your team builds speed before takeoff. We align on strategy, prototype with AI tools in real time, and walk away with a roadmap backed by working artifacts.</p>
                <p className="bl" style={{ fontSize: ".95rem", marginBottom: 20 }}>You walk away with:</p>
                {["Prioritized opportunity map for AI-driven value", "Working prototypes built live during the session", "Team design recommendation (who you need, how they work with agents)", "90-day execution roadmap"].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ color: A, fontSize: ".88rem", marginTop: 2, flexShrink: 0 }}>→</span>
                    <span className="bl" style={{ fontSize: ".92rem" }}>{t}</span>
                  </div>
                ))}
                <p style={{ marginTop: 24, fontSize: ".82rem", color: "#FAF7F260", letterSpacing: ".03em" }}>
                  Remote or on-site. Flat fee. No surprises.
                </p>
              </div>
            </R>
            <R delay={0.15}>
              <div className="eg">
                <div className="sf" style={{ fontSize: "3.5rem", fontWeight: 300, color: "#FAF7F220", lineHeight: 1, marginBottom: 14 }}>02</div>
                <h3 className="hm" style={{ marginBottom: 16 }}>The Loop</h3>
                <p className="bl" style={{ marginBottom: 24, fontSize: ".95rem" }}>The ongoing engagement. Designer-in-the-loop, building and iterating alongside your team for as long as you need the added intelligence. The Loop is defined as much by your business, your culture, and your process as it is by the AI workflows and delivery cycles it enables.</p>
                {["Product design and AI-augmented development (0 to 1)", "Team architecture for agent-enabled operations (1 to n)", "Embedded fractional leadership, not a consultant who disappears", "Training your people to become AI-amplified operators"].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ color: A, fontSize: ".88rem", marginTop: 2, flexShrink: 0 }}>→</span>
                    <span className="bl" style={{ fontSize: ".92rem" }}>{t}</span>
                  </div>
                ))}
                <p style={{ marginTop: 24, fontSize: ".82rem", color: "#FAF7F260", letterSpacing: ".03em" }}>
                  Outcomes-based pricing. We are also open to blended compensation structures including advisory equity, because the best partnerships happen when everyone has skin in the game.
                </p>
              </div>
            </R>
          </div>
          <R delay={0.25}>
            <div style={{ marginTop: 64, textAlign: "center" }}>
              <a className="bp" href={CAL} target="_blank" rel="noopener">Start with The Runway →</a>
            </div>
          </R>
        </div>
      </section>

      {/* ═══ USE CASES ═══ */}
      <section className="sc sd" style={{ paddingTop: 0 }}>
        <div className="mw">
          <R>
            <div className="dv" style={{ background: "#FAF7F225", marginBottom: 48 }} />
            <p className="bs" style={{ marginBottom: 16 }}>The Runway works for</p>
            <h3 className="hl" style={{ marginBottom: 48, maxWidth: 500 }}>Specific methodology.<br />Open-ended application.</h3>
          </R>
          <div className="g2">
            <div>{CASES.slice(0, 2).map((c, i) => (
              <R key={i} delay={i * 0.1}>
                <div className="uc">
                  <h4 className="sf" style={{ fontSize: "1.2rem", fontWeight: 500, marginBottom: 10, color: "#FAF7F2" }}>{c.title}</h4>
                  <p className="bl" style={{ fontSize: ".92rem" }}>{c.desc}</p>
                </div>
              </R>
            ))}</div>
            <div>{CASES.slice(2).map((c, i) => (
              <R key={i} delay={(i + 2) * 0.1}>
                <div className="uc">
                  <h4 className="sf" style={{ fontSize: "1.2rem", fontWeight: 500, marginBottom: 10, color: "#FAF7F2" }}>{c.title}</h4>
                  <p className="bl" style={{ fontSize: ".92rem" }}>{c.desc}</p>
                </div>
              </R>
            ))}</div>
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="sc" id="pricing">
        <div className="mw">
          <R>
            <p className="bs" style={{ marginBottom: 16 }}>How we work together</p>
            <h2 className="hl" style={{ marginBottom: 20, maxWidth: 560 }}>Outcomes first.<br /><span className="ac">Always.</span></h2>
          </R>
          <R delay={0.1}>
            <p className="bl" style={{ maxWidth: 640, marginBottom: 56 }}>
              The old agency model charges for time. We believe the new model charges for impact. When AI makes experienced practitioners 10x more effective, pricing should reflect the value created, not the hours spent. That is why Marliin structures engagements around outcomes, not timesheets.
            </p>
          </R>
          <div className="g3">
            <R><div className="pt">
              <p className="bs" style={{ marginBottom: 20 }}>01 / The Runway</p>
              <h3 className="hm" style={{ marginBottom: 12 }}>Flat Fee</h3>
              <p className="bl" style={{ marginBottom: 20, fontSize: ".94rem" }}>A fixed investment for the workshop sprint. Know exactly what you are paying and what you are getting before we start. No ambiguity, no scope creep. This is how trust begins.</p>
              <p style={{ fontSize: ".82rem", color: A, fontWeight: 500 }}>Clear scope. Clear price. Clear outcomes.</p>
            </div></R>
            <R delay={0.1}><div className="pt" style={{ borderColor: `${A}30` }}>
              <p className="bs" style={{ marginBottom: 20 }}>02 / The Loop</p>
              <h3 className="hm" style={{ marginBottom: 12 }}>Outcomes-Based</h3>
              <p className="bl" style={{ marginBottom: 20, fontSize: ".94rem" }}>For retained engagements, compensation is structured around measurable results: revenue milestones, product launches, efficiency targets. We are also open to blended structures that include advisory equity or revenue share, aligning our success directly with yours.</p>
              <p style={{ fontSize: ".82rem", color: A, fontWeight: 500 }}>We succeed when you succeed.</p>
            </div></R>
            <R delay={0.2}><div className="pt">
              <p className="bs" style={{ marginBottom: 20 }}>The Philosophy</p>
              <h3 className="hm" style={{ marginBottom: 12 }}>Skin in the Game</h3>
              <p className="bl" style={{ marginBottom: 20, fontSize: ".94rem" }}>The best work happens when everyone is invested in the outcome. Lower upfront cost for you. Shared upside for both of us. This is how the best advisory relationships have always worked, and it is how the new agency model should work too.</p>
              <p style={{ fontSize: ".82rem", color: A, fontWeight: 500 }}>Not a line item. A real partner.</p>
            </div></R>
          </div>
        </div>
      </section>

      {/* ═══ NETWORK CALLOUT ═══ */}
      <section className="sc" style={{ paddingTop: 0 }}>
        <div className="mw">
          <R>
            <div className="callout">
              <h3 className="hm" style={{ marginBottom: 14 }}>Building the loop, together.</h3>
              <p className="bl" style={{ marginBottom: 0, maxWidth: 640 }}>
                Marliin is building a network of senior specialists in product management, UX research, product design, and engineering who share this model: fractional leadership with agent-powered execution. The goal is not just to bring this service to your company, but to build a new kind of practice around it. If you are a senior operator who wants to work this way, <a href="mailto:brett@marliin.com" style={{ color: A, textDecoration: "none", fontWeight: 500 }}>get in touch</a>.
              </p>
            </div>
          </R>
        </div>
      </section>

      {/* ═══ PHILOSOPHY ═══ */}
      <section className="sc" style={{ paddingTop: 0 }}>
        <div className="mn" style={{ textAlign: "center" }}>
          <R><div className="dv" style={{ margin: "0 auto 48px" }} /></R>
          <R delay={0.1}><h2 className="hl" style={{ marginBottom: 20 }}>"The playing field has been leveled. It is getting stratified quickly. <span className="ac">The advantage is taste.</span>"</h2></R>
          <R delay={0.2}><p className="bl" style={{ maxWidth: 540, margin: "0 auto 48px" }}>Everyone has access to the same AI tools. The difference is knowing what to build, how to build it beautifully, and how to design the team that keeps building after you leave. That is 25 years of practice, not a prompt.</p></R>
          <R delay={0.3}><p className="si" style={{ fontSize: "1.15rem", color: "#1A171470" }}>"Real artists ship." — Steve Jobs</p></R>
        </div>
      </section>

      {/* ═══ LAB ═══ */}
      <section id="lab" className="sc sw">
        <div className="mw">
          <R>
            <p className="bs" style={{ marginBottom: 16 }}>Lab</p>
            <h2 className="hl" style={{ marginBottom: 16 }}>Products as proof.</h2>
            <p className="bl" style={{ maxWidth: 560, marginBottom: 56 }}>Marliin does not just consult. It builds. Every product in the Lab is live evidence of the methodology: AI-augmented design and development, shipped with high craft and real speed.</p>
          </R>
          <div className="g3">
            {LABS.map((item, i) => (
              <R key={i} delay={i * 0.1}>
                <div className="cd">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <span className="bs" style={{ textTransform: "none", letterSpacing: ".04em" }}>{item.status}</span>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: item.status === "Live" ? "#5C7A5E" : item.status === "In Development" ? A : "#1A171430" }} />
                  </div>
                  <h3 className="hm" style={{ marginBottom: 14 }}>{item.title}</h3>
                  <p className="bl" style={{ marginBottom: 20, fontSize: ".94rem" }}>{item.desc}</p>
                  <p style={{ fontSize: ".8rem", color: A, fontWeight: 500, letterSpacing: ".02em" }}>{item.cap}</p>
                  {item.link && (
                    <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid #1A171412" }}>
                      <a href={item.link} target="_blank" rel="noopener" style={{ fontSize: ".85rem", fontWeight: 500, color: "#1A1714", textDecoration: "none" }}>Try it →</a>
                    </div>
                  )}
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LOG ═══ */}
      <section id="log" className="sc sd">
        <div className="mw">
          <div className="g2" style={{ alignItems: "start" }}>
            <div>
              <R>
                <p className="bs" style={{ marginBottom: 16 }}>Log</p>
                <h2 className="hl" style={{ marginBottom: 16 }}>Field notes from<br />the frontier.</h2>
                <p className="bl" style={{ maxWidth: 380, marginBottom: 32 }}>What I am building, exploring, and learning. Not a blog. A record of moving at the speed of AI.</p>
                <a href="https://substack.com/@brettmarlin" target="_blank" rel="noopener" style={{ fontSize: ".82rem", color: A, fontWeight: 500, letterSpacing: ".04em", textTransform: "uppercase", textDecoration: "none" }}>Read on Substack →</a>
              </R>
            </div>
            <div>
              {LOGS.map((e, i) => (
                <R key={i} delay={i * 0.1}>
                  <div className="le">
                    <p className="bs" style={{ marginBottom: 8, textTransform: "none", letterSpacing: ".02em" }}>{e.date}</p>
                    <h3 className="sf" style={{ fontSize: "1.2rem", fontWeight: 500, marginBottom: 10, color: "#FAF7F2" }}>{e.title}</h3>
                    <p className="bl" style={{ fontSize: ".9rem" }}>{e.body}</p>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="sc" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div className="mn" style={{ textAlign: "center", width: "100%" }}>
          <R><p className="bs" style={{ marginBottom: 32 }}>Start here</p></R>
          <R delay={0.1}><h2 className="hx" style={{ marginBottom: 32 }}>Ready to add<br /><span className="ac">intelligence?</span></h2></R>
          <R delay={0.2}><p className="bl" style={{ maxWidth: 520, margin: "0 auto 48px" }}>Book a 30-minute strategy call. We will talk about where you are, where AI creates real value for your business, and whether The Runway is the right first step. No pitch. Just a conversation between builders.</p></R>
          <R delay={0.3}><a className="bp" href={CAL} target="_blank" rel="noopener" style={{ fontSize: "1rem", padding: "20px 48px" }}>Book a Strategy Call →</a></R>
          <R delay={0.4}><p style={{ marginTop: 24, fontSize: ".85rem", color: "#1A171460" }}>brett@marliin.com · San Francisco, CA</p></R>
        </div>
      </section>

      {/* ═══ SF PHOTO STRIP ═══ */}
      <section style={{ paddingTop: 48, paddingBottom: 0 }}>
        <PhotoStrip />
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
