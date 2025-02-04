import { SoilData } from '../types/agriculture';

export const soils: SoilData[] = [
  {
    id: '1',
    name: 'Parcelle Nord',
    location: 'Fès-Meknès',
    data: {
      nitrogen: 45,
      phosphorus: 30,
      potassium: 25,
      temperature: 24,
      humidity: 65,
      ph: 6.8,
      rainfall: 150
    },
    optimalRanges: {
      nitrogen: [40, 60],
      phosphorus: [25, 35],
      potassium: [20, 30],
      temperature: [20, 28],
      humidity: [60, 70],
      ph: [6.5, 7.5],
      rainfall: [100, 200]
    }
  },
  {
    id: '2',
    name: 'Parcelle Sud',
    location: 'Fès-Meknès',
    data: {
      nitrogen: 35,
      phosphorus: 28,
      potassium: 22,
      temperature: 26,
      humidity: 58,
      ph: 7.1,
      rainfall: 120
    },
    optimalRanges: {
      nitrogen: [40, 60],
      phosphorus: [25, 35],
      potassium: [20, 30],
      temperature: [20, 28],
      humidity: [60, 70],
      ph: [6.5, 7.5],
      rainfall: [100, 200]
    }
  }
];