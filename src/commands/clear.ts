import { registerCommand } from './index';

// Clear command - returns a special marker
// The actual clearing is handled by the terminal
const clearExecute = () => {
  // Dispatch a custom event that the terminal listens for
  window.dispatchEvent(new CustomEvent('terminal:clear'));
  return ''; // Empty output since screen is cleared
};

registerCommand({
  name: '/clear',
  description: 'Clear the terminal screen',
  execute: clearExecute,
  aliases: ['/cls'],
});
