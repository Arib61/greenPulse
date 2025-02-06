import type React from "react"
import type { Plot } from "../../types/optimization"

interface PlotTableProps {
  plots: Plot[]
  optimizedPlots?: Plot[]
  showOptimized: boolean
}

export const PlotTable: React.FC<PlotTableProps> = ({ plots, optimizedPlots, showOptimized }) => {
  const displayPlots = showOptimized && optimizedPlots ? optimizedPlots : plots

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2">Informations des parcelles</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2 text-left">Culture</th>
            <th className="p-2 text-left">Superficie (ha)</th>
            <th className="p-2 text-left">Eau utilisée (m³)</th>
            <th className="p-2 text-left">Profit (DH)</th>
          </tr>
        </thead>
        <tbody>
          {displayPlots.map((plot) => (
            <tr key={plot.id} className="border-t">
              <td className="p-2">{plot.cropType}</td>
              <td className="p-2">{plot.area.toFixed(2)}</td>
              <td className="p-2">{plot.waterUsage.toLocaleString()}</td>
              <td className="p-2">{plot.currentProfit.toLocaleString()} DH</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

