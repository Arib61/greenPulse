import type React from "react"

export const FarmMap: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Carte de la Ferme</h2>
        <button className="text-sm text-green-600 hover:text-green-700">Agrandir</button>
      </div>
      <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">Carte interactive</div>
    </div>
  )
}

