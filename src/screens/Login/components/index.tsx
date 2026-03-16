import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Button, InputField } from "@/components/reusable";
import { UNAUTH_ROUTES } from "@/constants/routes";
import { useLoginMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/authSlice";
import { useTheme, useThemedStyles } from "@/theme";
import { ApiError } from "@/types";
import { loginStyles } from "../styles";
import { LoginFormData, loginSchema } from "../utils/validation";

const LoginScreen = () => {
  const { currentTheme } = useTheme();
  const styles = useThemedStyles(loginStyles);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log({ data });
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      console.log({ result });

      dispatch(
        loginSuccess({
          user: result.data.user,
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        }),
      );
    } catch (err) {
      const apiError = err as ApiError;
      methods.setError("root", {
        message: apiError?.message ?? "Login failed. Please try again.",
      });
    }
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
              {methods.formState.errors.root && (
                <Text style={styles.errorText}>
                  {methods.formState.errors.root.message}
                </Text>
              )}
              <Button
                title="Sign in"
                onPress={methods.handleSubmit(onSubmit)}
                variant="gradient"
                loading={isLoading}
                disabled={isLoading}
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
