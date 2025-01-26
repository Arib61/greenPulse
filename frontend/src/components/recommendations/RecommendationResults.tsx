import React from 'react';
import { Sprout } from 'lucide-react';
import { SoilParameters } from '../../types/agriculture';

interface RecommendationResultsProps {
  parameters: SoilParameters;
  location: { lat: number; lng: number } | null;
}

export function RecommendationResults({ parameters, location }: RecommendationResultsProps) {
  // In a real app, this would be calculated based on the parameters
  const recommendations = [
    {
      crop: 'Wheat',
      confidence: 85,
      description: 'Ideal conditions for wheat cultivation',
    },
    {
      crop: 'Corn',
      confidence: 75,
      description: 'Good potential for corn growth',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-6">AI Recommendations</h2>
      
      <div className="space-y-6">
        {recommendations.map((rec) => (
          <div
            key={rec.crop}
            className="p-4 border rounded-lg hover:border-green-500 transition-colors"
          >
            <div className="flex items-center space-x-3 mb-2">
              <Sprout className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-medium">{rec.crop}</h3>
              <span className="text-sm text-gray-500">
                {rec.confidence}% match
              </span>
            </div>
            <p className="text-gray-600">{rec.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}