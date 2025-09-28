import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface FilterStatsProps {
  totalCount: number;
  filteredCount: number;
  hasFilters: boolean;
  onClearFilters?: () => void;
}

export const FilterStats = React.memo(function FilterStats({
  totalCount,
  filteredCount,
  hasFilters,
  onClearFilters,
}: FilterStatsProps) {
  const theme = useColorScheme() ?? 'light';

  const showingAll = filteredCount === totalCount;
  const hasResults = filteredCount > 0;

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <ThemedText style={styles.statsText}>
          {showingAll ? (
            `Showing all ${totalCount} position${totalCount !== 1 ? 's' : ''}`
          ) : (
            `Showing ${filteredCount} of ${totalCount} position${totalCount !== 1 ? 's' : ''}`
          )}
        </ThemedText>

        {!hasResults && hasFilters && (
          <ThemedText style={[styles.noResultsText, { color: '#F59E0B' }]}>
            No positions match your filters
          </ThemedText>
        )}
      </View>

      {hasFilters && onClearFilters && (
        <TouchableOpacity
          style={[
            styles.clearButton,
            {
              borderColor: theme === 'light'
                ? 'rgba(239, 68, 68, 0.3)'
                : 'rgba(248, 113, 113, 0.3)',
            }
          ]}
          onPress={onClearFilters}
          activeOpacity={0.7}
        >
          <ThemedText
            style={[
              styles.clearButtonText,
              {
                color: theme === 'light' ? '#EF4444' : '#F87171',
              }
            ]}
          >
            Clear Filters
          </ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  statsContainer: {
    flex: 1,
  },
  statsText: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  noResultsText: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  clearButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
});