import { Server, Socket } from "socket.io";

class SocketController {

    io: Server;
    roomSockets: Record<string, Set<Socket>> = {}; // Objeto para almacenar sockets por sala

    constructor(io: Server) {
        this.io = io;
    }

    handleConnection(socket: Socket) {
        console.log('Usuario conectado:', socket.id);


        socket.on('create-room', () => {
            //
            // if (!this.roomSockets[roomID]) {
            //     this.roomSockets[roomID] = new Set();
            // }
            // this.roomSockets[roomID].add(socket);
            // socket.join(roomID); // El creador se une a la sala que ha creado.
            console.log(`Se ha creado una sala socket-create-room`);
        });

        socket.on('join-room', (roomID) => {
            //TODO: esto hay que cambiarlo ya que un usuario no puede entrar a una sala no hosteada
            // Cuando un usuario se une a una sala, lo agregamos a la lista de sockets de esa sala.
            console.log('join-room:',roomID);
            if (!this.roomSockets[roomID]) {
                this.roomSockets[roomID] = new Set();
            }
            this.roomSockets[roomID].add(socket);
            console.log(`Se ha añadido un usuario a la sala ${roomID}`);
        });
    }

    // Función para emitir un evento a todos los sockets en una sala específica
    emitToRoom(roomID: string, eventName: string, eventData: any) {
        const socketsInRoom = this.roomSockets[roomID];
        if (socketsInRoom) {
            socketsInRoom.forEach((socket) => {
                socket.emit(eventName, eventData);
            });
        }
    }


}

export default SocketController;
