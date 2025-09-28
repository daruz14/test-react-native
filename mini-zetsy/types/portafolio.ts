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

export interface IntradayTick {
  timestamp: number;
  price: number;
}

export interface Position {
  ticker: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  marketValue: number;
  totalCost: number;
  unrealizedPL: number;
  unrealizedPLPercent: number;
  portfolioWeight: number;
  lastUpdate: number;
}

export interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  totalPL: number;
  totalPLPercent: number;
  intradayChange: number;
  intradayChangePercent: number;
  lastUpdate: number;
}

export interface TickerData {
  symbol: string;
  currentPrice: number;
  previousPrice?: number;
  history: HistoryData[];
  intradayTicks: IntradayTick[];
  lastUpdate: number;
}

export interface PortfolioState {
  positions: Position[];
  summary: PortfolioSummary;
  tickersData: Record<string, TickerData>;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Position {
  ticker: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  marketValue: number;
  totalCost: number;
  unrealizedPL: number;
  unrealizedPLPercent: number;
  portfolioWeight: number;
  lastUpdate: number;
}

export interface TickerData {
  symbol: string;
  currentPrice: number;
  previousPrice?: number;
  history: HistoryData[];
  intradayTicks: IntradayTick[];
  lastUpdate: number;
}