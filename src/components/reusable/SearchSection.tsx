import { ThemeColors, useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const { currentTheme } = useTheme();
  const styles = createStyles(currentTheme);

  const searchInputRef = useRef<TextInput | null>(null);

  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={20}
        color={currentTheme.textSecondary}
        style={styles.searchIcon}
      />
      <TextInput
        ref={searchInputRef}
        style={styles.searchInput}
        placeholder="Search options..."
        placeholderTextColor={currentTheme.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            setSearchQuery("");
            searchInputRef.current?.focus();
          }}
          style={styles.clearButton}
        >
          <Ionicons
            name="close-circle"
            size={20}
            color={currentTheme.textSecondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      marginHorizontal: 16,
      marginBottom: 8,
      height: 48,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
      height: "100%",
    },
    clearButton: {
      padding: 4,
      marginLeft: 8,
    },
  });

export default SearchSection;

// You must import createStyles from the parent file when using this component.
