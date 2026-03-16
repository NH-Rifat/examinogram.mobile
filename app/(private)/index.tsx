import { StyleSheet, View } from "react-native";

import { Typography } from "@/components/atoms/Typography";
import { useTheme } from "@/theme";

export default function HomeScreen() {
  const { currentTheme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <Typography variant="displaySmall">Examinogram</Typography>
      <Typography variant="bodyMedium" color={currentTheme.textSecondary}>
        Your learning journey starts here
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16,
  },
});
