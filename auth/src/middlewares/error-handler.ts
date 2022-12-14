import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../errors/custom-error';
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('something went wrong');

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.send(400).send({
    errors: [{ message: "Something went wrong." }]
  });
};