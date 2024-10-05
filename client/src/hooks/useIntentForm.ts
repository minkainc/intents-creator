import { useState } from 'react';
import { IntentData } from '../types/intent';

const initialState: IntentData = {
  sourceType: 'svgs',
  source: '',
  customDataSource: '',
  targetType: 'svgs',
  target: '',
  customDataTarget: '',
  currency: '',
  amount: '',
  useSDK: false
};

export const useIntentForm = () => {
  const [intent, setIntent] = useState<IntentData>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setIntent(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return { intent, handleChange };
};