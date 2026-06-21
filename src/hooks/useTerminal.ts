import { useState, useCallback } from 'react';
import type { TerminalLine, TerminalState } from '../types';
import { parseCommand } from '../utils/commandParser';
import { getCommand, hasCommand } from '../commands';

// Generate unique ID
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Create a terminal line
const createLine = (
  type: TerminalLine['type'],
  content: TerminalLine['content']
): TerminalLine => ({
  id: generateId(),
  type,
  content,
  timestamp: Date.now(),
});

export interface UseTerminalReturn {
  state: TerminalState;
  currentInput: string;
  setCurrentInput: (input: string) => void;
  executeCommand: (input: string) => void;
  addOutput: (content: TerminalLine['content'], type?: TerminalLine['type']) => void;
  clearHistory: () => void;
  navigateHistory: (direction: 'up' | 'down') => void;
}

export function useTerminal(welcomeMessage?: TerminalLine['content']): UseTerminalReturn {
  const [state, setState] = useState<TerminalState>(() => {
    const initialHistory: TerminalLine[] = [];

    // Add welcome message if provided
    if (welcomeMessage) {
      initialHistory.push(createLine('welcome', welcomeMessage));
    }

    return {
      history: initialHistory,
      currentInput: '',
      commandHistory: [],
      historyIndex: -1,
      isAnimating: false,
    };
  });

  const setCurrentInput = useCallback((input: string) => {
    setState(prev => ({
      ...prev,
      currentInput: input,
      historyIndex: -1, // Reset history navigation when typing
    }));
  }, []);

  const addOutput = useCallback(
    (content: TerminalLine['content'], type: TerminalLine['type'] = 'output') => {
      setState(prev => ({
        ...prev,
        history: [...prev.history, createLine(type, content)],
      }));
    },
    []
  );

  const clearHistory = useCallback(() => {
    setState(prev => ({
      ...prev,
      history: [],
    }));
  }, []);

  const executeCommand = useCallback((input: string) => {
    const trimmedInput = input.trim();

    // Add the input line to history
    if (trimmedInput) {
      setState(prev => ({
        ...prev,
        history: [...prev.history, createLine('input', trimmedInput)],
        commandHistory: [trimmedInput, ...prev.commandHistory.slice(0, 49)], // Keep last 50 commands
        currentInput: '',
        historyIndex: -1,
      }));
    }

    // Parse the command
    const parsed = parseCommand(trimmedInput);

    // Empty input - just add new prompt
    if (!parsed) {
      return;
    }

    // Check if command exists
    if (!hasCommand(parsed.command)) {
      setState(prev => ({
        ...prev,
        history: [
          ...prev.history,
          createLine(
            'error',
            `Command not found: ${parsed.command}. Type /help for available commands.`
          ),
        ],
      }));
      return;
    }

    // Execute the command
    const command = getCommand(parsed.command);
    if (command) {
      try {
        const output = command.execute(parsed.args);

        if (typeof output === 'string' && output.length === 0) {
          return;
        }

        setState(prev => ({
          ...prev,
          history: [...prev.history, createLine('output', output)],
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            createLine('error', `Error executing command: ${error}`),
          ],
        }));
      }
    }
  }, []);

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    setState(prev => {
      const { commandHistory, historyIndex } = prev;

      if (commandHistory.length === 0) {
        return prev;
      }

      let newIndex: number;

      if (direction === 'up') {
        // Move up in history (to older commands)
        newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      } else {
        // Move down in history (to newer commands)
        newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
      }

      return {
        ...prev,
        historyIndex: newIndex,
        currentInput: newIndex >= 0 ? commandHistory[newIndex] : '',
      };
    });
  }, []);

  return {
    state,
    currentInput: state.currentInput,
    setCurrentInput,
    executeCommand,
    addOutput,
    clearHistory,
    navigateHistory,
  };
}

export default useTerminal;
