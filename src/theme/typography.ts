import { TextStyle } from "react-native";

export type FontWeight = TextStyle["fontWeight"];

export type TypographyStyle = {
  fontSize: number;
  lineHeight: number;
  fontWeight: FontWeight;
  letterSpacing?: number;
};

export const Typography = {
  displayLarge: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700" as FontWeight,
  },
  displayMedium: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700" as FontWeight,
  },
  displaySmall: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700" as FontWeight,
  },
  headingLarge: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "600" as FontWeight,
  },
  headingMedium: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600" as FontWeight,
  },
  headingSmall: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600" as FontWeight,
  },
  bodyLarge: { fontSize: 16, lineHeight: 24, fontWeight: "400" as FontWeight },
  bodyMedium: { fontSize: 14, lineHeight: 22, fontWeight: "400" as FontWeight },
  bodySmall: { fontSize: 12, lineHeight: 18, fontWeight: "400" as FontWeight },
  caption: { fontSize: 11, lineHeight: 16, fontWeight: "400" as FontWeight },
  label: { fontSize: 13, lineHeight: 18, fontWeight: "500" as FontWeight },
  button: { fontSize: 15, lineHeight: 22, fontWeight: "600" as FontWeight },
  buttonSmall: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600" as FontWeight,
  },
} satisfies Record<string, TypographyStyle>;

export type TypographyVariant = keyof typeof Typography;
