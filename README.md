# Radio-Indica

## Setup Instructions

### Prerequisites
- Node.js **v18 or later** (required by Next.js 15)

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Environment Variables

Create a `.env.local` file in the root of your project and add any required variables:

```plaintext
# Add environment variables here as needed
```

### Deployment Steps
1. Push your code to GitHub.
2. Connect your GitHub repository to Vercel.
3. Configure environment variables in Vercel settings.
4. Deploy your application.

---

## Updating Your Local Clone

If your local clone is out of date and `git pull` is blocked by local modifications (e.g. a modified `package.json` or untracked `package-lock.json`), use one of the following sequences:

### Option A — Stash local changes, then pull

Use this if you want to keep your local edits for later review:

```bash
# Stash modified tracked files
git stash

# Pull the latest from main
git pull origin main

# (Optional) Restore your stashed changes on top — may cause conflicts
git stash pop
```

### Option B — Discard local changes and reset to main (recommended)

Use this if you just want a clean copy of the repo (local edits will be lost):

```bash
# Remove untracked files (e.g. package-lock.json you generated locally)
git clean -fd

# Discard all modifications to tracked files
git restore .

# Pull the latest from main
git pull origin main

# Re-install dependencies from the repo's lock file
npm install

# Start the dev server
npm run dev
```

---

## Project Structure

- `app/` — Next.js 15 App Router pages and components.
  - `layout.tsx` — Root layout with font and metadata.
  - `page.tsx` — Home page.
  - `globals.css` — Global Tailwind CSS styles.
- `tailwind.config.ts` — Tailwind CSS configuration.
- `postcss.config.js` — PostCSS configuration.
- `next.config.js` — Next.js configuration.
- `tsconfig.json` — TypeScript configuration.

## Features
- Globe visualization: view locations of broadcasting stations and listen to their streams.
- Station creation: log in and double-click the globe to create your own station.