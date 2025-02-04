import {useEffect, useState } from "react"
import { DashboardLayout } from "../layouts/DashboardLayout"
import { QuickStats } from "../components/dashboard/QuickStats"
import { WeatherSection } from "../components/dashboard/WeatherSection"
import { AlertsAndTasks } from "../components/dashboard/AlertsandTasks"
import { CropStatus } from "../components/dashboard/CropStatus"
import { FarmMap } from "../components/dashboard/FarmMap"
import { weatherData, crops } from "../data/dashboard"
import { useAuth } from "../contexts/AuthContext";


export function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"day" | "week" | "month">("day")
  const [selectedCrop, setSelectedCrop] = useState<string>("all")
  const { isAuthenticated, userId, token } = useAuth();
  useEffect(() => {
    console.log("Token:", token);
    console.log("UserId:", userId);
  }, [token, userId]);

  if (!isAuthenticated || !userId || !token) {
    return (
      <DashboardLayout>
        <div className="text-center text-red-500 text-lg font-bold mt-10">
          ❌ Vous devez être connecté pour voir cette page.
        </div>
      </DashboardLayout>
    );
  }  
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

  