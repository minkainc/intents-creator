import axios from 'axios';
import { IntentData } from '../types/intent';
import { Intent } from '../types/intent';

const BASE_URL = 'http://localhost:9000/api';

export const createIntent = async (intentData: IntentData) => {
  const endpoint = intentData.useSDK ? '/create-intent-sdk' : '/create-intent-non-sdk';
  const response = await axios.post(`${BASE_URL}${endpoint}`, intentData);
  return response.data;
};

export const getIntents = async (useSDK: boolean): Promise<Intent[]> => {
    const endpoint = useSDK ? '/intents-sdk' : '/intents-non-sdk';
    
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error('Error fetching intents');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in getIntents:', error);
        throw error;
    }
};