import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Wheat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { RecommendationCard } from '../components/recommendations/RecommendationCard';
import { ConfidenceScore } from '../components/recommendations/ConfidenceScore';

type Sole = {
  id: number;
  localisation: string;
  superficie: number;
};

type Culture = {
  nom: string;
  probabilite: number;
  ordre: number;
};

type Recommendation = {
  id: number;
  cultures: Culture[];
};

type SoilData = {
  nitrogen: number;
  cationExchangeCapacity: number;
  humidity: number;
  rainfall: number;
  temperature: number;
  organicCarbon: number;
  ph: number;
  optimalRanges: {
    nitrogen: [number, number];
    ph: [number, number];
    temperature: [number, number];
  };
};

export function Recommendations() {
  const { isAuthenticated, userId, token } = useAuth();
  const [soles, setSoles] = useState<Sole[]>([]);
  const [selectedSoleId, setSelectedSoleId] = useState<number | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Chargement des soles
  useEffect(() => {
    if (!isAuthenticated || !userId || !token) return;

    const fetchSoles = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/soles/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Erreur lors du chargement des soles.");
        setSoles(await response.json());
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les soles.");
      }
    };

    fetchSoles();
  }, [isAuthenticated, userId, token]);

  // Génération des recommandations
  useEffect(() => {
    if (!selectedSoleId || !token) return;

    const generateRecommendations = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Création de la recommandation
        const recResponse = await fetch(
          `http://localhost:8080/api/recommendations/sole/${selectedSoleId}`,
          { method: "POST", headers: { Authorization: `Bearer ${token}` } }
        );
        if (!recResponse.ok) throw new Error("Impossible de générer les recommandations.");
        const recommendationData = await recResponse.json();

        // Récupération des détails du sol
        const detailResponse = await fetch(
          `http://localhost:8080/api/recommendation_detail/${selectedSoleId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!detailResponse.ok) throw new Error("Erreur lors de la récupération des détails du sol.");
        const detailData = await detailResponse.json();

        // Récupération des cultures
        const culturesResponse = await fetch(
          `http://localhost:8080/api/recommendations/${recommendationData.id}/cultures`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!culturesResponse.ok) throw new Error("Impossible de récupérer les cultures.");
        
        setSoilData({
          ...detailData,
          optimalRanges: {
            nitrogen: [20, 50],
            ph: [6.0, 7.5],
            temperature: [15, 25]
          }
        });
        
        setRecommendation({
          ...recommendationData,
          cultures: await culturesResponse.json()
        });

      } catch (err) {
        console.error(err);
        setError("Une erreur s'est produite lors de la génération des recommandations.");
      } finally {
        setIsLoading(false);
      }
    };

    generateRecommendations();
  }, [selectedSoleId, token]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Recommandations IA</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Sélection de la sole</h2>
              <select
                onChange={(e) => setSelectedSoleId(Number(e.target.value))}
                value={selectedSoleId || ""}
                className="w-full p-2 border rounded-md"
              >
                <option value="">-- Choisissez un sol --</option>
                {soles.map((sole) => (
                  <option key={sole.id} value={sole.id}>
                    {sole.localisation} ({sole.superficie}m²)
                  </option>
                ))}
              </select>
            </div>

            <AnimatePresence mode="wait">
              {selectedSoleId ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Carte des données du sol */}
                  {soilData && (
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h2 className="text-xl font-semibold mb-4">Données du sol</h2>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p>🌿 Azote: {soilData.nitrogen} ppm</p>
                          <p>⚖️ CEC: {soilData.cationExchangeCapacity}</p>
                          <p>💧 Humidité: {soilData.humidity}%</p>
                        </div>
                        <div>
                          <p>🌡️ Température: {soilData.temperature}°C</p>
                          <p>🍃 Carbone organique: {soilData.organicCarbon}</p>
                          <p>⚖️ pH: {soilData.ph}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recommandations */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Recommandations</h2>
                    <div className="space-y-4">
                      {isLoading ? (
                        <div className="text-center py-4">Chargement des recommandations...</div>
                      ) : recommendation?.cultures?.map((culture, index) => (
                        <RecommendationCard
                          key={culture.nom}
                          recommendation={{
                            id: index.toString(),
                            type: culture.probabilite > 0.7 ? 'success' : 'warning',
                            title: `${culture.ordre}. ${culture.nom}`,
                            description: `Probabilité: ${(culture.probabilite * 100).toFixed(1)}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-6 rounded-lg shadow-sm text-center"
                >
                  <Wheat className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Veuillez sélectionner une sole pour obtenir des recommandations
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Informations</h2>
              <div className="space-y-4 text-sm text-gray-600">
                <p>
                  Notre système d'IA analyse les données de votre sol pour fournir
                  des recommandations personnalisées pour vos cultures.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>La composition du sol</li>
                  <li>Les conditions climatiques</li>
                  <li>L'historique des cultures</li>
                  <li>Les meilleures pratiques agricoles</li>
                </ul>
              </div>
            </div>

            {recommendation && (
              <ConfidenceScore 
                score={Math.round(0.95 * 100 || 0)}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}