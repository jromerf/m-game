import Room from "../models/Room";
import Player from "../models/Player";
import User from "../models/User";
import { Server } from "socket.io";
import SocketController from "../controllers/SocketController";

class GameService {
    constructor(private socketController: SocketController) { }


    async createRoom(username: string): Promise<String> {
        let roomCode = '';
        let existingRoom = null;

        try {
            do {
                roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
                existingRoom = await Room.findOne({ roomID: roomCode });
            } while (existingRoom);

            let user = await User.findOne({ userID: username });

            if (!user) {
                user = new User({
                    userID: username,
                    username: username
                });
                await user.save();
            }
            // console.log('Usuario correcto', user);

            let player = await Player.findOne({ user: user });
            if (!player) {

                player = new Player({
                    score: 0,
                    user: user
                });

                await player.save();
            }
            // console.log('Player correcto', player);

            const newRoom = new Room({
                roomID: roomCode,
                host: user,
                // players: new Map([[user._id,user.username]])
                players: new Map()
            });

            newRoom.players.set(player._id, user.userID);
            const savedRoom = await newRoom.save();

            console.log('Se ha creado la sala', savedRoom.roomID);
            // Cuando se crea una sala, emite el evento 'new-player' solo a los sockets en esa sala.
            // this.socketController.emitToRoom(savedRoom.roomID, 'new-player', player);

            return savedRoom.roomID;
        } catch (error) {
            return `Error al crear la sala: ${error}`;
        }
    }

    async joinRoom(roomCode: string, username: string): Promise<string> {
        try {
            const room = await Room.findOne({ roomID: roomCode });
            if (!room) {
                //TODO deberia ser un throw error
                throw `No existe la sala ${roomCode}`;
            } else {
                //TODO; hay que ver que el usuario no se haya conectado antes y si es asi entonce
                // no se añade a la lista, tambien si es el host entonces tiene que verse como tal

                let user = await User.findOne({ userID: username });

                if (!user) {
                    user = new User({
                        userID: username,
                        username: username
                    });
                    await user.save();
                }

                let player = await Player.findOne({ user: user });
                if (!player) {
                    player = new Player({
                        score: 0,
                        user: user
                    });
                    await player.save();
                }

                room.players.set(player._id, user.userID);
                await room.save();
                console.log('Jugadores en la sala', room.players);

                // Cuando se crea una sala, emite el evento 'new-player' solo a los sockets en esa sala.
                this.socketController.emitToRoom(room.roomID, 'new-player', player);
                return `${username} te has unido a la sala :)!`;
            }
        } catch (error) {
            //TODO deberia ser un throw error
            throw `Error al unirse a la sala: ${error}`;
        }
    }
}


export default GameService;
