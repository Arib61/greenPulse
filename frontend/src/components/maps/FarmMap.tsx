import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface Location {
  lat: number;
  lng: number;
  label: string;
}

interface FarmMapProps {
  center: { lat: number; lng: number };
  locations: Location[];
  onMarkerClick?: (location: Location) => void;
}

const containerStyle = {
  width: '100%',
  height: '400px'
};

export function FarmMap({ center, locations, onMarkerClick }: FarmMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
    >
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
          title={location.label}
          onClick={() => onMarkerClick?.(location)}
        />
      ))}
    </GoogleMap>
  );
}