import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Wheat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SoilData } from '../types/agriculture';
import { soils } from '../data/soils';
import { SoilSelector } from '../components/soil/SoilSelector';
import { SoilDataCard } from '../components/soil/SoilDataCard';
import { RecommendationCard } from '../components/recommendations/RecommendationCard';
import { ConfidenceScore } from '../components/recommendations/ConfidenceScore';

export function Recommendations() {
  const [selectedSoilId, setSelectedSoilId] = useState<string>('');
  const [selectedSoil, setSelectedSoil] = useState<SoilData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedSoilId) {
      setIsLoading(true);
      // Simulate loading data
      setTimeout(() => {
        setSelectedSoil(soils.find(soil => soil.id === selectedSoilId) || null);
        setIsLoading(false);
      }, 500);
    } else {
      setSelectedSoil(null);
    }
  }, [selectedSoilId]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Recommandations IA</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <SoilSelector
              soils={soils}
              selectedSoilId={selectedSoilId}
              onSelect={setSelectedSoilId}
            />

            <AnimatePresence mode="wait">
              {selectedSoil ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <SoilDataCard soil={selectedSoil} />

                  {/* AI Recommendations */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Recommandations</h2>
                    <div className="space-y-4">
                      <RecommendationCard
                        recommendation={{
                          id: '1',
                          type: 'success',
                          title: 'Culture recommandée : Blé',
                          description: 'Les conditions actuelles sont optimales pour la culture du blé. La température et l\'humidité sont dans les plages idéales.'
                        }}
                      />
                      {selectedSoil.data.nitrogen < selectedSoil.optimalRanges.nitrogen[0] && (
                        <RecommendationCard
                          recommendation={{
                            id: '2',
                            type: 'warning',
                            title: 'Ajustement recommandé',
                            description: 'Le niveau d\'azote est légèrement bas. Considérez l\'application d\'engrais azoté pour optimiser la croissance.'
                          }}
                        />
                      )}
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
                    Veuillez sélectionner une parcelle pour obtenir des recommandations
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
                <p>
                  Les recommandations sont basées sur :
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>La composition du sol</li>
                  <li>Les conditions climatiques</li>
                  <li>L'historique des cultures</li>
                  <li>Les meilleures pratiques agricoles</li>
                </ul>
              </div>
            </div>

            <ConfidenceScore score={85} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}