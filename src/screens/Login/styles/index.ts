import { ThemeColors } from "@/theme/theme";
import { Platform, StyleSheet } from "react-native";

export const loginStyles = (theme: ThemeColors) =>
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
    errorText: {
      fontSize: 13,
      color: theme.error,
      marginBottom: 12,
      textAlign: "center",
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
