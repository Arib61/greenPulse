import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationPickerProps {
  onSelect: (lat: number, lng: number) => void;
}

export function LocationPicker({ onSelect }: LocationPickerProps) {
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onSelect(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleGetLocation}
        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <MapPin className="w-5 h-5 mr-2" />
        Use Current Location
      </button>
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Map will be displayed here</span>
      </div>
    </div>
  );
}