import { AUTH_ROUTES, UNAUTH_ROUTES } from "@/constants/routes";
import { useAppSelector } from "@/store/hooks";
import { Redirect } from "expo-router";
import React from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = true,
}) => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  // Show loading state while checking authentication
  if (isLoading) {
    return null; // You could show a loading spinner here
  }

  // If authentication is required but user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    return <Redirect href={UNAUTH_ROUTES.LOGIN} />;
  }

  // If user is authenticated but trying to access login, redirect to tabs
  if (!requireAuth && isAuthenticated) {
    return <Redirect href={AUTH_ROUTES.TABS.DASHBOARD} />;
  }

  return <>{children}</>;
};

export { AuthGuard };
