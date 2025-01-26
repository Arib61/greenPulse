export interface SoilParameters {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export interface Crop {
  name: string;
  cost: number;
  yield: number;
  price: number;
  waterNeeds: number;
}

export interface ResourceParameters {
  landArea: number;
  waterAvailable: number;
  budget: number;
  crops: Crop[];
}