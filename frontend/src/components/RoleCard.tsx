import React from 'react';
import { User2, GraduationCap } from 'lucide-react';

interface RoleCardProps {
  role: 'agriculteur' | 'ingenieur';
  selected: boolean;
  onSelect: () => void;
}

export function RoleCard({ role, selected, onSelect }: RoleCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`p-6 rounded-xl transition-all ${
        selected
          ? 'bg-green-50 border-2 border-green-500'
          : 'bg-white border-2 border-gray-200 hover:border-green-300'
      }`}
    >
      <div className="flex flex-col items-center space-y-4">
        {role === 'agriculteur' ? (
          <User2 className="w-12 h-12 text-green-600" />
        ) : (
          <GraduationCap className="w-12 h-12 text-green-600" />
        )}
        <h3 className="text-xl font-semibold text-gray-800">
          {role === 'agriculteur' ? 'Agriculteur' : 'Ingénieur Agronome'}
        </h3>
        <p className="text-sm text-gray-600 text-center">
          {role === 'agriculteur'
            ? 'Pour les agriculteurs qui cherchent à améliorer leurs pratiques durables'
            : 'Pour les experts qui guident vers une agriculture durable'}
        </p>
      </div>
    </button>
  );
}