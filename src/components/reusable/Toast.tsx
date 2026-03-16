import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useCallback, useEffect } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/theme';
import { ThemeColors } from '@/theme/theme';

interface ToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onHide?: () => void;
  position?: 'top' | 'bottom';
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'info',
  duration = 3000,
  onHide,
  position = 'top',
}) => {
  const { currentTheme } = useTheme();
  const styles = createStyles(currentTheme);
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  const handleHide = useCallback(() => {
    if (onHide) {
      // Use setTimeout to avoid scheduling during render
      setTimeout(() => {
        onHide();
      }, 0);
    }
  }, [onHide]);

  useEffect(() => {
    if (visible) {
      // Start animation immediately
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        handleHide();
      });
    } else {
      // Reset animation value when not visible
      slideAnim.setValue(0);
    }
  }, [visible, duration, slideAnim, handleHide]);

  const getIcon = (): keyof typeof MaterialIcons.glyphMap => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  const getToastStyle = () => {
    switch (type) {
      case 'success':
        return styles.successToast;
      case 'error':
        return styles.errorToast;
      case 'warning':
        return styles.warningToast;
      default:
        return styles.infoToast;
    }
  };

  if (!visible) return null;

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: position === 'top' ? [-100, 0] : [100, 0],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        position === 'top' ? styles.topContainer : styles.bottomContainer,
        { transform: [{ translateY }] },
      ]}
    >
      <View style={[styles.toast, getToastStyle()]}>
        <MaterialIcons name={getIcon()} size={24} color="#FFFFFF" />
        <Text style={styles.message}>{message}</Text>
        {onHide && (
          <TouchableOpacity onPress={onHide} style={styles.closeButton}>
            <MaterialIcons name="close" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

// Hook for Toast
export const useToast = () => {
  const [toastConfig, setToastConfig] = React.useState<{
    visible: boolean;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    position?: 'top' | 'bottom';
  }>({
    visible: false,
    message: '',
  });

  const showToast = React.useCallback(
    (config: {
      message: string;
      type?: 'success' | 'error' | 'warning' | 'info';
      duration?: number;
      position?: 'top' | 'bottom';
    }) => {
      // Use setTimeout to avoid scheduling updates during render
      setTimeout(() => {
        setToastConfig({
          ...config,
          visible: true,
        });
      }, 0);
    },
    [],
  );

  const hideToast = React.useCallback(() => {
    setToastConfig((prev) => ({ ...prev, visible: false }));
  }, []);

  const ToastComponent = React.useCallback(
    () => <Toast {...toastConfig} onHide={hideToast} />,
    [toastConfig, hideToast],
  );

  return {
    showToast,
    hideToast,
    ToastComponent,
  };
};

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      left: 16,
      right: 16,
      zIndex: 9999,
    },
    topContainer: {
      top: 60,
    },
    bottomContainer: {
      bottom: 100,
    },
    toast: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderRadius: 12,
      shadowColor: theme.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    successToast: {
      backgroundColor: theme.success,
    },
    errorToast: {
      backgroundColor: theme.error,
    },
    warningToast: {
      backgroundColor: theme.warning,
    },
    infoToast: {
      backgroundColor: theme.info,
    },
    message: {
      flex: 1,
      color: theme.textOnPrimary,
      fontSize: 16,
      fontWeight: '500',
      marginLeft: 12,
    },
    closeButton: {
      padding: 4,
      marginLeft: 8,
    },
  });

export default Toast;
