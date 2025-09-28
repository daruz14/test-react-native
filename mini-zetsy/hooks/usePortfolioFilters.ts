import { useMemo } from 'react';
import { Position } from '@/types/portafolio';
import { sortPositions } from '@/utils/calculations';

export interface FilterConfig {
  searchTicker: string;
  plRangeMin: number | null;
  plRangeMax: number | null;
  sortBy: 'ticker' | 'pl' | 'weight' | 'value';
  sortOrder: 'asc' | 'desc';
}

export interface UsePortfolioFiltersProps {
  positions: Position[];
  filters: FilterConfig;
}

export function usePortfolioFilters({ positions, filters }: UsePortfolioFiltersProps) {
  const filteredAndSortedPositions = useMemo(() => {
    let filtered = [...positions];

    if (filters.searchTicker.trim()) {
      const searchTerm = filters.searchTicker.toLowerCase().trim();
      filtered = filtered.filter(position =>
        position.ticker.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.plRangeMin !== null) {
      filtered = filtered.filter(position =>
        position.unrealizedPLPercent >= filters.plRangeMin!
      );
    }

    if (filters.plRangeMax !== null) {
      filtered = filtered.filter(position =>
        position.unrealizedPLPercent <= filters.plRangeMax!
      );
    }

    let sorted = sortPositions(filtered, filters.sortBy);

    if (filters.sortOrder === 'asc') {
      sorted = sorted.reverse();
    }

    return sorted;
  }, [positions, filters]);

  const stats = useMemo(() => ({
    total: positions.length,
    filtered: filteredAndSortedPositions.length,
    hasFilters: !!(
      filters.searchTicker.trim() ||
      filters.plRangeMin !== null ||
      filters.plRangeMax !== null
    ),
  }), [positions.length, filteredAndSortedPositions.length, filters]);

  return {
    filteredPositions: filteredAndSortedPositions,
    stats,
  };
}