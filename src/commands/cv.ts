import { registerCommand } from './index';
import { content } from '../data/content';

const cvExecute = () => {
  const { cv, experience, education, skills } = content;

  const experienceSection = experience
    .map(exp => {
      const highlights = exp.highlights.map(h => `     • ${h}`).join('\n');
      return `
  📌 ${exp.role} @ ${exp.company}
     ${exp.period}
     ${exp.description}
${highlights}`;
    })
    .join('\n');

  const educationSection = education
    .map(edu => `  🎓 ${edu.degree} in ${edu.field}
     ${edu.institution} (${edu.period})`)
    .join('\n\n');

  const skillsSection = skills
    .map(cat => `  ${cat.name}: ${cat.items.join(', ')}`)
    .join('\n');

  return `
╔══════════════════════════════════════════════════════════════╗
║                      CURRICULUM VITAE                        ║
╚══════════════════════════════════════════════════════════════╝

📝 Summary
────────────────────────────────────────────────────
${cv.summary}

💼 Experience
────────────────────────────────────────────────────
${experienceSection}

🎓 Education
────────────────────────────────────────────────────
${educationSection}

🛠️ Skills
────────────────────────────────────────────────────
${skillsSection}

────────────────────────────────────────────────────
Type /contacts to get in touch!`;
};

registerCommand({
  name: '/cv',
  description: 'View my full CV/resume',
  execute: cvExecute,
  aliases: ['/resume'],
});
