import { Server } from '@overnightjs/core';
import dotenv from 'dotenv';
import * as express from 'express';
import logger from 'jet-logger';
import swaggerUi from 'swagger-ui-express';
import { AuthenticationController } from './api/v1/AuthenticationController';
import { CountApiController } from './api/v1/CountApiController';
import { UserController } from './api/v1/UserController';
import swaggerDocs from './documentation/swagger.json';

dotenv.config()

export class App extends Server {

    constructor() {
        super()
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
        this.setupControllers();
    }

    private setupControllers(): void {
        super.addControllers([
            new CountApiController(),
            new UserController(),
            new AuthenticationController()
        ]);
    }
    
    public start(port: number): void {
        this.app.listen(port, () => {
            logger.info('Server listening on port: ' + port);
        })
    }
}

export default new App().start(Number(process.env.PORT))