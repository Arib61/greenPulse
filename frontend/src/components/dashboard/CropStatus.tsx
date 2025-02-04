import type React from "react"
import { Leaf, ChevronRight, Filter } from "lucide-react"
import type { CropData } from "../../types/dashboard"

interface CropStatusProps {
  crops: CropData[]
  selectedCrop: string
  setSelectedCrop: (crop: string) => void
}

export const CropStatus: React.FC<CropStatusProps> = ({ crops, selectedCrop, setSelectedCrop }) => {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">État des Cultures</h2>
        <div className="flex items-center space-x-4">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="rounded-md border-gray-300 text-sm"
          >
            <option value="all">Toutes les cultures</option>
            <option value="wheat">Blé</option>
            <option value="corn">Maïs</option>
            <option value="soy">Soja</option>
          </select>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Filter className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {crops.map((crop) => (
          <CropStatusItem key={crop.name} crop={crop} />
        ))}
      </div>
    </div>
  )
}

const CropStatusItem: React.FC<{ crop: CropData }> = ({ crop }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      case "danger":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Leaf className={getStatusColor(crop.status)} />
          <span className="font-medium">{crop.name}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${crop.status === "healthy" ? "bg-green-500" : "bg-yellow-500"}`}
            style={{ width: `${crop.progress}%` }}
          />
        </div>
      </div>
      <div className="ml-4 text-right">
        <p className="text-sm font-medium">{crop.progress}% de croissance</p>
        <p className="text-sm text-gray-500">Phase 2/4</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
    </div>
  )
}

