import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const order = await Order.findById(id);
    return res.status(200).json(order);
  }

  if (req.method === "PATCH") {
    try {
      const { status } = req.body;
      const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
      return res.status(200).json(order);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  if (req.method === "DELETE") {
    await Order.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
