import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import dbConnect from './config/db.js';

dotenv.config();

const emergencyReset = async () => {
    try {
        // Use central dbConnect logic to target the correct DB (Atlas or local per .env)
        await dbConnect();
        
        console.log('MongoDB Connected for Emergency Reset');
        
        // Remove existing admin to avoid unique constraint if resetting
        await User.deleteOne({ email: 'admin@gamestore.com' });
        
        await User.create({
            name: "Admin User",
            email: "admin@gamestore.com",
            password: "password123",
            role: "admin"
        });
        
        console.log('SUCCESS: Admin account "admin@gamestore.com" reset with password "password123"');
        process.exit();
    } catch (error) {
        console.error('ERROR during emergency reset:', error.message);
        process.exit(1);
    }
};

emergencyReset();
