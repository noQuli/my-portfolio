import { registerCommand } from './index';
import { content } from '../data/content';

const skillsExecute = () => {
  const { skills } = content;

  const skillsSection = skills
    .map(cat => {
      const items = cat.items.join(' • ');
      return `
  ${cat.name}
  ${'─'.repeat(cat.name.length)}
  ${items}`;
    })
    .join('\n');

  return `
🛠️ Technical Skills
═══════════════════════════════════════════════════
${skillsSection}

Use /cv for full resume.`;
};

registerCommand({
  name: '/skills',
  description: 'View my technical skills',
  execute: skillsExecute,
});
