import type React from "react"
import { TrendingUp, Droplets, Calendar } from "lucide-react"

export const QuickStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Santé Globale"
        value="85%"
        change="+5% cette semaine"
        icon={<TrendingUp className="w-5 h-5 text-green-500" />}
        gradient="from-green-50 to-emerald-50"
        textColor="text-green-600"
      />
      <StatCard
        title="Irrigation"
        value="2.4k L"
        change="Optimal"
        icon={<Droplets className="w-5 h-5 text-blue-500" />}
        gradient="from-blue-50 to-cyan-50"
        textColor="text-blue-600"
      />
      <StatCard
        title="Tâches"
        value="8"
        change="3 prioritaires"
        icon={<Calendar className="w-5 h-5 text-yellow-500" />}
        gradient="from-yellow-50 to-amber-50"
        textColor="text-yellow-600"
      />
      <StatCard
        title="Rendement"
        value="+12%"
        change="vs. dernière saison"
        icon={<TrendingUp className="w-5 h-5 text-purple-500" />}
        gradient="from-purple-50 to-fuchsia-50"
        textColor="text-purple-600"
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  gradient: string
  textColor: string
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, gradient, textColor }) => (
  <div className={`bg-gradient-to-br ${gradient} p-4 rounded-lg`}>
    <div className="flex items-center justify-between">
      <span className={`text-sm font-medium ${textColor}`}>{title}</span>
      {icon}
    </div>
    <p className="text-2xl font-bold mt-2">{value}</p>
    <p className={`text-sm ${textColor} mt-1`}>{change}</p>
  </div>
)

