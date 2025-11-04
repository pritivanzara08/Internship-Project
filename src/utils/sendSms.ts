
export const sendSms = async (contactNo: string, message: string) => {
 
  const toNumber = contactNo.startsWith("+") ? contactNo : `+91${contactNo.replace(/\D/g, "")}`;

  // If Twilio env vars are set, send via Twilio
  const SID = process.env.TWILIO_ACCOUNT_SID;
  const TOKEN = process.env.TWILIO_AUTH_TOKEN;
  const FROM = process.env.TWILIO_FROM_NUMBER;

  if (SID && TOKEN && FROM) {
    try {
      
      const Twilio = require("twilio");
      const client = Twilio(SID, TOKEN);
      const msg = await client.messages.create({
        body: message,
        from: FROM,
        to: toNumber,
      });
      console.log("Twilio SMS sent, sid:", msg?.sid);
      return true;
    } catch (err) {
      console.error("Twilio sendSms error:", err);
      return false;
    }
  }

  // Fallback / dev: log OTP to server console (useful for local testing)
  console.log(`[mock sendSms] to ${toNumber}: ${message}`);
  return true;
};
