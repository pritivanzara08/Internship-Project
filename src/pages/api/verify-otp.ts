import { NextApiRequest, NextApiResponse } from "next";
import { otpStore } from "../../lib/otpStore"; // same path as above

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, otp } = req.body;

  const record = otpStore[email];

  console.log('Verifying email:', email);
  console.log('Stored OTP:', record);
  console.log('Received OTP:', otp);

  if (!record) {
    return res.status(400).json({ message: 'OTP not found or expired' });
  }

  if (Date.now() > record.expires) {
    delete otpStore[email];
    return res.status(400).json({ message: 'OTP expired' });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  // OTP is valid
  delete otpStore[email];
  return res.status(200).json({ message: 'OTP verified successfully' });
}