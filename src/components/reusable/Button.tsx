/* eslint-disable import/order */
import { Shadows, useTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconColor?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title = '',
  onPress,
  variant = 'gradient',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  iconColor,
  fullWidth = true,
  // eslint-disable-next-line complexity
}) => {
  const { currentTheme } = useTheme();

  const getButtonShadow = () => ({
    ...Shadows.md,
    shadowColor: currentTheme.primaryDark, // Use theme's primaryDark for shadow color
  });

  const getButtonStyle = () => {
    const baseStyle: any[] = [styles.button, styles[size]];

    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }

    switch (variant) {
      case 'primary':
        baseStyle.push({
          backgroundColor: currentTheme.primary,
        });
        break;
      case 'secondary':
        baseStyle.push({
          backgroundColor: currentTheme.surface,
          borderWidth: 1,
          borderColor: currentTheme.border,
        });
        break;
      case 'outline':
        baseStyle.push({
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: currentTheme.primary,
        });
        break;
    }

    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    }

    return baseStyle;
  };

  const getTextColor = () => {
    if (disabled || loading) {
      return currentTheme.textSecondary;
    }

    switch (variant) {
      case 'gradient':
      case 'primary':
        return currentTheme.textOnPrimary;
      case 'secondary':
        return currentTheme.text;
      case 'outline':
        return currentTheme.primary;
      default:
        return currentTheme.text;
    }
  };

  const getIconColor = () => iconColor || getTextColor();

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator size="small" color={getTextColor()} style={styles.loadingIndicator} />
      );
    }

    const textElement = (
      <Text style={[styles.text, styles[`${size}Text`], { color: getTextColor() }, textStyle]}>
        {title}
      </Text>
    );

    const iconElement = icon ? (
      <Ionicons
        name={icon}
        size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
        color={getIconColor()}
        style={iconPosition === 'left' ? styles.iconLeft : styles.iconRight}
      />
    ) : null;

    if (iconPosition === 'left') {
      return (
        <>
          {iconElement}
          {textElement}
        </>
      );
    } else {
      return (
        <>
          {textElement}
          {iconElement}
        </>
      );
    }
  };

  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        style={[!(disabled || loading) && getButtonShadow(), style]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={
            disabled || loading
              ? [currentTheme.disabled, currentTheme.disabled]
              : (currentTheme.gradientPrimary as [string, string])
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.button,
            styles[size],
            fullWidth && styles.fullWidth,
            (disabled || loading) && styles.disabled,
          ]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  fullWidth: {
    width: '100%',
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 0,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    minHeight: 50,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 56,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  loadingIndicator: {
    marginHorizontal: 8,
  },
});
