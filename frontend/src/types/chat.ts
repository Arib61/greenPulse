export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }
  
  export interface QuickReply {
    id: string;
    text: string;
    action: string;
  }
  
  export interface ChatState {
    isOpen: boolean;
    messages: Message[];
    isTyping: boolean;
  }