import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { generateToken } from './modules/token/token.service'; // Import the generateToken function directly

dotenv.config();
const PORT = process.env.PORT || 3939;
const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('Headers recebidos:', req.headers);
  console.log('Body recebido:', req.body);
  console.log('Query recebido:', req.query);
  console.log('Params recebido:', req.params);
  next();
});

// Handle GET request to generate token
app.get(
  '/token',
  async (req: express.Request, res: express.Response): Promise<any> => {
    const user = req.query.user;
    if (!user) {
      return res.status(400).json({ error: 'User parameter is required' });
    }
    const token = generateToken({ user });
    res.status(200).json({ token });
  }
);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
