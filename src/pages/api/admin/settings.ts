import type { NextApiResponse } from "next";
import { requireAuth, AuthenticatedReq } from "@/lib/requireAuth";

const handler = async (req: AuthenticatedReq, res: NextApiResponse) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const data = {
    siteName: "Gift Article Store",
    maintenanceMode: false,
  };

  res.status(200).json({ ok: true, data, user: req.user });
};

export default requireAuth(handler);
