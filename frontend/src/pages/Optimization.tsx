import { useState, useEffect } from "react"
import { DashboardLayout } from "../layouts/DashboardLayout"
import { SoilSelection } from "../components/optimization/SoilSelection"
import { SoilSummary } from "../components/optimization/SoilSummary"
import { PlotTable } from "../components/optimization/PlotTable"
import { OptimizationResults } from "../components/optimization/OptimizationResults"
import { VisualizationSection } from "../components/optimization/VisualizationSection"
import { CropCalendar } from "../components/optimization/CropCalendar"
import { MaintenanceSchedule } from "../components/optimization/MaintenanceSchedule"
import { optimizeResources } from "../utils/optimizationLogic"
import type { Soil, OptimizationResult, MaintenanceTask } from "../types/optimization"
import { initialSoils } from "../data/optimization"

export function Optimization() {
  const [soils, setSoils] = useState<Soil[]>(initialSoils)
  const [selectedSoil, setSelectedSoil] = useState<Soil | null>(null)
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null)
  const [showOptimized, setShowOptimized] = useState(false)
  const [activeTab, setActiveTab] = useState<"calendar" | "maintenance">("calendar")

  useEffect(() => {
    if (selectedSoil) {
      setOptimizationResult(null)
      setShowOptimized(false)
    }
  }, [selectedSoil])

  const handleSoilSelect = (soilId: string) => {
    const soil = soils.find((s) => s.id === soilId)
    setSelectedSoil(soil || null)
  }

  const handleOptimize = () => {
    if (selectedSoil) {
      const result = optimizeResources(selectedSoil)
      setOptimizationResult(result)
      setShowOptimized(true)
    }
  }

  const handleTaskComplete = (taskId: string) => {
    if (selectedSoil) {
      const updatedTasks = selectedSoil.maintenanceTasks.map((task) =>
        task.id === taskId ? { ...task, status: "completed" as MaintenanceTask["status"] } : task,
      )
      const updatedSoil = { ...selectedSoil, maintenanceTasks: updatedTasks }
      setSoils(soils.map((soil) => (soil.id === updatedSoil.id ? updatedSoil : soil)))
      setSelectedSoil(updatedSoil)
    }
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Optimisation des Ressources</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="space-y-6">
          <SoilSelection soils={soils} onSelect={handleSoilSelect} />
          {selectedSoil && (
            <>
              <SoilSummary soil={selectedSoil} />
              <PlotTable
                plots={selectedSoil.plots}
                optimizedPlots={optimizationResult?.optimizedPlots}
                showOptimized={showOptimized}
              />
              <button
                onClick={handleOptimize}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Optimiser les ressources
              </button>
            </>
          )}
        </div>
        <div className="space-y-6">
          {selectedSoil && (
            <>
              <OptimizationResults
                currentSoil={selectedSoil}
                optimizationResult={optimizationResult}
                showOptimized={showOptimized}
                onToggleOptimized={() => setShowOptimized(!showOptimized)}
              />
              <VisualizationSection
                currentSoil={selectedSoil}
                optimizationResult={optimizationResult}
                showOptimized={showOptimized}
              />
            </>
          )}
        </div>
      </div>

      {selectedSoil && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Calendrier des Cultures</h2>
              <button
                onClick={() => setActiveTab(activeTab === "calendar" ? "maintenance" : "calendar")}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
              >
                {activeTab === "calendar" ? "Voir Planning de Maintenance" : "Voir Calendrier des Cultures"}
              </button>
            </div>
            {activeTab === "calendar" ? (
              <CropCalendar soil={selectedSoil} events={selectedSoil.events} />
            ) : (
              <MaintenanceSchedule tasks={selectedSoil.maintenanceTasks} onTaskComplete={handleTaskComplete} />
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}


