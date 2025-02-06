import type React from "react"
import { BarChart2, Droplets } from "lucide-react"
import type { Soil, OptimizationResult } from "../../types/optimization"

interface OptimizationResultsProps {
  currentSoil: Soil
  optimizationResult: OptimizationResult | null
  showOptimized: boolean
  onToggleOptimized: () => void
}

export const OptimizationResults: React.FC<OptimizationResultsProps> = ({
  currentSoil,
  optimizationResult,
  showOptimized,
  onToggleOptimized,
}) => {
  const currentTotalProfit = currentSoil.plots.reduce((sum, plot) => sum + plot.currentProfit, 0)
  const currentWaterUsage = currentSoil.plots.reduce((sum, plot) => sum + plot.waterUsage, 0)

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Résultats d'optimisation</h2>
        <button
          onClick={onToggleOptimized}
          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          disabled={!optimizationResult}
        >
          {showOptimized ? "Afficher valeurs actuelles" : "Afficher valeurs optimisées"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ResultCard
          icon={<BarChart2 className="w-5 h-5 text-green-600" />}
          label="Profit total"
          currentValue={currentTotalProfit}
          optimizedValue={optimizationResult?.totalProfit}
          showOptimized={showOptimized}
          format={(value) => `${value.toLocaleString()} DH`}
        />
        <ResultCard
          icon={<Droplets className="w-5 h-5 text-blue-600" />}
          label="Utilisation d'eau"
          currentValue={currentWaterUsage}
          optimizedValue={optimizationResult?.totalWaterUsage}
          showOptimized={showOptimized}
          format={(value) => `${value.toLocaleString()} m³`}
        />
      </div>
    </div>
  )
}

interface ResultCardProps {
  icon: React.ReactNode
  label: string
  currentValue: number
  optimizedValue: number | undefined
  showOptimized: boolean
  format: (value: number) => string
}

const ResultCard: React.FC<ResultCardProps> = ({
  icon,
  label,
  currentValue,
  optimizedValue,
  showOptimized,
  format,
}) => {
  const displayValue = showOptimized && optimizedValue ? optimizedValue : currentValue
  const difference = optimizedValue ? optimizedValue - currentValue : 0
  const percentChange = optimizedValue ? (difference / currentValue) * 100 : 0

  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <div className="text-2xl font-bold">{format(displayValue)}</div>
      {showOptimized && optimizedValue && (
        <div className={`text-sm ${difference >= 0 ? "text-green-600" : "text-red-600"}`}>
          {difference >= 0 ? "▲" : "▼"} {Math.abs(percentChange).toFixed(2)}%
        </div>
      )}
    </div>
  )
}

