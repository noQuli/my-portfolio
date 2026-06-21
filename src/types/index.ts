import type { ReactNode } from 'react';

// Theme types
export type ThemeName = string;

export interface ThemeColors {
  background: string;
  foreground: string;
  prompt: string;
  command: string;
  error: string;
  accent: string;
}

export interface Theme {
  name: ThemeName;
  colors: ThemeColors;
}

// Terminal line types
export type LineType = 'input' | 'output' | 'error' | 'welcome';

export interface TerminalLine {
  id: string;
  type: LineType;
  content: string | ReactNode;
  timestamp: number;
}

// Command types
export interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => string | ReactNode;
  aliases?: string[];
}

export type CommandRegistry = Record<string, Command>;

// Terminal state
export interface TerminalState {
  history: TerminalLine[];
  currentInput: string;
  commandHistory: string[];
  historyIndex: number;
  isAnimating: boolean;
}

// Portfolio content types
export interface AboutSection {
  experience: string;
  languages: string[]
  OS: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  interests: string[];
}

export interface Project {
  name: string;
  description: string;
  url?: string;
  github?: string;
  featured: boolean;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  username: string;
}

export interface CVSection {
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
}

export interface PortfolioContent {
  aboutMe: AboutSection;
  projects: Project[];
  cv: CVSection;
  contacts: ContactInfo;
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  socials: SocialLink[];
}

// Parsed command result
export interface ParsedCommand {
  command: string;
  args: string[];
}
