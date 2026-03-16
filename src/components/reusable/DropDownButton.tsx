import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Layout, ThemeColors, useTheme } from '@/theme';

interface MarketProps {
  value?: string;
  error?: string | null;
  onPress?: (event: GestureResponderEvent) => void;
  placeholder?: string;
}

const DropDownButton = ({ value, error, onPress, placeholder }: MarketProps) => {
  const { currentTheme } = useTheme();
  const styles = createStyles(currentTheme);

  return (
    <TouchableOpacity style={[styles.dropdown, error && styles.errorBorder]} onPress={onPress}>
      <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
        {value || placeholder}
      </Text>
      <Ionicons name="chevron-down" size={20} color={currentTheme.text} />
    </TouchableOpacity>
  );
};

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    dropdown: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      padding: Layout.screenPadding / 1.8,
      backgroundColor: theme.surface,
    },
    dropdownText: {
      fontSize: 16,
      color: theme.text,
      flex: 1,
    },
    placeholderText: {
      color: theme.textSecondary,
    },
    errorBorder: {
      borderColor: theme.error,
    },
  });

export default DropDownButton;
