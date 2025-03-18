import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (user: object): string => {
  console.log(user);
  return jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
};

export const token = async (req: Request, res: Response): Promise<any> => {
  try {
    // const { user } = req.body;
    // if (user === undefined || user === null || user === '')
    //   return res.status(401).json({ error: 'User is undefined' });
    const token = generateToken(req.body);
    return res.status(200).json({ token }); // Corrigido: .json(200) -> .status(200)
  } catch (error: any) {
    console.log(error);
    return res.status(401).json({ error: error.message }); // Adicionado return
  }
};
