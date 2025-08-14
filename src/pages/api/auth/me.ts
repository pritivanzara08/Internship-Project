import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';

const SECRET = process.env.JWT_SECRET || 'dev-secret';
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
await dbConnect();
const cookie = req.headers.cookie || '';
const token = cookie.split(`${COOKIE_NAME}=`)[1];
if (!token) return res.status(401).json({ user: null });

try {
const decoded: any = jwt.verify(token, SECRET);
const user = await User.findById(decoded.userId);
if (!user) return res.status(401).json({ user: null });
res.json({ user: { id: user._id, email: user.email, role: user.role, name: user.name } });
} catch (error) {
console.error(error);
res.status(401).json({ user: null });
}
}
