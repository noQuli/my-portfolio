import { registerCommand } from './index';
import { content } from '../data/content';

const projectsExecute = () => {
  const { projects } = content;

  const projectList = projects
    .map((project, index) => {
      const featured = project.featured ? ' ⭐' : '';
      const links = [];
      if (project.url) links.push(`🔗 ${project.url}`);
      if (project.github) links.push(`📦 ${project.github}`);

      return `
${index + 1}. ${project.name}${featured}
   ${project.description}
   ${links.join(' | ')}`;
    })
    .join('\n');

  return `
📂 Projects
═══════════════════════════════════════════════════
${projectList}

⭐ = Featured project
Use /portfolio to see featured projects only.`;
};

registerCommand({
  name: '/projects',
  description: 'View all my projects',
  execute: projectsExecute,
});
