export interface ChartData {
  date: string;
  value: number;
}

export interface ChartStats {
  minValue: number;
  maxValue: number;
  valueRange: number;
}

export type TimeRange = 'today' | '1w' | '1m' | '2m';

export interface TimeRangeOption {
  value: TimeRange;
  label: string;
}