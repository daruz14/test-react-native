import React from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ConnectionStatus } from '@/components/portfolio/ConnectionStatus';
import { PortfolioSummaryCard } from '@/components/portfolio/PortfolioSummaryCard';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { PositionsList } from '@/components/portfolio/PositionsList';

export default function HomeScreen() {
  const { state, connect } = usePortfolio();
  const insets = useSafeAreaInsets();

  const onRefresh = React.useCallback(() => {
    connect();
  }, [connect]);

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
          <ThemedText style={styles.errorHelp}>
            Make sure the WebSocket server is running on localhost:8081
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ConnectionStatus isConnected={state.isConnected} isLoading={state.isLoading} />
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={state.isLoading} onRefresh={onRefresh} />
        }
      >
        <PortfolioSummaryCard
          totalValue={state.summary.totalValue}
          totalPL={state.summary.totalPL}
          totalPLPercent={state.summary.totalPLPercent}
          intradayChange={state.summary.intradayChange}
          intradayChangePercent={state.summary.intradayChangePercent}
          isLoading={state.isLoading}
        />

        <PositionsList
          positions={state.positions}
          isLoading={state.isLoading}
        />
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
    marginBottom: 12,
    fontSize: 16,
  },
  errorHelp: {
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.7,
  },
});
