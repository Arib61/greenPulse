import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Search, ExternalLink, Droplets, Leaf, Repeat, Shield, Download, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Directive {
  id: string;
  title: string;
  organization: string;
  description: string;
  category: string;
  documentUrl?: string;
  lastUpdated: string;
}

export function Directives() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const directives: Directive[] = [
    {
      id: '1',
      title: 'Optimisation de l\'irrigation',
      organization: 'Ministère de l\'Agriculture du Maroc',
      description: 'Techniques pour réduire la consommation d\'eau dans l\'agriculture',
      category: 'water',
      lastUpdated: '2024-01-15',
      documentUrl: '#',
    },
    {
      id: '2',
      title: 'Rotation des cultures pour la santé des sols',
      organization: 'Institut National de la Recherche Agronomique',
      description: 'Importance de la rotation des cultures pour maintenir la fertilité des sols',
      category: 'rotation',
      lastUpdated: '2024-01-10',
      documentUrl: '#',
    },
    {
      id: '3',
      title: 'Utilisation responsable des pesticides',
      organization: 'Office National de Sécurité Sanitaire des Produits Alimentaires',
      description: 'Directives pour l\'utilisation sûre et efficace des pesticides',
      category: 'sustainable',
      lastUpdated: '2024-01-05',
      documentUrl: '#',
    },
    {
      id: '4',
      title: 'Gestion durable des ressources en eau',
      organization: 'Ministère de l\'Agriculture du Maroc',
      description: 'Stratégies pour une utilisation efficace des ressources en eau',
      category: 'water',
      lastUpdated: '2024-01-03',
      documentUrl: '#',
    },
    {
      id: '5',
      title: 'Certification biologique',
      organization: 'Institut National de la Recherche Agronomique',
      description: 'Processus et exigences pour la certification biologique',
      category: 'sustainable',
      lastUpdated: '2024-01-01',
      documentUrl: '#',
    },
  ];

  const categories = [
    { id: 'all', label: 'Toutes les catégories', icon: BookOpen },
    { id: 'water', label: 'Conservation de l\'eau', icon: Droplets },
    { id: 'sustainable', label: 'Pratiques agricoles durables', icon: Leaf },
    { id: 'rotation', label: 'Rotation des cultures', icon: Repeat },
  ];

  const filteredDirectives = directives.filter(directive => {
    const matchesSearch = directive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         directive.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || directive.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'water':
        return <Droplets className="w-6 h-6 text-blue-500" />;
      case 'sustainable':
        return <Leaf className="w-6 h-6 text-green-500" />;
      case 'rotation':
        return <Repeat className="w-6 h-6 text-orange-500" />;
      default:
        return <Shield className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Directives et Règlements Agricoles</h1>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Download className="w-5 h-5" />
              Exporter
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des directives..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                Réinitialiser
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Directives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDirectives.map(directive => (
            <div key={directive.id} className="bg-white rounded-lg shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{directive.title}</h3>
                  <p className="text-sm text-gray-600">{directive.organization}</p>
                  <p className="text-xs text-gray-500">Mis à jour le {directive.lastUpdated}</p>
                </div>
                {getCategoryIcon(directive.category)}
              </div>
              
              <p className="text-gray-700 line-clamp-2">{directive.description}</p>
              
              <div className="flex items-center gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                  Lire plus
                  <ExternalLink className="w-4 h-4" />
                </button>
                {directive.documentUrl && (
                  <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredDirectives.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune directive trouvée pour votre recherche.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}