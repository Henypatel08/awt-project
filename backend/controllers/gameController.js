import Game from '../models/Game.js';

// @desc    Get all games
// @route   GET /api/games
export const getGames = async (req, res) => {
    console.log('[GAMES] Fetching all games from database...');
    try {
        const games = await Game.find({});
        console.log(`[GAMES] SUCCESS: Found ${games.length} games.`);
        res.json(games);
    } catch (error) {
        console.error(`[GAMES] ERROR fetching games: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get game by ID
// @route   GET /api/games/:id
export const getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (game) {
            res.json(game);
        } else {
            res.status(404).json({ message: 'Game not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a game (Admin only)
// @route   POST /api/games
export const createGame = async (req, res) => {
    const { title, price, description, genre, imageUrl, stock } = req.body;

    try {
        const game = new Game({
            title,
            price,
            description,
            genre,
            imageUrl,
            stock
        });

        const createdGame = await game.save();
        res.status(201).json(createdGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a game (Admin only)
// @route   DELETE /api/games/:id
export const deleteGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (game) {
            await game.deleteOne();
            res.json({ message: 'Game removed' });
        } else {
            res.status(404).json({ message: 'Game not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a game (Admin only)
// @route   PUT /api/games/:id
export const updateGame = async (req, res) => {
    const { title, price, description, genre, imageUrl, stock } = req.body;

    try {
        const game = await Game.findById(req.params.id);

        if (game) {
            game.title = title || game.title;
            game.price = price || game.price;
            game.description = description || game.description;
            game.genre = genre || game.genre;
            game.imageUrl = imageUrl || game.imageUrl;
            game.stock = stock || game.stock;

            const updatedGame = await game.save();
            res.json(updatedGame);
        } else {
            res.status(404).json({ message: 'Game not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
