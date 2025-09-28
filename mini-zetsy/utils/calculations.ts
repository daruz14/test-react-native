import { Position } from '@/types/portafolio';

const sortComparators = {
  ticker: (a: Position, b: Position) => a.ticker.localeCompare(b.ticker),
  pl: (a: Position, b: Position) => b.unrealizedPLPercent - a.unrealizedPLPercent,
  weight: (a: Position, b: Position) => b.portfolioWeight - a.portfolioWeight,
  value: (a: Position, b: Position) => b.marketValue - a.marketValue,
};

export const sortPositions = (positions: Position[], sortBy: 'ticker' | 'pl' | 'weight' | 'value'): Position[] => {
  const comparator = sortComparators[sortBy];
  return comparator ? [...positions].sort(comparator) : positions;
};