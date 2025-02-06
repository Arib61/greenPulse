import type { SoilCropData, CropData, SoilHealthData } from "../types/agriculture"

export const crops: CropData[] = [
  {
    id: "1",
    name: "Blé",
    status: "healthy",
    soilId: "1",
    progress: 75,
    plantedDate: "2024-01-15",
    expectedHarvest: "2024-06-15",
  },
  // Add more crops...
]

const soilHealthData: Record<string, SoilHealthData[]> = {
  "1": [
    { date: "01/01", ph: 6.8, moisture: 65, nitrogen: 75 },
    { date: "01/02", ph: 6.7, moisture: 68, nitrogen: 73 },
    { date: "01/03", ph: 6.9, moisture: 70, nitrogen: 78 },
    { date: "01/04", ph: 7.0, moisture: 67, nitrogen: 80 },
    { date: "01/05", ph: 6.8, moisture: 65, nitrogen: 77 },
  ],
  // Add data for other soils...
}

export function getSoilHealthData(soilId: string): SoilHealthData[] {
  return soilHealthData[soilId] || []
}

export const soils: SoilCropData[] = [
    {
        id: "1",
        name: "Parcelle Nord",
        area: 5000,
        coordinates: { latitude: 34.0479, longitude: -5.0033 },
        location: "Tanger-Tétouan-Al Hoceima",
        ph: 6.8,
        moisture: 65,
        nutrients: {
          nitrogen: 75,
          phosphorus: 60,
          potassium: 80,
        },
      },
      // Add more soil samples...
    ]