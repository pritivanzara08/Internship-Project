import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";


const SECRET = process.env.JWT_SECRET || 'dev-secret';
export type AuthenticatedReq = NextApiRequest & { user?: { userId: string; role: string } };

export function requireAuth(handler: (req: AuthenticatedReq, res: NextApiResponse) => any) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        //Read token from cookies
        const token = parseTokenFromCookies(req);

        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        try {
            const payload = jwt.verify(token, SECRET) as { userId: string; role: string };
            (req as AuthenticatedReq).user = { userId: payload.userId, role: payload.role };
            return handler(req as AuthenticatedReq, res);
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authenticated' });
        }
    };
}

function parseTokenFromCookies(req: NextApiRequest) {
    //basic cookie parsing
    const cookieHeader = req.headers.cookie || '';
    const parts = cookieHeader.split(';').map(p => p.trim());
    const tokenPart = parts.find(p => p.startsWith('token=') || p.startsWith('JWT_TOKEN=') || p.startsWith('cookie_token='));
    if (!tokenPart) return null;
    return tokenPart.split('=')[1];
}