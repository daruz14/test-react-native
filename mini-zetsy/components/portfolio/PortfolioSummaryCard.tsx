import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { formatCurrency, formatPercent } from '@/utils/formatters';
import { getPLColor } from '@/utils/colors';

interface PortfolioSummaryCardProps {
  totalValue: number;
  totalPL: number;
  totalPLPercent: number;
  intradayChange: number;
  intradayChangePercent: number;
  isLoading: boolean;
}

export const PortfolioSummaryCard = React.memo(function PortfolioSummaryCard({
  totalValue,
  totalPL,
  totalPLPercent,
  intradayChange,
  intradayChangePercent,
  isLoading,
}: PortfolioSummaryCardProps) {
  const theme = useColorScheme() ?? 'light';

  if (isLoading) {
    return (
      <ThemedView style={styles.card}>
        <ThemedText>Loading portfolio...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.card}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Portfolio Value
        </ThemedText>
      </View>

      <View style={styles.valueSection}>
        <ThemedText type="title" style={styles.totalValue}>
          {formatCurrency(totalValue)}
        </ThemedText>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <ThemedText style={styles.metricLabel}>Total P&L</ThemedText>
          <ThemedText style={[styles.metricValue, { color: getPLColor(totalPL, theme) }]}>
            {formatCurrency(totalPL)}
          </ThemedText>
          <ThemedText style={[styles.metricPercent, { color: getPLColor(totalPL, theme) }]}>
            {formatPercent(totalPLPercent)}
          </ThemedText>
        </View>

        <View style={styles.metric}>
          <ThemedText style={styles.metricLabel}>Today</ThemedText>
          <ThemedText style={[styles.metricValue, { color: getPLColor(intradayChange, theme) }]}>
            {formatCurrency(intradayChange)}
          </ThemedText>
          <ThemedText style={[styles.metricPercent, { color: getPLColor(intradayChange, theme) }]}>
            {formatPercent(intradayChangePercent)}
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
});

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  valueSection: {
    marginBottom: 20,
  },
  totalValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricPercent: {
    fontSize: 14,
  },
});