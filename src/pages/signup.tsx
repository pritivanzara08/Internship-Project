import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import '@/styles/login.css';

const Signup: React.FC = () => {
const router = useRouter();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');

// Simple validation functions
const validateEmail = (email: string) =>
/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password: string) =>
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

const handleSignup = async (e: React.FormEvent) => {
e.preventDefault();

// Email validation
if (!validateEmail(email)) {
  setError("Please enter a valid email address.");
  return;
}

// Password validation
if (!validatePassword(password)) {
  setError(
    "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one number."
  );
  return;
}

try {
  await createUserWithEmailAndPassword(auth, email, password);
  router.push('/login');
} catch (err: any) {
  setError(err.message);
}
};

  return (
    <div className="auth-wrapper">
      <form onSubmit={handleSignup} className="auth-form">
        <h2 className="auth-title">Create a New Account</h2>

        {error && <div className="auth-error">{error}</div>}

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

        <button type="submit" className="auth-button">Sign Up</button>

        <p className="auth-switch">
          Already have an account? <a href="/login">Login</a>
        </p>

      </form>
    </div>
  );
};

export default Signup;
