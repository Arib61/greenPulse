import type React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { WeatherData } from "../../types/dashboard"

interface WeatherChartProps {
  data: WeatherData[]
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#ff7300" />
        <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#387908" />
        <Line yAxisId="right" type="monotone" dataKey="rainfall" stroke="#0088FE" />
      </LineChart>
    </ResponsiveContainer>
  )
}

