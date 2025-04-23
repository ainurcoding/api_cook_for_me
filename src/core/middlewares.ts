import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './constants';

export const applyMiddlewares = (app: any) => {
    app.use(compression());
    app.use(
      rateLimit({
        max: ONE_HUNDRED,
        windowMs: SIXTY * SIXTY * ONE_THOUSAND,
        message: 'Too many requests from this IP, please try again in one hour',
      })
    );
  };