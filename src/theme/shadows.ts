import { Platform, ViewStyle } from "react-native";

type ShadowStyle = Pick<
  ViewStyle,
  | "shadowColor"
  | "shadowOffset"
  | "shadowOpacity"
  | "shadowRadius"
  | "elevation"
>;

function createShadow(
  elevation: number,
  opacity: number,
  radius: number,
  offsetY: number,
): ShadowStyle {
  return Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: { elevation },
    default: { elevation },
  }) as ShadowStyle;
}

export const Shadows = {
  none: {} as ShadowStyle,
  sm: createShadow(2, 0.06, 3, 1),
  md: createShadow(4, 0.08, 6, 2),
  lg: createShadow(8, 0.1, 12, 4),
  xl: createShadow(16, 0.12, 20, 8),
} as const;

export type ShadowVariant = keyof typeof Shadows;
