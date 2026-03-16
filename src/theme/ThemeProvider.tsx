import React, { createContext, useContext, useMemo, useRef } from "react";
import { useColorScheme } from "react-native";

import { ThemeColors, darkColors, lightColors } from "./colors";

type ThemeContextValue = {
  currentTheme: ThemeColors;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextValue>({
  currentTheme: lightColors,
  isDark: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const value = useMemo<ThemeContextValue>(
    () => ({ currentTheme: isDark ? darkColors : lightColors, isDark }),
    [isDark],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

export function useThemedStyles<T>(creator: (theme: ThemeColors) => T): T {
  const { currentTheme } = useContext(ThemeContext);
  // Keep creator in a ref so styles only recompute when the theme changes,
  // not on every render when the creator is defined inline.
  const creatorRef = useRef(creator);
  creatorRef.current = creator;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => creatorRef.current(currentTheme), [currentTheme]);
}
