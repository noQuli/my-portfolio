import type { ParsedCommand } from '../types';

/**
 * Parse user input and extract command
 * @param input - Raw user input string
 * @returns Parsed command or null if empty
 */
export function parseCommand(input: string): ParsedCommand | null {
  // Trim whitespace
  const trimmed = input.trim();

  // Return null for empty input
  if (!trimmed) {
    return null;
  }

  // Split into parts
  const parts = trimmed.split(/\s+/);
  let command = parts[0].toLowerCase();

  // Normalize command to include leading slash
  if (!command.startsWith('/')) {
    command = '/' + command;
  }

  // Extract arguments (everything after the command)
  const args = parts.slice(1);

  return {
    command,
    args,
  };
}

/**
 * Check if input matches a command (case-insensitive)
 * @param input - User input
 * @param commandName - Command name to match
 * @returns True if matches
 */
export function matchesCommand(input: string, commandName: string): boolean {
  const parsed = parseCommand(input);
  if (!parsed) return false;
  return parsed.command === commandName.toLowerCase();
}
