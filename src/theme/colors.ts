export type ThemeColors = {
  // Brand
  primary: string;
  primaryLight: string;
  primaryDark: string;
  gradientPrimary: string[];
  // Backgrounds
  background: string;
  surface: string;
  surfaceRaised: string;
  // Borders
  border: string;
  borderLight: string;
  // Text
  text: string;
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  textInverse: string;
  textOnPrimary: string;
  // Status
  error: string;
  errorLight: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  info: string;
  infoLight: string;
  // Misc
  disabled: string;
  white: string;
  black: string;
  overlay: string;
  tabBar: string;
  tabBarBorder: string;
  inputBackground: string;
  placeholder: string;
  skeleton: string;
  // Error border (used by form inputs)
  errorBorder: string;
};

export const lightColors: ThemeColors = {
  primary: "#2563EB",
  primaryLight: "#EFF6FF",
  primaryDark: "#1D4ED8",
  gradientPrimary: ["#2563EB", "#3B82F6"],
  background: "#FFFFFF",
  surface: "#F8FAFC",
  surfaceRaised: "#FFFFFF",
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
  text: "#0F172A",
  textPrimary: "#0F172A",
  textSecondary: "#64748B",
  textDisabled: "#CBD5E1",
  textInverse: "#FFFFFF",
  textOnPrimary: "#FFFFFF",
  error: "#EF4444",
  errorLight: "#FEF2F2",
  success: "#22C55E",
  successLight: "#F0FDF4",
  warning: "#F59E0B",
  warningLight: "#FFFBEB",
  info: "#3B82F6",
  infoLight: "#EFF6FF",
  disabled: "#CBD5E1",
  white: "#FFFFFF",
  black: "#000000",
  overlay: "rgba(0, 0, 0, 0.5)",
  tabBar: "#FFFFFF",
  tabBarBorder: "#E2E8F0",
  inputBackground: "#F8FAFC",
  placeholder: "#94A3B8",
  skeleton: "#E2E8F0",
  errorBorder: "#EF4444",
};

export const darkColors: ThemeColors = {
  primary: "#3B82F6",
  primaryLight: "#1E3A5F",
  primaryDark: "#2563EB",
  gradientPrimary: ["#3B82F6", "#60A5FA"],
  background: "#0F172A",
  surface: "#1E293B",
  surfaceRaised: "#293548",
  border: "#334155",
  borderLight: "#1E293B",
  text: "#F8FAFC",
  textPrimary: "#F8FAFC",
  textSecondary: "#94A3B8",
  textDisabled: "#475569",
  textInverse: "#0F172A",
  textOnPrimary: "#FFFFFF",
  error: "#F87171",
  errorLight: "#2D1515",
  success: "#4ADE80",
  successLight: "#14291A",
  warning: "#FCD34D",
  warningLight: "#2D2008",
  info: "#60A5FA",
  infoLight: "#1A2D4A",
  disabled: "#475569",
  white: "#FFFFFF",
  black: "#000000",
  overlay: "rgba(0, 0, 0, 0.7)",
  tabBar: "#1E293B",
  tabBarBorder: "#334155",
  inputBackground: "#1E293B",
  placeholder: "#64748B",
  skeleton: "#334155",
  errorBorder: "#F87171",
};
