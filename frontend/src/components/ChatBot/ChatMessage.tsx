import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Message } from "../../types/chat";

interface ChatMessageProps {
  message: Message;
  isCompact: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isCompact,
}) => {
  const isBot = message.sender === "bot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3`}
    >
      {isBot && (
        <div
          className={`rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0 ${
            isCompact ? "w-6 h-6" : "w-8 h-8"
          }`}
        >
          <span
            className={`text-green-600 font-semibold ${
              isCompact ? "text-xs" : "text-sm"
            }`}
          >
            E
          </span>
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-xl px-3 py-1.5 ${
          isBot
            ? "bg-gradient-to-br from-green-50 to-green-100 text-gray-800 rounded-tl-sm"
            : "bg-gradient-to-br from-green-600 to-green-700 text-white rounded-tr-sm"
        } shadow-sm`}
      >
        {/* Rendu Markdown propre */}
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => (
              <p className={`whitespace-pre-wrap ${isCompact ? "text-xs" : "text-sm"}`} {...props} />
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>

        <span
          className={`opacity-70 mt-0.5 block ${
            isCompact ? "text-[10px]" : "text-xs"
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </motion.div>
  );
};
