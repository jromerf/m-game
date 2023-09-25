import express, { Application, Request, Response } from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { configureExpressApp } from './config/express';
import { configureSocketIO } from './config/socketio';
import { connectToMongoDB } from './config/mongoose';

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;


configureExpressApp(app);

configureSocketIO(io);

connectToMongoDB();

server.listen(port, () => {
    console.log(`Servidor en funcionamiento en el puerto ${port}`);
});

// const dbURI = 'mongodb://localhost:27017/music-game-db';

// (async () => {

//     await mongoose.connect(dbURI);
//     console.log('Connected to database');
// })();

// const apiRouter = express.Router();
// app.use('/api', apiRouter);


// app.get('/', (req: Request, res: Response) => {
//     res.send('¡Hola, mundo!');
// });

// io.on('connection', (socket) => {
//     console.log('Usuario conectado:', socket.id);
// });



// routerAPI(apiRouter);
