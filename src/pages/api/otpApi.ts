const API_BASE_URL = '/api';

export const sendOtp = async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    if (!response.ok) {
        const errorMsg = await response.json();
        throw new Error(errorMsg.message || 'Failed to send OTP');
    }
    return response.json();
};

export const verifyOtp = async (email: string, otp: string) => {
    const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
    });
    if (!response.ok) {
        const errorMsg = await response.json();
        throw new Error(errorMsg.message || 'Failed to verify OTP');
    }
    return response.json();
};