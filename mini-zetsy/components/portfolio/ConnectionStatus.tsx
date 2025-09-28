import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ConnectionStatusProps {
  isConnected: boolean;
  isLoading: boolean;
}

export function ConnectionStatus({ isConnected, isLoading }: ConnectionStatusProps) {
  const theme = useColorScheme() ?? 'light';

  const getStatusColor = () => {
    if (isLoading) return '#F59E0B'; // amber
    return isConnected ? '#10B981' : '#EF4444'; // green or red
  };

  const getStatusText = () => {
    if (isLoading) return 'Connecting...';
    return isConnected ? 'Live' : 'Disconnected';
  };

  return (
    <View style={styles.container}>
      <View style={[styles.indicator, { backgroundColor: getStatusColor() }]} />
      <ThemedText style={styles.text}>{getStatusText()}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'flex-end',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});