import axios from 'axios';
import { Wallet } from '../types/wallet';

const BASE_URL = 'http://localhost:9000/api';

export const getWallets = async (): Promise<Wallet[]> => {
  try {
    const response = await fetch(`${BASE_URL}/wallets-sdk`);
    const data = await response.json();
    
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