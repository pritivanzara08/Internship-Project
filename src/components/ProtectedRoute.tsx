// src/components/ProtectedRoute.tsx
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: ('admin' | 'user')[];
  fallback?: ReactNode;
}

const ProtectedRoute = ({ children, allowedRoles, fallback = null }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login'); // not logged in
      } else if (!allowedRoles.includes(user.role)) {
        router.push('/unauthorized'); // role not allowed
      }
    }
  }, [user, loading, router, allowedRoles]);

  // While checking auth or redirecting, optionally show fallback
  if (loading || !user || !allowedRoles.includes(user.role)) {
    return fallback; // can be a spinner or null
  }

  return <>{children}</>;
};

export default ProtectedRoute;
