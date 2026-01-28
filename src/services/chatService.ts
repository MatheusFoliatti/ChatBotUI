import axios, { AxiosInstance } from 'axios';
import { Message } from '../types';
import { remoteAgentService } from './remoteAgentService';

class ChatService {
  private api: AxiosInstance;
  private useRemoteAgent: boolean = false;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Verifica se deve usar agente remoto
    this.checkRemoteAgentConfig();
  }

  // Verifica configuração de agente remoto
  private async checkRemoteAgentConfig(): Promise<void> {
    try {
      const agents = remoteAgentService.getAvailableAgents();
      this.useRemoteAgent = agents.length > 0;
      
      if (this.useRemoteAgent) {
        console.log('✅ Usando serviço de agente remoto');
      } else {
        console.log('ℹ️ Usando API local padrão');
      }
    } catch (error) {
      console.error('Erro ao verificar agente remoto:', error);
      this.useRemoteAgent = false;
    }
  }

  // Configura token de autenticação
  setAuthToken(token: string) {
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Envia mensagem para o chatbot
  async sendMessage(message: string, sessionId?: string, agentId?: string): Promise<Message> {
    try {
      let response;

      // Usa agente remoto se configurado
      if (this.useRemoteAgent) {
        response = await remoteAgentService.sendMessage(message, sessionId, agentId);
      } else {
        // Usa API local padrão
        const res = await this.api.post('/chat', {
          message,
          session_id: sessionId,
        });
        response = res.data;
      }
      
      return {
        id: response.id || Date.now().toString(),
        content: response.content,
        role: 'assistant',
        timestamp: new Date(response.timestamp || Date.now()),
      };
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Mensagens de erro amigáveis
      if (error.message) {
        throw new Error(error.message);
      }
      
      throw new Error('Erro ao enviar mensagem. Tente novamente.');
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