// src/lib/firebase.ts
import { getAuth } from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBmp-e0giC3ETTLxz4PkMBTUV1qQTywaHw",
  authDomain: "gift-article-e8db5.firebaseapp.com",
  projectId: "gift-article-e8db5",
  storageBucket: "gift-article-e8db5.appspot.com",  // ✅ corrected `.app` to `.appspot.com`
  messagingSenderId: "1079698365153",
  appId: "1:1079698365153:web:5e63f5794caf575a8b75a0",
};

// Initialize Firebase app only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export Firestore DB instance
const db = getFirestore(app);

// firebase.ts
export const auth = getAuth(app);
export { app , db };

