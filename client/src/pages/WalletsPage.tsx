import React, { useState, useEffect } from 'react';
import WalletList from '../components/WalletList';
import { Wallet } from '../types/wallet';
import { getWallets } from '../api/walletApi';

const WalletsPage: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const walletsData = await getWallets();
        setWallets(walletsData);
      } catch (error) {
        console.error('Error fetching wallets:', error);
        setError('Error al cargar las wallets');
      }
    };

    fetchWallets();
  }, []);

  return (
    <div className="wallets-page">
      <h1>Wallets</h1>
      {error && <div className="notification error">{error}</div>}
      <WalletList wallets={wallets} />
    </div>
  );
};

export default WalletsPage; 