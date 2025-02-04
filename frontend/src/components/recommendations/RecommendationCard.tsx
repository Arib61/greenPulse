import React from 'react';
import { Leaf, Activity } from 'lucide-react';
import { Recommendation } from '../../types/agriculture';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const getColorClasses = () => {
    switch (recommendation.type) {
      case 'success':
        return 'border-green-200 text-green-700';
      case 'warning':
        return 'border-yellow-200 text-yellow-700';
      case 'danger':
        return 'border-red-200 text-red-700';
      default:
        return 'border-gray-200 text-gray-700';
    }
  };

  const Icon = recommendation.type === 'success' ? Leaf : Activity;

  return (
    <div className={`p-4 border rounded-lg ${getColorClasses()}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5" />
        <span className="font-medium">{recommendation.title}</span>
      </div>
      <p className="text-sm text-gray-600">
        {recommendation.description}
      </p>
    </div>
  );
}