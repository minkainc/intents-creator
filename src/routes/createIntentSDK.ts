import { Request, Response } from 'express';

export const createIntentSDK = (req: Request, res: Response) => {
  // Implementar la lógica para crear el intent usando el SDK
  // Por ahora, solo devolvemos un mensaje de éxito
  res.json({ message: 'Intent creado con SDK', data: req.body });
  console.log("sdk");
};