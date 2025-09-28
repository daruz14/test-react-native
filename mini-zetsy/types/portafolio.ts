export interface HistoryData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface WebSocketMessage {
  type: 'history' | 'tick';
  ticker?: string;
  price?: number;
  ts?: number;
  range?: string;
  data?: Record<string, HistoryData[]>;
}