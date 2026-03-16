import React from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import type { ActionSheetButton, ActionSheetProps } from '@/types/actionSheet';

export const ActionSheet: React.FC<ActionSheetProps> = ({
  visible,
  title,
  message,
  buttons,
  onDismiss,
}) => {
  const { currentTheme } = useTheme();
  const styles = createStyles(currentTheme);
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleButtonPress = (button: ActionSheetButton) => {
    if (button.onPress) {
      button.onPress();
    }
    if (onDismiss) {
      onDismiss();
    }
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0],
  });

  const opacity = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Separate cancel buttons from other buttons
  const cancelButtons = buttons.filter((btn) => btn.style === 'cancel');
  const otherButtons = buttons.filter((btn) => btn.style !== 'cancel');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onDismiss}
    >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <Animated.View style={[styles.backdrop, { opacity }]}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View style={[styles.actionSheetContainer, { transform: [{ translateY }] }]}>
              {/* Main action sheet */}
              <View style={styles.actionSheet}>
                {(title || message) && (
                  <View style={styles.header}>
                    {title && <Text style={styles.title}>{title}</Text>}
                    {message && <Text style={styles.message}>{message}</Text>}
                  </View>
                )}

                {otherButtons.map((button, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.button,
                      button.style === 'destructive' && styles.destructiveButton,
                      index === otherButtons.length - 1 && styles.lastButton,
                    ]}
                    onPress={() => handleButtonPress(button)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        button.style === 'destructive' && styles.destructiveButtonText,
                      ]}
                    >
                      {button.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Cancel buttons (separate section) */}
              {cancelButtons.length > 0 && (
                <View style={styles.cancelSection}>
                  {cancelButtons.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.cancelButton}
                      onPress={() => handleButtonPress(button)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.cancelButtonText}>{button.text}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Hook for Action Sheet
export const useActionSheet = () => {
  const [sheetConfig, setSheetConfig] = React.useState<{
    visible: boolean;
    title?: string;
    message?: string;
    buttons: ActionSheetButton[];
  }>({
    visible: false,
    buttons: [],
  });

  const showActionSheet = React.useCallback(
    (config: { title?: string; message?: string; buttons: ActionSheetButton[] }) => {
      // Schedule state update to avoid concurrent rendering issues
      setTimeout(() => {
        setSheetConfig({
          ...config,
          visible: true,
        });
      }, 0);
    },
    [],
  );

  const hideActionSheet = React.useCallback(() => {
    setSheetConfig((prev) => ({ ...prev, visible: false }));
  }, []);

  const ActionSheetComponent = React.useCallback(
    () => <ActionSheet {...sheetConfig} onDismiss={hideActionSheet} />,
    [sheetConfig, hideActionSheet],
  );

  return {
    showActionSheet,
    hideActionSheet,
    ActionSheetComponent,
  };
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    actionSheetContainer: {
      paddingHorizontal: 16,
      paddingBottom: 40, // Safe area for iOS
    },
    actionSheet: {
      backgroundColor: theme.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      marginBottom: 12,
      overflow: 'hidden',
      shadowColor: theme.shadow,
      shadowOffset: {
        width: 0,
        height: -4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 8,
    },
    header: {
      padding: 20,
      backgroundColor: theme.surfaceVariant,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderLight,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.text,
      textAlign: 'center',
      marginBottom: 6,
    },
    message: {
      fontSize: 15,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },
    button: {
      paddingVertical: 18,
      paddingHorizontal: 24,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderLight,
      backgroundColor: theme.surface,
    },
    lastButton: {
      borderBottomWidth: 0,
    },
    destructiveButton: {
      backgroundColor: `${theme.error}08`,
    },
    buttonText: {
      fontSize: 17,
      color: theme.text,
      textAlign: 'center',
      fontWeight: '600',
    },
    destructiveButtonText: {
      color: theme.error,
      fontWeight: '700',
    },
    cancelSection: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: theme.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
    cancelButton: {
      paddingVertical: 18,
      paddingHorizontal: 24,
      backgroundColor: theme.surfaceVariant,
    },
    cancelButtonText: {
      fontSize: 17,
      color: theme.primary,
      textAlign: 'center',
      fontWeight: '700',
    },
  });
