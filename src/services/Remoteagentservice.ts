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

  // Carrega configuração dos agentes
  async loadConfig(): Promise<void> {
    try {
      // Tenta carregar de arquivo JSON público
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

  // Carrega configuração de variáveis de ambiente
  private loadFromEnv(): void {
    const agentUrl = process.env.REACT_APP_AGENT_URL;
    const agentHost = process.env.REACT_APP_AGENT_HOST;
    const agentPort = process.env.REACT_APP_AGENT_PORT;
    const apiKey = process.env.REACT_APP_API_KEY;

    if (agentUrl || (agentHost && agentPort)) {
      const baseUrl = agentUrl || `http://${agentHost}:${agentPort}`;
      
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

  // Inicializa clientes HTTP para cada agente
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

      // Interceptor para logs
      client.interceptors.request.use(
        config => {
          console.log(`[${agent.name}] Requisição: ${config.method?.toUpperCase()} ${config.url}`);
          return config;
        },
        error => {
          console.error(`[${agent.name}] Erro na requisição:`, error);
          return Promise.reject(error);
        }
      );

      // Interceptor para respostas
      client.interceptors.response.use(
        response => {
          console.log(`[${agent.name}] Resposta recebida:`, response.status);
          return response;
        },
        error => {
          if (error.response) {
            console.error(`[${agent.name}] Erro ${error.response.status}:`, error.response.data);
          } else if (error.request) {
            console.error(`[${agent.name}] Sem resposta do servidor`);
          } else {
            console.error(`[${agent.name}] Erro:`, error.message);
          }
          return Promise.reject(error);
        }
      );

      this.apiClients.set(agent.id, client);
    });
  }

  // Obtém cliente para um agente específico
  getClient(agentId?: string): AxiosInstance | null {
    const id = agentId || this.config?.defaultAgent || 'default';
    const client = this.apiClients.get(id);

    if (!client) {
      console.error(`Cliente para agente "${id}" não encontrado`);
    }

    return client || null;
  }

  // Lista agentes disponíveis
  getAvailableAgents(): AgentConfig[] {
    return this.config?.agents.filter(a => a.enabled) || [];
  }

  // Verifica se agente está disponível
  async healthCheck(agentId?: string): Promise<boolean> {
    const client = this.getClient(agentId);
    if (!client) return false;

    try {
      const response = await client.get('/health');
      return response.status === 200;
    } catch (error) {
      console.error('Health check falhou:', error);
      return false;
    }
  }

  // Envia mensagem para o agente
  async sendMessage(
    message: string, 
    sessionId?: string,
    agentId?: string
  ): Promise<any> {
    const client = this.getClient(agentId);
    if (!client) {
      throw new Error('Nenhum agente disponível');
    }

    try {
      const response = await client.post('/chat', {
        message,
        session_id: sessionId
      });

      return response.data;
    } catch (error: any) {
      // Tratamento de erros específicos
      if (error.response?.status === 401) {
        throw new Error('Autenticação falhou. Verifique sua API key.');
      } else if (error.response?.status === 403) {
        throw new Error('Acesso negado ao agente.');
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('Não foi possível conectar ao agente. Verifique se está rodando.');
      } else if (error.code === 'ETIMEDOUT') {
        throw new Error('Timeout: O agente demorou muito para responder.');
      }
      
      throw error;
    }
  }

  // Troca de agente em tempo real
  switchAgent(agentId: string): boolean {
    if (!this.config) return false;

    const agent = this.config.agents.find(a => a.id === agentId);
    if (!agent || !agent.enabled) {
      console.error(`Agente "${agentId}" não encontrado ou desabilitado`);
      return false;
    }

    this.config.defaultAgent = agentId;
    console.log(`Agente trocado para: ${agent.name}`);
    return true;
  }
}

// Exporta instância singleton
export const remoteAgentService = new RemoteAgentService();

// Inicializa ao carregar o módulo
remoteAgentService.loadConfig();