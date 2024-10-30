import React from 'react';
import { Wallet } from '../types/wallet';

interface WalletListProps {
  wallets: Wallet[];
}

const WalletList: React.FC<WalletListProps> = ({ wallets }) => {
  return (
    <div className="wallet-list">
      <h2>Lista de Wallets</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet) => (
            <tr key={wallet.id}>
              <td>{wallet.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletList; 