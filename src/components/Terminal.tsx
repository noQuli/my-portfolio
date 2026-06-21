import React, { useRef, useEffect, useCallback } from 'react';
import useTerminal from '../hooks/useTerminal';
import useTheme from '../hooks/useTheme';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';
import { WelcomeBanner } from './AsciiArt';
import { completeCommand } from '../utils/tabCompletion';
import { getCommandNames } from '../commands';

// Import and register all commands
import '../commands/help';
import '../commands/aboutme';
import '../commands/projects';
import '../commands/portfolio';
import '../commands/cv';
import '../commands/contacts';
import '../commands/skills';
import '../commands/experience';
import '../commands/education';
import '../commands/socials';
import '../commands/theme';
import '../commands/clear';
import '../commands/whoami';
import '../commands/ascii';

export const Terminal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchMovedRef = useRef(false);
  const { theme, toggleTheme, setTheme } = useTheme();

  const {
    state,
    currentInput,
    setCurrentInput,
    executeCommand,
    clearHistory,
    navigateHistory,
  } = useTerminal();

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    });
  }, [state.history]);

  // Handle command side-effects triggered via custom events
  useEffect(() => {
    const handleClear = () => {
      clearHistory();
    };

    const handleThemeToggle = () => {
      toggleTheme();
    };

    const handleThemeSet = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: string }>;
      if (customEvent.detail?.theme) {
        setTheme(customEvent.detail.theme);
      }
    };

    window.addEventListener('terminal:clear', handleClear);
    window.addEventListener('terminal:toggle-theme', handleThemeToggle);
    window.addEventListener('terminal:set-theme', handleThemeSet);

    return () => {
      window.removeEventListener('terminal:clear', handleClear);
      window.removeEventListener('terminal:toggle-theme', handleThemeToggle);
      window.removeEventListener('terminal:set-theme', handleThemeSet);
    };
  }, [clearHistory, toggleTheme, setTheme]);

  const handleSubmit = useCallback((input: string) => {
    executeCommand(input);
  }, [executeCommand]);

  const handleHistoryUp = useCallback(() => {
    navigateHistory('up');
  }, [navigateHistory]);

  const handleHistoryDown = useCallback(() => {
    navigateHistory('down');
  }, [navigateHistory]);

  const handleTabComplete = useCallback(() => {
    const commandNames = getCommandNames();
    const completed = completeCommand(currentInput, commandNames);
    if (completed !== currentInput) {
      setCurrentInput(completed);
    }
  }, [currentInput, setCurrentInput]);

  const focusInput = useCallback(() => {
    containerRef.current?.querySelector<HTMLInputElement>('input')?.focus();
  }, []);

  const getInput = useCallback(
    () => containerRef.current?.querySelector<HTMLInputElement>('input') ?? null,
    []
  );

  const isInteractiveTarget = useCallback((target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    return Boolean(target.closest('input, textarea, select, button, a'));
  }, []);

  useEffect(() => {
    const isTouchPrimary = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchPrimary) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') {
        return;
      }

      const input = getInput();
      if (!input || input.disabled) {
        return;
      }

      const activeElement = document.activeElement;
      if (activeElement === input || isInteractiveTarget(activeElement)) {
        return;
      }

      event.preventDefault();
      input.focus();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [getInput, isInteractiveTarget]);

  const handleTerminalPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') {
      focusInput();
    }
  }, [focusInput]);

  const handleTerminalTouchStart = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch || isInteractiveTarget(event.target)) {
      touchStartRef.current = null;
      touchMovedRef.current = false;
      return;
    }

    const input = getInput();
    if (document.activeElement === input) {
      input?.blur();
      touchStartRef.current = null;
      touchMovedRef.current = false;
      return;
    }

    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchMovedRef.current = false;
  }, [getInput, isInteractiveTarget]);

  const handleTerminalTouchMove = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) {
      return;
    }

    const touch = event.touches[0];
    if (!touch) {
      return;
    }

    const dx = Math.abs(touch.clientX - touchStartRef.current.x);
    const dy = Math.abs(touch.clientY - touchStartRef.current.y);
    if (dx > 8 || dy > 8) {
      touchMovedRef.current = true;
    }
  }, []);

  const handleTerminalTouchEnd = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    const started = touchStartRef.current;
    const moved = touchMovedRef.current;
    touchStartRef.current = null;
    touchMovedRef.current = false;

    if (!started || moved || isInteractiveTarget(event.target)) {
      return;
    }

    if (document.activeElement === getInput()) {
      return;
    }

    event.preventDefault();
    focusInput();
  }, [focusInput, getInput, isInteractiveTarget]);

  return (
    <div
      ref={containerRef}
      className={`terminal theme-${theme}`}
      onPointerDown={handleTerminalPointerDown}
      onTouchStart={handleTerminalTouchStart}
      onTouchMove={handleTerminalTouchMove}
      onTouchEnd={handleTerminalTouchEnd}
    >
      <WelcomeBanner />
      <TerminalOutput lines={state.history} />
      <TerminalInput
        value={currentInput}
        onChange={setCurrentInput}
        onSubmit={handleSubmit}
        onHistoryUp={handleHistoryUp}
        onHistoryDown={handleHistoryDown}
        onTabComplete={handleTabComplete}
      />
    </div>
  );
};

export default Terminal;
