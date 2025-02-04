export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°C`;
}

export function formatHumidity(humidity: number): string {
  return `${Math.round(humidity)}%`;
}

export function getWeatherIcon(condition: string): string {
  const conditions: Record<string, string> = {
    'Sunny': 'sun',
    'Cloudy': 'cloud',
    'Rainy': 'cloud-rain',
    'Stormy': 'cloud-lightning',
  };
  return conditions[condition] || 'cloud';
}