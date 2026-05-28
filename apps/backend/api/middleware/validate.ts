import { Request, Response, NextFunction } from 'express';
import { TSchema } from '@sinclair/typebox';
import ajv from '../../lib/ajv';

type Target = 'body' | 'params' | 'query';

export function validate(schema: TSchema, target: Target) {
  const validator = ajv.compile(schema);

  return (req: Request, res: Response, next: NextFunction) => {
    const valid = validator(req[target]);

    if (!valid) {
      return res.status(400).json({
        error: 'Validation Error',
        message: validator.errors,
      });
    }

    // IMPORTANT: replace validated data safely
    req[target] = req[target];

    next();
  };
}
