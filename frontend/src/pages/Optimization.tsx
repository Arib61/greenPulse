import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Calculator, BarChart2, Droplets } from 'lucide-react';

interface ResourceData {
  landArea: number;
  waterAvailable: number;
  crops: Array<{
    name: string;
    allocation: number;
    waterUsage: number;
    profit: number;
  }>;
}

export function Optimization() {
  const [resourceData, setResourceData] = useState<ResourceData>({
    landArea: 100,
    waterAvailable: 1000,
    crops: [
      { name: 'Wheat', allocation: 30, waterUsage: 300, profit: 3000 },
      { name: 'Corn', allocation: 40, waterUsage: 400, profit: 4000 },
      { name: 'Soybeans', allocation: 30, waterUsage: 300, profit: 3000 },
    ],
  });

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Resource Optimization</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-green-600" />
            Resource Parameters
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Land Area (hectares)
              </label>
              <input
                type="number"
                value={resourceData.landArea}
                onChange={(e) => setResourceData(prev => ({ ...prev, landArea: Number(e.target.value) }))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Water (m³)
              </label>
              <input
                type="number"
                value={resourceData.waterAvailable}
                onChange={(e) => setResourceData(prev => ({ ...prev, waterAvailable: Number(e.target.value) }))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Crop Parameters</h3>
              {resourceData.crops.map((crop, index) => (
                <div key={crop.name} className="grid grid-cols-4 gap-2 mb-4">
                  <div className="font-medium">{crop.name}</div>
                  <input
                    type="number"
                    placeholder="Land"
                    value={crop.allocation}
                    onChange={(e) => {
                      const newCrops = [...resourceData.crops];
                      newCrops[index] = { ...crop, allocation: Number(e.target.value) };
                      setResourceData(prev => ({ ...prev, crops: newCrops }));
                    }}
                    className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                  <input
                    type="number"
                    placeholder="Water"
                    value={crop.waterUsage}
                    onChange={(e) => {
                      const newCrops = [...resourceData.crops];
                      newCrops[index] = { ...crop, waterUsage: Number(e.target.value) };
                      setResourceData(prev => ({ ...prev, crops: newCrops }));
                    }}
                    className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                  <input
                    type="number"
                    placeholder="Profit"
                    value={crop.profit}
                    onChange={(e) => {
                      const newCrops = [...resourceData.crops];
                      newCrops[index] = { ...crop, profit: Number(e.target.value) };
                      setResourceData(prev => ({ ...prev, crops: newCrops }));
                    }}
                    className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Optimization Results</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BarChart2 className="w-5 h-5 text-green-600" />
                <span className="font-medium">Total Profit</span>
              </div>
              <span className="text-2xl font-bold text-green-600">
                ${resourceData.crops.reduce((sum, crop) => sum + crop.profit, 0)}
              </span>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Water Usage</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                {resourceData.crops.reduce((sum, crop) => sum + crop.waterUsage, 0)} m³
              </span>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="pb-2">Crop</th>
                <th className="pb-2 text-right">Land (ha)</th>
                <th className="pb-2 text-right">Water (m³)</th>
                <th className="pb-2 text-right">Profit ($)</th>
              </tr>
            </thead>
            <tbody>
              {resourceData.crops.map((crop) => (
                <tr key={crop.name} className="border-t">
                  <td className="py-2">{crop.name}</td>
                  <td className="py-2 text-right">{crop.allocation}</td>
                  <td className="py-2 text-right">{crop.waterUsage}</td>
                  <td className="py-2 text-right">{crop.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}