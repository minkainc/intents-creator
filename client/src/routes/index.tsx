import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WalletsPage from '../pages/WalletsPage';
import IntentsPage from '../pages/IntentsPage';
import CreateIntentPage from '../pages/CreateIntentPage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<WalletsPage />} />
            <Route path="/wallets" element={<WalletsPage />} />
            <Route path="/intents" element={<IntentsPage />} />
            <Route path="/create-intent" element={<CreateIntentPage />} />
        </Routes>
    );
};

export default AppRoutes; 