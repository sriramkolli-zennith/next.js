// import { cookies } from 'next/headers'

type Theme = 'light' | 'dark';

const useServerDarkMode = (defaultTheme: Theme = 'dark'): Theme => {
  return defaultTheme;
};

export default useServerDarkMode;