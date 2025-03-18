import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { token } from './modules/token/token.service'; // Import the token function directly

dotenv.config();
const PORT = process.env.PORT || 3939;
const app = express();
app.use(
  cors({
    origin: '*', // Corrigir domínio
    // methods: ['POST'], // Adicionar métodos permitidos
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log('Headers recebidos:', req.headers);
  console.log('Body recebido:', req.body);
  next();
});
// Use the root route to return the token
app.post('/', token);

// Adicione este middleware antes das rotas

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
