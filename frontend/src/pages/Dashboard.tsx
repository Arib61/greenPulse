import { useState } from "react"
import { DashboardLayout } from "../layouts/DashboardLayout"
import { QuickStats } from "../components/dashboard/QuickStats"
import { WeatherSection } from "../components/dashboard/WeatherSection"
import { AlertsAndTasks } from "../components/dashboard/AlertsandTasks"
import { CropStatus } from "../components/dashboard/CropStatus"
import { FarmMap } from "../components/dashboard/FarmMap"
import { weatherData, crops } from "../data/dashboard"

export function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"day" | "week" | "month">("day")
  const [selectedCrop, setSelectedCrop] = useState<string>("all")

  return (
    <DashboardLayout>
      <QuickStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <WeatherSection
          weatherData={weatherData}
          selectedTimeframe={selectedTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
        />

        <AlertsAndTasks />

        <CropStatus crops={crops} selectedCrop={selectedCrop} setSelectedCrop={setSelectedCrop} />

        <FarmMap />
      </div>
    </DashboardLayout>
  )
}

