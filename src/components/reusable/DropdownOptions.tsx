import { ThemeColors, useThemeColors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetFlashList } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SearchSection from "./SearchSection";

interface OptionsProps<T> {
  data: T[];
  value?: T | null;
  placeholder?: string;
  label?: string;
  getOptionLabel: (option: T) => string;
  getOptionValue?: (option: T) => string | number;
  getKey?: (item: T, index: number) => string;
  onSelect: (value: T | null) => void;
  disabled?: boolean;
  searchable?: boolean;
  error?: string;
  multiple?: boolean;
  renderOption?: (option: T, isSelected: boolean) => React.ReactNode;
  noOptionsText?: string;
  maxHeight?: number;
}

export const DropdownOptions = <T extends unknown>({
  data,
  value,
  getOptionLabel,
  getOptionValue,
  getKey,
  onSelect,
  searchable = false,
  renderOption,
  noOptionsText = "No options available",
}: OptionsProps<T>) => {
  const colors = useThemeColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce searchQuery
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Filter data based on search text
  const filteredData = useMemo(() => {
    if (!searchable || !debouncedQuery.trim()) {
      return data;
    }
    return data.filter((item) =>
      getOptionLabel(item).toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [data, debouncedQuery, getOptionLabel, searchable]);

  // Check if option is selected
  const isSelected = useCallback(
    (option: T) => {
      if (!value) return false;
      if (getOptionValue) {
        return getOptionValue(option) === getOptionValue(value);
      }
      return getOptionLabel(option) === getOptionLabel(value);
    },
    [value, getOptionValue, getOptionLabel],
  );

  // Handle option selection
  const handleSelect = useCallback(
    (option: T) => {
      onSelect(option);
      setDebouncedQuery("");
      setSearchQuery("");
    },
    [onSelect],
  );

  // Render option item
  const renderOptionItem = useCallback(
    ({ item }: { item: T }) => {
      const selected = isSelected(item);

      if (renderOption) {
        return (
          <TouchableOpacity
            style={[styles.optionItem, { backgroundColor: colors.surface }]}
            onPress={() => handleSelect(item)}
          >
            {renderOption(item, selected)}
          </TouchableOpacity>
        );
      }

      return (
        <TouchableOpacity
          style={[
            styles.optionItem,
            { backgroundColor: colors.surface },
            selected && { backgroundColor: `${colors.primary}20` },
          ]}
          onPress={() => handleSelect(item)}
        >
          <Text
            style={[
              styles.optionText,
              { color: colors.text },
              selected && { color: colors.primary, fontWeight: "600" },
            ]}
          >
            {getOptionLabel(item)}
          </Text>
          {selected && (
            <Ionicons name="checkmark" size={20} color={colors.primary} />
          )}
        </TouchableOpacity>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colors, isSelected, handleSelect, renderOption, getOptionLabel],
  );

  const styles = createStyles(colors);

  return (
    <>
      {searchable && (
        <SearchSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
      <BottomSheetFlashList
        data={filteredData}
        keyExtractor={getKey}
        renderItem={renderOptionItem}
        estimatedItemSize={100}
        ListEmptyComponent={
          <Text style={styles.noResultsText}>{noOptionsText}</Text>
        }
        contentContainerStyle={styles.optionsListContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </>
  );
};

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    optionsListContainer: {
      backgroundColor: theme.surface,
    },
    optionItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 8,
      paddingHorizontal: 16,
      backgroundColor: "red",
    },
    separator: {
      height: 0.8,
      backgroundColor: theme.border,
      marginHorizontal: 8,
    },
    optionText: {
      fontSize: 16,
      color: theme.text,
      flex: 1,
    },
    noResultsText: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: "center",
    },
  });

export default DropdownOptions;
