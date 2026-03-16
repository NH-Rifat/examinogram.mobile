 
import { useTheme } from "@/theme";
import { ThemeColors } from "@/theme/theme";
import { AlertType } from "@/types/alert";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
}

interface AlertComponentProps {
  visible: boolean;
  title?: string;
  message: string;
  type: AlertType;
  buttons?: AlertButton[];
  onDismiss?: () => void;
  showCloseButton?: boolean;
  actionText?: string;
  onPress?: () => void;
  onClose?: () => void;
  onActionPress?: () => void;
}

const AlertComponent: React.FC<AlertComponentProps> = ({
  visible,
  title,
  message,
  type,
  buttons = [{ text: "OK" }],
  onDismiss,
  showCloseButton = false,
  actionText,
  onActionPress,
}) => {
  const { currentTheme } = useTheme();
  const styles = createStyles(currentTheme, type);

  const getAlertIcon = (): keyof typeof MaterialIcons.glyphMap => {
    switch (type) {
      case "success":
        return "check-circle";
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "info":
      default:
        return "info";
    }
  };

  const getIconColor = (): string => {
    switch (type) {
      case "success":
        return currentTheme.success;
      case "error":
        return currentTheme.error;
      case "warning":
        return currentTheme.warning;
      case "info":
      default:
        return currentTheme.info;
    }
  };

  const handleButtonPress = (button: AlertButton) => {
    if (button.onPress) {
      button.onPress();
    }
    if (onDismiss) {
      onDismiss();
    }
  };

  const handleBackdropPress = () => {
    if (onDismiss && showCloseButton) {
      onDismiss();
    }
  };

  // Create default buttons if actionText is provided
  let finalButtons = buttons;
  if (actionText) {
    finalButtons = [
      { text: actionText, onPress: onActionPress, style: "default" as const },
      { text: "Cancel", style: "cancel" as const },
    ];
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onDismiss}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <BlurView intensity={6} style={styles.backdrop}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.alertContainer}>
              <View style={styles.alertContent}>
                {/* Icon */}
                <View style={styles.iconContainer}>
                  <MaterialIcons
                    name={getAlertIcon()}
                    size={32}
                    color={getIconColor()}
                  />
                </View>

                {/* Title */}
                {title && <Text style={styles.title}>{title}</Text>}

                {/* Message */}
                <Text style={styles.message}>{message}</Text>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                  {finalButtons.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.button,
                        button.style === "cancel" && styles.cancelButton,
                        button.style === "destructive" &&
                          styles.destructiveButton,
                        finalButtons.length === 1 && styles.singleButton,
                        index === 0 &&
                          finalButtons.length > 1 &&
                          styles.firstButton,
                        index === finalButtons.length - 1 &&
                          finalButtons.length > 1 &&
                          styles.lastButton,
                      ]}
                      onPress={() => handleButtonPress(button)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          button.style === "cancel" && styles.cancelButtonText,
                          button.style === "destructive" &&
                            styles.destructiveButtonText,
                        ]}
                      >
                        {button.text}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Close button */}
                {showCloseButton && onDismiss && (
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onDismiss}
                  >
                    <MaterialIcons
                      name="close"
                      size={20}
                      color={currentTheme.textSecondary}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const createStyles = (theme: ThemeColors, type: AlertType) => {
  const getAccentColor = (): string => {
    switch (type) {
      case "success":
        return theme.success;
      case "error":
        return theme.error;
      case "warning":
        return theme.warning;
      case "info":
      default:
        return theme.info;
    }
  };

  const getIconBackgroundColor = (): string => {
    switch (type) {
      case "success":
        return `${theme.success}15`;
      case "error":
        return `${theme.error}15`;
      case "warning":
        return `${theme.warning}15`;
      case "info":
      default:
        return `${theme.info}15`;
    }
  };

  return StyleSheet.create({
    backdrop: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    alertContainer: {
      width: Dimensions.get("window").width * 0.85,
      maxWidth: 400,
    },
    alertContent: {
      backgroundColor: theme.dialogueBg,
      borderRadius: 20,
      padding: 24,
      alignItems: "center",
      shadowColor: theme.shadow,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 10,
    },
    iconContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: getIconBackgroundColor(),
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.text,
      textAlign: "center",
      marginBottom: 8,
    },
    message: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 22,
      marginBottom: 24,
    },
    buttonContainer: {
      flexDirection: "row",
      width: "100%",
      gap: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 14,
      paddingHorizontal: 20,
      backgroundColor: getAccentColor(),
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    singleButton: {
      flex: 1,
    },
    firstButton: {
      marginRight: 6,
    },
    lastButton: {
      marginLeft: 6,
    },
    cancelButton: {
      backgroundColor: theme.border,
    },
    destructiveButton: {
      backgroundColor: theme.error,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.textOnPrimary,
    },
    cancelButtonText: {
      color: theme.text,
    },
    destructiveButtonText: {
      color: theme.textOnPrimary,
    },
    closeButton: {
      position: "absolute",
      top: 16,
      right: 16,
      padding: 8,
      borderRadius: 20,
      backgroundColor: `${theme.textSecondary}10`,
    },
  });
};

export default AlertComponent;
