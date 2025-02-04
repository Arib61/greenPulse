import type { WeatherData, CropData } from "../types/dashboard"

export const weatherData: WeatherData[] = [
  { time: "6:00", temperature: 18, humidity: 65, rainfall: 0 },
  { time: "9:00", temperature: 22, humidity: 60, rainfall: 0 },
  { time: "12:00", temperature: 25, humidity: 55, rainfall: 0 },
  { time: "15:00", temperature: 24, humidity: 58, rainfall: 2 },
  { time: "18:00", temperature: 21, humidity: 62, rainfall: 0 },
]

export const crops: CropData[] = [
  { name: "Blé", status: "healthy", progress: 75 },
  { name: "Maïs", status: "warning", progress: 45 },
  { name: "Soja", status: "healthy", progress: 60 },
]

