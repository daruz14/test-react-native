import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FilterConfig } from '@/hooks/usePortfolioFilters';

interface SortButtonsProps {
  filters: FilterConfig;
  onUpdateFilter: (key: keyof FilterConfig, value: any) => void;
}

interface SortOption {
  key: FilterConfig['sortBy'];
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { key: 'pl', label: 'P&L %' },
  { key: 'weight', label: 'Weight' },
  { key: 'value', label: 'Value' },
  { key: 'ticker', label: 'Ticker' },
];

export const SortButtons = React.memo(function SortButtons({
  filters,
  onUpdateFilter,
}: SortButtonsProps) {
  const theme = useColorScheme() ?? 'light';

  const handleSortPress = (sortBy: FilterConfig['sortBy']) => {
    if (filters.sortBy === sortBy) {
      onUpdateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onUpdateFilter('sortBy', sortBy);
      onUpdateFilter('sortOrder', 'desc');
    }
  };

  const renderSortButton = ({ key, label }: SortOption) => {
    const isActive = filters.sortBy === key;
    const sortIcon = isActive ? (filters.sortOrder === 'asc' ? '↑' : '↓') : '';

    return (
      <TouchableOpacity
        key={key}
        style={[
          styles.sortButton,
          isActive && {
            backgroundColor: theme === 'light'
              ? 'rgba(10, 126, 164, 0.1)'
              : 'rgba(59, 130, 246, 0.2)',
            borderColor: theme === 'light' ? Colors.light.tint : Colors.dark.tint,
          },
          !isActive && {
            borderColor: theme === 'light'
              ? 'rgba(0, 0, 0, 0.1)'
              : 'rgba(255, 255, 255, 0.2)',
          }
        ]}
        onPress={() => handleSortPress(key)}
        activeOpacity={0.7}
      >
        <ThemedText
          style={[
            styles.sortButtonText,
            isActive && {
              color: theme === 'light' ? Colors.light.tint : Colors.dark.tint,
              fontWeight: '600',
            }
          ]}
        >
          {label} {sortIcon}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>Sort by</ThemedText>
      <View style={styles.buttonsContainer}>
        {SORT_OPTIONS.map(renderSortButton)}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});