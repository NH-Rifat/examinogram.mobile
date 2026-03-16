import { useTheme } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

interface TabScreenWrapperProps {
  children: React.ReactNode;
}
export const TabScreenWrapper: React.FC<TabScreenWrapperProps> = ({
  children,
}) => {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
      opacity: 1,
    },
  });

  return <View style={styles.container}>{children}</View>;
};

export default TabScreenWrapper;
