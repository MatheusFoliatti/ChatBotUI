# 🚀 Guia de Início Rápido

## Para começar em 5 minutos

### 1. Backend (Terminal 1)

```bash
# Instalar dependências Python
pip install -r requirements.txt

# Iniciar servidor backend
python backend_example.py
```

O backend estará rodando em `http://localhost:8000`

### 2. Frontend (Terminal 2)

```bash
# Instalar dependências Node
npm install

# Copiar variáveis de ambiente
cp .env.example .env

# Iniciar aplicação React
npm start
```

O frontend estará rodando em `http://localhost:3000`

### 3. Testar

1. Abra o navegador em `http://localhost:3000`
2. Digite uma mensagem no chat
3. Veja a resposta do backend

---

## Próximos Passos

### Integrar com LangGraph

Edite o arquivo `backend_example.py` e substitua a função `chat`:

```python
from langgraph import StateGraph, END
from langchain_openai import ChatOpenAI

# Configure seu agente LangGraph
async def process_with_langgraph(message: str, session_id: str = None):
    # Seu código LangGraph aqui
    llm = ChatOpenAI(model="gpt-4")

    # Defina seu grafo de estados
    workflow = StateGraph(...)

    # Processe a mensagem
    result = await workflow.ainvoke({"input": message})

    return result["output"]

@app.post("/chat", response_model=ChatResponse)
async def chat(msg: ChatMessage):
    # Use sua função LangGraph
    response_content = await process_with_langgraph(
        msg.message,
        msg.session_id
    )

    return ChatResponse(
        id=str(uuid.uuid4()),
        content=response_content,
        timestamp=datetime.utcnow().isoformat()
    )
```

### Adicionar Autenticação

1. Instale dependências:

```bash
pip install python-jose[cryptography] passlib[bcrypt]
npm install react-router-dom @types/react-router-dom
```

2. Crie componentes de login no frontend
3. Adicione endpoints de autenticação no backend
4. Implemente JWT tokens

### Deploy

**Frontend (Vercel/Netlify):**

```bash
npm run build
# Deploy da pasta build/
```

**Backend (Railway/Render):**

```bash
# Configure as variáveis de ambiente
# Deploy do arquivo backend_example.py
```

---

## Dicas de Desenvolvimento

### Debug do Frontend

```bash
# Ver logs detalhados
npm start -- --verbose

# Verificar build de produção
npm run build
```

### Debug do Backend

```bash
# Modo reload automático
uvicorn backend_example:app --reload --log-level debug

# Ver documentação da API
# Acesse: http://localhost:8000/docs
```

### Variáveis de Ambiente

**Frontend (.env):**

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENV=development
```

**Backend (.env):**

```env
OPENAI_API_KEY=sua-chave-aqui
DATABASE_URL=postgresql://...
SECRET_KEY=seu-secret-key
```

---

## Problemas Comuns

### Erro de CORS

- Verifique se o backend tem CORS configurado
- Confirme a URL do frontend no `allow_origins`

### Mensagens não aparecem

- Verifique o console do navegador (F12)
- Confirme que o backend está rodando
- Teste a API em `http://localhost:8000/docs`

### Erro de TypeScript

- Execute: `npm install`
- Limpe o cache: `rm -rf node_modules package-lock.json && npm install`

---

## Recursos Úteis

- [Documentação React](https://react.dev/)
- [Documentação TypeScript](https://www.typescriptlang.org/)
- [Documentação FastAPI](https://fastapi.tiangolo.com/)
- [LangGraph Docs](https://github.com/langchain-ai/langgraph)
- [Framer Motion](https://www.framer.com/motion/)

---
