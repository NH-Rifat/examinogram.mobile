import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

import { useTheme } from "@/theme";
import {
  Typography as TypographyScale,
  TypographyVariant,
} from "@/theme/typography";

type TypographyProps = {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  onPress?: () => void;
};

export function Typography({
  children,
  variant = "bodyMedium",
  color,
  style,
  numberOfLines,
  onPress,
}: TypographyProps) {
  const { currentTheme } = useTheme();

  return (
    <Text
      style={[
        TypographyScale[variant],
        { color: color ?? currentTheme.textPrimary },
        style,
      ]}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {children}
    </Text>
  );
}
