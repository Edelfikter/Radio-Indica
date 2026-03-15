'use client';

import { useStations } from '@/context/StationContext';

interface StationListProps {
  onAddNew: () => void;
}

export default function StationList({ onAddNew }: StationListProps) {
  const { stations, selectedStation, setSelectedStation } = useStations();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">
          Stations ({stations.length})
        </span>
        <button
          onClick={onAddNew}
          className="text-xs px-2.5 py-1 rounded-lg border border-white/30 text-white/70 hover:bg-white/10 transition-colors"
        >
          + Add
        </button>
      </div>

      {stations.length === 0 && (
        <p className="text-xs text-white/30 mt-2">
          Double-click on the globe to add a station.
        </p>
      )}

      {stations.map((s) => (
        <button
          key={s.id}
          onClick={() => setSelectedStation(s.id === selectedStation?.id ? null : s)}
          className={`text-left px-3 py-2 rounded-lg border transition-colors text-sm ${
            selectedStation?.id === s.id
              ? 'border-white/60 bg-white/15 font-semibold'
              : 'border-white/10 hover:border-white/30 hover:bg-white/5'
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: selectedStation?.id === s.id ? '#ffd700' : '#ff4444' }}
            />
            <span className="truncate">{s.name}</span>
          </div>
          <div className="text-xs text-white/40 mt-0.5 ml-4">
            {s.lat.toFixed(2)}°, {s.lng.toFixed(2)}°
          </div>
        </button>
      ))}
    </div>
  );
}
