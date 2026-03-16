import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useThemedStyles } from "@/theme";

import { loginStyles } from "../styles";

const LoginFooter = () => {
  const styles = useThemedStyles(loginStyles);

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>By continuing, you agree to our </Text>
      <TouchableOpacity onPress={() => console.log("Terms pressed")}>
        <Text style={styles.footerLink}>Terms of Service</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}> and </Text>
      <TouchableOpacity onPress={() => console.log("Privacy pressed")}>
        <Text style={styles.footerLink}>Privacy Policy</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginFooter;
