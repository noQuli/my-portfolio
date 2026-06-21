import { registerCommand } from './index';
import { content } from '../data/content';

const contactsExecute = () => {
  const { contacts, socials } = content;

  const socialLinks = socials
    .map(s => `  ${s.platform.padEnd(10)} ${s.username} → ${s.url}`)
    .join('\n');

  return `
📬 Contact Information
═══════════════════════════════════════════════════

  📧 Email:    ${contacts.email}
  📍 Location: ${contacts.location}

🌐 Social Links
───────────────────────────────────────────────────
${socialLinks}

Feel free to reach out! I'm always happy to connect.`;
};

registerCommand({
  name: '/contacts',
  description: 'Get my contact information',
  execute: contactsExecute,
  aliases: ['/contact'],
});
