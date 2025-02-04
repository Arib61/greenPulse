// Common interfaces
export interface Location {
  lat: number;
  lng: number;
  name: string;
}

export interface SoilParameters {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export interface OptimalRanges {
  nitrogen: [number, number];
  phosphorus: [number, number];
  potassium: [number, number];
  temperature: [number, number];
  humidity: [number, number];
  ph: [number, number];
  rainfall: [number, number];
}

export interface SoilData {
  id: string;
  name: string;
  location: string;
  data: SoilParameters;
  optimalRanges: OptimalRanges;
}

export interface Crop {
  id: string;
  name: string;
  status: 'healthy' | 'needs-water' | 'pest-detected';
  soilId: string;
  progress: number;
  plantedDate: string;
  expectedHarvest: string;
}

export interface Recommendation {
  id: string;
  type: 'success' | 'warning' | 'danger';
  title: string;
  description: string;
  icon?: string;
}

export type ValueStatus = 'low' | 'high' | 'optimal';

export interface CropData {
  id: string
  name: string
  status: "healthy" | "needs-water" | "pest-detected"
  soilId: string
  progress: number
  plantedDate: string
  expectedHarvest: string
}

export interface SoilHealthData {
  date: string
  ph: number
  moisture: number
  nitrogen: number
}

export interface SoilCropData {
  id: string
  name: string
  area: number
  coordinates: {
    latitude: number
    longitude: number
  }
  location: string
  ph: number
  moisture: number
  nutrients: {
    nitrogen: number
    phosphorus: number
    potassium: number
  }
}