import axios from 'axios';
import { Wallet } from '../types/wallet';

const BASE_URL = 'http://localhost:9000/api';

export const getWallets = async (useSDK: boolean = false): Promise<Wallet[]> => {
  try {
    const endpoint = useSDK ? `${BASE_URL}/wallets-sdk`: `${BASE_URL}/wallets-non-sdk`;
    const response = await fetch(endpoint);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return data.map((wallet: any) => ({
      id: wallet.handle,
      name: wallet.handle,
      parent: wallet.parent,
      schema: wallet.schema,
      access: wallet.access
    }));
  } catch (error) {
    console.error('Error fetching wallets:', error);
    throw error;
  }
}; 