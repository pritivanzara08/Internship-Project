import '@/styles/signup.css';
import { fetchLocationFromPincode } from '@/utils/locationApi';
import { sendOtp, verifyOtp } from "@/utils/otpApi";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Signup: React.FC = () => {
  const router = useRouter();

  // Customer info states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [country, setCountry] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');

  //Loading states
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // OTP states
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  // Auto-fetch location on pinCode change
  const handlePinCodeChange = async (value: string) => {
    const onlyNumbers = value.replace(/\D/g, '');
    if (onlyNumbers.length <= 6) {
      setPinCode(onlyNumbers);
      if (onlyNumbers.length === 6) {
        try {
          const { state: fetchedState, country: fetchedCountry } = await fetchLocationFromPincode(onlyNumbers);
          setState(fetchedState || '');
          setCountry(fetchedCountry || '');
        } catch (error) {
          console.error("Failed to fetch location:", error);
          setState('');
          setCountry('');
        }
      }
    }
  };

  
  // Password states
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);

  // Other states
  const [referral, setReferral] = useState('');
  const [error, setError] = useState('');

  // Validation functions
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePinCode = (pinCode: string) => /^[1-9][0-9]{5}$/.test(pinCode);
  const validateContactNo = (contactNo: string) => /^\d{10}$/.test(contactNo);
  const validatePassword = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);

 // Send OTP to phone
  const handleSendPhoneOtp = async () => {
    setError('');
    if (!validateContactNo(contactNo)) {
      setError("Please enter a valid 10 digit mobile number to receive OTP.");
      return;
    }
    if (isPhoneVerified) return;
    setSendingOtp(true);
    try {
      // ensure sendOtp accepts phone numbers (adjust utils if needed)
      await sendOtp(contactNo);
      Swal.fire({ icon: 'success', title: 'OTP Sent', text: 'Please check your phone for the OTP.' });
      setOtpSent(true);
    } catch (error: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: error?.message || 'Failed to send OTP. Please try again.' });
    } finally {
      setSendingOtp(false);
    }
  };

  // Verify OTP handler
  const handleVerifyPhoneOtp = async () => {
    setError('');
    if (!otp) {
      setError("Please enter the OTP sent to your phone.");
      return;
    }
    setVerifyingOtp(true);
    try {
      await verifyOtp(contactNo, otp);
      Swal.fire({ icon: 'success', title: 'Verified', text: 'Phone number verified successfully!' });
      setIsPhoneVerified(true);
      setOtpSent(false); // hide OTP input after successful verification
    } catch (error: any) {
      Swal.fire({ icon: 'error', title: 'Invalid OTP', text: error?.message || 'The OTP you entered is incorrect. Please try again.' });
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Signup handler
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // sanitize contact number
    const contact = (contactNo || "").replace(/\D/g, "").slice(0, 10);
    console.log("Signup attempt payload:", {
      firstName,
      lastName,
      email,
      password,
      contact,
      address,
      landmark,
      city,
      state,
      pinCode,
      country,
      referral,
    });

    // Basic field validation
    if (!firstName || !lastName || !password || !contact) {
      setError("Please fill required fields (first name, last name, password, mobile).");
      return;
    }
    if (!/^\d{10}$/.test(contact)) {
      setError("Please enter a valid 10 digit mobile number.");
      return;
    }

  // Prepare the payload
  const payload = {
    email,
    password,
    firstName,
    lastName,
    address,
    landmark,
    city,
    state,
    pinCode,
    country,
    contactNo,
    // include other fields if your backend supports them
  };

    // MongoDB registration via API
  setSubmitting(true);
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        address,
        landmark,
        city,
        state,
        pinCode,
        country,
        contactNo: contact,
        referral,
      }),
    });

    const data = await res.json();
    console.log("Signup response:", res.status, data);
    if (!res.ok) {
      setError(data?.message || "Signup failed");
      setSubmitting(false);
      return;
    }
    // success -> redirect to login or dashboard
    router.push("/login");
  } catch (err: any) {
    console.error("Signup error:", err);
    setError(err?.message || "Server error");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="signup-side">
        <div className="signup-form-panel">
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSignup} className="signup-form">
            {/* --- Step 1: Mobile + OTP --- */}
            {!isPhoneVerified && (
              <div className="form-group">
                <label>Mobile Number</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    id="contactNo"
                    type="text"
                    placeholder="Enter 10 digit mobile number"
                    value={contactNo}
                    onChange={e => setContactNo(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    maxLength={10}
                    required
                  />
                  {!otpSent && (
                    <button type="button" className="send-otp-button" onClick={handleSendPhoneOtp} disabled={sendingOtp}>
                      {sendingOtp ? 'Sending...' : 'Send OTP'}
                    </button>
                  )}
                </div>
                {otpSent && (
                  <div className="email-otp-row" style={{ marginTop: 8 }}>
                    <input
                      id="otp-input"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="otp-input"
                      placeholder="Enter OTP"
                      aria-label="OTP"
                    />
                    <button
                      type="button"
                      className="verify-otp-button"
                      onClick={handleVerifyPhoneOtp}
                      disabled={verifyingOtp}
                    >
                      {verifyingOtp ? 'Verifying...' : 'Verify OTP'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* --- Step 2: show the rest of the form only after phone is verified --- */}
            {isPhoneVerified && (
              <>
                {/* Name Fields */}
                <div className="name-fields">
                  <div className="form-group">
                    <label>First Name</label>
                    <input id="firstName" type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input id="lastName" type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
                  </div>
                </div>

                {/* Date of Birth (added per screenshot) */}
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input id="dob" type="date" onChange={e => {/* you can store DOB if you want */}} />
                </div>

                {/* Email (no OTP here) */}
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>

              </>
            )}
            {/* Actions (submit button shown only after phone verified) */}
            {isPhoneVerified && (
              <div className="form-actions" style={{ marginTop: 16}}>
                <button type="submit" className="auth-button" disabled={submitting}>
                  {submitting ? 'Creating Account...' : 'Sign Up'}
                </button>
                <div className="auth-switch" style={{ marginTop: 10}}>
                  Already have an account? <Link href="/login">Login</Link>
                </div>
              </div>
            )}
          </form>
      </div>
    </div>
  </div>
  </div>
  );
};

export default Signup;