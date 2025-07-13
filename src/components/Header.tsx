import React from 'react';
import { 
  Play, 
  Download, 
  Copy, 
  Share, 
  RotateCcw, 
  Settings, 
  Sun, 
  Moon,
  BookOpen,
  GraduationCap,
  FileText,
  TestTube
} from 'lucide-react';
import './Header.css';


const Header = () => {
  return (
   <header className="header">
  <div className="header-container">
    {/* Logo and Brand */}
    <div className="brand-section">
      <div className="brand">
        <GraduationCap className="brand-icon" />
        <span className="brand-name">ScholarHat</span>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        <a href="#" className="nav-link">
          <GraduationCap className="nav-icon" />
          <span>Free Courses</span>
        </a>
        <a href="#" className="nav-link">
          <FileText className="nav-icon" />
          <span>Free Interview EBooks</span>
        </a>
        <a href="#" className="nav-link">
          <TestTube className="nav-icon" />
          <span>Free skill Tests</span>
        </a>
        <a href="#" className="nav-link">
          <TestTube className="nav-icon" />
          <span>Free Masterclass</span>
        </a>
      </nav>
    </div>

    {/* Action Buttons */}
    <div className="action-section">
      <div className="editor-controls">
        {/* <button onClick={onRun} className="run-button">
          <Play className="icon" />
          <span>Run</span>
          <span className="shortcut">Ctrl+Enter</span>
        </button> */}
       
        {/* <button onClick={onShare} className="action-button" title="Share">
          <Share className="icon" />
        </button> */}
        
        {/* <button onClick={onSettings} className="action-button" title="Settings">
          <Settings className="icon" />
        </button> */}
      </div>

      {/* Theme Toggle */}
      {/* <button onClick={onThemeToggle} className="action-button">
        {isDarkMode ? <Sun className="icon" /> : <Moon className="icon" />}
      </button> */}

      {/* CTA Button */}
      <button className="cta-button">Free C# Course</button>
    </div>
  </div>
</header>
  );
};

export default Header;