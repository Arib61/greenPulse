import type React from "react"
import { CropCard } from "./CropCard"
import type { CropData, SoilCropData } from "../../types/agriculture.ts"

interface CropListProps {
  crops: CropData[]
  soils: SoilCropData[]
}

export const CropList: React.FC<CropListProps> = ({ crops, soils }) => {
  return (
    <div className="grid gap-4">
      {crops.map((crop) => (
        <CropCard key={crop.id} crop={crop} soil={soils.find((s) => s.id === crop.soilId)} />
      ))}
    </div>
  )
}

