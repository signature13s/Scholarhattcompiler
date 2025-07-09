import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import CodeEditor from './components/CodeEditor';
import InputOutputPanel from './components/InputOutputPanel';
import ResizablePanel from './components/ResizablePanel';
import MobileToolbar from './components/MobileToolbar';
import './App.css';
const AppContent: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('csharp');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simulate code execution
  const runCode = () => {
    setOutput('Compiling...\n');
    
    // Simulate compilation and execution
    setTimeout(() => {
      const sampleOutput = `Hello, World!
The answer is: 42
Sum of 1-10: 55

Success: Program executed successfully
Execution time: 0.245s
Memory usage: 15.2 MB`;
      setOutput(sampleOutput);
    }, 1000);
  };

  const downloadCode = () => {
    // Simulate download functionality
    console.log('Downloading code...');
  };

  const copyCode = () => {
    // Simulate copy functionality
    console.log('Copying code to clipboard...');
  };

  const shareCode = () => {
    // Simulate share functionality
    console.log('Sharing code...');
  };

  const resetCode = () => {
    setOutput('');
    setInput('');
  };

  const openSettings = () => {
    // Simulate settings modal
    console.log('Opening settings...');
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
   
<div className="main-layout">
  <Header
    onRun={runCode}
    onDownload={downloadCode}
    onCopy={copyCode}
    onShare={shareCode}
    onReset={resetCode}
    onSettings={openSettings}
    isDarkMode={isDarkMode}
    onThemeToggle={toggleTheme}
  />

  <div className="main-content">
    {/* Mobile: Overlay menu */}
    <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'visible' : 'hidden'}`}>
      <div className="menu-backdrop" onClick={() => setIsMobileMenuOpen(false)} />
      <div className="menu-panel">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      </div>
    </div>

    {/* Desktop: Sidebar */}
    <div className="sidebar-desktop">
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />
    </div>

    <div className="editor-container">
      <div className="code-editor-wrapper">
        <CodeEditor language={selectedLanguage} onRun={runCode} />
      </div>

      <div className="resizable-panel-desktop">
        <ResizablePanel
          minWidth={300}
          maxWidth={800}
          defaultWidth={480}
          className="resizable-content"
        >
          <InputOutputPanel
            output={output}
            onInputChange={setInput}
            onRun={runCode}
          />
        </ResizablePanel>
      </div>
    </div>
  </div>

  {/* Mobile: I/O bottom panel */}
  <div className="io-mobile">
    <InputOutputPanel
      output={output}
      onInputChange={setInput}
      onRun={runCode}
    />
  </div>

  <MobileToolbar
    onRun={runCode}
    onDownload={downloadCode}
    onCopy={copyCode}
    onShare={shareCode}
    onReset={resetCode}
    onSettings={openSettings}
    onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  />
</div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;