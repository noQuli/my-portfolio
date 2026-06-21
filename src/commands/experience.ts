import { registerCommand } from './index';
import { content } from '../data/content';

const experienceExecute = () => {
  const { experience } = content;

  const timeline = experience
    .map(exp => {
      const highlights = exp.highlights.map(h => `     • ${h}`).join('\n');
      return `
  ┌─ ${exp.period}
  │
  │  💼 ${exp.role}
  │  🏢 ${exp.company}
  │
  │  ${exp.description}
  │
${highlights}
  │
  └────────────────────────────────────────────────`;
    })
    .join('\n');

  return `
💼 Work Experience
═══════════════════════════════════════════════════
${timeline}

Use /cv for full resume.`;
};

registerCommand({
  name: '/experience',
  description: 'View my work experience',
  execute: experienceExecute,
  aliases: ['/work', '/exp'],
});
