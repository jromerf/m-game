import express, { Router } from 'express';
import AuthRouter from './auth/auth.router';
import GameRouter from './game/game.router';
import { Server } from 'socket.io';

function routerAPI(app:Router){
    const routerV1 = express.Router();
    // app.use(express.json());
    app.use('/v1',routerV1);
    routerV1.use('/game',GameRouter);
    routerV1.use('/auth',AuthRouter);
}

export default routerAPI;
