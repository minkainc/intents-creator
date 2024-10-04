import React, { useState } from 'react';

const IntentForm = () => {
  const [intentData, setIntentData] = useState({
    source: '',
    target: '',
    currency: '',
    amount: '',
    useSDK: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setIntentData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(intentData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="source"
        value={intentData.source}
        onChange={handleChange}
        placeholder="Source"
      />
      <input
        type="text"
        name="target"
        value={intentData.target}
        onChange={handleChange}
        placeholder="Target"
      />
      <input
        type="text"
        name="currency"
        value={intentData.currency}
        onChange={handleChange}
        placeholder="Currency"
      />
      <input
        type="text"
        name="amount"
        value={intentData.amount}
        onChange={handleChange}
        placeholder="Amount"
      />
      <label>
        Use SDK:
        <input
          type="checkbox"
          name="useSDK"
          checked={intentData.useSDK}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Create Intent</button>
    </form>
  );
};

export default IntentForm;