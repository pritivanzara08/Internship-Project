import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User, { UserRole } from "@/models/User";
import bcrypt from 'bcryptjs';

const SECRET = process.env.JWT_SECRET || 'dev-secret';
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'token';
const TOKEN_EXPIRY = '1d';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, password, name, role } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists.' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);
    // Create new user
    const user = await User.create({ email, passwordHash, name, role: (role ?? 'customer') as UserRole });

    // Generate JWT token
    const token = require('jsonwebtoken').sign({ userId: user._id, role: user.role }, SECRET, { expiresIn: TOKEN_EXPIRY });

    // Set cookie
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict; Secure`);
    res.status(201).json({ user: { id: user._id, email: user.email, name: user.name, role: user.role } });
}
