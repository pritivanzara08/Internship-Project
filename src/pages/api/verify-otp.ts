import { NextApiRequest, NextApiResponse } from "next";
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
  if (!email || !otp || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  await dbConnect();

  // find user created during send-otp
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "OTP not found. Please request a new OTP" });
  }

  if (user.isVerified) {
    return res.status(400).json({ message: "User already verified. Please login." });
  }

  if (!user.otp || !user.otpExpiry || user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (user.otpExpiry.getTime() < Date.now()) {
    return res.status(400).json({ message: "OTP expired. Please request a new OTP" });
  }

  // OTP valid → finalize user signup
  const passwordHash = await bcrypt.hash(password, 10);

  user.name = name;
  user.password = passwordHash;
  user.role = "customer";
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;

  await user.save();

  // generate JWT payload
  const token = jwt.sign({ userId: user._id, role: user.role }, SECRET, { expiresIn: TOKEN_EXPIRY });

  // set cookie
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Max-Age=${
      7 * 24 * 60 * 60
    }; SameSite=Strict; ${isProd ? "Secure" : ""}`
  );

  return res.status(200).json({
    message: "Signup successful",
    user: { id: user._id, email: user.email, role: user.role, name: user.name },
  });
}
