import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import geraToken from './modules/token.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3939;

app.use('/auth', geraToken);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
