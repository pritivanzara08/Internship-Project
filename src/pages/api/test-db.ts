import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = await prisma.user.findMany();

    return res.status(200).json({
      success: true,
      message: "MySQL connection working!",
      users,
    });
  } catch (error) {
    console.error("Database error:", error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}