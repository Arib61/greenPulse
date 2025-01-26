import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

interface WeatherData {
  time: string;
  temperature: number;
  humidity: number;
  rainfall: number;
}

interface WeatherChartProps {
  data: WeatherData[];
}

export function WeatherChart({ data }: WeatherChartProps) {
  const { t } = useTranslation();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="temperature" 
          name={t('weather.temperature')}
          stroke="#ff7300" 
        />
        <Line 
          type="monotone" 
          dataKey="humidity" 
          name={t('weather.humidity')}
          stroke="#387908" 
        />
        <Line 
          type="monotone" 
          dataKey="rainfall" 
          name={t('weather.rainfall')}
          stroke="#3366cc" 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}