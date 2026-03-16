import { AuthGuard } from "@/components/common/AuthGuard";
import { NavigationWrapper } from "@/components/common/NavigationWrapper";
import LoginScreen from "@/src/screens/Login";
import React from "react";

const LoginPage = () => (
  <AuthGuard requireAuth={false}>
    <NavigationWrapper>
      <LoginScreen />
    </NavigationWrapper>
  </AuthGuard>
);

export default LoginPage;
