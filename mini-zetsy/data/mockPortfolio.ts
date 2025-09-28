import { Position } from '@/types/portafolio';

// Mock positions with different tickers from the backend
export const mockPositions: Omit<Position, 'currentPrice' | 'marketValue' | 'unrealizedPL' | 'unrealizedPLPercent' | 'portfolioWeight' | 'lastUpdate'>[] = [
  {
    ticker: 'AAPL',
    quantity: 100,
    averagePrice: 150.25,
    totalCost: 15025
  },
  {
    ticker: 'NVDA',
    quantity: 50,
    averagePrice: 420.80,
    totalCost: 21040
  },
  {
    ticker: 'TSLA',
    quantity: 75,
    averagePrice: 185.50,
    totalCost: 13912.50
  },
  {
    ticker: 'AMZN',
    quantity: 25,
    averagePrice: 128.30,
    totalCost: 3207.50
  },
  {
    ticker: 'MSFT',
    quantity: 80,
    averagePrice: 305.40,
    totalCost: 24432
  },
  {
    ticker: 'GOOGL',
    quantity: 30,
    averagePrice: 138.75,
    totalCost: 4162.50
  },
  {
    ticker: 'META',
    quantity: 45,
    averagePrice: 275.60,
    totalCost: 12402
  },
  {
    ticker: 'AMD',
    quantity: 120,
    averagePrice: 95.25,
    totalCost: 11430
  },
  {
    ticker: 'COIN',
    quantity: 35,
    averagePrice: 68.90,
    totalCost: 2411.50
  },
  {
    ticker: 'DIS',
    quantity: 60,
    averagePrice: 92.15,
    totalCost: 5529
  }
];

export const calculatePosition = (
  position: Omit<Position, 'currentPrice' | 'marketValue' | 'unrealizedPL' | 'unrealizedPLPercent' | 'portfolioWeight' | 'lastUpdate'>,
  currentPrice: number,
  totalPortfolioValue: number
): Position => {
  const marketValue = position.quantity * currentPrice;
  const unrealizedPL = marketValue - position.totalCost;
  const unrealizedPLPercent = (unrealizedPL / position.totalCost) * 100;
  const portfolioWeight = (marketValue / totalPortfolioValue) * 100;

  return {
    ...position,
    currentPrice,
    marketValue,
    unrealizedPL,
    unrealizedPLPercent,
    portfolioWeight,
    lastUpdate: Date.now()
  };
};