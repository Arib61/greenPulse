export interface Soil {
    id: string
    name: string
    type: string
    pH: number
    moistureLevel: number
    totalArea: number
    waterAllocated: number
    plots: Plot[]
    events: CalendarEvent[]
    maintenanceTasks: MaintenanceTask[]
  }
  
  export interface Plot {
    id: string
    cropType: string
    area: number
    waterUsage: number
    currentProfit: number
  }
  
  export interface OptimizationResult {
    optimizedPlots: Plot[]
    totalProfit: number
    totalWaterUsage: number
    suggestions: string[]
  }
  
  export interface CalendarEvent {
    id: string
    date: string
    type: "planting" | "irrigation" | "fertilization" | "harvest" | "other"
    description: string
  }
  
  export interface MaintenanceTask {
    id: string
    description: string
    dueDate: string
    status: "pending" | "in-progress" | "completed"
  }