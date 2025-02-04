export interface SoilParameters {
  id: number;
  nitrogen: number;
  cationExchangeCapacity: number;
  temperature: number;
  humidity: number;
  ph: number;
  nutrients?: {
    phosphorus?: number;
    potassium?: number;
  }; // Ajout des nutriments facultatifs
}

export interface Crop {
  id: number;
  name: string;
  cost: number;
  yield: number;
  price: number;
  waterNeeds: number;
}

export interface Sole {
  id: number;
  name?: string; // Ajout d'un champ optionnel pour nommer les soles (si dispo dans l'API)
  localisation: string;
  superficie: number;
  temperature: number;
  parameters?: SoilParameters | null; // Peut être null si les données ne sont pas encore chargées
}

export interface ResourceParameters {
  landArea: number;
  waterAvailable: number;
  budget: number;
  crops: Crop[];
}
