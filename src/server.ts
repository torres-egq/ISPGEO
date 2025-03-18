import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { token } from './modules/token/token.service'; // Import the token function directly

dotenv.config();

const app = express();
app.use(
  cors({
    origin: 'https://ispgeo.rj.gov.br',
  })
);
app.use(express.json());

const PORT = process.env.PORT || 3939;

// Use the root route to return the token
app.post('/', token);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
