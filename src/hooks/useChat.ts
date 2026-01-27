import { useState, useCallback, useRef, useEffect } from 'react';
import { Message, ChatStatus } from '../types';
import { chatService } from '../services/chatService';

export const useChat = (sessionId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<ChatStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll para última mensagem
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Envia mensagem
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setStatus('loading');
    setError(null);

    try {
      const assistantMessage = await chatService.sendMessage(content, sessionId);
      setMessages(prev => [...prev, assistantMessage]);
      setStatus('idle');
    } catch (err) {
      setError('Erro ao enviar mensagem. Tente novamente.');
      setStatus('error');
      console.error(err);
    }
  }, [sessionId]);

  // Limpa chat
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    setStatus('idle');
  }, []);

  // Retenta última mensagem
  const retryLastMessage = useCallback(() => {
    const lastUserMessage = [...messages]
      .reverse()
      .find(msg => msg.role === 'user');
    
    if (lastUserMessage) {
      sendMessage(lastUserMessage.content);
    }
  }, [messages, sendMessage]);

  return {
    messages,
    status,
    error,
    sendMessage,
    clearMessages,
    retryLastMessage,
    messagesEndRef,
    isLoading: status === 'loading' || status === 'streaming',
  };
};