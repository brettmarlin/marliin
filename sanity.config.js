import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schema/index.js";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.VITE_SANITY_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? process.env.VITE_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "marliin",
  title: "Marliin CMS",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
