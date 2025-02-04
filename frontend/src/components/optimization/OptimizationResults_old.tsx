import React from 'react';
import { BarChart, Droplets } from 'lucide-react';
import { ResourceParameters } from '../../types/agriculture';

interface OptimizationResultsProps {
  parameters: ResourceParameters;
}

export function OptimizationResults({ parameters }: OptimizationResultsProps) {
  // In a real app, this would be calculated using AI algorithms
  const results = parameters.crops.map(crop => ({
    ...crop,
    allocation: Math.random() * parameters.landArea, // Example calculation
    waterUsage: Math.random() * parameters.waterAvailable,
    profit: Math.random() * 10000,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-6">Optimization Results</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart className="w-5 h-5 text-green-600" />
              <span className="font-medium">Total Profit</span>
            </div>
            <span className="text-2xl font-bold text-green-600">
              ${results.reduce((sum, r) => sum + r.profit, 0).toFixed(2)}
            </span>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Water Usage</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">
              {results.reduce((sum, r) => sum + r.waterUsage, 0).toFixed(1)} m³
            </span>
          </div>
        </div>

        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left py-2">Crop</th>
              <th className="text-right py-2">Land (ha)</th>
              <th className="text-right py-2">Water (m³)</th>
              <th className="text-right py-2">Profit ($)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.name} className="border-t">
                <td className="py-2">{result.name}</td>
                <td className="text-right">{result.allocation.toFixed(1)}</td>
                <td className="text-right">{result.waterUsage.toFixed(1)}</td>
                <td className="text-right">{result.profit.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}