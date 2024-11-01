import express from 'express';
import cors from 'cors';
import { createIntentSDK } from './routes/SDK/createIntentSDK';
import { createIntentNonSDK } from './routes/nonSDK/createIntentNonSDK';
import { getWalletsSDK } from './routes/SDK/getWalletsSDK';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/create-intent-sdk', createIntentSDK);
app.post('/api/create-intent-non-sdk', createIntentNonSDK);
app.get('/api/wallets-sdk', getWalletsSDK);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});