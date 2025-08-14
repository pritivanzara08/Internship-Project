import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const SECRET = process.env.JWT_SECRET || 'dev-secret';
const COOKIE_NAME = process.env.COOKIE_NAME || 'token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    const { email, password, name, role } = req.body;

    // Validate user input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists.' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    // Create new user
    const user = await User.create({ email, passwordHash, name, role: role ?? 'customer' });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET, { expiresIn: '1d' });

    // Set cookie
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict; Secure`);

    res.status(201).json({ user: { id: user._id, email: user.email, name: user.name, role: user.role } });
}
