import type { Command, CommandRegistry } from '../types';

// Command registry - will be populated by individual command modules
const commands: CommandRegistry = {};

export function registerCommand(command: Command): void {
  commands[command.name] = command;

  // Register aliases
  if (command.aliases) {
    for (const alias of command.aliases) {
      commands[alias] = command;
    }
  }
}

export function getCommand(name: string): Command | undefined {
  return commands[name.toLowerCase()];
}

export function getAllCommands(): Command[] {
  const seen = new Set<string>();
  const result: Command[] = [];

  for (const command of Object.values(commands)) {
    if (!seen.has(command.name)) {
      seen.add(command.name);
      result.push(command);
    }
  }

  // Sort alphabetically
  return result.sort((a, b) => a.name.localeCompare(b.name));
}

export function getCommandNames(): string[] {
  return Object.keys(commands).sort();
}

export function hasCommand(name: string): boolean {
  return name.toLowerCase() in commands;
}

export { commands };
