import type React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import type { Soil, OptimizationResult } from "../../types/optimization"

interface VisualizationSectionProps {
  currentSoil: Soil
  optimizationResult: OptimizationResult | null
  showOptimized: boolean
}

export const VisualizationSection: React.FC<VisualizationSectionProps> = ({
  currentSoil,
  optimizationResult,
  showOptimized,
}) => {
  const pieChartData = (
    showOptimized && optimizationResult ? optimizationResult.optimizedPlots : currentSoil.plots
  ).map((plot) => ({
    name: plot.cropType,
    value: plot.area,
  }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Répartition des cultures</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

