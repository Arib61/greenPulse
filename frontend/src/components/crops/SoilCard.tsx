import { useState } from "react";
import { MapPin, Edit, Trash2 } from "lucide-react";
import type { Sole } from "../../types/agriculture";
import { SoilHealthChart } from "./SoilHealthChart.tsx";
import { useAuth } from "../../contexts/AuthContext"; // Utilisation correcte du token

interface SoilCardProps {
  soil: Sole;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: (id: number) => void; // Ajout de la fonction de suppression
}

export const SoilCard: React.FC<SoilCardProps> = ({ soil, isSelected, onSelect, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { token } = useAuth(); // 🔹 Récupération du token via useAuth()

  const handleDelete = async () => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer la Sole ${soil.id} ?`)) return;

    setIsDeleting(true);

    // 🔹 Vérification et récupération sécurisée du token
    const authToken = token || localStorage.getItem("token");
    if (!authToken) {
      console.error("❌ Erreur : Aucun token JWT disponible !");
      alert("Erreur d'authentification : Token invalide ou expiré.");
      setIsDeleting(false);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8080/api/soles/${soil.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken.trim()}`, // 🔹 Nettoyage du token pour éviter les erreurs
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur lors de la suppression : ${errorText}`);
      }

      onDelete(soil.id); // 🔹 Mise à jour de l'UI après suppression
    } catch (err) {
      console.error("❌ Erreur de suppression :", err);
      alert("Impossible de supprimer la sole. Vérifiez votre connexion et les permissions.");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-sm border-2 transition-colors ${
        isSelected ? "border-green-500" : "border-transparent"
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">Sole {soil.id}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{soil.localisation}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Edit className="w-5 h-5 text-gray-500" />
          </button>
          <button
            className="p-2 hover:bg-red-50 rounded-lg"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className={`w-5 h-5 ${isDeleting ? "opacity-50" : "text-red-500"}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-600 mb-1">Surface</div>
          <div className="font-semibold">{soil.superficie ?? "N/A"} m²</div>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="text-sm text-green-600 mb-1">pH</div>
          <div className="font-semibold">{soil.parameters?.ph ?? "N/A"}</div>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg">
          <div className="text-sm text-yellow-600 mb-1">Humidité</div>
          <div className="font-semibold">{soil.parameters?.humidity ?? "N/A"}%</div>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg">
          <div className="text-sm text-purple-600 mb-1">Azote</div>
          <div className="font-semibold">{soil.parameters?.nitrogen ?? "N/A"}%</div>
        </div>
      </div>

      <SoilHealthChart soilId={soil.id} />
    </div>
  );
};
