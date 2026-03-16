import "react-native-reanimated";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "@/store";
import { NavigationWrapper } from "@/components/common/NavigationWrapper";
import { ThemeProvider } from "@/theme";

export const unstable_settings = {
  anchor: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <NavThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <NavigationWrapper>
                <Stack screenOptions={{ headerShown: false }} />
              </NavigationWrapper>
              <StatusBar style="auto" />
            </NavThemeProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
