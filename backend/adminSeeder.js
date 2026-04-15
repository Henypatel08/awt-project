import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import dbConnect from './config/db.js';

dotenv.config();
dbConnect();

const importAdmin = async () => {
    try {
        await User.deleteOne({ email: 'admin@gamestore.com' });
        await User.create({
            name: "Admin User",
            email: "admin@gamestore.com",
            password: "password123",
            role: "admin"
        });
        console.log('Admin user created successfully!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importAdmin();
