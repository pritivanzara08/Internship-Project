import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await dbConnect();

      const { firstName, lastName, email, password, address, landmark, city, state, pinCode, country, contactNo, referral, role } = req.body;

      // Check if email exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Save new user
      const newUser = await User.create({
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        email,
        password: passwordHash,
        address,
        landmark,
        city,
        state,
        pinCode,
        country,
        contactNo,
        referral,
        role: role || "customer",
      });

      return res.status(201).json({ message: "Signup successful", user: newUser });
    } catch (err :any) {
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
