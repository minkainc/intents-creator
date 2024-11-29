import { Request, Response } from 'express';
import { LedgerSdk } from '@minka/ledger-sdk';
import { config } from '../../config';

const getSDK = () => { 
    const sdk = new LedgerSdk({
        server: config.LEDGER_SERVER,
        ledger: config.LEDGER_HANDLE
    });

    sdk.setAuthParams({
        aud: 'test',
         iss: 'test',
         keyPair: {
           public: config.INTENT_PUBLIC_KEY,
           format: 'ed25519-raw',
           secret: config.INTENT_PRIVATE_KEY,
       },
         sub: 'paula+bank@minka.io',
         exp: 3600, // (1 hour)
         createHsh: false,
         kid: config.INTENT_PUBLIC_KEY
       });
    sdk.setHeader('clientId', config.CLIENT_ID);
    sdk.setHeader('clientSecret', config.CLIENT_SECRET);
    return sdk;
}

export const getWalletsSDK = async (req: Request, res: Response) => {
    try {
        console.log(`server: ${config.LEDGER_SERVER}`);
        const sdk = getSDK();   
        const response = await sdk.wallet.list();
        
        res.json(response.wallets);
    } catch (error) {
        console.error('Error fetching wallets from SDK:', error);
        res.status(500).json({ 
            error: 'An error occurred while fetching wallets',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}; 