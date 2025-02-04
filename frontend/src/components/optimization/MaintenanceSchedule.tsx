import type React from "react"
import { PenToolIcon as Tool, CheckCircle, Circle, Clock } from "lucide-react"
import type { MaintenanceTask } from "../../types/optimization"

interface MaintenanceScheduleProps {
  tasks: MaintenanceTask[]
  onTaskComplete: (taskId: string) => void
}

export const MaintenanceSchedule: React.FC<MaintenanceScheduleProps> = ({ tasks, onTaskComplete }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-orange-500" />
      default:
        return <Circle className="w-5 h-5 text-red-500" />
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Tool className="w-5 h-5 text-blue-600" />
        Planning de Maintenance
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 text-left">Tâche</th>
              <th className="p-2 text-left">Date prévue</th>
              <th className="p-2 text-left">Statut</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="p-2">{task.description}</td>
                <td className="p-2">{new Date(task.dueDate).toLocaleDateString("fr-FR")}</td>
                <td className="p-2 flex items-center gap-2">
                  {getStatusIcon(task.status)}
                  <span>
                    {task.status === "completed"
                      ? "Terminé"
                      : task.status === "in-progress"
                        ? "En cours"
                        : "En attente"}
                  </span>
                </td>
                <td className="p-2">
                  {task.status !== "completed" && (
                    <button
                      onClick={() => onTaskComplete(task.id)}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                    >
                      Marquer comme terminé
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

