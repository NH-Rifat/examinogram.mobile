import React from "react";
import { Text, View } from "react-native";

import { useThemedStyles } from "@/theme";

import { loginStyles } from "../styles";

const LoginHeader = () => {
  const styles = useThemedStyles(loginStyles);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Sign in to Examino</Text>
      <Text style={styles.subtitle}>Get Back discover exam as you want</Text>
    </View>
  );
};

export default LoginHeader;
