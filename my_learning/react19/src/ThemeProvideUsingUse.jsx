import React, { createContext, use } from 'react';

// Async function to simulate fetching theme
const fetchTheme = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ color: 'dark', fontSize: '16px' }), 1000)
  );
};

// Creating ThemeContext
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const theme = use(fetchTheme());
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

const ThemedText = () => {
  const theme = use(ThemeContext);

  return (
    <p style={{ color: theme.color, fontSize: theme.fontSize }}>
      This is a themed text.
    </p>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ThemedText />
    </ThemeProvider>
  );
}
