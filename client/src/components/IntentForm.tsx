import React from 'react';
import { IntentData, accountTypes } from '../types/intent';
import { useIntentForm } from '../hooks/useIntentForm';
import '../App.css';

interface IntentFormProps {
  onSubmit: (data: IntentData) => void;
}

const IntentForm: React.FC<IntentFormProps> = ({ onSubmit }) => {
  const { intent, handleChange } = useIntentForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(intent);
  };

  return (
    <form onSubmit={handleSubmit} className="intent-form">
      <div className="form-group">
        <label htmlFor="sourceType">Tipo de cuenta origen:</label>
        <select
          id="sourceType"
          name="sourceType"
          value={intent.sourceType}
          onChange={handleChange}
          required
        >
          {accountTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="source">Cuenta origen:</label>
        <input
          type="text"
          id="source"
          name="source"
          value={intent.source}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="customDataSource">Datos personalizados origen (JSON):</label>
        <textarea
          id="customDataSource"
          name="customDataSource"
          value={intent.customDataSource}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="form-group">
        <label htmlFor="targetType">Tipo de cuenta destino:</label>
        <select
          id="targetType"
          name="targetType"
          value={intent.targetType}
          onChange={handleChange}
          required
        >
          {accountTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="target">Cuenta destino:</label>
        <input
          type="text"
          id="target"
          name="target"
          value={intent.target}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="customDataTarget">Datos personalizados destino (JSON):</label>
        <textarea
          id="customDataTarget"
          name="customDataTarget"
          value={intent.customDataTarget}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="form-group">
        <label htmlFor="currency">Moneda:</label>
        <input
          type="text"
          id="currency"
          name="currency"
          value={intent.currency}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Monto:</label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={intent.amount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group checkbox">
        <label htmlFor="useSDK">
          <input
            type="checkbox"
            id="useSDK"
            name="useSDK"
            checked={intent.useSDK}
            onChange={handleChange}
          />
          Usar SDK
        </label>
      </div>

      <button type="submit" className="submit-button">Crear Intent</button>
    </form>
  );
};

export default IntentForm;