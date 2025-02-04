import React from 'react';
import { MapPin, Wheat } from 'lucide-react';
import { SoilData, ValueStatus } from '../../types/agriculture';
import { SoilParameterCard } from './SoilParameterCard';

interface SoilDataCardProps {
  soil: SoilData;
}

export function SoilDataCard({ soil }: SoilDataCardProps) {
  const getValueStatus = (value: number, range: [number, number]): ValueStatus => {
    if (value < range[0]) return 'low';
    if (value > range[1]) return 'high';
    return 'optimal';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">{soil.name}</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{soil.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wheat className="w-6 h-6 text-green-600" />
          <span className="text-lg font-semibold text-green-600">85% Compatible</span>
        </div>
      </div>

      <div className="grid gap-4">
        {Object.entries(soil.data).map(([key, value]) => (
          <SoilParameterCard
            key={key}
            name={key}
            value={value}
            min={soil.optimalRanges[key as keyof typeof soil.optimalRanges][0]}
            max={soil.optimalRanges[key as keyof typeof soil.optimalRanges][1]}
            status={getValueStatus(
              value,
              soil.optimalRanges[key as keyof typeof soil.optimalRanges]
            )}
          />
        ))}
      </div>
    </div>
  );
}