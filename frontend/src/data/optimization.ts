import type { Soil, CalendarEvent, MaintenanceTask } from "../types/optimization"

const generateEvents = (soilId: string): CalendarEvent[] => [
  {
    id: `${soilId}-event1`,
    date: "2024-05-01",
    type: "planting",
    description: "Plantation de blé",
  },
  {
    id: `${soilId}-event2`,
    date: "2024-05-15",
    type: "irrigation",
    description: "Irrigation du maïs",
  },
  // Ajoutez d'autres événements...
]

const generateTasks = (soilId: string): MaintenanceTask[] => [
  {
    id: `${soilId}-task1`,
    description: "Vérification du système d'irrigation",
    dueDate: "2024-05-10",
    status: "pending",
  },
  {
    id: `${soilId}-task2`,
    description: "Réparation de la clôture nord",
    dueDate: "2024-05-20",
    status: "in-progress",
  },
  {
    id: `${soilId}-task3`,
    description: "Fertilisation des champs de maïs",
    dueDate: "2024-06-01",
    status: "pending",
  },
  // Ajoutez d'autres tâches...
]

export const initialSoils: Soil[] = [
  {
    id: "soil1",
    name: "Sole1: ",
    type: "Limoneux",
    pH: 6.8,
    moistureLevel: 35,
    totalArea: 100,
    waterAllocated: 5000,
    plots: [
      { id: "plot1", cropType: "Blé", area: 30, waterUsage: 900, currentProfit: 3000 },
      { id: "plot2", cropType: "Maïs", area: 40, waterUsage: 1600, currentProfit: 4800 },
      { id: "plot3", cropType: "Soja", area: 30, waterUsage: 600, currentProfit: 2700 },
    ],
    events: generateEvents("soil1"),
    maintenanceTasks: generateTasks("soil1"),
  },
  {
    id: "soil2",
    name: "Sole1: ",
    type: "Sablonneux",
    pH: 7.2,
    moistureLevel: 25,
    totalArea: 80,
    waterAllocated: 4000,
    plots: [
      { id: "plot4", cropType: "Carottes", area: 20, waterUsage: 800, currentProfit: 2400 },
      { id: "plot5", cropType: "Pommes de terre", area: 30, waterUsage: 1200, currentProfit: 3600 },
      { id: "plot6", cropType: "Oignons", area: 30, waterUsage: 900, currentProfit: 3300 },
    ],
    events: generateEvents("soil2"),
    maintenanceTasks: generateTasks("soil2"),
  },
]