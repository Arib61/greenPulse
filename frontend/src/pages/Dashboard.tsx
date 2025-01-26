import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Sun, Droplets, AlertTriangle, Leaf } from 'lucide-react';

export function Dashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weather Forecast */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Weather Forecast</h2>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-4xl font-bold">25°C</div>
              <div className="text-gray-600">Sunny</div>
            </div>
            <Sun className="w-16 h-16 text-yellow-400" />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <div>20% chance of rain</div>
            <div>60% humidity</div>
          </div>
        </div>

        {/* Crop Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Crop Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Leaf className="text-green-500" />
                <span>Wheat</span>
              </div>
              <span className="text-green-500">Healthy</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Leaf className="text-yellow-500" />
                <span>Corn</span>
              </div>
              <span className="text-yellow-500">Needs Water</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Leaf className="text-green-500" />
                <span>Soybeans</span>
              </div>
              <span className="text-green-500">Healthy</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Alerts</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-2 text-red-500">
              <AlertTriangle className="w-5 h-5 mt-0.5" />
              <span>Water shortage detected in Sector B</span>
            </div>
            <div className="flex items-start gap-2 text-yellow-500">
              <AlertTriangle className="w-5 h-5 mt-0.5" />
              <span>Potential pest infestation in Corn field</span>
            </div>
            <div className="flex items-start gap-2 text-green-500">
              <AlertTriangle className="w-5 h-5 mt-0.5" />
              <span>Optimal conditions for harvesting Wheat</span>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Task List</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span>Water Corn field</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span>Apply fertilizer to Wheat</span>
            </div>
          </div>
        </div>

        {/* Farm Map */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Farm Map</h2>
          <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
            Map View
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Financial Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Revenue</span>
              <span className="text-green-500">$24,500</span>
            </div>
            <div className="flex justify-between">
              <span>Expenses</span>
              <span className="text-red-500">$12,300</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}