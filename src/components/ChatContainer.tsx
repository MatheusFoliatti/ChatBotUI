import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { useChat } from '../hooks/useChat';
import '../styles/ChatContainer.css';

export const ChatContainer: React.FC = () => {
  const { 
    messages, 
    error, 
    sendMessage, 
    clearMessages,
    messagesEndRef,
    isLoading 
  } = useChat();

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="header-content">
          <div className="header-title">
            <motion.div
              className="logo"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </motion.div>
            <div>
              <h1>LangGraph Chatbot</h1>
              <p className="status-text">
                {isLoading ? 'Processando...' : 'Online'}
              </p>
            </div>
          </div>
          <motion.button
            className="clear-button"
            onClick={clearMessages}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </motion.button>
        </div>
      </header>

      <main className="chat-messages">
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              className="welcome-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="welcome-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                </svg>
              </div>
              <h2>Bem-vindo ao LangGraph Chatbot!</h2>
              <p>Comece uma conversa enviando uma mensagem abaixo.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

        {isLoading && <TypingIndicator />}

        {error && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <span>{error}</span>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </main>

      <footer className="chat-footer">
        <ChatInput 
          onSend={sendMessage} 
          disabled={isLoading}
        />
      </footer>
    </div>
  );
};