import { registerCommand } from './index';
import { content } from '../data/content';

const aboutmeExecute = () => {
  const { aboutMe } = content;

  const titleLine     = `${aboutMe.name} | ${aboutMe.title}`;
  const locationLine  = aboutMe.location;
  const interestsLine = `Interests: ${aboutMe.interests.join(' • ')}`;
  const bioLines      = aboutMe.bio.split('\n');

  const allLines   = [titleLine, locationLine, ...bioLines, interestsLine];
  const maxWidth   = Math.max(...allLines.map(l => l.length));
  const innerWidth = maxWidth + 4;

  const top    = `|${'-'.repeat(innerWidth)}|`;
  const mid    = `|${'-'.repeat(innerWidth)}|`;
  const bottom = `|${'-'.repeat(innerWidth)}|`;
  const blank  = `│${' '.repeat(innerWidth)}│`;

  const formatLine = (text: string) =>
    `│  ${text}${' '.repeat(maxWidth - text.length)}  │`;

  return [
    top,
    formatLine(titleLine),
    mid,
    formatLine(locationLine),
    blank,
    ...bioLines.map(formatLine),
    blank,
    formatLine(interestsLine),
    bottom,
  ].join('\n');
};

registerCommand({
  name: '/aboutme',
  description: 'Learn about me - bio and background',
  execute: aboutmeExecute,
  aliases: ['/about', '/me'],
});