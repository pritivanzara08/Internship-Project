import { auth } from '@/lib/firebase';
import '@/styles/login.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';

const Signup: React.FC = () => {
  const router = useRouter();

  //customer info states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [Landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [country, setCountry] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');

  //security & otp
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpMethod, setOtpMethod] = useState<string>(''); // 'email' or 'sms'
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  //how did you hear about us
  const [referral, setReferral] = useState('');

  //password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //error handling
  const [error, setError] = useState('');

  // Simple validation functions
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePinCode = (pinCode: string) => /^\d{5}(-\d{4})?$/.test(pinCode);
  const validateContactNo = (contactNo: string) => /^\d{10}$/.test(contactNo);
  const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one uppercase, one lowercase, one number

  const validatePassword = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Basic field validation
    if (!firstName || !lastName || !address || !Landmark || !city || !state || !pinCode || !country) {
      setError("Please fill in all required fields.");
      return;
    }
    // Email validation
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
    if (!otpMethod && !password) {
      setError("Set password or use OTP method");
      return;
    }
    if (!otpMethod && !passwordCriteria.test(password)) {
      setError("Password must be at least 8 characters long, contain one uppercase letter,")

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push('/login');
      } catch (err: any) {
        setError(err.message);
      }
    } else if (otpMethod && !otp) {
      setError("Please enter the OTP sent to your " + otpMethod);
      return;
    } else if (otpMethod && otpSent && !otpVerified) {
      setError("Please verify the OTP sent to your " + otpMethod);
      return;
    } else if (password && !validatePassword(password)) {
      setError("Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.");
      return;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  }
  return (
    <div className="signup-wrapper signup-bg">
      <div className="signup-container">
        <h2 className="signup-title">🎁 Create a New Account</h2>
        <p className="signup-subtitle">Join us to enjoy secure shopping with Gift-Article!</p>

        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group">
            {/* firstName */}
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </div>
          {/* lastName */}
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
          </div>
          {/* address */}
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              placeholder="address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
          </div>
          {/* Landmark */}
          <div className="form-group">
            <label htmlFor="landmark">Landmark</label>
            <input
              id="landmark"
              type="text"
              placeholder="Landmark"
              value={Landmark}
              onChange={e => setLandmark(e.target.value)}
              required
            />
          </div>
          {/* city */}
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
            placeholder="City"
            value={city}
            onChange={e => setCity(e.target.value)}
            required
          />
          </div>
          {/* state */}
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              id="state"
              type="text"
              placeholder="State"
              value={state}
              onChange={e => setState(e.target.value)}
              required
            />
          </div>
          {/* pinCode */}
          <div className="form-group">
            <label htmlFor="pinCode">Pin Code</label>
            <input
              id="pinCode"
              type="text"
              placeholder="Pin Code"
              value={pinCode}
              onChange={e => setPinCode(e.target.value)}
              required
            />
          </div>
          {/* country */}
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              placeholder="Country"
              value={country}
              onChange={e => setCountry(e.target.value)}
              required
            />
          </div>
          {/* contactNo */}
          <div className="form-group">
            <label htmlFor="contactNo">Contact Number</label>
            <input
              id="contactNo"
              type="text"
            placeholder="Contact Number"
            value={contactNo}
            onChange={e => setContactNo(e.target.value)}
            required
          />
          </div>
          {/* email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          </div>
          {/* password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          </div>
          {/* Show Password Checkbox */}
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>
          {/* confirmPassword */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="********"
              value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          </div>
          {/* Show Confirm Password Checkbox */}
          <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={showConfirmPassword}
              onChange={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            Show Confirm Password
          </label>
          </div>
          {/* OTP Method */}
          <div className="form-group">
              <label>
                <input
                  type="radio"
                  name="otpMethod"
                  value="email"
                  checked={otpMethod === 'email'}
                  onChange={() => {
                    setOtpMethod('email');
                    Swal.fire({
                      icon: 'info',
                      title: 'OTP Method Selected',
                      text: "OTP will be sent to your registered email address."
                    });
                  }}
                />
                Email OTP
              </label>
              <label>
                <input
                  type="radio"
                  name="otpMethod"
                  value="sms"
                  checked={otpMethod === 'sms'}
                  onChange={() => {
                    setOtpMethod('sms');
                    Swal.fire({
                      icon: 'info',
                      title: 'OTP Method Selected',
                      text: "OTP will be sent to your registered mobile number."
                    });
                  }}
                />
                SMS OTP
              </label>
          </div>
          {/* OTP Sent Confirmation */}
          {otpSent && (
            <div className="otp-sent-confirmation">
              <p>OTP has been sent to your {otpMethod}.</p>
            </div>
          )}
          {/* OTP Input */}
          {otpMethod && (
            <div className="otp-input">
              <label htmlFor="otp">OTP</label>
              <input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                required
              />
              <button type="button" className="send-otp-button" onClick={() => setOtpSent(true)}>
                {otpSent ? 'Resend OTP' : 'Send OTP'}
              </button>
            </div>
          )}
          {/* Referral */}
          <label htmlFor="referral">How did you hear about us?</label>
          <input
            id="referral"
            type="text"
            placeholder="Referral Source"
            value={referral}
            onChange={e => setReferral(e.target.value)}
          />
          
          <div className="password-criteria">
            <p>Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.</p>
          </div>
          {/* <div className="otp-criteria">
            <p>OTP will be sent to your {otpMethod}.</p>
          </div> */}
          <button type="submit" className="auth-button">Sign Up</button>
          {/* Auth Switch */}
          <div className="auth-switch">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
        </div>
      </div>
      );
}

      export default Signup;
