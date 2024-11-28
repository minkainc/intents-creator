import express from 'express';
import cors from 'cors';
import { createIntentSDK } from './routes/SDK/createIntentSDK';
import { createIntentNonSDK } from './routes/nonSDK/createIntentNonSDK';
import { getWalletsSDK } from './routes/SDK/getWalletsSDK';
import { getWalletsNonSDK } from './routes/nonSDK/GetWalletsNonSDK';
import { getIntentsSDK } from './routes/SDK/getIntentsSDK';
import { getIntentsNonSDK } from './routes/nonSDK/getIntentsNonSDK';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/create-intent-sdk', createIntentSDK);
app.post('/api/create-intent-non-sdk', createIntentNonSDK);
app.get('/api/wallets-sdk', getWalletsSDK);
app.get('/api/wallets-non-sdk', getWalletsNonSDK);
app.get('/api/intents-sdk', getIntentsSDK);
app.get('/api/intents-non-sdk', getIntentsNonSDK);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});