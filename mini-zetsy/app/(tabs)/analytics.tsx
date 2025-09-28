import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { usePortfolioFilters, FilterConfig } from '@/hooks/usePortfolioFilters';
import { PositionsList } from '@/components/portfolio/PositionsList';
import { SearchAndRangeFilters } from '@/components/ui/SearchAndRangeFilters';
import { SortButtons } from '@/components/ui/SortButtons';
import { FilterStats } from '@/components/ui/FilterStats';

const DEFAULT_FILTERS: FilterConfig = {
  searchTicker: '',
  plRangeMin: null,
  plRangeMax: null,
  sortBy: 'pl',
  sortOrder: 'desc',
};

export default function Analytics() {
  const insets = useSafeAreaInsets();
  const { state } = usePortfolio();

  const [filters, setFilters] = useState<FilterConfig>({
    searchTicker: '',
    plRangeMin: null,
    plRangeMax: null,
    sortBy: 'pl',
    sortOrder: 'desc',
  });

  const { filteredPositions, stats } = usePortfolioFilters({
    positions: state.positions,
    filters,
  });

  const updateFilter = useCallback((key: keyof FilterConfig, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  if (state.error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.errorContainer}>
          <ThemedText type="title" style={styles.errorTitle}>
            Connection Error
          </ThemedText>
          <ThemedText style={styles.errorMessage}>
            {state.error}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <ThemedText type="title">Portfolio Analytics</ThemedText>
          <ThemedText style={styles.subtitle}>
            Filter and analyze your positions
          </ThemedText>
        </View>

        <ThemedView style={styles.filtersSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Filters & Search
          </ThemedText>

          <SearchAndRangeFilters
            filters={filters}
            onUpdateFilter={updateFilter}
          />

          <SortButtons
            filters={filters}
            onUpdateFilter={updateFilter}
          />
        </ThemedView>

        <ThemedView style={styles.resultsSection}>
          <View style={styles.resultsHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Results
            </ThemedText>

            <FilterStats
              totalCount={stats.total}
              filteredCount={stats.filtered}
              hasFilters={stats.hasFilters}
              onClearFilters={stats.hasFilters ? clearFilters : undefined}
            />
          </View>

          <PositionsList
            positions={filteredPositions}
            isLoading={state.isLoading}
          />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#EF4444',
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: 16,
  },
  header: {
    padding: 20,
    paddingBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  filtersSection: {
    padding: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    gap: 20,
  },
  resultsSection: {
    flex: 1,
    paddingTop: 16,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    marginBottom: 8,
  },
});
