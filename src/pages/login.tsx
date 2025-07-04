import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { loginUser } from '../utils/auth';
import '../styles/login.css';

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async(e: React.FormEvent) => {
    e.preventDefault();
    try{
      await loginUser(email, password);
      router.push('/'); // Redirect to homepage or dashboard
    } catch (err: any) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-wrapper login-bg">
      <form onSubmit={handleSignup} className="auth-form">
        <img src="/images/logo.png" alt="Logo" className="logo-img" />
        <h2 className="auth-title">Login to Gift-Article!</h2>
        <p className="auth-subtitle">Access your account and continue shopping</p>

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
          New here? <a href="/signup">Create an account</a>
        </p>
        <p className="auth-switch">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
