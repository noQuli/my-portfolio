import { registerCommand } from './index';
import { BANNER } from '../components/AsciiArt';

const asciiExecute = () => {
  return BANNER;
};

registerCommand({
  name: '/ascii',
  description: 'Display ASCII art banner',
  execute: asciiExecute,
  aliases: ['/banner'],
});
