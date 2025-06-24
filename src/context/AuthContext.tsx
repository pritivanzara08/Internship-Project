// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  User as FirebaseUser 
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { app } from '../lib/firebase'; // Adjust the import based on your project structure

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

const auth = getAuth(app);
const db = getFirestore(app);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Signup with role
  const signup = async (email: string, password: string, role: 'admin' | 'user') => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Save role & UID in Firestore
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      email,
      role,
      uid: firebaseUser.uid,
    });

    setUser({ uid: firebaseUser.uid, email, role });
  };

  // Login and fetch role from Firestore
  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Fetch user profile with role
    const docRef = doc(db, 'users', firebaseUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as User;
      setUser(data);
    } else {
      // If no role saved, default to 'user'
      setUser({ uid: firebaseUser.uid, email, role: 'user' });
    }
  };

  const logout = () => signOut(auth);

  // Keep user state in sync
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as User;
          setUser(data);
        } else {
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email, role: 'user' });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
