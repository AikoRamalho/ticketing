import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';


const router = express.Router()

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be valid')
], (req: Request, res: Response) => {
  const errs = validationResult(req);

  if(!errs.isEmpty()) {
    throw new RequestValidationError(errs.array());
  }
  const { email, password } = req.body;
  throw new DatabaseConnectionError();

  res.send({})
});

export { router as signupRouter }