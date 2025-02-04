import type React from "react"

interface SoilFormModalProps {
  show: boolean
  onClose: () => void
}

export const SoilFormModal: React.FC<SoilFormModalProps> = ({ show, onClose }) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Ajouter un nouveau sol</h2>
        {/* Form content would go here */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Annuler
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Ajouter</button>
        </div>
      </div>
    </div>
  )
}

