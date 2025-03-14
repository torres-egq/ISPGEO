import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (user: object): string => {
  return jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
};

export const token = async (req: Request, res: Response): Promise<any> => {
  console.log('teste teste teste');
  try {
    const token = generateToken({ user: 1 });
    return res.status(200).json({ token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
