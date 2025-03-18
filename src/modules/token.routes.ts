import { Router } from 'express';
import { token } from './token/token.service';

const router = Router();

router.post('/token', token);

export default router;
