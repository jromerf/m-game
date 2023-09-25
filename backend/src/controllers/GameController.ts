import { Request, Response } from "express";
import { Server, Socket } from "socket.io";
import GameService from "../services/GameService";

class GameController {

    constructor(private gameService:GameService){}

    createRoom = async (req: Request, res: Response) => {
        try {
            const roomID = await this.gameService.createRoom(req.query.host as string);

            res.status(201).json({ roomCode: roomID });

        } catch (error) {
            res.status(500).json({ message: `Error al crear la sala ${error}` });
        }
    }

    // Arroy function in order to preserve this context of the funcion that is calling us
    joinRoom = async (req: Request, res: Response) => {
        const { roomCode, username } = req.query;
        try {
            const message = await this.gameService.joinRoom(String(roomCode),String(username));
            res.status(200).json({ message });

        } catch (error) {
            res.status(500).json({ message: error});
        }
    }

    startRoom = (req: Request, res: Response) => {

    }
}


export default GameController;
