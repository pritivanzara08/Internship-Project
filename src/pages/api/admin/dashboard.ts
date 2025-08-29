import type { NextApiResponse } from "next";
import { requireAuth, AuthenticatedReq } from "@/lib/requireAuth";


const handler = async (req: AuthenticatedReq, res: NextApiResponse) => {
    //admin only data
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    //admin dashboard data
    const data = {
        usersCount: 100,
        newOrdersToday: 5,
        revenueThisMonth: 2000,
    };

    res.status(200).json({ok: true, data, user: req.user});
};

export default requireAuth(handler);