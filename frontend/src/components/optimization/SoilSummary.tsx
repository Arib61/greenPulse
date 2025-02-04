import type React from "react"
import { Info, Droplets } from "lucide-react"
import type { Soil } from "../../types/optimization"

interface SoilSummaryProps {
  soil: Soil
}

export const SoilSummary: React.FC<SoilSummaryProps> = ({ soil }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <Info className="w-5 h-5 text-blue-600" />
        Résumé du sol
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Type de sol</p>
          <p className="font-semibold">{soil.type}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">pH</p>
          <p className="font-semibold">{soil.pH}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Superficie totale</p>
          <p className="font-semibold">{soil.totalArea} ha</p>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Humidité</p>
            <p className="font-semibold">{soil.moistureLevel}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

