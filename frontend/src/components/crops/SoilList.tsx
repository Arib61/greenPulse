import type React from "react";
import { SoilCard } from "./SoilCard";
import type { Sole } from "../../types/agriculture";

interface SoilListProps {
  soils: Sole[];
  selectedSoil: number | null;
  onSelectSoil: (id: number) => void;
  onDeleteSoil: (id: number) => void; // ✅ Ajout ici
}


export const SoilList: React.FC<SoilListProps> = ({ soils, selectedSoil, onSelectSoil, onDeleteSoil }) => {
  return (
    <div className="grid gap-4">
      {soils.map((soil) => (
        <SoilCard
          key={soil.id}
          soil={soil}
          isSelected={selectedSoil === soil.id}
          onSelect={() => onSelectSoil(soil.id)}
          onDelete={onDeleteSoil} // Passer la fonction de suppression
        />
      ))}
    </div>
  );
};
