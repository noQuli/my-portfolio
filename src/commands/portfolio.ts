import { registerCommand } from './index';
import { content } from '../data/content';

const portfolioExecute = () => {
  const featured = content.projects.filter(p => p.featured);

  const projectList = featured
    .map((project) => {
      const links = [];
      if (project.url) links.push(`🔗 ${project.url}`);
      if (project.github) links.push(`📦 ${project.github}`);

      return `
⭐ ${project.name}
   ${project.description}
   ${links.join(' | ')}`;
    })
    .join('\n');

  return `
🏆 Featured Portfolio
═══════════════════════════════════════════════════
${projectList}

Use /projects to see all projects.`;
};

registerCommand({
  name: '/portfolio',
  description: 'View featured portfolio projects',
  execute: portfolioExecute,
});
