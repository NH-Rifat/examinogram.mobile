import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

import { UNAUTH_ROUTES } from "@/constants/routes";
import { useTheme, useThemedStyles } from "@/theme";

import { loginStyles } from "../styles";
import { LoginFormData } from "../utils/validation";

const RememberForgotRow = () => {
  const { currentTheme } = useTheme();
  const styles = useThemedStyles(loginStyles);
  const router = useRouter();
  const { watch, setValue } = useFormContext<LoginFormData>();
  const rememberMe = watch("rememberMe");

  return (
    <View style={styles.rememberForgotContainer}>
      <TouchableOpacity
        style={styles.rememberMeContainer}
        onPress={() => setValue("rememberMe", !rememberMe)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
          {rememberMe && (
            <Ionicons name="checkmark" size={14} color={currentTheme.white} />
          )}
        </View>
        <Text style={styles.rememberMeText}>Remember me</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push(UNAUTH_ROUTES.FORGOT_PASSWORD)}
        activeOpacity={0.7}
      >
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RememberForgotRow;
