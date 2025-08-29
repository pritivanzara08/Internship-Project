import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";


export interface AuthenticatedReq extends NextApiRequest {
    user?: { id: string; email: string; role: string };
};

export function requireAuth(handler: any) {
    return async (req: AuthenticatedReq, res: NextApiResponse) => {
        //Read token from headers
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
                id: string;
                email: string;
                role: string
            };
            req.user = decoded;
            return handler(req, res);
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
}

