const { LedgerSdk } = require('@minka/ledger-sdk')
const { nanoid } = require('nanoid')
import { Request, Response } from 'express';
import dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../../.env` })
import { config } from '../../config'

const encode = 'ed25519-raw';

function getIntent(body: any) {
    const intent: any = {
        "handle": nanoid(17),
        "claims": [
            {
                "action": "transfer",
                "amount": parseInt(body.amount) * 100, 
                "source": {
                    "handle": `${body.sourceType}:${body.source}`
                },
                "symbol": {
                    "handle": body.currency
                },
                "target": {
                    "handle": `${body.targetType}:${body.target}`
                }
            }
        ],
        "schema": "transfer",
        "access": [
            {
                "action": "any",
                "signer": {
                    "public": config.INTENT_PUBLIC_KEY
                }
            },
            {
                "action": "read",
                "bearer": {
                    "$signer": {
                        "public": config.INTENT_PUBLIC_KEY
                    }
                }
            }
        ],
        "config": {
            "commit": "auto"
        }
    };

    if(Object.keys(body.customDataSource).length > 0)
        intent.claims[0].source.custom = body.customDataSource;
    if(Object.keys(body.customDataTarget).length > 0)
        intent.claims[0].target.custom = body.customDataTarget;

    return intent;
}


async function sendIntent(req: Request) {   
    const sdk = getSDK(); 
    await sdk.intent
        .init()
        .data(getIntent(req.body))
        .hash()
        .sign([
            {
                keyPair: {
                    public: config.INTENT_PUBLIC_KEY,
                    format: encode,
                    secret: config.INTENT_PRIVATE_KEY,
                }
            }
            
        ])
       .send();
       console.log(`SDK: ${sdk.options.server}`);
}

const getSDK = () => { 
    const sdk = new LedgerSdk({
        server: config.LEDGER_SERVER,
        ledger: config.LEDGER_HANDLE
    });
    sdk.setHeader('clientId', config.CLIENT_ID);
    sdk.setHeader('clientSecret', config.CLIENT_SECRET);
    return sdk;
}

export const createIntentSDK = async (req: Request, res: Response) => {
    try {
        await sendIntent(req);
        res.status(200).send('Intent sent successfully');
    } catch (error) {
        console.error('Error sending intent:', error);
        res.status(500).json({ error: 'An error occurred while sending the intent' });
    }
};