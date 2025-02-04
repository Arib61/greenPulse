import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MapProps {
  onSelectLocation: (locationName: string) => void; // Retourne le nom de la localisation
}

const Map: React.FC<MapProps> = ({ onSelectLocation }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  async function reverseGeocode(lat: number, lon: number) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      return data.display_name || "Localisation inconnue";
    } catch (error) {
      console.error("Erreur lors de la récupération du nom de la localisation :", error);
      return "Localisation inconnue";
    }
  }

  function LocationMarker() {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);

        const locationName = await reverseGeocode(lat, lng);
        onSelectLocation(locationName); // Envoie le nom de l’endroit sélectionné
      },
    });

    return position === null ? null : <Marker position={position} icon={customIcon} />;
  }

  return (
    <MapContainer
      center={[31.7917, -7.0926]} // Centre du Maroc
      zoom={6}
      style={{ height: "400px", width: "100%" }}
      className="rounded-lg shadow-md"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default Map;
