'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';
import { useStations } from '@/context/StationContext';
import StationEditor from '@/components/StationEditor';
import StationPanel from '@/components/StationPanel';
import StationList from '@/components/StationList';

// The Globe uses WebGL — must be client-only, no SSR
const Globe = dynamic(() => import('@/components/Globe'), { ssr: false });

interface PendingStation {
  lat: number;
  lng: number;
}

export default function ExperiencePage() {
  const { stations, selectedStation, setSelectedStation } = useStations();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingExisting, setEditingExisting] = useState(false);
  const [pendingStation, setPendingStation] = useState<PendingStation | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleAddStation = useCallback((lat: number, lng: number) => {
    setPendingStation({ lat, lng });
    setEditingExisting(false);
    setEditorOpen(true);
  }, []);

  const handleEditSelected = useCallback(() => {
    if (selectedStation) {
      setEditingExisting(true);
      setPendingStation(null);
      setEditorOpen(true);
    }
  }, [selectedStation]);

  const handleEditorClose = useCallback(() => {
    setEditorOpen(false);
    setPendingStation(null);
  }, []);

  const handleAddNew = useCallback(() => {
    setEditingExisting(false);
    setPendingStation(null);
    setEditorOpen(true);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a1050]">
      {/* Globe canvas */}
      <div className="absolute inset-0">
        <Globe
          stations={stations}
          selectedStation={selectedStation}
          onSelectStation={setSelectedStation}
          onAddStation={handleAddStation}
        />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10">
        <a
          href="/"
          className="text-white font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
          style={{ fontFamily: "'Libre Caslon Text', Georgia, serif" }}
        >
          Radio Indica
        </a>
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="text-white/70 text-sm border border-white/20 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          {sidebarOpen ? 'Hide' : 'Stations'}
        </button>
      </div>

      {/* Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white/30 text-xs pointer-events-none">
        Double-click globe to add a station · Click blip to select
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="absolute top-16 right-4 bottom-4 z-20 w-60 bg-[#0d1b6b]/90 border border-white/15 rounded-2xl p-4 overflow-y-auto backdrop-blur-sm">
          <StationList onAddNew={handleAddNew} />
        </div>
      )}

      {/* Station detail panel (bottom-right, offset when sidebar open) */}
      {selectedStation && !editorOpen && (
        <div className={sidebarOpen ? 'mr-64' : ''}>
          <StationPanel
            station={selectedStation}
            onEdit={handleEditSelected}
            onClose={() => setSelectedStation(null)}
          />
        </div>
      )}

      {/* Station editor modal */}
      {editorOpen && (
        <StationEditor
          station={editingExisting ? selectedStation : null}
          defaultLatLng={pendingStation ?? undefined}
          onClose={handleEditorClose}
        />
      )}
    </div>
  );
}
