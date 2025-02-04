import { useEffect, useState } from "react";
import { Plus, MapPin } from "lucide-react";
import Map from "../Map";
import { useAuth } from "../../contexts/AuthContext";
interface SoilFormModalProps {
  show: boolean;
  onClose: () => void;
  setMessage: (message: string) => void;
}

export function SoilFormModal({ show, onClose, setMessage }: SoilFormModalProps) {
  const [superficie, setSuperficie] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [soleInfo, setSoleInfo] = useState<any>(null);
  const { isAuthenticated, userId, token } = useAuth();

    useEffect(() => {
    console.log("Token:", token);
    console.log("UserId:", userId);
  }, [token, userId]);
  if (!show) return null;

  const handleCreateSole = async () => {
    if (!superficie || !localisation) {
      setMessage("❌ Veuillez remplir tous les champs et sélectionner une localisation.");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const response = await fetch("http://localhost:8080/api/soles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          superficie: parseFloat(superficie),
          localisation,
          agriculteurId: localStorage.getItem("userId"),
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Erreur lors de la création de la sole.");
      }

      setSoleInfo(responseData);
      setMessage("✅ Sole créée avec succès !");
      setSuperficie("");
      setLocalisation("");
      setTimeout(() => {
        onClose(); // Ferme la modal après un court délai
      }, 1500);
    } catch (err) {
      setMessage("❌ Impossible de créer la sole.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Ajouter une Sole</h2>

        <input
          type="number"
          placeholder="Superficie (m²)"
          value={superficie}
          onChange={(e) => setSuperficie(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm p-2 mb-3"
        />

        <input
          type="text"
          placeholder="Localisation"
          value={localisation}
          readOnly
          className="block w-full rounded-md border-gray-300 shadow-sm p-2 mb-3 bg-gray-100"
        />

        <button
          className="w-full bg-indigo-600 text-white p-3 rounded-lg flex items-center justify-center gap-2 mb-3"
          onClick={() => setShowMap(!showMap)}
        >
          <MapPin className="w-5 h-5" />
          📍 Sélectionner sur la carte
        </button>

        {showMap && (
          <Map
            onSelectLocation={(locationName) => {
              setLocalisation(locationName);
              setShowMap(false); // Fermer la carte après sélection
            }}
          />
        )}

        <button
          onClick={handleCreateSole}
          className="w-full bg-green-600 text-white p-3 rounded-lg mb-3"
          disabled={loading}
        >
          {loading ? "Création en cours..." : "Valider la Sole"}
        </button>

        <button onClick={onClose} className="w-full bg-gray-500 text-white p-3 rounded-lg">
          Annuler
        </button>
      </div>
    </div>
  );
}
