import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { sendOtp, verifyOtp } from "../../pages/api/otpApi";
import '@/styles/signup.css';

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

  // OTP states
  const [emailOtp, setEmailOtp] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

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
  const validatePinCode = (pinCode: string) => /^\d{5}(-\d{4})?$/.test(pinCode);
  const validateContactNo = (contactNo: string) => /^\d{10}$/.test(contactNo);
  const validatePassword = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  // Send OTP handler
  const handleSendEmailOtp = async () => {
    try {
      await sendOtp(email);
      Swal.fire({ icon: 'success', title: 'OTP Sent', text: 'Please check your email for the OTP.' });
      setEmailOtpSent(true);
    } catch (error: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message });
    }
  };

  // Verify OTP handler
  const handleVerifyEmailOtp = async () => {
    try {
      await verifyOtp(email, emailOtp);
      Swal.fire({ icon: 'success', title: 'Verified', text: 'Email verified successfully!' });
      setIsEmailVerified(true);
    } catch (error: any) {
      Swal.fire({ icon: 'error', title: 'Invalid OTP', text: error.message });
    }
  };

  // Signup handler
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic field validation
    if (!firstName || !lastName || !address || !landmark || !city || !state || !pinCode || !country) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePinCode(pinCode)) {
      setError("Please enter a valid pin code.");
      return;
    }
    if (!validateContactNo(contactNo)) {
      setError("Please enter a valid contact number.");
      return;
    }
    if (!isEmailVerified) {
      setError("Please verify your email before signing up.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters, include 1 uppercase, 1 lowercase, and 1 number.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Firebase registration
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: 'success',
        title: 'SignUp Successful',
        text: 'Welcome to Gift-Article! Your account has been created successfully.',
      });
      router.push('/login');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-wrapper signup-bg">
      <div className="signup-container">
        <Link href="/">
          <img src="/images/logo.png" alt="Logo" className="logo-img" />
        </Link>
        <h2 className="signup-title">🎁 Create a New Account</h2>
        <p className="signup-subtitle">Join us to enjoy secure shopping with Gift-Article!</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSignup} className="signup-form">
          {/* Name Fields */}
          <div className="name-fields">
            <div className="form-group">
              <label>First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Address Fields */}
          <div className="form-group">
            <label>Address</label>
            <input
              id="address"
              type="text"
              placeholder="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Landmark</label>
            <input
              id="landmark"
              type="text"
              placeholder="Landmark"
              value={landmark}
              onChange={e => setLandmark(e.target.value)}
              required
            />
          </div>

          {/* Location Fields */}
          <div className="location-container">
            <div className="form-group small-field">
              <label>City</label>
              <input
                id="city"
                type="text"
                placeholder="City"
                value={city}
                onChange={e => {
                  if (e.target.value.length <= 30) setCity(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-group small-field">
              <label>State</label>
              <input
                id="state"
                type="text"
                placeholder="State"
                value={state}
                onChange={e => {
                  if (e.target.value.length <= 30) setState(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-group small-field">
              <label>Pin Code</label>
              <input
                id="pinCode"
                type="text"
                placeholder="Pin Code"
                value={pinCode}
                onChange={e => {
                  const onlyNumbers = e.target.value.replace(/\D/g, '');
                  if (onlyNumbers.length <= 6) setPinCode(onlyNumbers);
                }}
                required
              />
            </div>
          </div>

          {/* Country & Contact */}
          <div className="form-group">
            <label>Country</label>
            <input
              id="country"
              type="text"
              placeholder="Country"
              value={country}
              onChange={e => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              id="contactNo"
              type="text"
              placeholder="Contact Number"
              value={contactNo}
              onChange={e => setContactNo(e.target.value)}
              maxLength={10}
              required
            />
          </div>

          {/* Email & OTP */}
          <div className="form-group">
            <label>Email</label>
            <div className="email-input-container">
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setIsEmailVerified(false);
                }}
                disabled={isEmailVerified}
                required
              />
              {!emailOtpSent && (
                <button type="button" className="send-otp-button" onClick={handleSendEmailOtp}>
                  Send OTP
                </button>
              )}
              {emailOtpSent && !isEmailVerified && (
                <>
                  <input
                    id="otp-input"
                    value={emailOtp}
                    onChange={e => setEmailOtp(e.target.value)}
                    className="otp-input"
                    placeholder="Enter OTP"
                  />
                  <button
                    type="button"
                    className="verify-otp-button"
                    onClick={handleVerifyEmailOtp}
                  >
                    Verify OTP
                  </button>
                </>
              )}
            </div>
          </div>
          {isEmailVerified && (
            <p style={{ color: 'green' }}>Email verified ✅</p>
          )}

          {/* Password Fields */}
          <div className="form-group">
            <label>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setShowPasswordWarning(true)}
              onBlur={() => setShowPasswordWarning(false)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <label>
            <input
              type="checkbox"
              onChange={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            Show Confirm Password
          </label>

          {/* Referral */}
          <div className="referral-container">
            <label>How did you hear about us?</label>
            <select value={referral} onChange={e => setReferral(e.target.value)}>
              <option value="">Select an option</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="google">Google</option>
              <option value="friends">Friends</option>
              <option value="family">Family</option>
            </select>
          </div>

          {/* Submit & Auth Switch */}
          <button type="submit" className="auth-button">Sign Up</button>
          <div className="auth-switch">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;