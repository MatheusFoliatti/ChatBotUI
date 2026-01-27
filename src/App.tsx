import React, { useState } from 'react';
import { ChatContainer } from './components/ChatContainer';
import { Login } from './components/Login';
import { ConfirmModal } from './components/ConfirmModal';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log('Tentando login:', { email, password });
      
      // Simulando delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulando sucesso
      setIsAuthenticated(true);
      
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao fazer login. Tente novamente.');
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    setIsAuthenticated(false);
    // Opcional: limpar localStorage se estiver usando
    // localStorage.removeItem('authToken');
    console.log('Usuário desconectado');
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <ChatContainer onLogout={handleLogoutClick} />
          <ConfirmModal
            isOpen={showLogoutModal}
            title="Confirmar Logout"
            message="Tem certeza que deseja sair? Sua sessão atual será encerrada."
            confirmText="Sair"
            cancelText="Cancelar"
            onConfirm={handleLogoutConfirm}
            onCancel={handleLogoutCancel}
            type="danger"
          />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;