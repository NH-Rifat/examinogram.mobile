import React from "react";
import { FormProvider } from "react-hook-form";
import { ScrollView, View } from "react-native";

import { useThemedStyles } from "@/theme";

import LoginFooter from "./components/LoginFooter";
import LoginFormFields from "./components/LoginFormFields";
import LoginHeader from "./components/LoginHeader";
import LoginSubmitButton from "./components/LoginSubmitButton";
import RememberForgotRow from "./components/RememberForgotRow";
import SocialLoginSection from "./components/SocialLoginSection";
import { useLoginForm } from "./hooks/useLoginForm";
import { loginStyles } from "./styles";

const LoginScreen = () => {
  const styles = useThemedStyles(loginStyles);
  const { methods, handleSubmit, isLoading } = useLoginForm();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <FormProvider {...methods}>
          <View style={styles.content}>
            <LoginHeader />
            <LoginFormFields />
            <RememberForgotRow />
            <LoginSubmitButton onPress={handleSubmit} isLoading={isLoading} />
            <SocialLoginSection />
          </View>
        </FormProvider>

        <LoginFooter />
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
