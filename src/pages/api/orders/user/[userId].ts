import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { uid } = req.query;

  if (req.method === "GET") {
    const orders = await Order.find({ userId: uid });
    return res.status(200).json(orders);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
