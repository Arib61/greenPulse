import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface ChatBotIconProps {
  onClick: () => void;
  hasUnreadMessages: boolean;
}

export const ChatBotIcon: React.FC<ChatBotIconProps> = ({
  onClick,
  hasUnreadMessages,
}) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <button
        onClick={onClick}
        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center relative group"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        {hasUnreadMessages && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
        <span className="absolute -bottom-12 right-0 bg-white px-3 py-1 rounded-lg shadow-lg text-gray-700 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Besoin d'aide ?
        </span>
      </button>
    </motion.div>
  );
};
