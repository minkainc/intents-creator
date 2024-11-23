import React, { useState, useEffect, useCallback } from 'react';
import WalletList from '../components/WalletList';
import { Wallet } from '../types/wallet';
import { getWallets } from '../api/walletApi';

const WalletsPage: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [useSDK, setUseSDK] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchWallets = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const walletsData = await getWallets(useSDK);
      setWallets(walletsData);
    } catch (error) {
      console.error('Error fetching wallets:', error);
      setError('Error al cargar las wallets');
    } finally {
      setIsLoading(false);
    }
  }, [useSDK]);

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  const handleSDKToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWallets([]);
    setUseSDK(event.target.checked);
  };

  return (
    <div className="wallets-page">
      <h1>Wallets</h1>
      
      <div className="sdk-toggle">
        <label>
          <input
            type="checkbox"
            checked={useSDK}
            onChange={handleSDKToggle}
          />
          Usar SDK
        </label>
      </div>

      {isLoading && <div>Cargando...</div>}
      {error && <div className="notification error">{error}</div>}
      <WalletList wallets={wallets} />
    </div>
  );
};

export default WalletsPage; 