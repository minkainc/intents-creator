import React from 'react';
import IntentForm from '../components/IntentForm';
import { IntentData } from '../types/intent';
import { createIntent } from '../api/intentApi';

const CreateIntentPage: React.FC = () => {
    const handleSubmit = async (intentData: IntentData) => {
        try {
            const result = await createIntent(intentData);
            console.log('Intent creado exitosamente:', result);
            // Aquí puedes agregar una notificación o redirección
        } catch (error) {
            console.error('Error al crear el intent:', error);
        }
    };

    return (
        <div className="create-intent-page">
            <h1>Crear Intent</h1>
            <IntentForm onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateIntentPage; 