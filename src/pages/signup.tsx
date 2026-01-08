import '@/styles/signup.css';
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
  const [dob, setDob] = useState('');

  //Loading states
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // OTP states
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  
  // Other states
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [agreement, setAgreement] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Validation functions
  const validateContactNo = (contactNo: string) => /^\d{10}$/.test(contactNo);

 // Send OTP to phone
  const handleSendPhoneOtp = async () => {
    setError('');
    if (!validateContactNo(contactNo)) {
      setError("Please enter a valid 10 digit mobile number.");
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
      Swal.fire({ icon: 'error', title: 'Error', text: error?.message || 'Failed to send OTP.' });
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
      Swal.fire({ icon: 'error', title: 'Invalid OTP', text: error?.message || 'The OTP you entered is incorrect.' });
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Signup handler
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!agreement) {
      setError("You must agree to the terms and conditions.");
    }
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
      dob,
    });

    // Basic field validation
    if (!firstName || !lastName || !password || !contact || !email || !isPhoneVerified) {
      setError("All fields are required and phone must be verified.).");
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
    dob
  };
  setSubmitting(true);
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    // console.log("Signup response:", res.status, data);
    if (!res.ok) {
      setError(data?.message || "Signup failed");
      // setSubmitting(false);
      return;
    }
    router.push("/login");
  } catch (err: any) {
    // console.error("Signup error:", err);
    setError(err?.message || "Server error");
  } finally {
    setSubmitting(false);
  }
};

  // simple password strength
  const getPasswordStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const labels = ['Too weak', 'Weak', 'Okay', 'Strong', 'Very strong'];
    return { score, label: labels[score] || 'Too weak' };
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h2>Create Your Account</h2>
        {error && <div className="error">{error}</div>}
      <form onSubmit={handleSignup} className="signup-form">
        {/* Mobile Number and OTP */}
        {!isPhoneVerified && (
          <>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                id="contactNo"
                type="number"
                placeholder="Enter 10 digit mobile number"
                value={contactNo}
                onChange={e => setContactNo(e.target.value.replace(/\D/g, '').slice(0, 10))}
                maxLength={10}
                required
              />
              <button type="button" className="send-otp-button" onClick={handleSendPhoneOtp} disabled={sendingOtp}>
                {sendingOtp ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </div>
            {otpSent && (
              <div className="otp-input-group">
                <input
                  id="otp-input"
                  className="otp-input"
                  type="number"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  required
                />
                <button type="button" className="verify-otp-button" onClick={handleVerifyPhoneOtp} disabled={verifyingOtp}>
                  {verifyingOtp ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            )}
          </>
        )}

      {/* User Information Fields */}
      {isPhoneVerified && (
        <>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <div className="pwd-meter">
              <div className={`meter-bar m-${getPasswordStrength(password).score}`} />
              <div className="meter-label">{getPasswordStrength(password).label}</div>
            </div>
            <div className="password-visibility">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(s => !s)}
              /> Show Password
            </div>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <div className="password-visibility">
              <input
                type="checkbox"
                checked={showConfirmPassword}
                onChange={() => setShowConfirmPassword(s => !s)}
              /> Show Password
            </div>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={agreement}
                onChange={e => setAgreement(e.target.checked)}
              /> I agree to the <Link href="/terms">terms and conditions</Link>.
            </label>
          </div>
        </>
      )}
      
      {isPhoneVerified && (
        <button type="submit" className="primary-btn" disabled={submitting}>
          {submitting ? 'Creating Account...' : 'Sign Up'}
        </button>
      )}
    </form>
    
    <div className="auth-switch">
      Already have an account? <Link href="/login">Log In</Link>
    </div>

  </div>
</div>
);
};

export default Signup;