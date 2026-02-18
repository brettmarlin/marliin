import "dotenv/config";
import { spawn } from "child_process";

// Ensure Studio gets projectId - copy VITE_* to SANITY_STUDIO_* if needed
if (!process.env.SANITY_STUDIO_PROJECT_ID && process.env.VITE_SANITY_PROJECT_ID) {
  process.env.SANITY_STUDIO_PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID;
}
if (!process.env.SANITY_STUDIO_DATASET && process.env.VITE_SANITY_DATASET) {
  process.env.SANITY_STUDIO_DATASET = process.env.VITE_SANITY_DATASET;
}

const child = spawn("npx", ["sanity", "dev", "--port", "3333"], {
  stdio: "inherit",
  env: process.env,
  shell: true,
});

child.on("exit", (code) => process.exit(code ?? 0));
