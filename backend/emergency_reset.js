import mongoose from 'mongoose';
import User from './models/User.js';

// Hardcoded for local emergency reset
const MONGO_URI = "mongodb://127.0.0.1:27017/gamestore";

const emergencyReset = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected for Emergency Reset');
        
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
        console.error('ERROR:', error.message);
        process.exit(1);
    }
};

emergencyReset();
