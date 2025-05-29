import { Router, Request, Response } from 'express';
import { HttpCode } from './constants';
import userRoutes from '@/modules/users/user.routes';
import registerRoutes from "@/modules/auth/register/register.routes";

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(HttpCode.OK).send({
    message: 'Welcome to Initial API!',
  });
});

router
  .use('/users', userRoutes)
  .use('/register', registerRoutes);

export default router;