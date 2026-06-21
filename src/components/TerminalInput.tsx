import React, { useRef, useEffect, type KeyboardEvent, type ChangeEvent } from 'react';
import TerminalPrompt from './TerminalPrompt';

interface TerminalInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onHistoryUp: () => void;
  onHistoryDown: () => void;
  onTabComplete: () => void;
  disabled?: boolean;
}

export const TerminalInput: React.FC<TerminalInputProps> = ({
  value,
  onChange,
  onSubmit,
  onHistoryUp,
  onHistoryDown,
  onTabComplete,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on desktop only. Mobile browsers open the keyboard reliably
  // when focus happens inside the user's tap handler.
  useEffect(() => {
    const isTouchPrimary = window.matchMedia('(pointer: coarse)').matches;
    if (!disabled && !isTouchPrimary && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  // Focus input when input line is tapped
  const handleContainerPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleContainerPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleContainerTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    event.stopPropagation();
    inputRef.current?.focus();
  };

  const handleContainerTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        onSubmit(value);
        break;
      case 'ArrowUp':
        e.preventDefault();
        onHistoryUp();
        break;
      case 'ArrowDown':
        e.preventDefault();
        onHistoryDown();
        break;
      case 'Tab':
        e.preventDefault();
        onTabComplete();
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      className="input-line"
      onPointerDown={handleContainerPointerDown}
      onPointerUp={handleContainerPointerUp}
      onTouchStart={handleContainerTouchStart}
      onTouchEnd={handleContainerTouchEnd}
    >
      <TerminalPrompt />
      <input
        ref={inputRef}
        type="text"
        className="command-input"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        aria-label="Terminal input"
      />
      <span className="cursor" aria-hidden="true" />
    </div>
  );
};

export default TerminalInput;
