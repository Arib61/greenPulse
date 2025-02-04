import { useState } from "react"
import { DashboardLayout } from "../layouts/DashboardLayout"
import { Plus } from "lucide-react"
import { SoilList } from "../components/crops/SoilList"
import { CropList } from "../components/crops/CropList"
import { Sidebar } from "../components/crops/SideBar"
import { SoilFormModal } from "../components/crops/SoilFormModal"
import { soils, crops } from "../data/crops"
export function CropManagement() {
  const [showSoilForm, setShowSoilForm] = useState(false)
  const [selectedSoil, setSelectedSoil] = useState<string | null>(null)
  const [selectedView, setSelectedView] = useState<"soil" | "crops">("soil")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestion des Cultures</h1>
          <div className="flex items-center space-x-4">
            <div className="flex rounded-lg overflow-hidden border">
              <button
                onClick={() => setSelectedView("soil")}
                className={`px-4 py-2 ${
                  selectedView === "soil" ? "bg-green-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Sols
              </button>
              <button
                onClick={() => setSelectedView("crops")}
                className={`px-4 py-2 ${
                  selectedView === "crops" ? "bg-green-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Cultures
              </button>
            </div>
            <button
              onClick={() => setShowSoilForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Ajouter {selectedView === "soil" ? "un sol" : "une culture"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {selectedView === "soil" ? (
              <SoilList soils={soils} selectedSoil={selectedSoil} onSelectSoil={setSelectedSoil} />
            ) : (
              <CropList crops={crops} soils={soils} />
            )}
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>

      {/* Soil Form Modal */}
      <SoilFormModal show={showSoilForm} onClose={() => setShowSoilForm(false)} />
    </DashboardLayout>
  )
}

