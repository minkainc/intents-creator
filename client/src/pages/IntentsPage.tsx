import React, { useState, useEffect, useCallback } from 'react';
import IntentList from '../components/IntentList';
import { Intent } from '../types/intent';
import { getIntents } from '../api/intentApi';

const IntentsPage: React.FC = () => {
    const [intents, setIntents] = useState<Intent[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [useSDK, setUseSDK] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchIntents = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const intentsData = await getIntents(useSDK);
            setIntents(intentsData);
        } catch (error) {
            console.error('Error fetching intents:', error);
            setError('Error al cargar los intents');
        } finally {
            setIsLoading(false);
        }
    }, [useSDK]);

    useEffect(() => {
        fetchIntents();
    }, [fetchIntents]);

    const handleSDKToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIntents([]);
        setUseSDK(event.target.checked);
    };

    return (
        <div className="intents-page">
            <h1>Intents</h1>
            
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
            <IntentList intents={intents} />
        </div>
    );
};

export default IntentsPage; 