// import { SplashScreen } from "@/screens/Splash";
import NavigationWrapper from "@/components/common/NavigationWrapper";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { AUTH_ROUTES, UNAUTH_ROUTES } from "../src/constants/routes";
import { useAppSelector } from "../src/store/hooks";

const Index = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(splashTimer);
  }, []);

  if (showSplash) {
    // return <SplashScreen />;
    return (
      <Text style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        Splash Screen Placeholder
      </Text>
    );
  }

  return (
    <NavigationWrapper>
      {!isAuthenticated ? (
        <Redirect href={AUTH_ROUTES.TABS.HOME} />
      ) : (
        <Redirect href={UNAUTH_ROUTES.LOGIN} />
      )}
    </NavigationWrapper>
  );
};

export default Index;
