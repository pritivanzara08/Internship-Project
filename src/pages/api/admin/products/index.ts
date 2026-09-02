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

    if (req.method === "POST") {
      const {
        name,
        description,
        price,
        imageUrl,
        inStock,
        customizationOptions,
      } = req.body;

      if (!name || price === undefined) {
        return res.status(400).json({
          message: "Name and price are required",
        });
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: Number(price),
          imageUrl,
          inStock: inStock ?? true,
          customizationOptions: customizationOptions ?? undefined,
        },
      });

      return res.status(201).json(product);
    }

    res.setHeader("Allow", ["GET", "POST"]);

    return res.status(405).json({
      message: `Method ${req.method} Not Allowed`,
    });
  } catch (error) {
    console.error("Admin products API error:", error);

    return res.status(500).json({
      message: "Failed to process product request",
    });
  }
}