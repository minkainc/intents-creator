import { Request, Response } from 'express';

export const createIntentNonSDK = (req: Request, res: Response) => {
  // Implementar la lógica para crear el intent sin usar el SDK
  // Por ahora, solo devolvemos un mensaje de éxito
  res.json({ message: 'Intent creado sin SDK', data: req.body });
  console.log("nonsdk");
};