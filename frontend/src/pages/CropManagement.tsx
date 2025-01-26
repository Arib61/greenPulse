import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Leaf, Calendar, Clock } from 'lucide-react';

export function CropManagement() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Crop Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Crop List */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Crop List</h2>
          <div className="space-y-4">
            {[
              { name: 'Wheat', status: 'Healthy', planted: '2023-03-15' },
              { name: 'Corn', status: 'Needs Water', planted: '2023-04-01' },
              { name: 'Soybeans', status: 'Healthy', planted: '2023-05-10' },
              { name: 'Barley', status: 'Pest Detected', planted: '2023-03-20' },
            ].map((crop) => (
              <div key={crop.name} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Leaf className="text-green-600" />
                  <span>{crop.name}</span>
                </div>
                <div className="text-sm text-gray-500">
                  <div>Status: {crop.status}</div>
                  <div>Planted: {crop.planted}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crop Calendar */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Crop Calendar</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              <div>Su</div>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
            </div>
            {/* Calendar grid would go here */}
            <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
              Calendar View
            </div>
          </div>
        </div>

        {/* Maintenance Schedule */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Maintenance Schedule</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="text-yellow-500" />
                <span>Water Corn field</span>
              </div>
              <div className="text-sm text-gray-500">
                <div>Date: 2023-06-15</div>
                <div>Status: Pending</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="text-green-500" />
                <span>Apply fertilizer to Wheat</span>
              </div>
              <div className="text-sm text-gray-500">
                <div>Date: 2023-06-18</div>
                <div>Status: Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}