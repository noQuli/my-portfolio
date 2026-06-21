import { useState, useCallback } from 'react';

export interface UseCommandHistoryReturn {
  history: string[];
  index: number;
  addToHistory: (command: string) => void;
  navigateUp: () => string | null;
  navigateDown: () => string | null;
  reset: () => void;
}

export function useCommandHistory(maxHistory: number = 50): UseCommandHistoryReturn {
  const [history, setHistory] = useState<string[]>([]);
  const [index, setIndex] = useState(-1);

  const addToHistory = useCallback((command: string) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    setHistory(prev => {
      // Don't add duplicate consecutive commands
      if (prev[0] === trimmed) {
        return prev;
      }
      return [trimmed, ...prev.slice(0, maxHistory - 1)];
    });
    setIndex(-1);
  }, [maxHistory]);

  const navigateUp = useCallback((): string | null => {
    if (history.length === 0) return null;

    const newIndex = index < history.length - 1 ? index + 1 : index;
    setIndex(newIndex);
    return history[newIndex] ?? null;
  }, [history, index]);

  const navigateDown = useCallback((): string | null => {
    if (index <= 0) {
      setIndex(-1);
      return '';
    }

    const newIndex = index - 1;
    setIndex(newIndex);
    return history[newIndex] ?? null;
  }, [history, index]);

  const reset = useCallback(() => {
    setIndex(-1);
  }, []);

  return {
    history,
    index,
    addToHistory,
    navigateUp,
    navigateDown,
    reset,
  };
}

export default useCommandHistory;
