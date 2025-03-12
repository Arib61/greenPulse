import { useState, useCallback } from 'react';
import { Message } from '../types/chat';
import { generateResponse } from '../utils/chatbot';

export const useChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = useCallback((content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const handleSendMessage = useCallback(async (content: string) => {
    addMessage(content, 'user');
    setIsTyping(true);

    try {
      const response = await generateResponse(content);
      setIsTyping(false);
      addMessage(response, 'bot');
    } catch (error) {
      setIsTyping(false);
      addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
  }, [addMessage]);

  return {
    isOpen,
    setIsOpen,
    messages,
    isTyping,
    handleSendMessage,
  };
};