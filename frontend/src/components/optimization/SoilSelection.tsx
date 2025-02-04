import type React from "react"
import { MapPin } from "lucide-react"
import type { Soil } from "../../types/optimization"

interface SoilSelectionProps {
  soils: Soil[]
  onSelect: (soilId: string) => void
}

export const SoilSelection: React.FC<SoilSelectionProps> = ({ soils, onSelect }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-green-600" />
        Sélection du sol
      </h2>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Sélectionnez un sol</option>
        {soils.map((soil) => (
          <option key={soil.id} value={soil.id}>
            {soil.name} - {soil.type} ({soil.totalArea} ha)
          </option>
        ))}
      </select>
    </div>
  )
}

