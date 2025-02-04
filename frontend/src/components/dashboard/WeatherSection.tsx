import type React from "react"
import { Sun, Droplets, MapPin } from "lucide-react"
import { WeatherChart } from "./WeatherChart"
import type { WeatherData } from "../../types/dashboard"

interface WeatherSectionProps {
  weatherData: WeatherData[]
  selectedTimeframe: "day" | "week" | "month"
  setSelectedTimeframe: (timeframe: "day" | "week" | "month") => void
}

export const WeatherSection: React.FC<WeatherSectionProps> = ({
  weatherData,
  selectedTimeframe,
  setSelectedTimeframe,
}) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Météo</h2>
          <div className="flex items-center space-x-2">
            <TimeframeButton
              timeframe="day"
              selectedTimeframe={selectedTimeframe}
              setSelectedTimeframe={setSelectedTimeframe}
            />
            <TimeframeButton
              timeframe="week"
              selectedTimeframe={selectedTimeframe}
              setSelectedTimeframe={setSelectedTimeframe}
            />
            <TimeframeButton
              timeframe="month"
              selectedTimeframe={selectedTimeframe}
              setSelectedTimeframe={setSelectedTimeframe}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <WeatherInfoCard
            icon={<Sun className="w-8 h-8 text-orange-500" />}
            value="25°C"
            label="Température"
            bgColor="bg-orange-50"
          />
          <WeatherInfoCard
            icon={<Droplets className="w-8 h-8 text-blue-500" />}
            value="65%"
            label="Humidité"
            bgColor="bg-blue-50"
          />
          <WeatherInfoCard
            icon={<MapPin className="w-8 h-8 text-green-500" />}
            value="Tanger-Tétouan-Al Hoceima"
            label="Région"
            bgColor="bg-green-50"
          />
        </div>

        <WeatherChart data={weatherData} />
      </div>
    </div>
  )
}

interface TimeframeButtonProps {
  timeframe: "day" | "week" | "month"
  selectedTimeframe: "day" | "week" | "month"
  setSelectedTimeframe: (timeframe: "day" | "week" | "month") => void
}

const TimeframeButton: React.FC<TimeframeButtonProps> = ({ timeframe, selectedTimeframe, setSelectedTimeframe }) => (
  <button
    onClick={() => setSelectedTimeframe(timeframe)}
    className={`px-3 py-1 rounded-md text-sm ${
      selectedTimeframe === timeframe ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {timeframe === "day" ? "Jour" : timeframe === "week" ? "Semaine" : "Mois"}
  </button>
)

interface WeatherInfoCardProps {
  icon: React.ReactNode
  value: string
  label: string
  bgColor: string
}

const WeatherInfoCard: React.FC<WeatherInfoCardProps> = ({ icon, value, label, bgColor }) => (
  <div className={`flex items-center space-x-3 p-3 ${bgColor} rounded-lg`}>
    {icon}
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  </div>
)

