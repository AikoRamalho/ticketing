import { Request, Response, NextFunction } from 'express'
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('something went wrong');

  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map(err => {
      return {
        message: err.msg,
        field: err.param
      }
    })
    return res.status(400).send({errors: formattedErrors})
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({ errors: [{ message: err.reason }] })
  }

  res.send(400).send({
    errors: [{ message: "Something went wrong." }]
  });
};