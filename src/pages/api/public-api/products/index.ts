import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const products = await prisma.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(products);
    }

    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      message: `Method ${req.method} Not Allowed`,
    });
  } catch (error) {
    console.error("Products API error:", error);

    return res.status(500).json({
      message: "Failed to fetch products",
    });
  }
}