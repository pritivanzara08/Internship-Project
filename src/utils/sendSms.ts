export const sendSms = async (contactNo: string, message: string) => {
  const toNumber = contactNo.startsWith("+") ? contactNo : `+91${contactNo.replace(/\D/g, "")}`;

  const SID = process.env.TWILIO_ACCOUNT_SID;
  const TOKEN = process.env.TWILIO_AUTH_TOKEN;
  const FROM = process.env.TWILIO_FROM_NUMBER; // Twilio phone number (E.164) - required if messaging service not used
  const MSG_SERVICE = process.env.TWILIO_MESSAGING_SERVICE_SID; // optional

  if (SID && TOKEN && (MSG_SERVICE || FROM)) {
    try {
      // dynamic require to avoid build-time dependency
      // (npm i twilio in environments where you use it)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const Twilio = require("twilio");
      const client = Twilio(SID, TOKEN);

      const payload: any = {
        body: message,
        to: toNumber,
      };
      if (MSG_SERVICE) {
        payload.messagingServiceSid = MSG_SERVICE;
      } else {
        payload.from = FROM;
      }

      const msg = await client.messages.create(payload);
      console.log("Twilio SMS sent, sid:", msg?.sid);
      return true;
    } catch (err: any) {
      console.error("Twilio sendSms error:", err);
      // inspect err.code / err.message in logs — 21659 means invalid From
      return false;
    }
  }

  // fallback for local dev
  console.log(`[mock sendSms] to ${toNumber}: ${message}`);
  return true;
};