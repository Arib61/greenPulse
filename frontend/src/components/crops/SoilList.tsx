import type React from "react"
import { SoilCard } from "./SoilCard"
import type { SoilCropData } from "../../types/agriculture"

interface SoilListProps {
  soils: SoilCropData[]
  selectedSoil: string | null
  onSelectSoil: (id: string) => void
}

export const SoilList: React.FC<SoilListProps> = ({ soils, selectedSoil, onSelectSoil }) => {
  return (
    <div className="grid gap-4">
      {soils.map((soil) => (
        <SoilCard
          key={soil.id}
          soil={soil}
          isSelected={selectedSoil === soil.id}
          onSelect={() => onSelectSoil(soil.id)}
        />
      ))}
    </div>
  )
}

