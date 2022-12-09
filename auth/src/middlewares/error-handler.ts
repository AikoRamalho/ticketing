import { Request, Response, NextFunction } from 'express'
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('something went wrong');

  res.send(400).send({
    message: err.message
  });
};