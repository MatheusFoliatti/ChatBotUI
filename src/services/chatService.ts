import axios, { AxiosInstance } from 'axios';
import { Message } from '../types';

class ChatService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Configura token de autenticação
  setAuthToken(token: string) {
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Envia mensagem para o chatbot
  async sendMessage(message: string, sessionId?: string): Promise<Message> {
    try {
      const response = await this.api.post('/chat', {
        message,
        session_id: sessionId,
      });
      
      return {
        id: response.data.id || Date.now().toString(),
        content: response.data.content,
        role: 'assistant',
        timestamp: new Date(response.data.timestamp || Date.now()),
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Streaming de resposta (para quando implementar streaming)
  async streamMessage(
    message: string,
    onChunk: (chunk: string) => void,
    sessionId?: string
  ): Promise<void> {
    try {
      const response = await this.api.post(
        '/chat/stream',
        {
          message,
          session_id: sessionId,
        },
        {
          responseType: 'stream',
        }
      );

      // Implementar lógica de streaming aqui
      // Este é um exemplo básico
      return response.data;
    } catch (error) {
      console.error('Error streaming message:', error);
      throw error;
    }
  }

  // Buscar histórico de conversas
  async getChatSessions(): Promise<any[]> {
    try {
      const response = await this.api.get('/sessions');
      return response.data;
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }
  }

  // Criar nova sessão
  async createSession(title?: string): Promise<any> {
    try {
      const response = await this.api.post('/sessions', { title });
      return response.data;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  }

  // Deletar sessão
  async deleteSession(sessionId: string): Promise<void> {
    try {
      await this.api.delete(`/sessions/${sessionId}`);
    } catch (error) {
      console.error('Error deleting session:', error);
      throw error;
    }
  }
}

export const chatService = new ChatService();