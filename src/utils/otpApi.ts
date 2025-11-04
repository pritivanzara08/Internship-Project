const API_BASE_URL = '/api';

// sendOtp: accepts either email or phone (identifier)
export const sendOtp = async (identifier: string) => {
  const isEmail = identifier.includes('@');
  const body: any = isEmail ? { email: identifier } : { contactNo: identifier };

  const response = await fetch(`${API_BASE_URL}/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorMsg = await response.json().catch(() => ({}));
    throw new Error(errorMsg.message || 'Failed to send OTP');
  }
  return response.json();
};

export const verifyOtp = async (
  identifier: string,
  otp: string,
  password?: string,
  name?: string
) => {
  const isEmail = identifier.includes('@');
  const body: any = { otp };

  if (password !== undefined || name !== undefined) {
    // legacy flow: include password & name and treat identifier as email
    body.email = identifier;
    if (password !== undefined) body.password = password;
    if (name !== undefined) body.name = name;
  } else {
    // simple verify flow: phone or email
    if (isEmail) body.email = identifier;
    else body.contactNo = identifier;
  }

  const response = await fetch(`${API_BASE_URL}/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorMsg = await response.json().catch(() => ({}));
    throw new Error(errorMsg.message || 'Failed to verify OTP');
  }
  return response.json();
};