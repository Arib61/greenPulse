export interface WeatherData {
    time: string
    temperature: number
    humidity: number
    rainfall: number
  }
  
  export interface CropData {
    name: string
    status: "healthy" | "warning" | "danger"
    progress: number
  }
  
  