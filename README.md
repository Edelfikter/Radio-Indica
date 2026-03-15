# Radio-Indica

## Developer Quickstart

### Prerequisites
- Node.js 18 or later (LTS recommended)
- npm 9 or later (included with Node.js 18+)

### Running locally

```bash
# 1. Clone the repository
git clone https://github.com/Edelfikter/Radio-Indica.git
cd Radio-Indica

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Features

### Phase 1 — Landing page
- Solid deep-blue background (`#1a2ab8`).
- Large centered **Radio Indica** title in Libre Caslon Text (loaded from Google Fonts at runtime; graceful serif fallback during build).
- Large circle placeholder (links to the globe experience) placed left-of-center below the title.
- Descriptive copy block to the right of the circle.
- Responsive: stacks vertically on mobile, side-by-side on md+.

### Phase 2 — Interactive globe (`/experience`)
- **Three.js + React Three Fiber** WebGL globe, SSR-excluded via `next/dynamic`.
- Auto-rotates with configurable speed.
- **Click** a blip to select a station; **double-click** the globe surface to add a new station at that lat/lng.
- OrbitControls for pan/rotate (zoom disabled by default).

### Phase 3 — Stations & editing UI
- Station model: `id · name · lat · lng · url · description · createdBy · createdAt`.
- React context store (`context/StationContext.tsx`) — add, update, delete.
- Sidebar station list with visual selection state.
- Station editor modal — create or edit stations, delete with confirmation.
- Station detail panel (bottom-right) with YouTube embed.

### Phase 4 — YouTube integration
- `YouTubePlayer` component extracts the video ID from any `youtube.com` or `youtu.be` URL and renders a responsive `<iframe>` embed.
- No server-side YouTube Data API calls; the embed works without an API key.
- To use the YouTube Data API (search, metadata) in the future, add your key to `.env.local`:

```env
NEXT_PUBLIC_YOUTUBE_API_KEY=your_key_here
```

---

## Project Structure

```
app/
  layout.tsx          Root layout — Google Fonts link, StationProvider
  globals.css         Tailwind directives + CSS custom properties
  page.tsx            Landing page (Phase 1)
  experience/
    page.tsx          Globe experience (Phase 2-4)
components/
  Globe.tsx           Three.js WebGL globe (client-only)
  StationEditor.tsx   Create/edit/delete station modal
  StationList.tsx     Sidebar station list
  StationPanel.tsx    Selected station detail + YouTube player
  YouTubePlayer.tsx   Responsive YouTube iframe embed
context/
  StationContext.tsx  React context + state for stations
lib/
  types.ts            Station TypeScript interface
tailwind.config.ts    Tailwind content paths
next.config.js        Minimal Next.js config (reactStrictMode)
tsconfig.json         TypeScript config
```

---

## Deployment

1. Push to GitHub.
2. Connect the repo to [Vercel](https://vercel.com).
3. Add any environment variables in the Vercel dashboard.
4. Deploy — `npm run build` succeeds without internet access to Google Fonts (fonts load at runtime in the user's browser).
