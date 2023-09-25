import express, { Application, Request, Response } from 'express';
import routerAPI from '../routes';

export function configureExpressApp(app: Application): void {

    const apiRouter = express.Router();
    app.use('/api', apiRouter);

    app.get('/', (req: Request, res: Response) => {
        res.send('¡Hola, mundo!');
    });

    routerAPI(apiRouter);
}

