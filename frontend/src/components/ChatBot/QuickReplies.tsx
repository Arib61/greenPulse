import React from 'react';
import { motion } from 'framer-motion';
import { Map, Utensils, Calendar, Bus } from 'lucide-react';

interface QuickRepliesProps {
  onSelect: (message: string) => void;
  isCompact: boolean;
}

export const QuickReplies: React.FC<QuickRepliesProps> = ({ onSelect, isCompact }) => {
  const quickReplies = [
    { id: '1', text: 'Meilleure période de plantation ?', icon: Calendar },
    { id: '2', text: 'Cultures les plus adaptées ?', icon: Map },
    { id: '3', text: 'Optimisation de l’irrigation', icon: Utensils },
    { id: '4', text: 'Prédiction de rendement', icon: Bus },
  ];


  return (
    <div className="p-3 border-t border-green-200 bg-gradient-to-b from-white to-green-50/30">
      <p className={`text-green-600 font-medium mb-2 ${isCompact ? 'text-[10px]' : 'text-xs'}`}>
        Popular Questions:
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {quickReplies.map((reply) => {
          const Icon = reply.icon;
          return (
            <motion.button
              key={reply.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(reply.text)}
              className={`px-2 py-1.5 bg-white border border-green-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors flex items-center gap-1.5 text-left ${
                isCompact ? 'text-[10px]' : 'text-xs'
              }`}
            >
              <Icon className={`text-green-500 ${isCompact ? 'w-3 h-3' : 'w-4 h-4'}`} />
              <span className="text-gray-700">{reply.text}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
