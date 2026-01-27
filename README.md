# 🤖 LangGraph Chatbot Interface

<div align="center">
  
  ![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
  ![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?logo=typescript)

**Interface web moderna e elegante para chatbots baseados em agentes LangGraph**

[Demo](#-demonstração) • [Instalação](#-instalação) • [Features](#-features) • [Roadmap](#-roadmap)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Features](#-features)
- [Demonstração](#-demonstração)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Backend](#-api-backend)
- [Roadmap](#-roadmap)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

Esta é uma interface web completa e moderna desenvolvida em **React** com **TypeScript** para interagir com chatbots construídos usando agentes **LangGraph**. O projeto oferece uma experiência de usuário fluida e intuitiva, com design clean, tema azul e animações suaves.

### 🎨 Design Principles

- **Minimalismo**: Interface clean e focada na conversa
- **Fluidez**: Animações suaves usando Framer Motion
- **Responsividade**: Funciona perfeitamente em desktop e mobile
- **Acessibilidade**: Componentes pensados para todos os usuários
- **Performance**: Otimizado para carregamento rápido

---

## ✨ Features

### 🚀 Implementadas

- ✅ Interface de chat em tempo real
- ✅ Design responsivo e mobile-first
- ✅ Tema azul com gradientes elegantes
- ✅ Animações suaves e transições fluidas
- ✅ Indicador de digitação animado
- ✅ Histórico de mensagens
- ✅ Tratamento de erros
- ✅ TypeScript para type safety
- ✅ Componentes reutilizáveis
- ✅ Auto-scroll para últimas mensagens
- ✅ Timestamps nas mensagens
- ✅ Avatar do assistente
- ✅ Limpeza de chat

### 🔮 Planejadas (Roadmap)

- 🔲 Sistema de autenticação (Login/Registro)
- 🔲 Múltiplas sessões de chat
- 🔲 Histórico persistente
- 🔲 Suporte a markdown nas mensagens
- 🔲 Upload de arquivos
- 🔲 Modo escuro/claro
- 🔲 Compartilhamento de conversas
- 🔲 Exportação de chats (PDF/JSON)
- 🔲 Configurações de usuário
- 🔲 Notificações push
- 🔲 Suporte a voz (speech-to-text)
- 🔲 Streaming de respostas
- 🔲 Sugestões de mensagens
- 🔲 Feedback de mensagens (👍/👎)

---

## 🎬 Demonstração

### Interface Principal

```
┌─────────────────────────────────────────┐
│  🤖 LangGraph Chatbot         🗑️       │
│  Online                                 │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Bem-vindo ao LangGraph         │   │
│  │  Chatbot!                       │   │
│  │  Comece uma conversa...         │   │
│  └─────────────────────────────────┘   │
│                                         │
│  👤 Olá! Como você pode me ajudar?     │
│                                         │
│  🤖 Olá! Sou um assistente baseado     │
│     em LangGraph. Posso ajudar com...  │
│                                         │
├─────────────────────────────────────────┤
│  [ Digite sua mensagem...          ]  ➤│
└─────────────────────────────────────────┘
```

---

## 🛠️ Tecnologias

### Core

- **React 18.2** - Biblioteca UI
- **TypeScript 4.9** - Type safety
- **Framer Motion 10** - Animações fluidas

### Styling

- **CSS3** - Estilização customizada
- **CSS Variables** - Tema dinâmico
- **Flexbox/Grid** - Layout responsivo

### Comunicação

- **Axios** - Requisições HTTP
- **REST API** - Comunicação com backend

### Build & Dev

- **Create React App** - Setup inicial
- **ESLint** - Code linting
- **npm/yarn** - Gerenciamento de pacotes

---

## 📦 Instalação

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Backend LangGraph configurado

### Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/MatheusFoliatti/ChatBotUI.git
cd ChatBotUI
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:8000/ws
```

4. **Inicie o servidor de desenvolvimento**

```bash
npm start
# ou
yarn start
```

5. **Acesse a aplicação**

```
http://localhost:3000
```

---

## ⚙️ Configuração

### Variáveis de Ambiente

| Variável            | Descrição              | Padrão                   |
| ------------------- | ---------------------- | ------------------------ |
| `REACT_APP_API_URL` | URL da API backend     | `http://localhost:8000`  |
| `REACT_APP_WS_URL`  | URL WebSocket (futuro) | `ws://localhost:8000/ws` |

### Customização de Tema

As cores do tema podem ser facilmente customizadas editando as variáveis CSS em `src/styles/index.css`:

```css
:root {
  --primary-blue: #2563eb;
  --primary-blue-light: #3b82f6;
  --primary-blue-dark: #1e40af;
  --secondary-blue: #60a5fa;
  --accent-blue: #93c5fd;
  /* ... outras cores */
}
```

---

## 🚀 Uso

### Enviando Mensagens

```typescript
// O hook useChat gerencia todo o estado
const { sendMessage, messages, isLoading } = useChat();

// Enviar mensagem
sendMessage("Olá, como você está?");
```

### Integrando com seu Backend

A aplicação espera que seu backend LangGraph tenha os seguintes endpoints:

```typescript
// POST /chat - Enviar mensagem
{
  "message": "Sua mensagem aqui",
  "session_id": "optional-session-id"
}

// Resposta esperada
{
  "id": "msg_123",
  "content": "Resposta do chatbot",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Exemplo de Backend Python (FastAPI)

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ChatMessage(BaseModel):
    message: str
    session_id: str | None = None

@app.post("/chat")
async def chat(msg: ChatMessage):
    # Processar com LangGraph
    response = await process_with_langgraph(msg.message)

    return {
        "id": generate_id(),
        "content": response,
        "timestamp": datetime.now().isoformat()
    }
```

---

## 📁 Estrutura do Projeto

```
langgraph-chatbot/
├── public/
│   └── index.html              # HTML base
├── src/
│   ├── components/             # Componentes React
│   │   ├── ChatContainer.tsx   # Container principal
│   │   ├── ChatInput.tsx       # Input de mensagens
│   │   ├── Message.tsx         # Componente de mensagem
│   │   └── TypingIndicator.tsx # Indicador de digitação
│   ├── hooks/                  # Hooks customizados
│   │   └── useChat.ts          # Hook principal do chat
│   ├── services/               # Serviços de API
│   │   └── chatService.ts      # Comunicação com backend
│   ├── styles/                 # Estilos CSS
│   │   ├── index.css           # Estilos globais
│   │   ├── App.css             # Estilos do App
│   │   ├── ChatContainer.css   # Estilos do container
│   │   ├── ChatInput.css       # Estilos do input
│   │   ├── Message.css         # Estilos das mensagens
│   │   └── TypingIndicator.css # Estilos do indicador
│   ├── types/                  # Definições TypeScript
│   │   └── index.ts            # Tipos principais
│   ├── App.tsx                 # Componente App
│   └── index.tsx               # Entry point
├── .env.example                # Exemplo de variáveis
├── .gitignore                  # Arquivos ignorados
├── package.json                # Dependências
├── tsconfig.json               # Config TypeScript
└── README.md                   # Este arquivo
```

---

## 🔌 API Backend

### Endpoints Necessários

#### POST /chat

Enviar mensagem para o chatbot

**Request:**

```json
{
  "message": "string",
  "session_id": "string (opcional)"
}
```

**Response:**

```json
{
  "id": "string",
  "content": "string",
  "timestamp": "string (ISO 8601)"
}
```

#### GET /sessions (Futuro)

Buscar histórico de sessões

**Response:**

```json
[
  {
    "id": "string",
    "title": "string",
    "created_at": "string",
    "updated_at": "string"
  }
]
```

#### POST /sessions (Futuro)

Criar nova sessão

**Request:**

```json
{
  "title": "string (opcional)"
}
```

---

## 🗺️ Roadmap

### Fase 1: Core (✅ Completo)

- [x] Interface básica de chat
- [x] Sistema de mensagens
- [x] Design responsivo
- [x] Animações

### Fase 2: Autenticação (🔄 Planejado)

- [ ] Tela de login
- [ ] Registro de usuários
- [ ] JWT authentication
- [ ] Perfil de usuário
- [ ] Recuperação de senha

### Fase 3: Features Avançadas (📋 Futuro)

- [ ] Histórico persistente
- [ ] Múltiplas sessões
- [ ] Suporte a markdown
- [ ] Upload de arquivos
- [ ] Modo escuro
- [ ] Exportação de chats

### Fase 4: Melhorias (💡 Ideias)

- [ ] Streaming de respostas
- [ ] Suporte a voz
- [ ] Notificações
- [ ] Compartilhamento
- [ ] Analytics
- [ ] A/B testing

---

## 👨‍💻 Autor

**Matheus Foliatti**

- LinkedIn: [@MatheusFoliatti](https://linkedin.com/in/MatheusFoliatti)
- GitHub: [@MatheusFoliatti](https://github.com/MatheusFoliatti)

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

Feito com ❤️ e ☕

</div>
