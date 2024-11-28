import './IntentList.css';
import React from 'react';
import { Intent } from '../types/intent';

interface IntentListProps {
    intents: Intent[];
}

const IntentList: React.FC<IntentListProps> = ({ intents }) => {
    if (intents.length === 0) {
        return <div>No hay intents disponibles</div>;
    }

    return (
        <div className="intent-list">
            <table className="intent-table">
                <thead>
                    <tr>
                        <th>Handle</th>
                        <th>Symbol</th>
                        <th>Source</th>
                        <th>Target</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {intents.flatMap((intent) =>
                        intent.claims.map((claim, claimIndex) => (
                            <tr key={`${intent.handle}-${claimIndex}`}>
                                <td>{intent.handle}</td>
                                <td>{claim.symbol.handle}</td>
                                <td>{claim.source.handle}</td>
                                <td>{claim.target.handle}</td>
                                <td>{claim.amount}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default IntentList; 