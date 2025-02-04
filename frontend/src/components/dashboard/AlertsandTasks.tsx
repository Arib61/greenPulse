import type React from "react"
import { AlertTriangle, Clock } from "lucide-react"

export const AlertsAndTasks: React.FC = () => {
  return (
    <div className="space-y-6">
      <AlertsSection />
      <TasksSection />
    </div>
  )
}

const AlertsSection: React.FC = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">Alertes</h2>
      <button className="text-sm text-green-600 hover:text-green-700">Voir tout</button>
    </div>
    <div className="space-y-4">
      <AlertItem type="danger" title="Manque d'eau détecté" description="Secteur B - Il y a 2h" />
      <AlertItem type="warning" title="Risque de parasites" description="Maïs - Il y a 4h" />
    </div>
  </div>
)

interface AlertItemProps {
  type: "danger" | "warning"
  title: string
  description: string
}

const AlertItem: React.FC<AlertItemProps> = ({ type, title, description }) => (
  <div className={`flex items-start gap-3 p-3 ${type === "danger" ? "bg-red-50" : "bg-yellow-50"} rounded-lg`}>
    <AlertTriangle className={`w-5 h-5 ${type === "danger" ? "text-red-500" : "text-yellow-500"} mt-0.5`} />
    <div>
      <p className={`font-medium ${type === "danger" ? "text-red-700" : "text-yellow-700"}`}>{title}</p>
      <p className={`text-sm ${type === "danger" ? "text-red-600" : "text-yellow-600"}`}>{description}</p>
    </div>
  </div>
)

const TasksSection: React.FC = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">Tâches</h2>
      <button className="text-sm text-green-600 hover:text-green-700">Ajouter</button>
    </div>
    <div className="space-y-3">
      <TaskItem title="Irriguer le maïs" time="Aujourd'hui - 14:00" />
      <TaskItem title="Fertiliser le blé" time="Demain - 09:00" />
    </div>
  </div>
)

interface TaskItemProps {
  title: string
  time: string
}

const TaskItem: React.FC<TaskItemProps> = ({ title, time }) => (
  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
    <input type="checkbox" className="rounded border-gray-300 text-green-600" />
    <div className="flex-1">
      <p className="font-medium">{title}</p>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Clock className="w-4 h-4" />
        <span>{time}</span>
      </div>
    </div>
  </div>
)

