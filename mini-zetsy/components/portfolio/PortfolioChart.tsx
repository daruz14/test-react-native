import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TickerData, Position } from '@/types/portafolio';
import { usePortfolioHistory } from '@/hooks/usePortfolioHistory';
import { useTimeRange } from '@/hooks/useTimeRange';
import { TimeRangeDropdown } from '@/components/ui/TimeRangeDropdown';
import { SimpleLineChart } from '@/components/ui/SimpleLineChart';

interface PortfolioChartProps {
  tickersData: Record<string, TickerData>;
  positions: Position[];
}

export function PortfolioChart({ tickersData, positions }: PortfolioChartProps) {
  const {
    selectedTimeRange,
    selectedOption,
    dropdownVisible,
    timeRangeOptions,
    openDropdown,
    closeDropdown,
    selectTimeRange,
  } = useTimeRange('1m');

  const { portfolioHistoryData, chartStats, isLoading, hasError } = usePortfolioHistory({
    tickersData,
    positions,
    timeRange: selectedTimeRange,
  });

  const hasValidPositions = positions.length > 0;

  if (!hasValidPositions) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Portfolio Performance</ThemedText>
        </View>
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyText}>No positions in portfolio</ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Portfolio Performance</ThemedText>
          <TimeRangeDropdown
            selectedOption={selectedOption}
            dropdownVisible={dropdownVisible}
            timeRangeOptions={timeRangeOptions}
            selectedTimeRange={selectedTimeRange}
            onOpenDropdown={openDropdown}
            onCloseDropdown={closeDropdown}
            onSelectTimeRange={selectTimeRange}
          />
        </View>
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyText}>Loading market data...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (hasError) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Portfolio Performance</ThemedText>
          <TimeRangeDropdown
            selectedOption={selectedOption}
            dropdownVisible={dropdownVisible}
            timeRangeOptions={timeRangeOptions}
            selectedTimeRange={selectedTimeRange}
            onOpenDropdown={openDropdown}
            onCloseDropdown={closeDropdown}
            onSelectTimeRange={selectTimeRange}
          />
        </View>
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyText}>Unable to load chart data</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle">Portfolio Performance</ThemedText>
        <TimeRangeDropdown
          selectedOption={selectedOption}
          dropdownVisible={dropdownVisible}
          timeRangeOptions={timeRangeOptions}
          selectedTimeRange={selectedTimeRange}
          onOpenDropdown={openDropdown}
          onCloseDropdown={closeDropdown}
          onSelectTimeRange={selectTimeRange}
        />
      </View>

      <SimpleLineChart
        data={portfolioHistoryData}
        stats={chartStats}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
});