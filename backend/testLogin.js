import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import dbConnect from './config/db.js';

dotenv.config();
dbConnect();

const testLogin = async () => {
    try {
        const user = await User.findOne({ email: 'admin@gamestore.com' });
        if (user) {
            const isMatch = await user.matchPassword('password123');
            console.log('Login Test for admin@gamestore.com with password123:');
            console.log('Password Match:', isMatch);
        } else {
            console.log('Admin user not found.');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

testLogin();
