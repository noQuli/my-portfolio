import React from 'react';
import type { TerminalLine } from '../types';
import TerminalPrompt from './TerminalPrompt';

interface TerminalOutputProps {
  lines: TerminalLine[];
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ lines }) => {
  const renderOutputText = (text: string) => {
    const lines = text.split('\n');

    return lines.flatMap((line, lineIndex) => {
      const urlRegex = /https?:\/\/[^\s)]+/g;
      const nodes: Array<string | React.ReactElement> = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      let matchIndex = 0;

      while ((match = urlRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          nodes.push(line.slice(lastIndex, match.index));
        }

        const url = match[0];
        nodes.push(
          <a
            key={`link-${lineIndex}-${matchIndex}`}
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="terminal-link"
          >
            {url}
          </a>
        );

        lastIndex = match.index + url.length;
        matchIndex += 1;
      }

      if (lastIndex < line.length) {
        nodes.push(line.slice(lastIndex));
      }

      if (lineIndex === 0) {
        return nodes;
      }

      return [<br key={`br-${lineIndex}`} />, ...nodes];
    });
  };

  const renderContent = (content: TerminalLine['content']) => {
    if (typeof content !== 'string') {
      return content;
    }

    return renderOutputText(content);
  };

  return (
    <div className="terminal-output">
      {lines.map(line => (
        <div key={line.id} className={`output-line ${line.type}`}>
          {line.type === 'input' ? (
            <>
              <TerminalPrompt />
              <span style={{ color: 'var(--command)' }}>{line.content}</span>
            </>
          ) : line.type === 'error' ? (
            <span className="error">{renderContent(line.content)}</span>
          ) : line.type === 'welcome' ? (
            <span className="accent">{renderContent(line.content)}</span>
          ) : (
            <span>{renderContent(line.content)}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TerminalOutput;
