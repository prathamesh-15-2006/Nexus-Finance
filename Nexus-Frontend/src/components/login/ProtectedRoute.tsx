// src/components/ProtectedRoute.tsx

import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

/**
 * A wrapper component that checks for user authentication status.
 * If the user is logged in, it renders the child routes via <Outlet>.
 * If the user is NOT logged in, it redirects them to the /login page.
 */
const ProtectedRoute: React.FC = () => {
  // Get the current login status from the authentication store
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await initializeAuth();
      setIsInitializing(false);
    };
    initAuth();
  }, [initializeAuth]);

  // Show loading while initializing auth state
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If the user is logged in (isLoggedIn is true), render the child component/routes
  if (isLoggedIn) {
    return <Outlet />;
  }

  // If the user is NOT logged in, redirect them to the login page.
  // `replace` removes the current route from the history stack,
  // preventing the user from navigating back to a restricted page.
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
