import React from 'react';
import { CloudSun, Droplets, Thermometer } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
}

export function WeatherWidget() {
  const weather: WeatherData = {
    temperature: 24,
    humidity: 65,
    condition: 'Sunny',
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Weather Conditions</h3>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-5 h-5 text-red-500" />
          <span>{weather.temperature}°C</span>
        </div>
        <div className="flex items-center space-x-2">
          <Droplets className="w-5 h-5 text-blue-500" />
          <span>{weather.humidity}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <CloudSun className="w-5 h-5 text-gray-500" />
          <span>{weather.condition}</span>
        </div>
      </div>
    </div>
  );
}