import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './App.css';

interface FormData {
  sourceAccount: string;
  destinationAccount: string;
  currency: string;
  amount: string;
  useSDK: boolean;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    sourceAccount: '',
    destinationAccount: '',
    currency: '',
    amount: '',
    useSDK: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const endpoint = formData.useSDK
        ? '/api/create-intent-sdk'
        : '/api/create-intent-non-sdk';
      const response = await axios.post(`http://localhost:3001${endpoint}`, formData);
      console.log(response.data);
      alert('Intent creado exitosamente');
    } catch (error) {
      console.error('Error al crear el intent:', error);
      alert('Error al crear el intent');
    }
  };

  return (
    <div className="App">
      <h1>Crear Intent</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sourceAccount">Cuenta origen:</label>
          <input
            type="text"
            id="sourceAccount"
            name="sourceAccount"
            value={formData.sourceAccount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="destinationAccount">Cuenta destino:</label>
          <input
            type="text"
            id="destinationAccount"
            name="destinationAccount"
            value={formData.destinationAccount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="currency">Moneda:</label>
          <input
            type="text"
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Monto:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="useSDK">Usar SDK:</label>
          <input
            type="checkbox"
            id="useSDK"
            name="useSDK"
            checked={formData.useSDK}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Crear Intent</button>
      </form>
    </div>
  );
}

export default App;