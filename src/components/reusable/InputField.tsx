import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@/theme";

type InputProps = TextInputProps & {
  name: string;
  label?: string;
  placeholder?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
};

export const InputField: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  icon,
  isPassword = false,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  ...rest
}) => {
  const { currentTheme } = useTheme();
  const { control } = useFormContext();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      color: currentTheme.textPrimary,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: currentTheme.inputBackground,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: currentTheme.border,
      paddingHorizontal: 16,
      minHeight: multiline ? 100 : 56,
    },
    inputContainerError: {
      borderColor: currentTheme.errorBorder,
    },
    inputContainerDisabled: {
      backgroundColor: currentTheme.surfaceRaised,
      opacity: 0.6,
    },
    icon: {
      marginRight: 12,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: currentTheme.textPrimary,
      paddingVertical: multiline ? 12 : 0,
    },
    eyeIcon: {
      padding: 8,
    },
    errorText: {
      fontSize: 12,
      color: currentTheme.error,
      marginTop: 4,
      marginLeft: 4,
    },
  });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <View
              style={[
                styles.inputContainer,
                error && styles.inputContainerError,
                disabled && styles.inputContainerDisabled,
              ]}
            >
              {icon && (
                <Ionicons
                  name={icon}
                  size={20}
                  color={currentTheme.textSecondary}
                  style={styles.icon}
                />
              )}

              <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={currentTheme.placeholder}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                editable={!disabled}
                secureTextEntry={isPassword && !isPasswordVisible}
                multiline={multiline}
                numberOfLines={numberOfLines}
                textAlignVertical={multiline ? "top" : "center"}
                {...rest}
              />

              {isPassword && (
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeIcon}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={currentTheme.textSecondary}
                  />
                </TouchableOpacity>
              )}
            </View>

            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};
