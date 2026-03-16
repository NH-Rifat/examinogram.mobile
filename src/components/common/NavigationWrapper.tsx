import { useTheme } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

interface NavigationWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper component for navigation screens that prevents white blink during transitions
 * Provides consistent background colors across all navigation states
 */
export const NavigationWrapper: React.FC<NavigationWrapperProps> = ({
  children,
}) => {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
      // Ensure the background is immediately visible
      opacity: 1,
      // Prevent any flashing
      overflow: "hidden",
    },
  });

  return <View style={styles.container}>{children}</View>;
};

export default NavigationWrapper;
