import React from 'react';
import { Sprout } from 'lucide-react';

interface Recommendation {
  crop: string;
  confidence: number;
  description: string;
}

interface RecommendationResultsProps {
  recommendations: Recommendation[] | null;
}

export function RecommendationResults({ recommendations }: RecommendationResultsProps) {
  if (!recommendations) {
    return <p className="text-gray-600">No recommendations available yet.</p>;
  }

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
              <span className="text-sm text-gray-500">{rec.confidence}% match</span>
            </div>
            <p className="text-gray-600">{rec.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
