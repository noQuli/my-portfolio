import { registerCommand, getAllCommands } from './index';

const helpExecute = () => {
  const commands = getAllCommands();

  const commandList = commands
    .map(cmd => `  ${cmd.name.padEnd(14)} ${cmd.description}`)
    .join('\n');

  return `Available commands:

${commandList}

Type a command and press Enter to execute (commands work with or without the /).
Use Tab for auto-completion.
Use ↑/↓ arrows to navigate command history.`;
};

registerCommand({
  name: '/help',
  description: 'Show all available commands',
  execute: helpExecute,
  aliases: ['/h', '/?'],
});
