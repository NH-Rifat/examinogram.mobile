import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { useTheme } from "@/theme";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

const TAB_SCREENS: {
  name: string;
  label: string;
  icon: IoniconsName;
  activeIcon: IoniconsName;
}[] = [
  { name: "home", label: "Home", icon: "home-outline", activeIcon: "home" },
  {
    name: "result",
    label: "Result",
    icon: "trophy-outline",
    activeIcon: "trophy",
  },
  {
    name: "my-resource",
    label: "My Resource",
    icon: "albums-outline",
    activeIcon: "albums",
  },
  {
    name: "library",
    label: "Library",
    icon: "library-outline",
    activeIcon: "library",
  },
];

export default function TabsLayout() {
  const { currentTheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: currentTheme.surface,
          borderTopColor: currentTheme.border,
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 84 : 64,
          paddingBottom: Platform.OS === "ios" ? 24 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: currentTheme.primary,
        tabBarInactiveTintColor: currentTheme.textSecondary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
          marginTop: 2,
        },
      }}
    >
      {TAB_SCREENS.map(({ name, label, icon, activeIcon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: label,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? activeIcon : icon}
                size={24}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
