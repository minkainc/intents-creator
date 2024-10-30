import React, { useState } from 'react';
import './App.css';
import IntentForm from './components/IntentForm';
import WalletsPage from './pages/WalletsPage';
import { IntentData } from './types/intent';
import { createIntent } from './api/intentApi';

function App() {
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'wallets'>('home');

  const handleSubmit = async (intentData: IntentData) => {
    try {
      const result = await createIntent(intentData);
      setNotification({ type: 'success', message: 'Intent creado exitosamente' });
      console.log(result);
    } catch (error) {
      console.error('Error al crear el intent:', error);
    }
  };

  return (
    <div className="App">
      <nav className="navigation">
        <button 
          className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentPage('home')}
        >
          Crear Intent
        </button>
        <button 
          className={`nav-button ${currentPage === 'wallets' ? 'active' : ''}`}
          onClick={() => setCurrentPage('wallets')}
        >
          Ver Wallets
        </button>
      </nav>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {currentPage === 'home' ? (
        <>
          <h1>Crear Intent</h1>
          <IntentForm onSubmit={handleSubmit} />
        </>
      ) : (
        <WalletsPage />
      )}
    </div>
  );
}

export default App;