import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FilterConfig } from '@/hooks/usePortfolioFilters';

interface SearchAndRangeFiltersProps {
  filters: FilterConfig;
  onUpdateFilter: (key: keyof FilterConfig, value: any) => void;
}

export const SearchAndRangeFilters = React.memo(function SearchAndRangeFilters({
  filters,
  onUpdateFilter,
}: SearchAndRangeFiltersProps) {
  const theme = useColorScheme() ?? 'light';

  const inputStyle = [
    styles.input,
    {
      backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151',
      color: theme === 'light' ? Colors.light.text : Colors.dark.text,
    }
  ];

  const placeholderColor = theme === 'light' ? Colors.light.icon : Colors.dark.icon;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <ThemedText style={styles.label}>Search Ticker</ThemedText>
        <TextInput
          style={[inputStyle, styles.searchInput]}
          placeholder="Search ticker..."
          placeholderTextColor={placeholderColor}
          value={filters.searchTicker}
          onChangeText={(text) => onUpdateFilter('searchTicker', text)}
          autoCapitalize="characters"
          autoCorrect={false}
        />
      </View>

      <View style={styles.rangeContainer}>
        <ThemedText style={styles.label}>P&L Range (%)</ThemedText>
        <View style={styles.rangeInputs}>
          <TextInput
            style={[inputStyle, styles.rangeInput]}
            placeholder="Min"
            placeholderTextColor={placeholderColor}
            keyboardType="numeric"
            value={filters.plRangeMin?.toString() || ''}
            onChangeText={(text) => {
              const value = text.trim();
              onUpdateFilter('plRangeMin', value ? parseFloat(value) : null);
            }}
          />
          <ThemedText style={styles.rangeSeparator}>to</ThemedText>
          <TextInput
            style={[inputStyle, styles.rangeInput]}
            placeholder="Max"
            placeholderTextColor={placeholderColor}
            keyboardType="numeric"
            value={filters.plRangeMax?.toString() || ''}
            onChangeText={(text) => {
              const value = text.trim();
              onUpdateFilter('plRangeMax', value ? parseFloat(value) : null);
            }}
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  searchContainer: {
    gap: 8,
  },
  rangeContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  searchInput: {
    width: '100%',
  },
  rangeInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rangeInput: {
    flex: 1,
  },
  rangeSeparator: {
    fontSize: 14,
    opacity: 0.7,
  },
});