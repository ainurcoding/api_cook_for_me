import express, { Application } from 'express';
import { envs } from '@/core/config/env';
import { applyMiddlewares } from '@/core/middlewares';
import router from '@/core/routes';

export class Server {
  private readonly app: Application = express();
  private readonly port: number;
  private readonly apiPrefix: string;

  constructor() {
    this.port = envs.PORT;
    this.apiPrefix = envs.API_PREFIX;
  }

  private setupMiddlewares(): void {
    // Apply middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    applyMiddlewares(this.app);
  }

  private setupRoutes(): void {
    // Attach routes with prefix
    this.app.use(this.apiPrefix, router);
  }

  public async start(): Promise<void> {
    this.setupMiddlewares();
    this.setupRoutes();

    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}${this.apiPrefix}`);
    });
  }
}
