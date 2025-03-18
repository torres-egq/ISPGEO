import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (user: object): string => {
  console.log(user);
  return jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
};

export const token = async (req: Request, res: Response): Promise<any> => {
  console.log('teste teste teste');
  console.log('process.env.JWT_SECRET', process.env.JWT_SECRET);
  try {
    const token = generateToken({ user: 1 });
    return res.status(200).json({ token }); // Corrigido: .json(200) -> .status(200)
  } catch (error: any) {
    console.log(error);
    return res.status(401).json({ error: error.message }); // Adicionado return
  }
};
