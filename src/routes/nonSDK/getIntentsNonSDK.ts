import { Request, Response } from 'express';
import axios from 'axios';
import crypto from 'node:crypto';
import { config } from '../../config';
import moment from 'moment';
import { SignJWT } from 'jose'

function importPrivateKey(secret: string): crypto.KeyObject {
    const ASN1_PRIVATE_PREFIX = '302e020100300506032b657004220420';
    const keyHex = `${ASN1_PRIVATE_PREFIX}${Buffer.from(secret, 'base64').toString('hex')}`;
    return crypto.createPrivateKey({
        format: 'der',
        type: 'pkcs8',
        key: Buffer.from(keyHex, 'hex'),
    });
}

async function createJWT(): Promise<string> {
    const iat = Math.floor(moment().valueOf() / 1000)
    const exp = iat + 3600

    const verificationKey = config.INTENT_PUBLIC_KEY
    const jwtPayload = {
        iat,
        exp,
        iss: "bridge@teslabank.io", // issuer of the token (bank bridge) 
        aud: "ach", // audience of the token (ledger)
        sub: "teslabank.io" // subject of the token (bank handle)
    
    }
    
    const token = await signJWT(
        jwtPayload,
        config.INTENT_PRIVATE_KEY,
        verificationKey
    );

    return `Bearer ${token}`
}

async function signJWT(payload: any, secret: string, verificationKey: string): Promise<string> {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'EdDSA', kid: config.INTENT_PUBLIC_KEY })
    .sign(importPrivateKey(secret))    
}

export const getIntentsNonSDK = async (req: Request, res: Response) => {
    try {
        const authorization = await createJWT();
    
        const response = await axios.get(`${config.LEDGER_SERVER}/intents`, {
            headers: {
                'Authorization': authorization,
                'x-ledger': config.LEDGER_HANDLE,
                'clientId': config.CLIENT_ID,
                'clientSecret': config.CLIENT_SECRET
            }
        });
        console.log(JSON.stringify(response.data.data, null, 2));
        res.json(response.data.data.map((intent: any) => ({
            handle: intent.data.handle,
            schema: intent.data.schema,
            claims: intent.data.claims,
            access: intent.data.access,
            config: intent.data.config
        })));
    } catch (error) {
        console.error('Error fetching intents:', error);
        res.status(500).json({
            error: 'An error occurred while fetching intents',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}; 