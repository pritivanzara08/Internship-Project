import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import User from '@/models/User';

const SECRET = process.env.JWT_SECRET || 'dev-secret';
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    //read token from cookie
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies[COOKIE_NAME];

    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    try {
        const payload = jwt.verify(token, SECRET) as { userId: string; role: string };
        const user = await User.findById(payload.userId).select('-passwordHash');
        if (!user) return res.status(404).json({ message: 'Not found' });

        res.json({ user: { id: user._id, email: user.email, role: user.role, name: user.name } });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authenticated' });
    }
}
