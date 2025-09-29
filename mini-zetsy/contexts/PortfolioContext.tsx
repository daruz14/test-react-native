import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef, ReactNode } from 'react';
import { WebSocketService } from '@/services/websocket';
import { HistoryData, PortfolioState, PortfolioSummary, Position, TickerData } from '@/types/portafolio';
import { mockPositions, calculatePosition } from '@/data/mockPortfolio';

interface PortfolioContextValue {
  state: PortfolioState;
  connect: () => void;
  disconnect: () => void;
}

const initialState: PortfolioState = {
  positions: [],
  summary: {
    totalValue: 0,
    totalCost: 0,
    totalPL: 0,
    totalPLPercent: 0,
    intradayChange: 0,
    intradayChangePercent: 0,
    lastUpdate: 0,
  },
  tickersData: {},
  isConnected: false,
  isLoading: true,
  error: null,
};

type PortfolioAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_HISTORY'; payload: Record<string, HistoryData[]> }
  | { type: 'UPDATE_TICKER_PRICE'; payload: { ticker: string; price: number; timestamp: number } };

function calculatePortfolioFromTickers(tickersData: Record<string, TickerData>): { positions: Position[]; summary: PortfolioSummary } {
  const positions: Position[] = [];
  let totalValue = 0;
  let totalCost = 0;

  // Calculate positions based on current prices
  mockPositions.forEach((mockPosition) => {
    const tickerData = tickersData[mockPosition.ticker];
    if (tickerData) {
      const position = calculatePosition(mockPosition, tickerData.currentPrice, 0);
      positions.push(position);
      totalValue += position.marketValue;
      totalCost += position.totalCost;
    }
  });

  // Update portfolio weights now that we have total value
  const updatedPositions = positions.map(position => ({
    ...position,
    portfolioWeight: totalValue > 0 ? (position.marketValue / totalValue) * 100 : 0,
  }));

  const totalPL = totalValue - totalCost;
  const totalPLPercent = totalCost > 0 ? (totalPL / totalCost) * 100 : 0;

  // Calculate intraday change
  let intradayChange = 0;
  updatedPositions.forEach(position => {
    const tickerData = tickersData[position.ticker];
    if (tickerData && tickerData.previousPrice) {
      const priceChange = tickerData.currentPrice - tickerData.previousPrice;
      intradayChange += priceChange * position.quantity;
    }
  });

  const intradayChangePercent = totalValue > 0 ? (intradayChange / (totalValue - intradayChange)) * 100 : 0;

  const summary: PortfolioSummary = {
    totalValue,
    totalCost,
    totalPL,
    totalPLPercent,
    intradayChange,
    intradayChangePercent,
    lastUpdate: Date.now(),
  };

  return { positions: updatedPositions, summary };
}

const handleSetLoading = (state: PortfolioState, payload: boolean): PortfolioState => ({
  ...state,
  isLoading: payload
});

const handleSetConnected = (state: PortfolioState, payload: boolean): PortfolioState => ({
  ...state,
  isConnected: payload
});

const handleSetError = (state: PortfolioState, payload: string | null): PortfolioState => ({
  ...state,
  error: payload,
  isLoading: false
});

const handleSetHistory = (state: PortfolioState, payload: Record<string, HistoryData[]>): PortfolioState => {
  const newTickersData: Record<string, TickerData> = {};

  Object.entries(payload).forEach(([ticker, history]) => {
    const latestData = history[history.length - 1];
    newTickersData[ticker] = {
      symbol: ticker,
      currentPrice: latestData.close,
      previousPrice: history[history.length - 2]?.close,
      history,
      intradayTicks: [],
      lastUpdate: Date.now(),
    };
  });

  const { positions, summary } = calculatePortfolioFromTickers(newTickersData);

  return {
    ...state,
    tickersData: newTickersData,
    positions,
    summary,
    isLoading: false,
  };
};

const handleUpdateTickerPrice = (
  state: PortfolioState,
  payload: { ticker: string; price: number; timestamp: number }
): PortfolioState => {
  const { ticker, price, timestamp } = payload;
  const currentTickerData = state.tickersData[ticker];

  if (!currentTickerData || currentTickerData.currentPrice === price) {
    return state;
  }

  // Add the new tick to intraday data
  const newTick = { timestamp, price };
  const updatedTicks = [...currentTickerData.intradayTicks, newTick].slice(-100);

  const updatedTickersData = {
    ...state.tickersData,
    [ticker]: {
      ...currentTickerData,
      previousPrice: currentTickerData.currentPrice,
      currentPrice: price,
      intradayTicks: updatedTicks,
      lastUpdate: timestamp,
    },
  };

  const { positions, summary } = calculatePortfolioFromTickers(updatedTickersData);

  return {
    ...state,
    tickersData: updatedTickersData,
    positions,
    summary,
  };
};

type actionHandlers = (state: PortfolioState, payload: any) => PortfolioState;

const portfolioActions: Record<string, actionHandlers> = {
  SET_LOADING: handleSetLoading,
  SET_CONNECTED: handleSetConnected,
  SET_ERROR: handleSetError,
  SET_HISTORY: handleSetHistory,
  UPDATE_TICKER_PRICE: handleUpdateTickerPrice,
}

function portfolioReducer(state: PortfolioState, action: PortfolioAction): PortfolioState {
  if (!(action.type in portfolioActions)) {
    return state;
  }

  const actionHandler = portfolioActions[action.type];
  const payload = action.payload || null;
  return actionHandler(state, payload);
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

interface PortfolioProviderProps {
  children: ReactNode;
}

export function PortfolioProvider({ children }: PortfolioProviderProps) {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);
  const wsService = useRef<WebSocketService | null>(null);

  const connect = useCallback(() => {
    if (!wsService.current) {
      wsService.current = new WebSocketService();

      wsService.current.on('connected', (connected: boolean) => {
        dispatch({ type: 'SET_CONNECTED', payload: connected });
      });

      wsService.current.on('error', (error: any) => {
        dispatch({ type: 'SET_ERROR', payload: error.message || 'WebSocket error' });
      });

      wsService.current.on('history', (data: Record<string, HistoryData[]>) => {
        dispatch({ type: 'SET_HISTORY', payload: data });
      });

      wsService.current.on('tick', (tickData: { ticker: string; price: number; timestamp: number }) => {
        dispatch({ type: 'UPDATE_TICKER_PRICE', payload: tickData });
      });
    }

    wsService.current.connect().catch((error) => {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    });
  }, []);

  const disconnect = useCallback(() => {
    if (wsService.current) {
      wsService.current.disconnect();
      wsService.current = null;
    }
    dispatch({ type: 'SET_CONNECTED', payload: false });
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  const value: PortfolioContextValue = {
    state,
    connect,
    disconnect,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}