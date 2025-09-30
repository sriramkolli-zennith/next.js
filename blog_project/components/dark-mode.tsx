'use client';

import useDarkMode from '@/hooks/use-dark-mode';
import React from 'react';

const nextModeIcons: Record<string, string> = {
  'light': '🌚',
  'dark': '🌝'
};

interface DarkModeProps {
  defaultTheme?: string;
}


import type { Theme } from '@/hooks/use-dark-mode';

const DarkMode: React.FC<DarkModeProps> = ({ defaultTheme }) => {
  const { theme, toggleTheme } = useDarkMode(defaultTheme as Theme);
  return (
    <button onClick={toggleTheme}>{nextModeIcons[theme]}</button>
  );
};

export default DarkMode;