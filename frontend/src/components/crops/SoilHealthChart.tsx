import type React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { getSoilHealthData } from "../../data/crops.ts"

interface SoilHealthChartProps {
  soilId: string
}

export const SoilHealthChart: React.FC<SoilHealthChartProps> = ({ soilId }) => {
  const soilHealthData = getSoilHealthData(soilId)

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={soilHealthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="ph" stroke="#10B981" />
          <Line type="monotone" dataKey="moisture" stroke="#3B82F6" />
          <Line type="monotone" dataKey="nitrogen" stroke="#8B5CF6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

