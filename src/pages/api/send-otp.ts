import { NextApiRequest, NextApiResponse } from "next";
import { otpStore } from "../../lib/otpStore"; // adjust path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP in shared store
  otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // 5 mins

  console.log('Stored OTP:', otpStore[email]);

  // simulate sending email
  console.log(`Sending OTP ${otp} to email: ${email}`);

  // return response (or omit otp for production)
  return res.status(200).json({ message: "OTP sent successfully", otp });
}