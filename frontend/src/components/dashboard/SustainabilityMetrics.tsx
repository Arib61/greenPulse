import React from 'react';
import { Droplet, Wind, Sprout } from 'lucide-react';

interface Metric {
  icon: typeof Droplet;
  label: string;
  value: number;
  unit: string;
  color: string;
}

export function SustainabilityMetrics() {
  const metrics: Metric[] = [
    {
      icon: Droplet,
      label: 'Water Efficiency',
      value: 85,
      unit: '%',
      color: 'text-blue-500',
    },
    {
      icon: Wind,
      label: 'Carbon Footprint',
      value: -12,
      unit: 'tons',
      color: 'text-green-500',
    },
    {
      icon: Sprout,
      label: 'Soil Health',
      value: 92,
      unit: '%',
      color: 'text-amber-500',
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Sustainability Metrics</h3>
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center">
            <metric.icon className={`w-8 h-8 ${metric.color} mx-auto mb-2`} />
            <p className="text-sm text-gray-600">{metric.label}</p>
            <p className="text-lg font-semibold">
              {metric.value}
              {metric.unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}