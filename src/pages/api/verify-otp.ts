import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });
  try {
    await dbConnect();

    const { email, contactNo, otp, password, name } = req.body;
    if (!otp || (!email && !contactNo)) {
      return res.status(400).json({ message: "Provide otp and email or contactNo" });
    }

    const query = email ? { email: String(email).toLowerCase().trim() } : { contactNo: String(contactNo) };
    const user = await User.findOne(query);
    if (!user) return res.status(404).json({ message: "No pending verification found" });

    if (!user.otp || user.otp !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.otpExpiry && user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    if (password) {
      const hash = await bcrypt.hash(String(password), 10);
      user.password = hash;
    }
    if (name) {
      user.name = String(name);
      const parts = String(name).trim().split(/\s+/);
      if (parts.length > 0) user.firstName = parts.shift() || "";
      if (parts.length > 0) user.lastName = parts.join(" ");
    }

    await user.save();

    return res.status(200).json({ message: "OTP verified", user: { id: user._id, email: user.email, contactNo: user.contactNo, isVerified: user.isVerified } });
  } catch (err: any) {
    console.error("verify-otp error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}