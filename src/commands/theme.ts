import { registerCommand } from './index';

const AVAILABLE_THEMES = ['dark', 'light', 'gruvbox'] as const;
type TerminalTheme = (typeof AVAILABLE_THEMES)[number];

const isTerminalTheme = (theme: string): theme is TerminalTheme => {
  return AVAILABLE_THEMES.includes(theme as TerminalTheme);
};

const getCurrentTheme = (): TerminalTheme => {
  for (const theme of AVAILABLE_THEMES) {
    if (document.documentElement.classList.contains(`theme-${theme}`)) {
      return theme;
    }
  }

  return 'gruvbox';
};

const setTheme = (theme: TerminalTheme) => {
  window.dispatchEvent(
    new CustomEvent('terminal:set-theme', {
      detail: { theme },
    })
  );
};

const getNextTheme = (currentTheme: TerminalTheme): TerminalTheme => {
  const currentIndex = AVAILABLE_THEMES.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % AVAILABLE_THEMES.length;
  return AVAILABLE_THEMES[nextIndex];
};

const themeExecute = (args: string[]) => {
  const requestedTheme = args[0]?.toLowerCase();

  if (!requestedTheme) {
    const nextTheme = getNextTheme(getCurrentTheme());
    setTheme(nextTheme);
    return `Theme switched to ${nextTheme} mode.`;
  }

  if (requestedTheme === 'toggle') {
    const currentTheme = getCurrentTheme();
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    return `Theme switched to ${nextTheme} mode.`;
  }

  if (isTerminalTheme(requestedTheme)) {
    setTheme(requestedTheme);
    return `Theme switched to ${requestedTheme} mode.`;
  }

  return `Theme '${requestedTheme}' not found. Available themes: ${AVAILABLE_THEMES.join(', ')}.`;
};

registerCommand({
  name: '/theme',
  description: 'Toggle or set terminal theme (dark, light, gruvbox)',
  execute: themeExecute,
});
