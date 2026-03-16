import React from "react";
import { View } from "react-native";

import { useTheme } from "@/theme";

const ForgotPasswordPage = () => {
  const { currentTheme } = useTheme();
  return <View style={{ flex: 1, backgroundColor: currentTheme.background }} />;
};

export default ForgotPasswordPage;
