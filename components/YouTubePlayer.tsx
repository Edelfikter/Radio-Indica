'use client';

import { useMemo } from 'react';

interface YouTubePlayerProps {
  url: string;
  title?: string;
}

function extractVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    // youtu.be/ID
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('?')[0];
    // youtube.com/watch?v=ID
    const v = u.searchParams.get('v');
    if (v) return v;
    // youtube.com/embed/ID
    const embedMatch = u.pathname.match(/\/embed\/([^/?]+)/);
    if (embedMatch) return embedMatch[1];
    return null;
  } catch {
    return null;
  }
}

export default function YouTubePlayer({ url, title }: YouTubePlayerProps) {
  const videoId = useMemo(() => extractVideoId(url), [url]);

  if (!videoId) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-white/5 rounded-xl text-white/40 text-sm">
        No playable URL
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute inset-0 w-full h-full rounded-xl"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title ?? 'Station broadcast'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
