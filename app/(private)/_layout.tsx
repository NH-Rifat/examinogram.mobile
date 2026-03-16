import { Stack } from "expo-router";

import { useTheme } from "@/theme";

export default function PrivateLayout() {
  const { currentTheme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: currentTheme.background },
      }}
    />
  );
}
