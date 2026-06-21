import React from 'react';
import { content } from '../data/content';

interface AsciiArtProps {
  text?: string;
  className?: string;
}

const BANNER = `
 ███╗   ██╗ ██████╗  ██████╗ ██╗   ██╗██╗     ██╗
 ████╗  ██║██╔═══██╗██╔═══██╗██║   ██║██║     ██║
 ██╔██╗ ██║██║   ██║██║   ██║██║   ██║██║     ██║
 ██║╚██╗██║██║   ██║██║▄▄ ██║██║   ██║██║     ██║
 ██║ ╚████║╚██████╔╝╚██████╔╝╚██████╔╝███████╗██║
 ╚═╝  ╚═══╝ ╚═════╝  ╚══▀▀═╝  ╚═════╝ ╚══════╝╚═╝
`;

const WELCOME_MESSAGE = `
Welcome to my CLI portfolio! 👋

Type help or /help to see available commands.
`;

export const AsciiArt: React.FC<AsciiArtProps> = ({ text, className }) => {
  return (
    <pre className={className} style={{ color: 'var(--accent)', margin: 0, lineHeight: 1.0 }}>
      {text || BANNER}
    </pre>
  );
};

export const WelcomeBanner: React.FC = () => {
  const { aboutMe } = content;

  return (
    <div className="welcome-banner" style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', marginBottom: '1rem' }}>
        {/* NOQULI ASCII Banner */}
        <div>
          <AsciiArt />
        </div>

        {/* About Me Section - Separate container */}
        <div className="aboutme-section">
          <div style={{ paddingBottom: '0.2rem' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>ABOUTME</span>
          </div>
          <div style={{ color: 'var(--fg)', paddingBottom: '0.2rem' }}>-------------------</div>
          <div><strong style={{ color: 'var(--command)' }}>Role:</strong><span style={{ color: 'var(--fg)' }}> {aboutMe.title}</span></div>
          <div><strong style={{ color: 'var(--command)' }}>Experience:</strong><span style={{ color: 'var(--fg)' }}> {aboutMe.experience}</span></div>
          <div><strong style={{ color: 'var(--command)' }}>OS:</strong><span style={{ color: 'var(--fg)' }}> {aboutMe.OS}</span></div>
          <div><strong style={{ color: 'var(--command)' }}>Stack:</strong><span style={{ color: 'var(--fg)' }}> {content.skills[0].items.join(", ")}</span></div>
          <div><strong style={{ color: 'var(--command)' }}>Languages:</strong><span style={{ color: 'var(--fg)' }}> {aboutMe.languages.join(', ')}</span></div>
          <div><strong style={{ color: 'var(--command)' }}>Location:</strong><span style={{ color: 'var(--fg)' }}> {aboutMe.location}</span></div>
          <div><strong style={{ color: 'var(--command)' }}>Interests:</strong><span style={{ color: 'var(--fg)' }}> {aboutMe.interests.slice(0,4).join(', ')}</span></div>

          <div style={{ display: 'flex', gap: '0.2rem', marginTop: '0.5rem' }}>
            <span style={{ backgroundColor: 'var(--fg)', width: '1rem', height: '1rem', display: 'inline-block' }}></span>
            <span style={{ backgroundColor: 'var(--error)', width: '1rem', height: '1rem', display: 'inline-block' }}></span>
            <span style={{ backgroundColor: 'var(--command)', width: '1rem', height: '1rem', display: 'inline-block' }}></span>
            <span style={{ backgroundColor: 'var(--prompt)', width: '1rem', height: '1rem', display: 'inline-block' }}></span>
            <span style={{ backgroundColor: 'var(--accent)', width: '1rem', height: '1rem', display: 'inline-block' }}></span>
            <span style={{ backgroundColor: 'var(--bg)', width: '1rem', height: '1rem', display: 'inline-block' }}></span>
          </div>
        </div>
      </div>
      <pre style={{ color: 'var(--fg)', margin: 0 }}>{WELCOME_MESSAGE}</pre>
    </div>
  );
};

export default AsciiArt;
export { BANNER, WELCOME_MESSAGE };
