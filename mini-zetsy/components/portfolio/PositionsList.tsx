import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Position } from '@/types/portafolio';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { formatCurrency, formatPercent, formatShares } from '@/utils/formatters';
import { getPLColor } from '@/utils/colors';

interface PositionsListProps {
  positions: Position[];
  isLoading: boolean;
}

export const PositionsList = React.memo(function PositionsList({ positions, isLoading }: PositionsListProps) {
  const theme = useColorScheme() ?? 'light';

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading positions...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle">Positions</ThemedText>
        <ThemedText style={styles.positionCount}>
          {positions.length} position{positions.length !== 1 ? 's' : ''}
        </ThemedText>
      </View>

      <View style={styles.listContainer}>
        {positions.map((position) => (
          <TouchableOpacity key={position.ticker}>
            <ThemedView style={styles.positionCard}>
              <View style={styles.positionHeader}>
                <View style={styles.tickerSection}>
                  <ThemedText type="defaultSemiBold" style={styles.ticker}>
                    {position.ticker}
                  </ThemedText>
                  <ThemedText style={styles.quantity}>
                    {formatShares(position.quantity)}
                  </ThemedText>
                </View>

                <View style={styles.priceSection}>
                  <ThemedText style={styles.currentPrice}>
                    {formatCurrency(position.currentPrice)}
                  </ThemedText>
                  <ThemedText style={styles.avgPrice}>
                    Avg: {formatCurrency(position.averagePrice)}
                  </ThemedText>
                </View>
              </View>

              <View style={styles.positionMetrics}>
                <View style={styles.metricRow}>
                  <ThemedText style={styles.metricLabel}>Market Value:</ThemedText>
                  <ThemedText style={styles.metricValue}>
                    {formatCurrency(position.marketValue)}
                  </ThemedText>
                </View>

                <View style={styles.metricRow}>
                  <ThemedText style={styles.metricLabel}>P&L:</ThemedText>
                  <ThemedText style={[styles.metricValue, { color: getPLColor(position.unrealizedPL, theme) }]}>
                    {formatCurrency(position.unrealizedPL)} ({formatPercent(position.unrealizedPLPercent)})
                  </ThemedText>
                </View>

                <View style={styles.metricRow}>
                  <ThemedText style={styles.metricLabel}>Portfolio Weight:</ThemedText>
                  <ThemedText style={styles.metricValue}>
                    {formatPercent(position.portfolioWeight)}
                  </ThemedText>
                </View>
              </View>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </View>
    </ThemedView>
  );
});


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  positionCount: {
    opacity: 0.7,
    fontSize: 14,
  },
  listContainer: {
    paddingBottom: 20,
  },
  positionCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  positionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tickerSection: {
    flex: 1,
  },
  ticker: {
    fontSize: 18,
    fontWeight: '700',
  },
  quantity: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  avgPrice: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  },
  positionMetrics: {
    gap: 8,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    opacity: 0.8,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '500',
  },
});