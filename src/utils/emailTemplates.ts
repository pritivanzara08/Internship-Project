
export function otpEmailTemplate(otp: string, userName?: string): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
      <h2 style="color:#4CAF50;">Gift Article - OTP Verification</h2>
      <p>Hi ${userName || "User"},</p>
      <p>Your One-Time Password (OTP) is:</p>
      <h1 style="letter-spacing: 4px; color:#333;">${otp}</h1>
      <p>This code will expire in <strong>5 minutes</strong>.</p>
      <br/>
      <p style="font-size: 12px; color:#777;">
        If you did not request this, please ignore this email.
      </p>
    </div>
  `;
}
