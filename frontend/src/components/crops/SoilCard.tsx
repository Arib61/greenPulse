import type React from "react"
import { MapPin, Edit, Trash2 } from "lucide-react"
import type { SoilCropData } from "../../types/agriculture"
import { SoilHealthChart } from "./SoilHealthChart.tsx"

interface SoilCardProps {
  soil: SoilCropData
  isSelected: boolean
  onSelect: () => void
}

export const SoilCard: React.FC<SoilCardProps> = ({ soil, isSelected, onSelect }) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-sm border-2 transition-colors ${
        isSelected ? "border-green-500" : "border-transparent"
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{soil.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{soil.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Edit className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-red-50 rounded-lg">
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-600 mb-1">Surface</div>
          <div className="font-semibold">{soil.area} m²</div>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="text-sm text-green-600 mb-1">pH</div>
          <div className="font-semibold">{soil.ph}</div>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg">
          <div className="text-sm text-yellow-600 mb-1">Humidité</div>
          <div className="font-semibold">{soil.moisture}%</div>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg">
          <div className="text-sm text-purple-600 mb-1">Azote</div>
          <div className="font-semibold">{soil.nutrients.nitrogen}%</div>
        </div>
      </div>

      <SoilHealthChart soilId={soil.id} />
    </div>
  )
}

