import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import dbConnect from './config/db.js';

dotenv.config();
dbConnect();

const checkAdmin = async () => {
    try {
        const user = await User.findOne({ email: 'admin@gamestore.com' });
        if (user) {
            console.log('Admin user found:');
            console.log('Email:', user.email);
            console.log('Role:', user.role);
            console.log('Has password hash:', !!user.password);
        } else {
            console.log('Admin user NOT found in database.');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkAdmin();
