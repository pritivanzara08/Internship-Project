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
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [country, setCountry] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  //password visibility
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);

  //how did you hear about us
  const [referral, setReferral] = useState('');
  const [error, setError] = useState('');

  // validation
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePinCode = (pinCode: string) => /^\d{5}(-\d{4})?$/.test(pinCode);
  const validateContactNo = (contactNo: string) => /^\d{10}$/.test(contactNo);
  const validatePassword = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  
  //send OTP
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
  
  //verify OTP
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

  //Signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Basic field validation
    if (!firstName || !lastName || !address || !landmark || !city || !state || !pinCode || !country) {
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
    //firebase registration
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
        <h2 className="signup-title">🎁 Create a New Account</h2>
        <p className="signup-subtitle">Join us to enjoy secure shopping with Gift-Article!</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSignup} className="signup-form">
          <div className="name-fields">
            <div className="form-group">
              {/* firstName */}
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
            {/* lastName */}
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
          {/* address */}
          <div className="form-group">
            <label>Address</label>
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
          {/* city */}
          <div className="form-group">
            <label>City</label>
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
            <label>State</label>
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
            <label>Pin Code</label>
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
          {/* contactNo */}
          <div className="form-group">
            <label>Contact Number</label>
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
            <label>Email</label>
            <div className="email-input-container">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEmailVerified(false); // Reset verification on email change
                }}
                disabled={isEmailVerified}
                required
                />

            {/* Button to send OTP */}
            {!emailOtpSent && (
              <button type="button" className="send-otp-button" onClick={sendEmailOtp}>
                Send OTP
              </button>
            )}
            </div>
          </div>

          {/* OTP Input Field */}
          {emailOtpSent && !isEmailVerified && (
            <div className="otp-section">
              <label>Enter OTP</label>
              <input 
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
          
          {/* confirmPassword */}
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              />
          </div>
          {/* Show Confirm Password Checkbox */}
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
};

export default Signup;
