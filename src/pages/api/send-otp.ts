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

    const { email, contactNo } = req.body;

    if (!email && !contactNo) {
      return res.status(400).json({ message: "Provide email or contactNo" });
    }

    // If contactNo provided validate 10-digit mobile
    if (contactNo && !/^\d{10}$/.test(String(contactNo))) {
      return res.status(400).json({ message: "Invalid contact number" });
    }

    // If email provided validate basic email format
    if (email && !/^\S+@\S+\.\S+$/.test(String(email))) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

    // Find user by email OR contactNo
    let user;
    if (email) {
      user = await User.findOne({ email: String(email).toLowerCase().trim() });
    } else {
      user = await User.findOne({ contactNo: String(contactNo) });
    }

    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ message: "User already registered with this identifier" });
      }

      // update OTP and expiry
      user.otp = otp;
      user.otpExpiry = expiry;
      await user.save();
    } else {
      // create new temporary user with OTP (email or phone)
      const payload: any = {
        otp,
        otpExpiry: expiry,
        isVerified: false,
        role: "customer",
      };
      if (email) payload.email = String(email).toLowerCase().trim();
      if (contactNo) payload.contactNo = String(contactNo);
      user = new User(payload);
      await user.save();
    }

    // Send OTP: email or SMS
    if (email) {
      const emailSent = await sendEmail(
        String(email),
        "Your Gift Article OTP Code",
        `Your OTP code is: ${otp}. It expires in 5 minutes.`,
        // otpEmailTemplate(otp, user.name)
      );
      console.log(`Sending OTP ${otp} to email: ${email}`);
      if (!emailSent) {
        return res.status(500).json({ message: "Failed to send OTP email" });
      }
      return res.status(200).json({ message: "OTP sent successfully (email)" });
    } else {
    // Try to send SMS via optional util - dynamic import so build won't fail if util missing
    try {
      const smsUtilPath = "@/utils/sendSms";
      const smsModule: any = await import(smsUtilPath);
      if (smsModule && typeof smsModule.sendSms === "function") {
        const smsResult = await smsModule.sendSms(String(contactNo), `Your OTP code is: ${otp}. It expires in 5 minutes.`);
        console.log(`SMS send result for ${contactNo}:`, smsResult);
        // If your sendSms returns falsy on failure adjust this check
        if (!smsResult || smsResult === false) {
          // still return success but warn client (or change to error if you prefer)
          //return res.status(200).json({ message: "OTP saved. SMS send failed (check sms provider)" });
          
          // return error so UI shows failure instead of success
          return res.status(500).json({ message: "Failed to send OTP via SMS. Check sms provider configuration." });
        }
        return res.status(200).json({ message: "OTP sent successfully (sms)" });
      }
    } catch (err: any) {
      // sendSms util not present or failed to import — fall through to logging
      console.log("SMS provider error:", err);
      return res.status(500).json({ message: `SMS provider error: ${err?.message || err}` });
    }

      // If no SMS provider available just log OTP (for development) and return success
      console.log(`OTP for ${contactNo}: ${otp} (SMS sending not configured)`);
      return res.status(200).json({ message: "OTP generated (sms not configured). Check server logs in development." });
    }
  } catch (err: any) {
    console.error("Send OTP error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}