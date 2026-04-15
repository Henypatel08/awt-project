import express from 'express';
import { 
    getGames, 
    getGameById, 
    createGame, 
    deleteGame, 
    updateGame 
} from '../controllers/gameController.js';

const router = express.Router();

router.route('/')
    .get(getGames)
    .post(createGame);

router.route('/:id')
    .get(getGameById)
    .delete(deleteGame)
    .put(updateGame);

export default router;
