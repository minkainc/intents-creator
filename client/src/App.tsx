import React, { useState } from 'react';
import './App.css';
import IntentForm from './components/IntentForm';
import { IntentData } from './types/intent';
import { createIntent } from './api/intentApi';

function App() {
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (intentData: IntentData) => {
    try {
      const result = await createIntent(intentData);
      setNotification({ type: 'success', message: 'Intent creado exitosamente' });
      console.log(result);
    } catch (error) {
    //   setNotification({ type: 'error', message: 'Error al crear el intent' });
      console.error('Error al crear el intent:', error);
    }
  };

  return (
    <div className="App">
      <h1>Crear Intent</h1>
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <IntentForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;