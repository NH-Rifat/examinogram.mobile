import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Button, InputField } from "@/components/reusable";
import { UNAUTH_ROUTES } from "@/constants/routes";
import { useTheme, useThemedStyles } from "@/theme";
import { ThemeColors } from "@/theme/theme";
import { LoginFormData, loginSchema } from "../utils/validation";

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: Platform.OS === "ios" ? 60 : 40,
      paddingBottom: 24,
    },
    header: {
      marginBottom: 40,
    },
    title: {
      fontSize: 32,
      fontWeight: "700",
      color: theme.textPrimary,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: theme.textSecondary,
      lineHeight: 24,
    },
    form: {
      marginBottom: 24,
    },
    rememberForgotContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
    },
    rememberMeContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: theme.border,
      marginRight: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    checkboxChecked: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    rememberMeText: {
      fontSize: 14,
      color: theme.textPrimary,
    },
    forgotPasswordText: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.primary,
    },
    signInButton: {
      marginBottom: 32,
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.border,
    },
    dividerText: {
      fontSize: 14,
      color: theme.textSecondary,
      marginHorizontal: 16,
    },
    socialButtonsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 16,
      marginBottom: 32,
    },
    socialButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      justifyContent: "center",
      alignItems: "center",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      paddingHorizontal: 24,
    },
    footerText: {
      fontSize: 12,
      color: theme.textSecondary,
      textAlign: "center",
    },
    footerLink: {
      fontSize: 12,
      color: theme.primary,
      fontWeight: "600",
    },
  });

const LoginScreen = () => {
  const { currentTheme } = useTheme();
  const styles = useThemedStyles(createStyles);
  const router = useRouter();

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
    // TODO: Implement login logic
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // TODO: Implement social login
  };

  const { watch, setValue } = methods;
  const rememberMe = watch("rememberMe");

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Sign in to Examino</Text>
            <Text style={styles.subtitle}>
              Get Back discover exam as you want
            </Text>
          </View>

          {/* Form */}
          <FormProvider {...methods}>
            <View style={styles.form}>
              <InputField
                name="email"
                label="Email"
                placeholder="Enter your email"
                icon="mail-outline"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <InputField
                name="password"
                label="Password"
                placeholder="Enter your password"
                icon="lock-closed-outline"
                isPassword
                autoCapitalize="none"
                autoComplete="password"
              />
            </View>

            {/* Remember Me & Forgot Password */}
            <View style={styles.rememberForgotContainer}>
              <TouchableOpacity
                style={styles.rememberMeContainer}
                onPress={() => setValue("rememberMe", !rememberMe)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkboxChecked,
                  ]}
                >
                  {rememberMe && (
                    <Ionicons
                      name="checkmark"
                      size={14}
                      color={currentTheme.white}
                    />
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

            {/* Sign In Button */}
            <View style={styles.signInButton}>
              <Button
                title="Sign in"
                onPress={methods.handleSubmit(onSubmit)}
                variant="gradient"
                fullWidth
              />
            </View>
          </FormProvider>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or sign up with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin("google")}
              activeOpacity={0.7}
            >
              <Ionicons
                name="logo-google"
                size={24}
                color={currentTheme.textPrimary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin("facebook")}
              activeOpacity={0.7}
            >
              <Ionicons
                name="logo-facebook"
                size={24}
                color={currentTheme.textPrimary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin("apple")}
              activeOpacity={0.7}
            >
              <Ionicons
                name="logo-apple"
                size={24}
                color={currentTheme.textPrimary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin("twitter")}
              activeOpacity={0.7}
            >
              <Ionicons
                name="logo-twitter"
                size={24}
                color={currentTheme.textPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our{" "}
          </Text>
          <TouchableOpacity onPress={() => console.log("Terms pressed")}>
            <Text style={styles.footerLink}>Terms of Service</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}> and </Text>
          <TouchableOpacity onPress={() => console.log("Privacy pressed")}>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
