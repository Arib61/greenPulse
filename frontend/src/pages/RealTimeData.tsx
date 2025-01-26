import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Sun, Cloud, CloudRain } from 'lucide-react';

export function RealTimeData() {
  const weeklyForecast = [
    { day: 'Mon', icon: Sun, temp: 25 },
    { day: 'Tue', icon: Cloud, temp: 23 },
    { day: 'Wed', icon: CloudRain, temp: 22 },
    { day: 'Thu', icon: Sun, temp: 24 },
    { day: 'Fri', icon: Sun, temp: 26 },
    { day: 'Sat', icon: Cloud, temp: 25 },
    { day: 'Sun', icon: CloudRain, temp: 23 },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Real-Time Data</h1>
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

        {/* Soil Moisture */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Soil Moisture</h2>
          <div className="text-4xl font-bold mb-2">65%</div>
          <div className="text-gray-600">Optimal</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>

        {/* 7-Day Weather Forecast */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">7-Day Weather Forecast</h2>
          <div className="grid grid-cols-7 gap-2">
            {weeklyForecast.map((day) => (
              <div key={day.day} className="text-center">
                <div className="text-sm">{day.day}</div>
                <day.icon className="w-6 h-6 mx-auto my-1" />
                <div className="text-sm">{day.temp}°C</div>
              </div>
            ))}
          </div>
        </div>

        {/* Temperature Trend */}
        <div className="bg-white p-6 rounded-lg shadow-sm col-span-full md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Temperature Trend</h2>
          <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
            Temperature Graph
          </div>
        </div>

        {/* Humidity Trend */}
        <div className="bg-white p-6 rounded-lg shadow-sm col-span-full md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Humidity Trend</h2>
          <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
            Humidity Graph
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}