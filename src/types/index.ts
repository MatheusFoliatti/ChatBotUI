export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  isStreaming?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ChatbotConfig {
  apiEndpoint: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

export type ChatStatus = 'idle' | 'loading' | 'streaming' | 'error';