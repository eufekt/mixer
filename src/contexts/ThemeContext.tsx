import { createContext, useContext } from "react";

export interface ThemeContextInterface {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextInterface|null>(null);

export function useThemeContext() {
  return useContext(ThemeContext);
}

export default ThemeContext;
