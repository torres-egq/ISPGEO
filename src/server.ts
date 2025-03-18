import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { token } from './modules/token/token.service'; // Import the token function directly

dotenv.config();
const PORT = process.env.PORT || 3939;
const app = express();

// Fix middleware order - JSON parser must come first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Then add other middlewares
app.use(
  cors({
    origin: '*',
    methods: ['GET'], // Add missing methods
    allowedHeaders: ['Content-Type'],
  })
);

// Then add your logging middleware
app.use((req, res, next) => {
  console.log('Headers recebidos:', req.headers);
  console.log('Body recebido:', req.body);
  console.log('Query recebido:', req.query);
  console.log('Params recebido:', req.params);
  next();
});

app.get('/', (req, res) => {
  const user = req.query.user;
  if (!user) {
    return res.status(400).json({ error: 'User parameter is required' });
  }
  const token = generateToken({ user });
  res.json({ token });
});

// Remove other routes and keep only this
app.get('/:id', token);

// Adicione este middleware antes das rotas

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
