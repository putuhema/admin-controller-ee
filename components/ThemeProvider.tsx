import { ReactNode, createContext, useState } from "react";

interface Theme {
  theme: string;
  toggleTheme: (theme: string) => void;
}

export const ThemeContext = createContext<Theme>({
  theme: "",
  toggleTheme: function () {},
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = (theme: string) => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
