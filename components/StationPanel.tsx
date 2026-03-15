'use client';

import type { Station } from '@/lib/types';
import YouTubePlayer from './YouTubePlayer';

interface StationPanelProps {
  station: Station;
  onEdit: () => void;
  onClose: () => void;
}

export default function StationPanel({ station, onEdit, onClose }: StationPanelProps) {
  return (
    <div className="fixed bottom-4 right-4 z-40 w-full max-w-sm bg-[#0d1b6b]/95 border border-white/20 rounded-2xl shadow-2xl text-white overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-start justify-between p-4 pb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg leading-tight truncate">{station.name}</h3>
          {station.description && (
            <p className="text-sm text-white/60 mt-0.5 line-clamp-2">{station.description}</p>
          )}
          <p className="text-xs text-white/40 mt-1">
            {station.lat.toFixed(2)}°, {station.lng.toFixed(2)}°
          </p>
        </div>
        <div className="flex gap-2 ml-3 flex-shrink-0">
          <button
            onClick={onEdit}
            className="text-xs px-3 py-1.5 rounded-lg border border-white/30 hover:bg-white/10 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onClose}
            className="text-xs px-3 py-1.5 rounded-lg border border-white/30 hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Player */}
      {station.url && (
        <div className="px-4 pb-4">
          <YouTubePlayer url={station.url} title={station.name} />
        </div>
      )}
    </div>
  );
}
