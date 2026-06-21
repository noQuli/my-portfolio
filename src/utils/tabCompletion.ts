/**
 * Get tab completion suggestions for partial input
 * @param input - Current user input
 * @param commands - Available command names
 * @returns Array of matching command names
 */
export function getCompletions(input: string, commands: string[]): string[] {
  const trimmed = input.trim().toLowerCase();

  // No input - return all commands
  if (!trimmed) {
    return commands;
  }

  // Normalize input to include leading slash
  const normalized = trimmed.startsWith('/') ? trimmed : '/' + trimmed;

  // Filter commands that start with the input
  return commands.filter(cmd => cmd.toLowerCase().startsWith(normalized));
}

/**
 * Complete a partial command
 * @param input - Current user input
 * @param commands - Available command names
 * @returns Completed command or original input if no match
 */
export function completeCommand(input: string, commands: string[]): string {
  const matches = getCompletions(input, commands);

  // Single match - return it
  if (matches.length === 1) {
    return matches[0];
  }

  // Multiple matches - find common prefix
  if (matches.length > 1) {
    let commonPrefix = matches[0];
    for (const match of matches.slice(1)) {
      while (!match.toLowerCase().startsWith(commonPrefix.toLowerCase())) {
        commonPrefix = commonPrefix.slice(0, -1);
      }
    }
    // Only return if we extended the input
    if (commonPrefix.length > input.length) {
      return commonPrefix;
    }
  }

  // No matches or no extension possible
  return input;
}
