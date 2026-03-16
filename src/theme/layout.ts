import { Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const Layout = {
  screenWidth,
  screenHeight,
  screenPadding: 16,
  headerHeight: 56,
  tabBarHeight: 60,
  borderRadius: {
    none: 0,
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    "2xl": 20,
    "3xl": 24,
    full: 9999,
  },
  hitSlop: {
    xs: { top: 4, bottom: 4, left: 4, right: 4 },
    sm: { top: 8, bottom: 8, left: 8, right: 8 },
    md: { top: 12, bottom: 12, left: 12, right: 12 },
  },
} as const;
