import { cleanEnv, str } from 'envalid'

export const config = cleanEnv(process.env, {
  LEDGER_HANDLE: str({ desc: 'Ledger name' }),
  LEDGER_SERVER: str({ desc: 'Ledger URL' }),
  INTENT_PUBLIC_KEY: str({ desc: 'signer with create intent rights' }),
  INTENT_PRIVATE_KEY: str({ desc: 'signer with create intent rights' })
})