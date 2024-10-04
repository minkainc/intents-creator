const { LedgerSdk } = require('@minka/ledger-sdk')
const { nanoid } = require('nanoid')
import { Request, Response } from 'express';
import dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
import { config } from './../config'


const encode = 'ed25519-raw';


function getIntent(body: any) {
    const intent = {
        "handle": nanoid(17),
        "claims": [
            {
                "action": "transfer",
                "amount": parseInt(body.amount) * 100, 
                "source": {
                    "handle": body.source
                },
                "symbol": {
                    "handle": body.currency
                },
                "target": {
                    "handle": body.target
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
    return intent;
}

async function sendIntent(req: Request) {   
     
    getSDK().intent
        .init()
        .data(getIntent(req.body))
        .hash()
        .sign([
            {
                keyPair: {
                    public: config.INTENT_PUBLIC_KEY,
                    format: encode,
                    secret: config.INTENT_PRIVATE_KEY,
                },
            },
        ])
        .send();
        
}

const getSDK = () => { 
    const sdk = new LedgerSdk({
        server: config.LEDGER_SERVER,
        ledger: config.LEDGER_HANDLE
    })
    return sdk;
}

export const createIntentSDK = (req: Request, res: Response) => {
    sendIntent(req); 
};

