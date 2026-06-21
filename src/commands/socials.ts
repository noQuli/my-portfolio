import { registerCommand } from './index';
import { content } from '../data/content';

const socialsExecute = () => {
  const { socials } = content;

  const socialList = socials
    .map(s => `  ${s.platform.padEnd(12)} ${s.username.padEnd(12)} ${s.url}`)
    .join('\n');

  return `
🌐 Social Links
═══════════════════════════════════════════════════

${socialList}

Use /contacts for full contact information.`;
};

registerCommand({
  name: '/socials',
  description: 'View my social media links',
  execute: socialsExecute,
  aliases: ['/social'],
});
