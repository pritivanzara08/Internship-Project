import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev-secret';
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
await dbConnect();
if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });

const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

const token = jwt.sign({ userId: user._id, role: user.role }, SECRET, { expiresIn: '7d' });
res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict; Secure`);
res.json({ user: { id: user._id, email: user.email, role: user.role, name: user.name } });

}
