import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { MapPin, Wheat } from 'lucide-react';

interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export function Recommendations() {
  const [soilData, setSoilData] = useState<SoilData>({
    nitrogen: -3,
    phosphorus: 11,
    potassium: 13,
    temperature: 11,
    humidity: 14,
    ph: 15,
    rainfall: 11,
  });

  const handleInputChange = (field: keyof SoilData, value: number) => {
    setSoilData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Crop Recommendations</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Enter Soil and Climate Data</h2>
          
          <button className="w-full flex items-center justify-center gap-2 bg-black text-white p-3 rounded-lg mb-6">
            <MapPin className="w-5 h-5" />
            Auto-Localize
          </button>

          <div className="space-y-4">
            {Object.entries(soilData).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                  {key}
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleInputChange(key as keyof SoilData, Number(e.target.value))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            ))}
          </div>

          <button className="mt-6 w-full bg-black text-white p-3 rounded-lg">
            Get AI Recommendation
          </button>
        </div>

        {/* Results */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">AI Recommendation</h2>
          
          <div className="flex items-center gap-3 mb-4">
            <Wheat className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-semibold">Wheat</span>
          </div>

          <p className="text-gray-600 mb-4">
            Based on the provided parameters, wheat is the recommended crop for optimal yield. 
            The soil composition and climate conditions are particularly favorable for wheat cultivation.
          </p>

          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <p className="text-green-700">AI Confidence: 85.00%</p>
          </div>

          <h3 className="font-semibold mb-3">Soil Nutrient Levels</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {Object.entries(soilData).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-600 capitalize">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>

          <h3 className="font-semibold mb-3">Optimal Levels Chart</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            Chart Visualization
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}