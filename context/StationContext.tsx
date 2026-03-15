'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import type { Station } from '@/lib/types';

interface StationContextValue {
  stations: Station[];
  selectedStation: Station | null;
  setSelectedStation: (station: Station | null) => void;
  addStation: (station: Omit<Station, 'id' | 'createdAt'>) => void;
  updateStation: (id: string, updates: Partial<Omit<Station, 'id' | 'createdAt'>>) => void;
  deleteStation: (id: string) => void;
}

const StationContext = createContext<StationContextValue | null>(null);

const INITIAL_STATIONS: Station[] = [
  {
    id: '1',
    name: 'Delhi Live',
    lat: 28.6139,
    lng: 77.209,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Live music and culture from New Delhi.',
    createdBy: 'system',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Mumbai Waves',
    lat: 19.076,
    lng: 72.8777,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Soundscapes from the city of dreams.',
    createdBy: 'system',
    createdAt: new Date().toISOString(),
  },
];

export function StationProvider({ children }: { children: ReactNode }) {
  const [stations, setStations] = useState<Station[]>(INITIAL_STATIONS);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const addStation = useCallback(
    (data: Omit<Station, 'id' | 'createdAt'>) => {
      const newStation: Station = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setStations((prev) => [...prev, newStation]);
      setSelectedStation(newStation);
    },
    [],
  );

  const updateStation = useCallback(
    (id: string, updates: Partial<Omit<Station, 'id' | 'createdAt'>>) => {
      setStations((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
      );
      setSelectedStation((prev) =>
        prev?.id === id ? { ...prev, ...updates } : prev,
      );
    },
    [],
  );

  const deleteStation = useCallback((id: string) => {
    setStations((prev) => prev.filter((s) => s.id !== id));
    setSelectedStation((prev) => (prev?.id === id ? null : prev));
  }, []);

  return (
    <StationContext.Provider
      value={{
        stations,
        selectedStation,
        setSelectedStation,
        addStation,
        updateStation,
        deleteStation,
      }}
    >
      {children}
    </StationContext.Provider>
  );
}

export function useStations() {
  const ctx = useContext(StationContext);
  if (!ctx) throw new Error('useStations must be used inside StationProvider');
  return ctx;
}
