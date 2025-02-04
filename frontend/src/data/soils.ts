import { SoilData } from "../types/agriculture";

export const soils: SoilData[] = [
  {
    id: 1,
    name: "Parcelle Nord",
    location: "Fès-Meknès",
    data: {
      nitrogen: 45, // Ajouté depuis l'API `parametres-chimiques`
      cationExchangeCapacity: 11.6, // Ajouté depuis l'API `parametres-chimiques`
      temperature: 24, // Ajouté depuis l'API `parametres-climatiques`
      humidity: 65, // Ajouté depuis l'API `parametres-climatiques`
      ph: 6.8, // Ajouté depuis l'API `parametres-chimiques`
    },
    optimalRanges: {
      nitrogen: [40, 60],
      cationExchangeCapacity: [5, 15],
      temperature: [20, 28],
      humidity: [60, 70],
      ph: [6.5, 7.5],
    },
  },
  {
    id: 2,
    name: "Parcelle Sud",
    location: "Fès-Meknès",
    data: {
      nitrogen: 35,
      cationExchangeCapacity: 9.8,
      temperature: 26,
      humidity: 55,
      ph: 7.1,
    },
    optimalRanges: {
      nitrogen: [40, 60],
      cationExchangeCapacity: [5, 15],
      temperature: [20, 28],
      humidity: [60, 70],
      ph: [6.5, 7.5],
    },
  },
];
