import { AuthGuard } from "@/components/common/AuthGuard";
import { NavigationWrapper } from "@/components/common/NavigationWrapper";
import LoginScreen from "@/src/screens/Login/components";
import React from "react";

/**
 * Login page route
 */
const LoginPage = () => (
  <AuthGuard requireAuth={false}>
    <NavigationWrapper>
      <LoginScreen />
    </NavigationWrapper>
  </AuthGuard>
);

export default LoginPage;
