import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    const secret = process.env.JWT_SECRET || "gamestore_emergency_secret_key_2024";
    return jwt.sign({ id }, secret, {
        expiresIn: '30d'
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(`[AUTH] Registration attempt for: ${email}`);

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log(`[AUTH] Registration failed: User ${email} already exists`);
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'client'
        });

        if (user) {
            console.log(`[AUTH] Registration SUCCESS: Created user ${email} (${user.role})`);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            console.log(`[AUTH] Registration FAILED: Invalid user data for ${email}`);
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(`[AUTH] CRITICAL ERROR during registration for ${email}: ${error.message}`);
        res.status(500).json({ message: "Server error during registration. Check backend logs." });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
    let { email, password } = req.body;
    
    // Clean inputs
    email = email ? email.trim() : "";
    password = password ? password.trim() : "";

    console.log(`[AUTH] Login attempt for: ${email}`);

    try {
        console.log(`[AUTH] Database lookup for: ${email}`);
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`[AUTH] Login failed: User ${email} NOT FOUND in database`);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log(`[AUTH] User found, verifying password...`);
        const isMatch = await user.matchPassword(password);
        
        if (isMatch) {
            console.log(`[AUTH] Login SUCCESS: ${email} authenticated (${user.role})`);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            console.log(`[AUTH] Login FAILED: Password mismatch for ${email}`);
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(`[AUTH] CRITICAL ERROR during login for ${email}: ${error.message}`);
        res.status(500).json({ message: "Server error during login. Check backend logs." });
    }
};
