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

### Updating a local clone that has conflicting local changes

If you have local edits that conflict with recent upstream changes (e.g. you modified
`next.config.js`, `package.json`, or files inside `app/` before the fixes were merged),
follow these steps to merge cleanly:

```bash
# See what you have changed locally
git status
git diff

# Option A – discard your local changes and pull the latest (destructive)
git checkout -- .           # discard all unstaged changes
git pull origin main        # pull the latest fixes

# Option B – stash your local changes, pull, then re-apply (safe)
git stash                   # temporarily shelve your changes
git pull origin main        # pull the latest fixes
git stash pop               # re-apply your changes on top
# Resolve any remaining merge conflicts shown by git, then:
# git add <conflicting-file> && git stash drop

# Option C – merge explicitly (for complex conflicts)
git fetch origin
git merge origin/main       # merge main into your current branch
# Edit conflicted files, then:
# git add <conflicting-file> && git commit
```

**Common conflict: `next.config.js`**

If git shows a conflict in `next.config.js`, accept the upstream version (it removes the
invalid `experimental.appDir` key that Next.js 15 no longer supports):

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
```

**Common conflict: `package.json` / `tsconfig.json`**

If these files show `\n` escape sequences instead of real newlines, replace the file with
the version from `origin/main`:

```bash
git checkout origin/main -- package.json tsconfig.json
```

After resolving all conflicts, reinstall dependencies and verify the dev server starts
without warnings:

```bash
npm install
npm run dev
```

You should see output like:

```
▲ Next.js 15.x.x
- Local: http://localhost:3000
✓ Starting...
✓ Ready
```

with **no** warning about `Unrecognized key(s) in object: 'appDir' at "experimental"`.

## Setup Instructions

### Environment Variables (optional — only needed for database features)

Create a `.env` file in the root of your project and add the following variables:

```plaintext
DATABASE_URL=your_postgres_connection_string
VERCEL_KV_URL=your_upstash_url
VERCEL_KV_TOKEN=your_upstash_token
```

### Deployment Steps
1. Push your code to GitHub.
2. Connect your GitHub repository to Vercel.
3. Configure environment variables in Vercel settings.
4. Deploy your application.

## Project Structure

- `app/` - App Router pages and root layout (`layout.tsx`, `page.tsx`, `globals.css`)
- `public/fonts/` - Local font files (`Mikadan-Regular.woff2`)
- `tailwind.config.ts` - Tailwind CSS configuration
- `next.config.js` - Next.js configuration (no `experimental.appDir` — App Router is stable since Next.js 13.4; the flag is unrecognised in Next.js 15)
- `tsconfig.json` - TypeScript configuration

## Fonts

This project uses the **Mikadan** typeface as its primary font. The font file is stored at:

```
public/fonts/Mikadan-Regular.woff2
```

It is loaded in `app/layout.tsx` via [`next/font/local`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts#local-fonts):

```tsx
import localFont from 'next/font/local';

const mikadan = localFont({
  src: '../public/fonts/Mikadan-Regular.woff2',
  variable: '--font-mikadan',
  display: 'swap',
});
```

The font is exposed as a Tailwind CSS utility class (`font-mikadan`) via the CSS custom property `--font-mikadan`, which is configured in `tailwind.config.ts`:

```ts
fontFamily: {
  mikadan: ['var(--font-mikadan)', 'sans-serif'],
},
```

To use the font on any element, apply the Tailwind class:

```html
<p class="font-mikadan">Radio Indica</p>
```



## Features
- Globe visualization focused on India with drag-to-rotate functionality.
- Station creation and management through a modal interface.
- Broadcasting from any location pinned on the globe.