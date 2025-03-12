import React from "react";
import { ChatWindow } from "./ChatWindow";
import { ChatBotIcon } from "./ChatBotIcon";
import { useChat } from "../../hooks/useChat";

export const ChatBot: React.FC = () => {
  const { isOpen, setIsOpen, messages, isTyping, handleSendMessage } =
    useChat();

  return (
    <>
      <ChatBotIcon
        onClick={() => setIsOpen(true)}
        hasUnreadMessages={messages.length > 1 && !isOpen}
      />
      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        onClose={() => setIsOpen(false)}
        onSendMessage={handleSendMessage}
        isTyping={isTyping}
      />
    </>
  );
};
