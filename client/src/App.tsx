import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './App.css';

interface FormData {
  source: string;
  target: string;
  currency: string;
  amount: string;
  useSDK: boolean;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    source: '',
    target: '',
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
      const response = await axios.post(`http://localhost:3002${endpoint}`, formData);
      console.log(response.data);  
    } catch (error) {
      console.error('Error al crear el intent:', error);
    }
  };

  return (
    <div className="App">
      <h1>Crear Intent</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="source">Cuenta origen:</label>
          <input
            type="text"
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="target">Cuenta destino:</label>
          <input
            type="text"
            id="target"
            name="target"
            value={formData.target}
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