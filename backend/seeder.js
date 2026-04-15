import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Game from './models/Game.js';
import dbConnect from './config/db.js';

dotenv.config();
dbConnect();

const games = [
    {
        title: "God of War Ragnarok",
        price: 1799,
        description: "Join Kratos and Atreus on a mythic journey for answers and allies before Ragnarök arrives.",
        genre: "Action-Adventure",
        imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/header.jpg",
        stock: 50,
        rating: 5
    },
    {
        title: "Elden Ring",
        price: 2099,
        description: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
        genre: "RPG",
        imageUrl: "/photo/EldenRing.avif",
        stock: 30,
        rating: 5
    },
    {
        title: "Spider-Man 2",
        price: 1099,
        description: "Spider-Men Peter Parker and Miles Morales return for an exciting new adventure in the critically acclaimed Marvel’s Spider-Man franchise.",
        genre: "Action",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b3/Marvel%27s_Spider-Man_2_cover_art.png",
        stock: 25,
        rating: 4
    },
    {
        title: "FC 24",
        price: 2499,
        description: "EA SPORTS FC 24 welcomes you to The World’s Game: the most true-to-football experience ever.",
        genre: "Sports",
        imageUrl: "/photo/FC24.jpg",
        stock: 100,
        rating: 4
    }
];

const importData = async () => {
    try {
        await Game.deleteMany();
        await Game.insertMany(games);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
