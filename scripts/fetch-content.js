import "dotenv/config";
import { createClient } from "@sanity/client";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";

if (!projectId) {
  console.warn("No VITE_SANITY_PROJECT_ID set. Skipping fetch, using existing src/data/content.json");
  process.exit(0);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function fetchContent() {
  const [creds, cases, labs, logs] = await Promise.all([
    client.fetch(`*[_type == "cred"] | order(name asc) { name, role }`),
    client.fetch(`*[_type == "practiceCase"] | order(title asc) { title, desc }`),
    client.fetch(`*[_type == "lab"] | order(title asc) { title, status, desc, cap, link }`),
    client.fetch(`*[_type == "log"] | order(date desc) { date, title, body }`),
  ]);

  const content = {
    creds: creds || [],
    cases: cases || [],
    labs: labs || [],
    logs: logs || [],
  };

  const outPath = join(__dirname, "..", "src", "data", "content.json");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(content, null, 2), "utf8");
  console.log("Fetched content from Sanity and wrote to src/data/content.json");
}

fetchContent().catch((err) => {
  console.error("Failed to fetch content:", err.message);
  process.exit(1);
});
