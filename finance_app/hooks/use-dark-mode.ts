import { useState } from 'react'
import { useCookies } from 'react-cookie'

type Theme = 'dark' | 'light'

interface UseDarkModeReturn {
  theme: Theme
  toggleTheme: () => void
}

const useDarkMode = (defaultTheme: Theme = 'dark'): UseDarkModeReturn => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [_, setCookie] = useCookies(['theme'])

  const setAndSaveTheme = (theme: Theme) => {
    setTheme(theme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    setCookie('theme', theme)
  }
  const toggleTheme = () => {
    setAndSaveTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}

export default useDarkMode