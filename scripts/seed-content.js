import "dotenv/config";
import { createClient } from "@sanity/client";

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Missing VITE_SANITY_PROJECT_ID. Set it in .env");
  process.exit(1);
}

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN. Create a token at sanity.io/manage and add it to .env");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const CREDS = [
  { _type: "cred", _id: "cred-altana-ai", name: "Altana AI", role: "Head of Product Design" },
  { _type: "cred", _id: "cred-carta", name: "Carta", role: "Head of Product Design" },
  { _type: "cred", _id: "cred-mixpanel", name: "Mixpanel", role: "Head of Design" },
  { _type: "cred", _id: "cred-blend", name: "Blend", role: "Head of Product Design" },
  { _type: "cred", _id: "cred-aol", name: "AOL", role: "Agency Partner" },
];

const CASES = [
  { _type: "practiceCase", _id: "case-product-strategy", title: "Product Strategy Sprint", desc: "A seed-stage founder with a vision and a pitch deck needs to get to a working product and a team plan before their next raise. We align on what to build, prototype it live, and map the path to launch." },
  { _type: "practiceCase", _id: "case-agent-operations", title: "Agent-Enabled Operations", desc: "A mid-market company wants to understand where AI agents can transform their workflows. We identify the highest-value opportunities, build working proofs of concept, and design the human-in-the-loop roles to sustain them." },
  { _type: "practiceCase", _id: "case-team-architecture", title: "Team Architecture for AI", desc: "A growing company has hired well but the org chart was designed before agents existed. We redesign team structures, decision flows, and tooling to unlock what a leaner, AI-augmented team can actually deliver." },
  { _type: "practiceCase", _id: "case-design-system", title: "Design System + AI Tooling", desc: "A product team is shipping fast but quality is inconsistent and the design system is fracturing. We rebuild the system with AI-augmented workflows that maintain craft at speed." },
];

const LABS = [
  { _type: "lab", _id: "lab-maf-machine", title: "MAF Machine", status: "Live", desc: "A training coach for endurance runners doing Maximal Aerobic Function (MAF) training. Integrates with Strava to analyze heart rate zones, track aerobic development, and optimize pacing for marathons and ultra distances.", cap: "Strava API, AI coaching, aerobic analytics", link: "https://maf.marliin.com" },
  { _type: "lab", _id: "lab-tether", title: "Tether", status: "In Development", desc: "A semantic reprogramming platform that uses CBT, ACT, and EMDR methodologies to help people rewire limiting beliefs through the power of their own language. AI meets therapeutic methodology meets behavioral design.", cap: "AI therapeutic methodology, behavioral design", link: null },
  { _type: "lab", _id: "lab-next-build", title: "Next Build", status: "Exploring", desc: "Local AI paradigms, OpenClaw, and the frontier of private intelligence infrastructure. Documenting everything as it unfolds.", cap: "Local AI, privacy-first architecture", link: null },
];

const LOGS = [
  { _type: "log", _id: "log-openclaw", date: "Feb 2026", title: "Exploring local AI and OpenClaw", body: "The paradigm of private, local intelligence is accelerating faster than most people realize. Installing, testing, and documenting what this means for companies that need AI but cannot send data to the cloud." },
  { _type: "log", _id: "log-maf-machine", date: "Feb 2026", title: "MAF Machine ships to Strava runners", body: "First product in the Lab goes live. An AI training coach for MAF runners, built end-to-end with AI-augmented development. What would have taken a team of four about three weeks took two days. The craft bar did not drop. That is the point." },
  { _type: "log", _id: "log-launching", date: "Jan 2026", title: "Launching Marliin: intelligence, added", body: "After 25 years designing products and building teams at companies like Carta, Mixpanel, and Blend, the landscape has shifted enough that one designer with the right agents can deliver what used to require a department. This is the practice built for that moment." },
];

async function seed() {
  const transaction = client.transaction();
  [...CREDS, ...CASES, ...LABS, ...LOGS].forEach((doc) => transaction.createOrReplace(doc));
  await transaction.commit();
  console.log("Seeded content to Sanity successfully.");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
