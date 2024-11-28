import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
        <nav className="navigation">
            <ul>
                <li>
                    <NavLink 
                        to="/wallets"
                        className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : ''}
                    >
                        Wallets
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/intents"
                        className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : ''}
                    >
                        Intents
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/create-intent"
                        className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : ''}
                    >
                        Create Intent
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation; 