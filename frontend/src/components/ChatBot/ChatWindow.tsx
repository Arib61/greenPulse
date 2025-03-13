import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Maximize2, Minimize2 } from "lucide-react";
import { Message } from "../../types/chat";
import { ChatMessage } from "./ChatMessage";
import { QuickReplies } from "./QuickReplies";
import ReactMarkdown from "react-markdown";

interface ChatWindowProps {
  isOpen: boolean;
  messages: Message[];
  onClose: () => void;
  onSendMessage: (message: string) => void;
  typingSpeed?: number;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  messages,
  onClose,
  typingSpeed = 50, // Typing speed in milliseconds
}) => {
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [botTypingText, setBotTypingText] = useState(""); // Partial bot response
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages, botTypingText]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await sendMessage(input);
      setInput("");
    }
  };

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    setLocalMessages((prev) => [...prev, userMessage]);
    scrollToBottom();

    try {
      setIsBotTyping(true);
      setBotTypingText("");

      const response = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) throw new Error(`Failed to fetch bot response: ${response.status}`);

      // 🔍 Log de la réponse brute pour le debug
      const responseText = await response.text();
      console.log("Raw response from server:", responseText);

      let data;
      try {
        data = JSON.parse(responseText); // ✅ Vérifier si c'est un JSON valide
      } catch (error) {
        throw new Error("JSON parsing error: Invalid JSON received");
      }

      if (!data.response) {
        throw new Error("API response format incorrect, missing 'response' field");
      }

      simulateTyping(data.response);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setLocalMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          content: "Oops! Something went wrong. Please try again later.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      scrollToBottom();
    }
};


  const simulateTyping = (fullText: string) => {
    let index = 0;
    const words = fullText.split(" ");
    const interval = setInterval(() => {
      if (index < words.length) {
        setBotTypingText((prev) =>
          prev ? `${prev} ${words[index]}` : words[index]
        );
        index++;
      } else {
        clearInterval(interval);
        setIsBotTyping(false);
        const botMessage: Message = {
          id: crypto.randomUUID(),
          content: fullText,
          sender: "bot",
          timestamp: new Date(),
        };
        setLocalMessages((prev) => [...prev, botMessage]);
        setBotTypingText("");
      }
      scrollToBottom();
    }, typingSpeed);
  };

  const handleQuickReply = async (reply: string) => {
    await sendMessage(reply);
  };

  const toggleSize = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            width: isExpanded ? "380px" : "300px",
          }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-xl overflow-hidden z-50 border border-amber-100"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-green-600 p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">E
                </span>
              </div>
              <div className="text-white">
                <h3 className="text-sm font-semibold">EcoCrops Guide</h3>
                <p className="text-xs text-white/80">Always here to help!</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={toggleSize} className="text-white p-1">
                {isExpanded ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
              <button onClick={onClose} className="text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-amber-50/50 to-white"
            style={{ height: "250px" }}
          >
            {localMessages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isCompact={!isExpanded}
              />
            ))}

            {/* Message en cours d'écriture */}
            {/* Message en cours d'écriture */}
            {isBotTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start mb-3"
              >
                <div className="rounded-full bg-amber-100 flex items-center justify-center mr-2 w-8 h-8">
                  <span className="text-amber-600 font-semibold text-sm">
                    E
                  </span>
                </div>
                <div className="max-w-[80%] bg-gradient-to-br from-green-100 to-green-200 text-gray-800 rounded-xl px-3 py-1.5 shadow-sm">
                <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => <p className="text-xs" {...props} />,
                }}
              >
              {botTypingText}
            </ReactMarkdown>

                  {/* Les trois points animés */}
                  <div className="flex items-center gap-1 text-amber-500 mt-1">
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-100" />
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <QuickReplies onSelect={handleQuickReply} isCompact={!isExpanded} />

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-green-200 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-1.5 text-sm rounded-full border focus:border-green-500 bg-green-50/50"
            />
            <button
              type="submit"
              className="bg-green-500 text-white p-1.5 rounded-full hover:bg-green-600 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
