import { NextApiRequest, NextApiResponse } from "next";
import { otpStore } from "@/lib/otpStore";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret";
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || "token";
const TOKEN_EXPIRY = "1d";
const isProd = process.env.NODE_ENV === "production";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  
  const { email, otp, password, name } = req.body;
  
  const record = otpStore[email];
  if (!record) {
    return res.status(400).json({ message: "OTP not found or expired" });
  }

  if (Date.now() > record.expires) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }
  
  if (record.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  // OTP valid → mark verified
  delete otpStore[email];
  await dbConnect();

  //check if user exists
let user = await User.findOne({ email });
  if (!user) {
    const passwordHash = await bcrypt.hash(password, 10);
    user = await User.create({
      email,
      password: passwordHash,
      name,
      role: "customer",
    });
  }

  //generate JWT payload
  const token = jwt.sign({ userId: user._id, role: user.role }, SECRET, { expiresIn: TOKEN_EXPIRY });

  //set cookie
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Max-Age=${
      7 * 24 * 60 * 60
    }; SameSite=Strict;  ${isProd ? "Secure" : ""}`
  );

  return res.status(200).json({
    message: "OTP verified, user created successfully",
    user: { id: user._id, email: user.email, role: user.role, name: user.name },
  });
}
