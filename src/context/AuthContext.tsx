// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  uid: string;
  email: string | null;
  role: 'admin' | 'user'; // Extend roles as needed
}

interface AuthContextProps {
  user: User | null;
  signup: (email: string, password: string, role: 'admin' | 'user') => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Signup via Api
  const signup = async (email: string, password: string, role: 'admin' | 'user') => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    });
    if (!res.ok) {
      throw new Error('Signup failed');
    }
    const data = await res.json();
    setUser({ uid: data.uid, email, role: data.role });
  };

  // Login via Api
  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error('Login failed');
    }
    const data = await res.json();
    setUser({ uid: data.uid, email: data.email, role: data.role });
  };

  //Logout via Api
  const logout = async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
  };

  // Hydrate on Load
  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try{
        const res = await fetch('/api/auth/user', {
          method: 'GET',
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          if (mounted && data?.uid){
          setUser({ uid: data.uid, email: data.email, role: data.role as User['role'] });
        } 
      }else {
          if (mounted) setUser(null);
        }
      } catch (error) {
        if (mounted) setUser(null);
        console.error('Error fetching user:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchUser();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
