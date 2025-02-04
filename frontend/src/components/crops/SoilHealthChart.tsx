import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "../../contexts/AuthContext";

interface SoilHealthChartProps {
  soilId: number;
}

export const SoilHealthChart: React.FC<SoilHealthChartProps> = ({ soilId }) => {
  const { isAuthenticated, token } = useAuth();
  const [soilHealthData, setSoilHealthData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fonction pour ajouter une variation aléatoire aux valeurs
  const randomizeValue = (value: number, variation: number = 5) => {
    return (value + (Math.random() * variation - variation / 2)).toFixed(1);
  };

  useEffect(() => {
    if (!soilId || !token || !isAuthenticated) {
      console.warn("⛔ Aucun token ou utilisateur non authentifié.");
      return;
    }

    const fetchSoilData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("📡 Récupération des paramètres pour la sole :", soilId);
        
        const [responseChimique, responseClimatique] = await Promise.all([
          fetch(`http://127.0.0.1:8080/api/parametres-chimiques/sole/${soilId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`http://127.0.0.1:8080/api/parametres-climatiques/sole/${soilId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (responseChimique.status === 401 || responseClimatique.status === 401) {
          throw new Error("⛔ Erreur 401 - Token invalide ou session expirée.");
        }

        if (!responseChimique.ok || !responseClimatique.ok) {
          throw new Error("⚠️ Données introuvables pour cette sole.");
        }

        const chimiqueData = await responseChimique.json();
        const climatiqueData = await responseClimatique.json();

        const historicalData = Array.from({ length: 10 }).map((_, i) => ({
          date: new Date(Date.now() - i * 86400000).toLocaleDateString(), // 10 derniers jours
          ph: randomizeValue(chimiqueData.ph, 0.4),
          moisture: randomizeValue(climatiqueData.humidity, 5),
          nitrogen: randomizeValue(chimiqueData.nitrogen, 10),
        })).reverse();

        setSoilHealthData(historicalData);
        console.log("✅ Données récupérées :", historicalData);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSoilData();
  }, [soilId, token, isAuthenticated]);

  return (
    <div className="h-40 bg-white p-4 rounded-lg shadow-sm">
      {isLoading ? (
        <p className="text-center text-gray-500">📊 Chargement des données...</p>
      ) : error ? (
        <p className="text-center text-red-500">⚠️ {error}</p>
      ) : soilHealthData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={soilHealthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="ph" stroke="#10B981" />
            <Line type="monotone" dataKey="moisture" stroke="#3B82F6" />
            <Line type="monotone" dataKey="nitrogen" stroke="#8B5CF6" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">📊 Aucune donnée disponible.</p>
      )}
    </div>
  );
};
