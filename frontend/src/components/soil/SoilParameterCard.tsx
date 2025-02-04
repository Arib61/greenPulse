import React from 'react';
import { ThermometerSun, Droplets, Activity, Leaf } from 'lucide-react';
import { ValueStatus } from '../../types/agriculture';

interface SoilParameterCardProps {
  name: string;
  value: number;
  min: number;
  max: number;
  status: ValueStatus;
}

export function SoilParameterCard({ name, value, min, max, status }: SoilParameterCardProps) {
  const getStatusColor = (status: ValueStatus) => {
    switch (status) {
      case 'low':
        return 'text-yellow-600 bg-yellow-50';
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'optimal':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = () => {
    if (name === 'temperature') return <ThermometerSun className="w-5 h-5 text-orange-500" />;
    if (name === 'humidity') return <Droplets className="w-5 h-5 text-blue-500" />;
    
    switch (status) {
      case 'low':
        return <Activity className="w-5 h-5 text-yellow-500" />;
      case 'high':
        return <Activity className="w-5 h-5 text-red-500" />;
      case 'optimal':
        return <Leaf className="w-5 h-5 text-green-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="capitalize font-medium">{name}</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(status)}`}>
          {status === 'optimal' ? 'Optimal' : status === 'low' ? 'Faible' : 'Élevé'}
        </span>
      </div>
      <div className="relative pt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{min}</span>
          <span>{max}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className={`h-2 rounded-full transition-all ${
              status === 'optimal' ? 'bg-green-500' :
              status === 'low' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{
              width: `${(value / max) * 100}%`
            }}
          />
        </div>
        <div className="absolute left-0 top-0 w-full flex justify-center">
          <span className="text-sm font-medium">{value}</span>
        </div>
      </div>
    </div>
  );
}