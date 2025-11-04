import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { UserRole } from "@/types/User";

const ALLOWED_ROLES = ["admin", "customer"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") return res.status(405).json({ message: "Method not allowed" });
    try {
      await dbConnect();

      const { firstName, lastName, email: rawEmail, password, address, landmark, city, state, pinCode, country, contactNo, referral, role, adminKey } = req.body;

      // Basic validation
      if (!firstName || !lastName || !password || !contactNo ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const email = rawEmail ? String(rawEmail).trim().toLowerCase() : undefined;
      const contact = String(contactNo).trim();

      if (!/^\d{10}$/.test(contact)) return res.status(400).json({ message: "Invalid contact number" });

      // Validate role (only allow 'admin' or 'customer')
      let roleToSet: UserRole = "customer";
      if (role && ALLOWED_ROLES.includes(role)) {
        if (role === "admin") {
          const serverKey = process.env.ADMIN_CREATION_KEY || "";
          if (adminKey && adminKey === serverKey) roleToSet = "admin";
          else roleToSet = "customer";
        } else {
          roleToSet = role;
        }
      }

      const query: any = { contactNo: contact };
      if (email) query.$or = [{ contactNo: contact }, { email }];
      let user = await User.findOne(query);

      if (!user) {
        return res.status(400).json({ message: "No verified user found. Please verify your phone first via OTP." });
      }

      if (!user.isVerified) {
        return res.status(400).json({ message: "Phone not verified. Please complete OTP verification." });
      }

      if (user.password) {
        return res.status(409).json({ message: "Account already exists for this number/email" });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(String(password), 10);
      user.firstName = firstName;
      user.lastName = lastName;
      user.name = `${firstName} ${lastName}`;
      if (email) user.email = email;
      user.password = passwordHash;
      user.address = address;
      user.landmark = landmark;
      user.city = city;
      user.state = state;
      user.pinCode = pinCode;
      user.country = country;
      user.contactNo = contact;
      user.referral = referral;
      user.role = roleToSet;

      await user.save();

      const { password: _pw, otp: _otp, otpExpiry: _otpExpiry, ...safeUser } = user.toObject();

      return res.status(201).json({ message: "Signup successful", user: safeUser });
    } catch (err :any) {
      console.error("signup error:", err);
      // handle duplicate key race condition
      if (err?.code === 11000) {
        return res.status(409).json({ message: "User already exists" });
      }
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  }
