import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useTheme, useThemedStyles } from "@/theme";

import { loginStyles } from "../styles";

const SOCIAL_PROVIDERS = [
  { key: "google", icon: "logo-google" as const },
  { key: "facebook", icon: "logo-facebook" as const },
  { key: "apple", icon: "logo-apple" as const },
  { key: "twitter", icon: "logo-twitter" as const },
];

const SocialLoginSection = () => {
  const { currentTheme } = useTheme();
  const styles = useThemedStyles(loginStyles);

  return (
    <>
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or sign up with</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialButtonsContainer}>
        {SOCIAL_PROVIDERS.map(({ key, icon }) => (
          <TouchableOpacity
            key={key}
            style={styles.socialButton}
            onPress={() => console.log(`Login with ${key}`)}
            activeOpacity={0.7}
          >
            <Ionicons name={icon} size={24} color={currentTheme.textPrimary} />
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default SocialLoginSection;
