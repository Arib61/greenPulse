import { useState, useEffect } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Plus } from "lucide-react";
import { SoilList } from "../components/crops/SoilList";
import { CropList } from "../components/crops/CropList";
import { Sidebar } from "../components/crops/SideBar";
import { SoilFormModal } from "../components/crops/SoilFormModal";
import { useAuth } from "../contexts/AuthContext";
import { Sole, SoilParameters, Crop } from "../types/agriculture";

export function CropManagement() {
  const { isAuthenticated, userId, token } = useAuth();
  const [soles, setSoles] = useState<Sole[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [selectedSoleId, setSelectedSoleId] = useState<number | null>(null);
  const [soilData, setSoilData] = useState<Sole | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState<"soil" | "crops">("soil");
  const [showSoleForm, setShowSoleForm] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectSole = (soleId: number) => {
    setSelectedSoleId(soleId);
  };

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

  // 🔹 Charger la liste des soles dynamiquement
  useEffect(() => {
    const fetchSoles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8080/api/soles/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Erreur lors du chargement des soles.");
        const data: Sole[] = await response.json();
        setSoles(data);
      } catch (err) {
        console.error(err);
        setError("Pas de soles disponibles.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSoles();
  }, [token]);

  // 🔹 Charger la liste des cultures **uniquement si l'onglet "cultures" est sélectionné**
  useEffect(() => {
    if (selectedView !== "crops") return; // Charge seulement si "crops" est actif

    const fetchCrops = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8080/api/crops`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Pas de culture disponibles.");
        const data: Crop[] = await response.json();
        setCrops(data);
      } catch (err) {
        console.error(err);
        setError("Cultures indisponibles.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCrops();
  }, [selectedView, token]);

  // 🔹 Charger les paramètres chimiques et climatiques d'une sole sélectionnée
  useEffect(() => {
    if (!selectedSoleId || !token) return;
  
    const fetchSoilData = async () => {
      setIsLoading(true);
      try {
        // 🔹 Récupérer la sole
        const responseSole = await fetch(`http://127.0.0.1:8080/api/soles/${selectedSoleId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!responseSole.ok) throw new Error("Soles indisponibles.");
        const soleData = await responseSole.json();
  
        // 🔹 Récupérer les paramètres chimiques et climatiques
        const [responseChimique, responseClimatique] = await Promise.all([
          fetch(`http://127.0.0.1:8080/api/parametres-chimiques/sole/${selectedSoleId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`http://127.0.0.1:8080/api/parametres-climatiques/sole/${selectedSoleId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
  
        const chimiqueData = responseChimique.ok ? await responseChimique.json() : null;
        const climatiqueData = responseClimatique.ok ? await responseClimatique.json() : null;
  
        // 🔹 Mise à jour de `soilData` avec uniquement les paramètres nécessaires
        setSoilData({
          id: selectedSoleId,
          localisation: soleData?.localisation ?? "Inconnu",
          superficie: soleData?.superficie ?? 0,
          parameters: {
            id: selectedSoleId,
            nitrogen: chimiqueData?.nitrogen ?? null,
            ph: chimiqueData?.ph ?? null,
            cationExchangeCapacity: chimiqueData?.cationExchangeCapacity ?? null,
            temperature: climatiqueData?.temperature ?? null,
            humidity: climatiqueData?.humidity ?? null,
          }
        } as Sole); // ✅ Maintenant TypeScript reconnaît l'objet comme un `Sole`
        // ✅ Maintenant TypeScript accepte l'affectation
         // ✅ Force TypeScript à comprendre qu'on retourne un `Sole`
        
        
        
  
        // 🔹 Mettre à jour la liste des soles avec les données complètes
        setSoles((prevSoles) =>
          prevSoles.map((sole) =>
            sole.id === selectedSoleId
              ? { ...sole, localisation: soleData?.localisation ?? "Inconnu", superficie: soleData?.superficie ?? 0 }
              : sole
          )
        );
  
      } catch (err) {
        console.error("Erreur lors de la récupération des paramètres :", err);
        setSoilData(null);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchSoilData();
  }, [selectedSoleId, token]);
 
  
  

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Message d'erreur si une erreur est survenue */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Sélection d'une vue entre "sols" et "cultures" */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {selectedView === "soil" ? "Gestion des Soles" : "Gestion des Cultures"}
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedView("soil")}
              className={`px-4 py-2 ${selectedView === "soil" ? "bg-green-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              Sols
            </button>
            <button
              onClick={() => setSelectedView("crops")}
              className={`px-4 py-2 ${selectedView === "crops" ? "bg-green-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              Cultures
            </button>
    <button
                    onClick={() => setShowSoleForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Ajouter un Sol
                </button>
          </div>
        </div>

        {/* Liste déroulante des soles */}
        {selectedView === "soil" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Sélectionnez un Sol</h2>
            <select
              onChange={(e) => handleSelectSole(Number(e.target.value))}
              value={selectedSoleId || ""}
              className="block w-full p-2 border rounded-md"
            >
              <option value="">-- Choisissez un sol --</option>
              {soles.map((sole) => (
                <option key={sole.id} value={sole.id}>
                  Sole {sole.id} - {sole.localisation} ({sole.superficie} m²)
                </option>
              ))}
            </select>
          </div>
        )}

    <div className="lg:col-span-2 space-y-6">
      {isLoading ? (
        <p className="text-gray-500 text-center">Chargement...</p>
      ) : selectedView === "soil" ? (
        soilData ? (
          <SoilList 
        soils={soilData ? [{ 
          ...soilData, 
          localisation: soles.find(s => s.id === selectedSoleId)?.localisation ?? "Inconnu", 
          superficie: soles.find(s => s.id === selectedSoleId)?.superficie ?? 0 
        }] : []} 
        selectedSoil={selectedSoleId}
        onSelectSoil={(id) => setSelectedSoleId(Number(id))}
        onDeleteSoil={(id) => setSoles(prev => prev.filter(s => s.id !== id))} // ✅ Ajout de la gestion de suppression
      />


        ) : (
          <p className="text-gray-500 text-center">Sélectionnez un sol.</p>
        )
      ) : (
        <CropList crops={crops} soils={soles} />
      )}
    </div>


        {/* Sidebar */}
        <Sidebar />
      </div>
{/* Modal pour la création de Sole */}
        {showSoleForm && (
          <SoilFormModal
            show={showSoleForm}
            onClose={() => setShowSoleForm(false)}
            setMessage={setMessage}
          />
        )}
    </DashboardLayout>
  );
}
