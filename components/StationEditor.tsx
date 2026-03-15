'use client';

import { useState, useEffect, FormEvent } from 'react';
import type { Station } from '@/lib/types';
import { useStations } from '@/context/StationContext';

interface StationEditorProps {
  station: Station | null;
  /** When station is null and defaultLatLng provided → create mode */
  defaultLatLng?: { lat: number; lng: number };
  onClose: () => void;
}

export default function StationEditor({
  station,
  defaultLatLng,
  onClose,
}: StationEditorProps) {
  const { addStation, updateStation, deleteStation } = useStations();
  const isEdit = Boolean(station);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [createdBy, setCreatedBy] = useState('');

  useEffect(() => {
    if (station) {
      setName(station.name);
      setDescription(station.description);
      setUrl(station.url);
      setLat(String(station.lat));
      setLng(String(station.lng));
      setCreatedBy(station.createdBy);
    } else if (defaultLatLng) {
      setLat(String(defaultLatLng.lat));
      setLng(String(defaultLatLng.lng));
    }
  }, [station, defaultLatLng]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const data = {
      name: name.trim(),
      description: description.trim(),
      url: url.trim(),
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      createdBy: createdBy.trim() || 'anonymous',
    };
    if (isEdit && station) {
      updateStation(station.id, data);
    } else {
      addStation(data);
    }
    onClose();
  }

  function handleDelete() {
    if (station && confirm(`Delete station "${station.name}"?`)) {
      deleteStation(station.id);
      onClose();
    }
  }

  return (
    /* backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#0d1b6b] border border-white/20 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl text-white">
        <h2 className="text-2xl font-bold mb-6 tracking-tight">
          {isEdit ? 'Edit Station' : 'New Station'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Name" required>
            <input
              className={INPUT_CLS}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Station name"
            />
          </Field>

          <Field label="Description">
            <textarea
              className={`${INPUT_CLS} resize-none`}
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
            />
          </Field>

          <Field label="YouTube / Stream URL">
            <input
              className={INPUT_CLS}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/..."
              type="url"
            />
          </Field>

          <div className="flex gap-3">
            <Field label="Latitude" required className="flex-1">
              <input
                className={INPUT_CLS}
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
                type="number"
                step="any"
                min={-90}
                max={90}
              />
            </Field>
            <Field label="Longitude" required className="flex-1">
              <input
                className={INPUT_CLS}
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
                type="number"
                step="any"
                min={-180}
                max={180}
              />
            </Field>
          </div>

          <Field label="Created by">
            <input
              className={INPUT_CLS}
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              placeholder="Your name or handle"
            />
          </Field>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-white text-[#0d1b6b] font-bold py-2.5 rounded-lg hover:bg-blue-100 transition-colors"
            >
              {isEdit ? 'Save Changes' : 'Add Station'}
            </button>
            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2.5 rounded-lg border border-red-400 text-red-400 hover:bg-red-400/20 transition-colors"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-white/30 text-white/70 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const INPUT_CLS =
  'w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm';

function Field({
  label,
  children,
  required,
  className,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
