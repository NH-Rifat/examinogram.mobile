import React from "react";
import { View } from "react-native";

import { InputField } from "@/components/reusable";
import { useThemedStyles } from "@/theme";

import { loginStyles } from "../styles";

const LoginFormFields = () => {
  const styles = useThemedStyles(loginStyles);

  return (
    <View style={styles.form}>
      <InputField
        name="email"
        label="Email"
        placeholder="Enter your email"
        icon="mail-outline"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />

      <InputField
        name="password"
        label="Password"
        placeholder="Enter your password"
        icon="lock-closed-outline"
        isPassword
        autoCapitalize="none"
        autoComplete="password"
      />
    </View>
  );
};

export default LoginFormFields;
