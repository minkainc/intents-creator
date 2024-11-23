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
        iss: "test",
        aud: "test",
        sub: "teslabank"
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

export const getWalletsNonSDK = async (req: Request, res: Response) => {
    
    try {
        const authorization = await createJWT();
    
        const response = await axios.get(`${config.LEDGER_SERVER}/wallets`, {
            headers: {
                'Authorization': authorization,
                'x-ledger': config.LEDGER_HANDLE
            }
        });
        res.json(response.data.data.map((wallet: any) => ({
            handle: wallet.data.handle,
            schema: wallet.data.schema,
            access: wallet.data.access
          })));
    } catch (error) {
        console.error('Error fetching wallets:', error);
        res.status(500).json({
            error: 'An error occurred while fetching wallets',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}; 