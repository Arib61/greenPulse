import React from 'react';
import { SoilData } from '../../types/agriculture';

interface SoilSelectorProps {
  soils: SoilData[];
  selectedSoilId: string;
  onSelect: (id: string) => void;
}

export function SoilSelector({ soils, selectedSoilId, onSelect }: SoilSelectorProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Sélectionnez une parcelle
      </label>
      <select
        value={selectedSoilId}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
      >
        <option value="">Choisir une parcelle</option>
        {soils.map(soil => (
          <option key={soil.id} value={soil.id}>
            {soil.name} - {soil.location}
          </option>
        ))}
      </select>
    </div>
  );
}