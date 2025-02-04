import type React from "react"
import { Leaf, ChevronRight } from "lucide-react"
import type { CropData, SoilCropData } from "../../types/agriculture.ts"


interface CropCardProps {
  crop: CropData
  soil?: SoilCropData
}

export const CropCard: React.FC<CropCardProps> = ({ crop, soil }) => {
  const getStatusColor = (status: CropData["status"]) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "needs-water":
        return "bg-yellow-100 text-yellow-800"
      case "pest-detected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold">{crop.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(crop.status)}`}>
              {crop.status === "healthy"
                ? "Sain"
                : crop.status === "needs-water"
                  ? "Besoin d'eau"
                  : "Parasites détectés"}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Planté le {new Date(crop.plantedDate).toLocaleDateString()}</p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Progression</span>
            <span>{crop.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${crop.progress}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-green-600">Récolte prévue</div>
            <div className="font-medium">{new Date(crop.expectedHarvest).toLocaleDateString()}</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600">Sol</div>
            <div className="font-medium">{soil?.name || "Non spécifié"}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

