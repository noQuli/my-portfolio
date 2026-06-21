import { registerCommand } from './index';
import { content } from '../data/content';

const educationExecute = () => {
  const { education } = content;

  const eduList = education
    .map(edu => `
  🎓 ${edu.degree} in ${edu.field}
     ${edu.institution}
     ${edu.period}`)
    .join('\n');

  return `
🎓 Education
═══════════════════════════════════════════════════
${eduList}

Use /cv for full resume.`;
};

registerCommand({
  name: '/education',
  description: 'View my education background',
  execute: educationExecute,
  aliases: ['/edu'],
});
