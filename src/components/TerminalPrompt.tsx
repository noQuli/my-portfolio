import React from 'react';

interface TerminalPromptProps {
  username?: string;
  hostname?: string;
  path?: string;
}

export const TerminalPrompt: React.FC<TerminalPromptProps> = ({
  username = 'noQuli',
  hostname = 'cli',
  path = '~',
}) => {
  return (
    <span className="prompt">
      <span style={{ color: 'var(--command)' }}>{username}</span>
      <span style={{ color: 'var(--fg)' }}>@</span>
      <span style={{ color: 'var(--accent)' }}>{hostname}</span>
      <span style={{ color: 'var(--fg)' }}>:</span>
      <span style={{ color: 'var(--prompt)' }}>{path}</span>
      <span style={{ color: 'var(--fg)' }}>$ </span>
    </span>
  );
};

export default TerminalPrompt;
