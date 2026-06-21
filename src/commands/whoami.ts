import { registerCommand } from './index';
import { content } from '../data/content';

const whoamiExecute = () => {
  const { aboutMe } = content;
  return `${aboutMe.name} - ${aboutMe.title} @ ${aboutMe.location}`;
};

registerCommand({
  name: '/whoami',
  description: 'Quick identity summary',
  execute: whoamiExecute,
});
