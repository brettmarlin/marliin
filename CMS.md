# Marliin CMS (Sanity)

Content for the Marliin site is managed in Sanity. The site uses **build-time fetching**: content is pulled from Sanity during `npm run build` and written to `src/data/content.json`. No runtime API calls.

## Content Types

- **Cred** – Company credentials (name, role)
- **Practice Case** – Use cases for The Runway (title, desc)
- **Lab** – Lab projects (title, status, desc, cap, link)
- **Log** – Log entries (date, title, body)

## Setup

### 1. Create a Sanity project

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Create a new project
3. Copy the **Project ID**

### 2. Configure environment variables

Copy `.env.example` to `.env` and set:

```
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

### 3. Deploy the schema

Run Sanity Studio to deploy the schema and create content types:

```bash
npm run studio
```

Open http://localhost:3333. Log in with your Sanity account and link the project. The schema will be deployed automatically.

### 4. Seed content (first time only)

To populate the dataset with the default content:

1. Create an API token at [sanity.io/manage](https://sanity.io/manage) > your project > API > Tokens
2. Add `SANITY_API_WRITE_TOKEN=your_token` to `.env`
3. Run:

```bash
npm run seed-content
```

### 5. Build the site

```bash
npm run build
```

The build runs `fetch-content` first, then Vite. Content is written to `src/data/content.json`.

## Local development

- **Site**: `npm run dev` – Uses existing `src/data/content.json`. Run `npm run fetch-content` after editing content in Sanity.
- **Studio**: `npm run studio` – Edit content at http://localhost:3333

## Cloudflare Pages

1. Add `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` as environment variables in Cloudflare Pages
2. Builds will fetch content from Sanity before building

### Rebuild on content change

To trigger a rebuild when content is updated in Sanity:

1. In Cloudflare Pages: Settings > Builds & deployments > Build webhooks
2. Copy the webhook URL
3. In Sanity: [sanity.io/manage](https://sanity.io/manage) > your project > API > Webhooks
4. Add a webhook: POST to your Cloudflare build webhook URL, trigger on "Create", "Update", "Delete"

## Fallback behavior

If `VITE_SANITY_PROJECT_ID` is not set, `npm run build` skips the fetch and uses the existing `src/data/content.json`. The site also falls back to hardcoded content if the JSON is empty or malformed.
