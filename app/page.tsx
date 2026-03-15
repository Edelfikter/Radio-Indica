export default function Home() {
  return (
    <main className="min-h-screen bg-[#6f86ff] text-black flex flex-col">
      {/* Desktop: title left, description right, globe lower-left */}
      {/* Mobile: same square composition with negative space top/bottom */}
      <div className="flex-1 flex flex-col justify-center px-8 py-16 md:px-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-16">
          {/* Title */}
          <div className="md:w-1/2">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">
              Radio<br />Indica
            </h1>
          </div>

          {/* Description */}
          <div className="md:w-1/2 md:pt-4">
            <p className="text-base md:text-lg leading-relaxed">
              Curated sound from South Asia and its diaspora. Broadcasting
              explorations in music, culture, and the spaces in between.
            </p>
          </div>
        </div>

        {/* Globe — lower-left */}
        <div className="mt-16 md:mt-24 flex justify-start">
          <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border-2 border-black flex items-center justify-center">
            <span className="text-3xl md:text-5xl select-none">🌐</span>
          </div>
        </div>
      </div>
    </main>
  );
}
