import stringify from 'safe-stable-stringify';
import crypto from 'node:crypto';
import { nanoid } from 'nanoid';
import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../../.env` })
import { config } from '../../config'
import moment from 'moment';


const HASHING_ALGORITHM = 'sha256';

import { Request, Response } from 'express';

interface Intent {
  hash: string;
  data: any;
  meta: {
    proofs: Signature[];
  };
}

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

function createHash(data: any): string {
  const serializedData = stringify(data);
  return crypto
    .createHash(HASHING_ALGORITHM)
    .update(serializedData|| '')
    .digest('hex');
}

function createSignatureDigest(dataHash: string, custom?: Record<string, unknown>): string {
  // Serialize the custom data, if it exists
  const serializedCustomData = custom ? stringify(custom) : '';
  
  // Create a hash by concatenating the data hash
  // with serialized custom data
  return crypto
    .createHash(HASHING_ALGORITHM)
    .update(dataHash + serializedCustomData)
    .digest('hex');
}

/**
 * ASN1 prefix which precedes the private key in DER ASN.1 format.
 * Contains identifiers for Ed25519 together with meta bytes
 * for length and others.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc8410
 * @see https://datatracker.ietf.org/doc/html/rfc5208
 * @see example https://lapo.it/asn1js/#MCowBQYDK2VwAyEAYNUhOe_8hqFet7VdDSO4372OFw0whAWJ8VAlPPXAPGY
 */
function importPrivateKey(secret: string): crypto.KeyObject {
  const ASN1_PRIVATE_PREFIX = '302e020100300506032b657004220420';
  const keyHex = `${ASN1_PRIVATE_PREFIX}${Buffer.from(secret, 'base64').toString('hex')}`;
  return crypto.createPrivateKey({
    format: 'der',
    type: 'pkcs8',
    key: Buffer.from(keyHex, 'hex'),
  });
}

interface Signature {
  method: string;
  public: string;
  digest: string;
  result: string;
  custom: {
    moment: string;
  };
}

function signHash(hash: string, publicKey: string, secretKey: string): Signature {
  const custom = {
    moment: (new Date()).toISOString(),
  };
  const digest = createSignatureDigest(hash, custom);
  
  const digestBuffer = Buffer.from(digest, 'hex');
  const key = importPrivateKey(secretKey);

  const result = crypto.sign(null, digestBuffer, key).toString('base64');

  return {
    method: 'ed25519-v2',
    public: publicKey,
    digest,
    result,
    custom,
  };
}

async function send(data: any): Promise<any> {
  const hash = createHash(data);
  const signature = signHash(hash, config.INTENT_PUBLIC_KEY, config.INTENT_PRIVATE_KEY);

  const intent: Intent = {
    hash,
    data,
    meta: {
      proofs: [signature]
    }
  };

  try {
    console.log(`request: ${config.LEDGER_SERVER}/intents`);
    const response = await axios.post<any>(`${config.LEDGER_SERVER}/intents`, intent, {
      headers: {
        'x-ledger': config.LEDGER_HANDLE
      }
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      console.error(err.response.data);
      throw new Error(`Request failed: ${err.response.data}`);
    } else {
      console.error('An unexpected error occurred:', err);
      throw err;
    }
  }
}

export const createIntentNonSDK = async (req: Request, res: Response) => {
  try {
    const response = await send(getIntent(req.body));
    res.status(200).json(response);
  } catch (error) {
    console.error('Error creating intent:', error);
    res.status(500).json({ error: 'An error occurred while creating the intent' });
  }
};