import axios, { AxiosInstance } from 'axios';

interface AgentConfig {
  id: string;
  name: string;
  host: string;
  port: number;
  apiKey: string;
  enabled: boolean;
}

interface AgentsConfiguration {
  agents: AgentConfig[];
  defaultAgent: string;
}

class RemoteAgentService {
  private config: AgentsConfiguration | null = null;
  private apiClients: Map<string, AxiosInstance> = new Map();

  async loadConfig(): Promise<void> {
    try {
      const response = await fetch('/agents-config.json');
      if (response.ok) {
        this.config = await response.json();
        this.initializeClients();
        console.log('Configuração de agentes carregada:', this.config);
      }
    } catch (error) {
      console.warn('Arquivo agents-config.json não encontrado, usando variáveis de ambiente');
      this.loadFromEnv();
    }
  }

  private loadFromEnv(): void {
    const agentUrl = process.env.REACT_APP_AGENT_URL;
    const agentHost = process.env.REACT_APP_AGENT_HOST;
    const agentPort = process.env.REACT_APP_AGENT_PORT;
    const apiKey = process.env.REACT_APP_API_KEY;

    if (agentUrl || (agentHost && agentPort)) {
      this.config = {
        agents: [{
          id: 'default',
          name: 'Agente Padrão',
          host: agentHost || 'localhost',
          port: parseInt(agentPort || '8000'),
          apiKey: apiKey || '',
          enabled: true
        }],
        defaultAgent: 'default'
      };

      this.initializeClients();
    }
  }

  private initializeClients(): void {
    if (!this.config) return;

    this.config.agents.forEach(agent => {
      if (!agent.enabled) return;

      const baseURL = `http://${agent.host}:${agent.port}`;
      const timeout = parseInt(process.env.REACT_APP_REQUEST_TIMEOUT || '30000');

      const client = axios.create({
        baseURL,
        timeout,
        headers: {
          'Content-Type': 'application/json',
          ...(agent.apiKey && { 'Authorization': `Bearer ${agent.apiKey}` })
        }
      });

      client.interceptors.request.use(
        config => {
          console.log(`[${agent.name}] Requisição: ${config.method?.toUpperCase()} ${config.url}`);
          return config;
        },
        error => Promise.reject(error)
      );

      client.interceptors.response.use(
        response => response,
        error => Promise.reject(error)
      );

      this.apiClients.set(agent.id, client);
    });
  }

  getClient(agentId?: string): AxiosInstance | null {
    const id = agentId || this.config?.defaultAgent || 'default';
    return this.apiClients.get(id) || null;
  }

  getAvailableAgents(): AgentConfig[] {
    return this.config?.agents.filter(a => a.enabled) || [];
  }

  async sendMessage(message: string, sessionId?: string, agentId?: string): Promise<any> {
    const client = this.getClient(agentId);
    if (!client) throw new Error('Nenhum agente disponível');

    const response = await client.post('/chat', { message, session_id: sessionId });
    return response.data;
  }

  switchAgent(agentId: string): boolean {
    if (!this.config) return false;
    const agent = this.config.agents.find(a => a.id === agentId);
    if (!agent || !agent.enabled) return false;
    this.config.defaultAgent = agentId;
    return true;
  }
}

export const remoteAgentService = new RemoteAgentService();
remoteAgentService.loadConfig();
