import React, { useState } from 'react';
import { 
  Brain, 
  LineChart, 
  Sprout, 
  Droplets, 
  AlertTriangle,
  Calendar,
  Maximize,
  BookOpen,
  ThermometerSun,
  Wind,
  Leaf
} from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
}

export function FeatureDemo() {
  const [activeFeature, setActiveFeature] = useState<string>('planning');

  const features: Feature[] = [
    {
      id: 'planning',
      title: 'Planification Précise des Cultures',
      description: 'Planifiez vos cultures en fonction des saisons, du sol et de la météo',
      icon: <Calendar className="w-6 h-6" />,
      preview: (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="font-semibold mb-4">Planification Saisonnière</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ThermometerSun className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">Température</span>
                </div>
                <span className="text-lg font-bold">24°C</span>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">Humidité</span>
                </div>
                <span className="text-lg font-bold">65%</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Type de Sol</label>
              <select className="w-full rounded-md border-gray-300 shadow-sm">
                <option>Argilo-calcaire</option>
                <option>Limoneux</option>
                <option>Sableux</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="font-medium">Culture Recommandée</span>
              </div>
              <span className="text-green-600 font-medium">Blé</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'recommendations',
      title: 'Recommandations IA Personnalisées',
      description: 'Recevez des conseils sur mesure basés sur l\'intelligence artificielle',
      icon: <Brain className="w-6 h-6" />,
      preview: (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sprout className="w-8 h-8 text-green-600" />
                <div>
                  <h4 className="font-semibold">Blé</h4>
                  <p className="text-sm text-gray-600">Conditions optimales détectées</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">85% de confiance</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Score de Compatibilité</span>
                <span>85%</span>
              </div>
              <div className="h-2 bg-green-100 rounded-full">
                <div className="h-2 bg-green-600 rounded-full w-[85%] transition-all"></div>
              </div>
            </div>
            <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
              <h5 className="font-medium">Recommandations</h5>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                  <span>Période idéale pour la plantation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                  <span>Sol bien adapté à cette culture</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                  <span>Surveillance de l'irrigation conseillée</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'monitoring',
      title: 'Surveillance en Temps Réel',
      description: 'Suivez l\'état de vos cultures via un tableau de bord interactif',
      icon: <LineChart className="w-6 h-6" />,
      preview: (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Humidité</span>
                  <Droplets className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-600">65%</p>
                <div className="h-1.5 bg-blue-200 rounded-full mt-2">
                  <div className="h-1.5 bg-blue-600 rounded-full w-2/3"></div>
                </div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Température</span>
                  <ThermometerSun className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-orange-600">24°C</p>
                <div className="h-1.5 bg-orange-200 rounded-full mt-2">
                  <div className="h-1.5 bg-orange-600 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
              <span>Irrigation recommandée dans 2 jours</span>
            </div>
            <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
              Graphique de croissance
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'optimization',
      title: 'Optimisation des Ressources',
      description: 'Maximisez vos rendements tout en réduisant le gaspillage',
      icon: <Maximize className="w-6 h-6" />,
      preview: (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <h4 className="font-semibold">Gestion des Ressources</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Utilisation d'eau</span>
                  <span className="text-green-600">Optimale</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-green-600 rounded-full w-[70%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Engrais</span>
                  <span className="text-yellow-600">Modérée</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-yellow-500 rounded-full w-[50%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Rendement prévu</span>
                  <span className="text-blue-600">+15%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-blue-600 rounded-full w-[85%]"></div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <Leaf className="w-4 h-4" />
                <span>Économie d'eau : 30% par rapport à la moyenne</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'bestPractices',
      title: 'Guide des Meilleures Pratiques',
      description: 'Restez informé des dernières techniques agricoles durables',
      icon: <BookOpen className="w-6 h-6" />,
      preview: (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <h4 className="font-semibold">Guides et Conseils</h4>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Droplets className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h5 className="font-medium">Techniques d'Irrigation Efficaces</h5>
                    <p className="text-sm text-gray-600">Mis à jour il y a 2 jours</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Sprout className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h5 className="font-medium">Rotation des Cultures</h5>
                    <p className="text-sm text-gray-600">Mis à jour il y a 1 semaine</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full py-2 text-sm text-green-600 hover:text-green-700 transition-colors">
              Voir tous les guides →
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">
          Découvrez Nos Solutions
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Explorez nos outils innovants conçus pour optimiser votre exploitation agricole
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`w-full text-left p-6 rounded-lg transition-all ${
                  activeFeature === feature.id
                    ? 'bg-white shadow-lg scale-[1.02]'
                    : 'bg-gray-100 hover:bg-white hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    activeFeature === feature.id ? 'bg-green-100 text-green-600' : 'bg-gray-200'
                  }`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:sticky lg:top-8">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl">
              {features.find(f => f.id === activeFeature)?.preview}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Essayer Gratuitement
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}