import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { 
  Sun, 
  Droplets, 
  AlertTriangle, 
  Leaf, 
  ChevronRight,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  Filter
} from 'lucide-react';
import { WeatherChart } from '../components/charts/WeatherChart';

interface WeatherData {
  time: string;
  temperature: number;
  humidity: number;
  rainfall: number;
}

export function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'day' | 'week' | 'month'>('day');
  const [selectedCrop, setSelectedCrop] = useState<string>('all');

  // Sample data for the weather chart
  const weatherData: WeatherData[] = [
    { time: '6:00', temperature: 18, humidity: 65, rainfall: 0 },
    { time: '9:00', temperature: 22, humidity: 60, rainfall: 0 },
    { time: '12:00', temperature: 25, humidity: 55, rainfall: 0 },
    { time: '15:00', temperature: 24, humidity: 58, rainfall: 2 },
    { time: '18:00', temperature: 21, humidity: 62, rainfall: 0 },
  ];

  const crops = [
    { name: 'Blé', status: 'healthy', progress: 75 },
    { name: 'Maïs', status: 'warning', progress: 45 },
    { name: 'Soja', status: 'healthy', progress: 60 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'danger':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <DashboardLayout>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-600">Santé Globale</span>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold mt-2">85%</p>
          <p className="text-sm text-green-600 mt-1">+5% cette semaine</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-600">Irrigation</span>
            <Droplets className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold mt-2">2.4k L</p>
          <p className="text-sm text-blue-600 mt-1">Optimal</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-yellow-600">Tâches</span>
            <Calendar className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold mt-2">8</p>
          <p className="text-sm text-yellow-600 mt-1">3 prioritaires</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-purple-600">Rendement</span>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold mt-2">+12%</p>
          <p className="text-sm text-purple-600 mt-1">vs. dernière saison</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather Section */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Météo</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setSelectedTimeframe('day')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    selectedTimeframe === 'day' 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Jour
                </button>
                <button 
                  onClick={() => setSelectedTimeframe('week')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    selectedTimeframe === 'week' 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Semaine
                </button>
                <button 
                  onClick={() => setSelectedTimeframe('month')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    selectedTimeframe === 'month' 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Mois
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <Sun className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">25°C</p>
                  <p className="text-sm text-gray-600">Température</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Droplets className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">65%</p>
                  <p className="text-sm text-gray-600">Humidité</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <MapPin className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-lg font-bold">Fès-Meknès</p>
                  <p className="text-sm text-gray-600">Région</p>
                </div>
              </div>
            </div>

            <WeatherChart data={weatherData} />
          </div>
        </div>

        {/* Alerts and Tasks */}
        <div className="space-y-6">
          {/* Alerts */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Alertes</h2>
              <button className="text-sm text-green-600 hover:text-green-700">
                Voir tout
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium text-red-700">Manque d'eau détecté</p>
                  <p className="text-sm text-red-600">Secteur B - Il y a 2h</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-700">Risque de parasites</p>
                  <p className="text-sm text-yellow-600">Maïs - Il y a 4h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Tâches</h2>
              <button className="text-sm text-green-600 hover:text-green-700">
                Ajouter
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="rounded border-gray-300 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium">Irriguer le maïs</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Aujourd'hui - 14:00</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="rounded border-gray-300 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium">Fertiliser le blé</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Demain - 09:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Crop Status */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">État des Cultures</h2>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="rounded-md border-gray-300 text-sm"
              >
                <option value="all">Toutes les cultures</option>
                <option value="wheat">Blé</option>
                <option value="corn">Maïs</option>
                <option value="soy">Soja</option>
              </select>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Filter className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="grid gap-4">
            {crops.map((crop) => (
              <div key={crop.name} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className={getStatusColor(crop.status)} />
                    <span className="font-medium">{crop.name}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        crop.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${crop.progress}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-sm font-medium">{crop.progress}% de croissance</p>
                  <p className="text-sm text-gray-500">Phase 2/4</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Farm Map */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Carte de la Ferme</h2>
            <button className="text-sm text-green-600 hover:text-green-700">
              Agrandir
            </button>
          </div>
          <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
            Carte interactive
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}