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
    methods: ['POST', 'GET', 'OPTIONS'], // Add missing methods
    allowedHeaders: ['Content-Type'],
  })
);

// Add root route handler
app.get('/', (req, res) => {
  res.status(200).send('ISPGeo API Server');
});

// Then add your logging middleware
app.use((req, res, next) => {
  console.log('Headers recebidos:', req.headers);
  console.log('Body recebido:', req.body);
  console.log('Query recebido:', req.query);
  console.log('Params recebido:', req.params);
  next();
});

// Existing POST route
app.get('/token/:id', token);

// Adicione este middleware antes das rotas

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
