import { useMemo } from 'react';
import { TickerData, Position } from '@/types/portafolio';
import { ChartData, TimeRange } from '@/types/chart';

interface UsePortfolioHistoryProps {
  tickersData: Record<string, TickerData>;
  positions: Position[];
  timeRange: TimeRange;
}

export function usePortfolioHistory({ tickersData, positions, timeRange }: UsePortfolioHistoryProps) {
  const portfolioHistoryData = useMemo(() => {
    try {
      if (!tickersData || positions.length === 0) return [];

      const firstTickerHistory = Object.values(tickersData)[0]?.history || [];
      if (firstTickerHistory.length === 0) return [];

      if (timeRange === 'today') {
        return calculateIntradayPortfolioHistory(tickersData, positions, firstTickerHistory);
      }

      return calculateHistoricalPortfolioHistory(tickersData, positions, firstTickerHistory, timeRange);
    } catch (error) {
      console.error('Error calculating portfolio history:', error);
      return [];
    }
  }, [tickersData, positions, timeRange]);

  const chartStats = useMemo(() => {
    try {
      if (portfolioHistoryData.length === 0) return { minValue: 0, maxValue: 0, valueRange: 0 };

      const values = portfolioHistoryData.map(d => d.value);
      const min = Math.min(...values);
      const max = Math.max(...values);

      return {
        minValue: min,
        maxValue: max,
        valueRange: max - min
      };
    } catch (error) {
      console.error('Error calculating chart stats:', error);
      return { minValue: 0, maxValue: 0, valueRange: 0 };
    }
  }, [portfolioHistoryData]);

  const isLoading = !tickersData || Object.keys(tickersData).length === 0;
  const hasError = portfolioHistoryData.length === 0 && positions.length > 0 && !isLoading;

  return {
    portfolioHistoryData,
    chartStats,
    isLoading,
    hasError
  };
}

function calculateIntradayPortfolioHistory(
  tickersData: UsePortfolioHistoryProps['tickersData'],
  positions: UsePortfolioHistoryProps['positions'],
  firstTickerHistory: Array<{ date: string; close: number; open?: number; high?: number; low?: number }>
): ChartData[] {
  // Collect all unique timestamps from intraday ticks
  const tickTimestamps = new Set<number>();
  positions.forEach(position => {
    const tickerData = tickersData[position.ticker];
    if (tickerData?.intradayTicks) {
      tickerData.intradayTicks.forEach(tick => tickTimestamps.add(tick.timestamp));
    }
  });

  const sortedTimestamps = Array.from(tickTimestamps).sort();

  // Fall back to recent days if insufficient intraday data
  if (sortedTimestamps.length < 5) {
    return calculateRecentDaysHistory(tickersData, positions, firstTickerHistory, 7);
  }

  // Calculate portfolio value at each timestamp
  return sortedTimestamps.map(timestamp => {
    let totalValue = 0;

    positions.forEach(position => {
      const tickerData = tickersData[position.ticker];
      if (tickerData) {
        const priceAtTime = findPriceAtTimestamp(tickerData.intradayTicks, timestamp, tickerData.currentPrice);
        totalValue += priceAtTime * position.quantity;
      }
    });

    return {
      date: new Date(timestamp).toISOString().slice(0, 10),
      value: totalValue
    };
  });
}

function calculateHistoricalPortfolioHistory(
  tickersData: UsePortfolioHistoryProps['tickersData'],
  positions: UsePortfolioHistoryProps['positions'],
  firstTickerHistory: Array<{ date: string; close: number; open?: number; high?: number; low?: number }>,
  timeRange: TimeRange
): ChartData[] {
  const daysToShow = getDaysForTimeRange(timeRange);
  const startIndex = Math.max(0, firstTickerHistory.length - daysToShow);

  const portfolioHistory: ChartData[] = [];

  for (let i = startIndex; i < firstTickerHistory.length; i++) {
    const date = firstTickerHistory[i].date;
    let totalValue = 0;

    positions.forEach(position => {
      const tickerHistory = tickersData[position.ticker]?.history;
      if (tickerHistory && tickerHistory[i]) {
        totalValue += tickerHistory[i].close * position.quantity;
      }
    });

    portfolioHistory.push({ date, value: totalValue });
  }

  return portfolioHistory;
}

function calculateRecentDaysHistory(
  tickersData: UsePortfolioHistoryProps['tickersData'],
  positions: UsePortfolioHistoryProps['positions'],
  firstTickerHistory: Array<{ date: string; close: number; open?: number; high?: number; low?: number }>,
  days: number
): ChartData[] {
  const recentDays = Math.min(days, firstTickerHistory.length);
  const startIdx = Math.max(0, firstTickerHistory.length - recentDays);
  const portfolioHistory: ChartData[] = [];

  for (let i = startIdx; i < firstTickerHistory.length; i++) {
    const date = firstTickerHistory[i].date;
    let totalValue = 0;

    positions.forEach(position => {
      const tickerHistory = tickersData[position.ticker]?.history;
      if (tickerHistory && tickerHistory[i]) {
        totalValue += tickerHistory[i].close * position.quantity;
      }
    });

    portfolioHistory.push({ date, value: totalValue });
  }

  return portfolioHistory;
}

function findPriceAtTimestamp(
  intradayTicks: Array<{ timestamp: number; price: number }>,
  timestamp: number,
  fallbackPrice: number
): number {
  for (let i = intradayTicks.length - 1; i >= 0; i--) {
    const tick = intradayTicks[i];
    if (tick.timestamp <= timestamp) {
      return tick.price;
    }
  }
  return fallbackPrice;
}

function getDaysForTimeRange(range: TimeRange): number {
  switch (range) {
    case '1w': return 7;
    case '1m': return 30;
    case '2m': return 60;
    default: return 30;
  }
}