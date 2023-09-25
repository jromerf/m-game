import { Router } from "express";
import GameController from "../../controllers/GameController";
import { getIOInstance } from "../../config/socketio";
import GameService from "../../services/GameService";
import SocketController from "../../controllers/SocketController";

const router = Router();

(async () => {
    const io = await getIOInstance();
    const socketController = new SocketController(io);
    const gameService = new GameService(socketController);
    const gameController = new GameController(gameService);

    router.post('/create-room', gameController.createRoom);
    router.post('/join-room', gameController.joinRoom);
    // Agrega otras rutas y controladores si es necesario

})();

export default router;

// //Get the actual room state
// router.get('/:roomId',(req,res)=>{
//     res.write('currently room state');

// });

// //Starts game from an specific room
// router.post('/start/:roomId',(req,res)=>{
//     res.write('join room');

// });

// //Guess song if > or <
// router.post('/guess/:roomId',(req,res)=>{
//     res.write('guess song');

// });

// router.post('/finish/:roomId',(req,res)=>{
//     res.write('end of game');

// });

// router.get('/play/:roomId',(req,res)=>{
//     res.write('play song');

// });


