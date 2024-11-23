import axios from 'axios';
import { IntentData } from '../types/intent';

const BASE_URL = 'http://localhost:9000/api';

export const createIntent = async (intentData: IntentData) => {
  const endpoint = intentData.useSDK ? '/create-intent-sdk' : '/create-intent-non-sdk';
  const response = await axios.post(`${BASE_URL}${endpoint}`, intentData);
  return response.data;
};