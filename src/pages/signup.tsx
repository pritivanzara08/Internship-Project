import { auth } from '@/lib/firebase';
import '@/styles/signup.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';


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
  const [emailOtp, setEmailOtp] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  //security & otp
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);
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

  // Function to send OTP
  const sendEmailOtp = () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    // Save the OTP somewhere (e.g., state, or call your backend to send email)
    // For demo, we'll just show it in alert:
    Swal.fire({
      icon: 'info',
      title: 'OTP Sent',
      text: `Your OTP is: ${generatedOtp}`,
    });
    // Store OTP for validation (in real app, send email via backend and validate server-side)
    window.localStorage.setItem('emailOtp', generatedOtp);
    setEmailOtpSent(true);
    setIsEmailVerified(false);
  };

  // Function to verify OTP
  const verifyEmailOtp = () => {
    const sentOtp = window.localStorage.getItem('emailOtp');
    if (emailOtp === sentOtp) {
      Swal.fire({
        icon: 'success',
        title: 'Verified',
        text: 'Email verified successfully!',
      });
      setIsEmailVerified(true);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid OTP',
        text: 'Please check the OTP and try again.',
      });
    }
  };
  // Function to show password criteria
  const showPasswordCriteria = () => {
    Swal.fire({
      icon: 'info',
      title: 'Password Requirements',
      html: `<ul style="text-align: left;">
             <li>At least 8 characters</li>
             <li>One uppercase letter</li>
             <li>One lowercase letter</li>
             <li>One number</li>
           </ul>`,
      confirmButtonText: 'Ok',
    });
  };
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
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailVerified(false); // Reset verification on email change
              }}
              required
              autoComplete="email"
              disabled={isEmailVerified}
            />
          </div>

          {/* Button to send OTP */}
          {!emailOtpSent && (
            <button type="button" className="send-otp-button" onClick={sendEmailOtp}>
              Send OTP to Email
            </button>
          )}

          {/* OTP Input Field */}
          {emailOtpSent && !isEmailVerified && (
            <div className="otp-section">
              <label htmlFor="emailOtp">Enter OTP</label>
              <input
                id="emailOtp"
                type="text"
                placeholder="Enter OTP"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
              />
              <button type="button" className="send-otp-button" onClick={verifyEmailOtp}>
                Verify OTP
              </button>
            </div>
          )}

          {/* Show message or mark email verified */}
          {isEmailVerified && (
            <p style={{ color: 'green' }}>Email verified ✅</p>
          )}
          {/* password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPasswordWarning ? 'text' : 'password'}
              placeholder="********"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setShowPasswordWarning(true)}
              onBlur={() => setShowPasswordWarning(false)}
            />
            {showPasswordWarning && (
              <div className="password-criteria">
                <p>Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.</p>
              </div>
            )}
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

          {/* Referral */}
          <div className="referral-container">
          <label htmlFor="referral">How did you hear about us?</label>
          <select
            id="referral"
            value={referral}
            onChange={e => setReferral(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="google">Google</option>
            <option value="friends">Friends</option>
            <option value="family">Family</option>
          </select>
          </div>


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
