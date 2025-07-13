import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
    }
  }, []);

  useEffect(() => {
    // Apply dark class to html element
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    // Apply dark class to all elements that need it
    const elementsToToggle = [
      // Main layout
      '.main-layout',
      // Header
      '.header', '.brand', '.nav-link', '.action-button',
      // Sidebar
      '.sidebar', '.sidebar-header', '.sidebar-title-icon', '.sidebar-title-text',
      '.language-button', '.sidebar-footer', '.shortcuts-info',
      // Editor
      '.editor-container', '.file-tabs', '.file-tab', '.active-tab', '.inactive-tab',
      '.close-button', '.add-button', '.run-wrapper', '.line-numbers', '.code-textarea',
      '.status-bar',
      // Resizable content
      '.resizable-content',
      // Input/Output
      '.input-section', '.input-header', '.input-icon', '.input-heading', '.input-textarea',
      '.input-count', '.output-header', '.output-icon', '.output-heading', '.clear-button',
      '.output-box', '.output-placeholder', '.console-info', '.console-meta'
    ];

    elementsToToggle.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.classList.toggle('dark', isDarkMode);
      });
    });

    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};