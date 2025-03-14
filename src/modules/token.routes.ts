import { Router } from 'express';
import { token } from './token/token.service';

const router = Router();

router.get('/token', token);

export default router;
