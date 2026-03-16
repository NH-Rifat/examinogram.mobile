import React from "react";
import { useFormContext } from "react-hook-form";
import { Text, View } from "react-native";

import { Button } from "@/components/reusable";
import { useThemedStyles } from "@/theme";

import { loginStyles } from "../styles";
import { LoginFormData } from "../utils/validation";

type Props = {
  onPress: () => void;
  isLoading: boolean;
};

const LoginSubmitButton = ({ onPress, isLoading }: Props) => {
  const styles = useThemedStyles(loginStyles);
  const {
    formState: { errors },
  } = useFormContext<LoginFormData>();

  return (
    <View style={styles.signInButton}>
      {errors.root && (
        <Text style={styles.errorText}>{errors.root.message}</Text>
      )}
      <Button
        title="Sign in"
        onPress={onPress}
        variant="gradient"
        loading={isLoading}
        disabled={isLoading}
        fullWidth
      />
    </View>
  );
};

export default LoginSubmitButton;
