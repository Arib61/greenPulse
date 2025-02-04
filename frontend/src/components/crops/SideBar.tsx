import type React from "react"
import { Droplets, AlertTriangle, BarChart2, Leaf } from "lucide-react"

export const Sidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Actions Rapides</h2>
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-3 text-left bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <Droplets className="w-5 h-5" />
            <span>Programmer l'irrigation</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 text-left bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
            <AlertTriangle className="w-5 h-5" />
            <span>Signaler un problème</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 text-left bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <BarChart2 className="w-5 h-5" />
            <span>Voir les statistiques</span>
          </button>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recommandations</h2>
        <div className="space-y-4">
          <div className="p-4 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700 mb-2">
              <Leaf className="w-5 h-5" />
              <span className="font-medium">Irrigation optimale</span>
            </div>
            <p className="text-sm text-gray-600">Les conditions actu elles sont idéales pour l'irrigation du blé.</p>
          </div>
          <div className="p-4 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-700 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Surveillance conseillée</span>
            </div>
            <p className="text-sm text-gray-600">Vérifiez les niveaux d'humidité du sol dans la parcelle nord.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

