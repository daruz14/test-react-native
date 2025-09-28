import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ChartData, ChartStats } from '@/types/chart';

interface SimpleLineChartProps {
  data: ChartData[];
  stats: ChartStats;
  width?: number;
  height?: number;
}

const { width: screenWidth } = Dimensions.get('window');
const defaultChartWidth = screenWidth - 120;
const defaultChartHeight = 200;

export const SimpleLineChart = React.memo(function SimpleLineChart({
  data,
  stats,
  width = defaultChartWidth,
  height = defaultChartHeight,
}: SimpleLineChartProps) {
  const theme = useColorScheme() ?? 'light';
  const { minValue, maxValue, valueRange } = stats;

  if (!data || !stats) {
    return (
      <View style={[styles.emptyChart, { width, height }]}>
        <ThemedText>Invalid chart data</ThemedText>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={[styles.emptyChart, { width, height }]}>
        <ThemedText>No data available</ThemedText>
      </View>
    );
  }

  const hasValidData = data.every(item =>
    typeof item.value === 'number' &&
    !isNaN(item.value) &&
    isFinite(item.value)
  );

  if (!hasValidData) {
    return (
      <View style={[styles.emptyChart, { width, height }]}>
        <ThemedText>Invalid data values</ThemedText>
      </View>
    );
  }

  const points = data.map((item, index) => {
    const x = data.length === 1
      ? width / 2
      : (index / (data.length - 1)) * width;
    const y = valueRange === 0
      ? height / 2
      : height - ((item.value - minValue) / valueRange) * height;
    return { x, y, value: item.value };
  });

  const gridLines = [0, 0.25, 0.5, 0.75, 1];
  const yAxisLabels = [maxValue, (maxValue + minValue) / 2, minValue];

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: theme === 'light' ? '#FAFAFA' : '#1F2937'
      }
    ]}>
      <View style={[
        styles.chartArea,
        {
          width,
          height,
          backgroundColor: theme === 'light' ? 'white' : '#111827',
          borderColor: theme === 'light' ? '#E2E8F0' : '#374151'
        }
      ]}>
        {gridLines.map((ratio, index) => (
          <View
            key={index}
            style={[
              styles.gridLine,
              {
                top: ratio * height,
                backgroundColor: theme === 'light' ? '#E5E5E5' : '#374151'
              }
            ]}
          />
        ))}

        {points.map((point, index) => (
          <View
            key={index}
            style={[
              styles.dataPoint,
              {
                left: point.x - 2,
                top: point.y - 2,
                backgroundColor: theme === 'light' ? Colors.light.tint : Colors.dark.tint
              }
            ]}
          />
        ))}

        {points.slice(1).map((point, index) => {
          const prevPoint = points[index];
          const distance = Math.sqrt(
            Math.pow(point.x - prevPoint.x, 2) + Math.pow(point.y - prevPoint.y, 2)
          );
          const angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x);

          return (
            <View
              key={index}
              style={[
                styles.line,
                {
                  left: prevPoint.x,
                  top: prevPoint.y,
                  width: distance,
                  transform: [{ rotate: `${angle}rad` }],
                  backgroundColor: theme === 'light' ? Colors.light.tint : Colors.dark.tint
                }
              ]}
            />
          );
        })}
      </View>

      <View style={[styles.yAxisLabels, { height }]}>
        {yAxisLabels.map((value, index) => (
          <ThemedText key={index} style={styles.axisLabel}>
            ${(value / 1000).toFixed(0)}K
          </ThemedText>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  chartArea: {
    position: 'relative',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
  },
  dataPoint: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  line: {
    position: 'absolute',
    height: 2,
    transformOrigin: 'left center',
  },
  yAxisLabels: {
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 4,
    minWidth: 40,
    maxWidth: 50,
  },
  axisLabel: {
    fontSize: 10,
    opacity: 0.7,
    textAlign: 'right',
  },
  emptyChart: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
});