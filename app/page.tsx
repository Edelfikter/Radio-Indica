export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ background: '#1a2ab8', color: '#fff', fontFamily: "'Libre Caslon Text', Georgia, 'Times New Roman', serif" }}
    >
      {/* ── Title ───────────────────────────────────────────────── */}
      <div className="flex justify-center pt-16 pb-8 px-8">
        <h1
          className="text-center font-bold leading-none tracking-tight select-none"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', letterSpacing: '-0.04em' }}
        >
          Radio Indica
        </h1>
      </div>

      {/* ── Main composition: globe left, description right ─────── */}
      <div className="flex-1 flex items-center justify-center px-8 pb-16">
        <div
          className="flex flex-col md:flex-row items-center gap-12 md:gap-16 w-full"
          style={{ maxWidth: '900px' }}
        >
          {/* Globe placeholder circle */}
          <a
            href="/experience"
            className="flex-shrink-0 rounded-full border-2 border-white/50 hover:border-white transition-colors cursor-pointer flex items-center justify-center"
            style={{
              width: 'clamp(220px, 42vw, 420px)',
              height: 'clamp(220px, 42vw, 420px)',
              background: 'rgba(255,255,255,0.08)',
            }}
            title="Enter the globe experience"
          >
            <span
              className="text-white/30 text-sm tracking-widest uppercase select-none"
              style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.2em' }}
            >
              Globe
            </span>
          </a>

          {/* Description block */}
          <div className="flex-1 space-y-6">
            <p
              className="leading-relaxed text-white/90"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: '1.75' }}
            >
              Curated sound from South Asia and its diaspora. Broadcasting
              explorations in music, culture, and the spaces in between.
            </p>
            <p
              className="leading-relaxed text-white/60"
              style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', lineHeight: '1.7' }}
            >
              Tune into stations placed by listeners across the world. Add your
              own broadcast pin anywhere on the globe. Discover the sonic
              geography of a culture in motion.
            </p>
            <a
              href="/experience"
              className="inline-block border border-white/60 text-white/80 hover:bg-white hover:text-[#1a2ab8] px-6 py-3 rounded-full transition-all text-sm tracking-wide"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Enter →
            </a>
          </div>
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="text-center pb-8 text-white/30 text-xs tracking-widest uppercase">
        Radio Indica
      </footer>
    </main>
  );
}
