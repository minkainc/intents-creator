import axios from 'axios';
import { Wallet } from '../types/wallet';

const BASE_URL = 'http://localhost:3002/api';

export const getWallets = async (): Promise<Wallet[]> => {
  const response = await axios.get(`${BASE_URL}/wallets`);
  return response.data;
}; 