import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { sendEmail } from "@/utils/sendEmail";
import { otpEmailTemplate } from "@/utils/emailTemplates";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { email } = req.body;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

    // check if user exists
    let user = await User.findOne({ email });

    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ message: "User already registered with this email" });
      }

      // not verified yet → update OTP
      user.otp = otp;
      user.otpExpiry = expiry;
      await user.save();
    } else {
      // create new temporary user with OTP
      user = new User({
        email,
        otp,
        otpExpiry: expiry,
        isVerified: false,
      });
      await user.save();
    }

    const emailSent = await sendEmail(
      email,
      "Your Gift Article OTP Code",
      `Your OTP code is: ${otp}. It expires in 5 minutes.`,
      // otpEmailTemplate(otp, user.name)
    );
    console.log(`Sending OTP ${otp} to email: ${email}`);
    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err: any) {
    console.error("Send OTP error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
