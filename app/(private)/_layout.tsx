import { Redirect, Stack } from "expo-router";
import React from "react";

import { UNAUTH_ROUTES } from "@/constants/routes";
import { useAppSelector } from "@/store/hooks";
import { useTheme } from "@/theme";

export default function PrivateLayout() {
  const { currentTheme } = useTheme();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Redirect href={UNAUTH_ROUTES.LOGIN} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: currentTheme.background },
      }}
    />
  );
}
