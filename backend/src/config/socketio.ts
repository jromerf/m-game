import { Server } from 'socket.io';
import SocketController from '../controllers/SocketController';

let io: Server;
let ioPromiseResolver: ((value: Server) => void) | null = null;

export function configureSocketIO(server: Server): void {
    io = server;
    const socketController = new SocketController(server);

    io.on('connection', (socket) => {
        socketController.handleConnection(socket);
        if (ioPromiseResolver) {
            ioPromiseResolver(io);
        }
    });

    io.engine.on("initial_headers", (headers, req) => {
        headers["Access-Control-Allow-Origin"] = "http://localhost:4200";
    });

    io.engine.on("headers", (headers, req) => {
        headers["Access-Control-Allow-Origin"] = "http://localhost:4200"; // URL permitida
    });
}

export function getIOInstance(): Promise<Server> {
    return new Promise<Server>((resolve) => {
        if (io) {
            resolve(io);
        } else {
            ioPromiseResolver = resolve;
        }
    });
}
