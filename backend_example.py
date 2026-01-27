"""
Exemplo de Backend para o LangGraph Chatbot
Este é um exemplo simples de API que pode ser expandido com LangGraph
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
import uuid

app = FastAPI(title="LangGraph Chatbot API")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://192.168.17.179:3000",  # Seu IP local
        "*"  # Permite todas as origens (use apenas em desenvolvimento)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos
class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    id: str
    content: str
    timestamp: str

class SessionCreate(BaseModel):
    title: Optional[str] = None

# Simular armazenamento (use banco de dados em produção)
sessions = {}
messages = {}

@app.get("/")
async def root():
    return {
        "message": "LangGraph Chatbot API",
        "version": "1.0.0",
        "status": "online"
    }

@app.post("/chat", response_model=ChatResponse)
async def chat(msg: ChatMessage):
    """
    Endpoint principal do chat
    Aqui você integraria com LangGraph
    """
    try:
        # Aqui você processaria a mensagem com LangGraph
        # response = await process_with_langgraph(msg.message, msg.session_id)
        
        # Exemplo de resposta simulada
        response_content = f"Recebi sua mensagem: '{msg.message}'. "
        response_content += "Esta é uma resposta de exemplo. "
        response_content += "Integre aqui seu agente LangGraph para respostas reais!"
        
        response = ChatResponse(
            id=str(uuid.uuid4()),
            content=response_content,
            timestamp=datetime.utcnow().isoformat()
        )
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/sessions")
async def get_sessions():
    """Buscar todas as sessões"""
    return list(sessions.values())

@app.post("/sessions")
async def create_session(session: SessionCreate):
    """Criar nova sessão"""
    session_id = str(uuid.uuid4())
    new_session = {
        "id": session_id,
        "title": session.title or f"Chat {len(sessions) + 1}",
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }
    sessions[session_id] = new_session
    messages[session_id] = []
    return new_session

@app.delete("/sessions/{session_id}")
async def delete_session(session_id: str):
    """Deletar sessão"""
    if session_id in sessions:
        del sessions[session_id]
        if session_id in messages:
            del messages[session_id]
        return {"message": "Session deleted successfully"}
    raise HTTPException(status_code=404, detail="Session not found")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    print("🚀 Iniciando servidor backend...")
    print("📍 API disponível em: http://localhost:8000")
    print("📍 Documentação em: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")