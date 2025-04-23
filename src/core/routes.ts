import { Router, Request, Response } from 'express';
import { HttpCode } from './constants';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(HttpCode.OK).send({
    message: 'Welcome to Initial API!',
  });
});

export default router;