import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev-secret';
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'token';
const TOKEN_EXPIRY = '1d';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    //basic input validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    //check password
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    //create JWT payload
    const payload = { userId: user._id, role: user.role };

    //sign token
    let token: string;
    try {
        token = jwt.sign(payload, SECRET, { expiresIn: TOKEN_EXPIRY });
    } catch (error) {
        return res.status(500).json({ message: 'Could not generate token' });
    }

    //set cookie
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict; Secure`);

    res.status(200).json({ user: { id: user._id, email: user.email, role: user.role, name: user.name } });

}
