import React, { useState } from "react";
import {
  Code,
  Terminal,
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
} from "lucide-react";
import "../assets/CSS/LanguageSelector.css";

interface Language {
  id: string;
  name: string;
  icon: any;
  color: string;
}

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages: Language[] = [
  {
    id: "python",
    name: "Python",
    icon: (
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
    ),
    color: "bg-yellow-500",
  },
  {
    id: "java",
    name: "Java",
    icon: (
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" />
    ),
    color: "bg-red-500",
  },
  {
    id: "c",
    name: "C",
    icon: (
      <img
        width="32"
        height="32"
        src="https://img.icons8.com/color/48/c-programming.png"
        alt="c-programming"
      />
    ),
    color: "bg-blue-500",
  },
  {
    id: "cpp",
    name: "C++",
    icon: (
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" />
    ),
    color: "bg-blue-600",
  },
  {
    id: "csharp",
    name: "C#",
    icon: (
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" />
    ),
    color: "bg-purple-600",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: (
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
    ),
    color: "bg-yellow-400",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: (
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
    ),
    color: "bg-blue-500",
  },
  {
    id: "html",
    name: "HTML",
    icon: (
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
    ),
    color: "bg-orange-500",
  },
  {
    id: "react",
    name: "React",
    icon: (
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
    ),
    color: "bg-orange-500",
  },
  {
    id: "angular",
    name: "Angular",
    icon: (
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg" />
    ),
    color: "bg-orange-500",
  },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-title">
          <Code className="sidebar-title-icon" />
          {!isCollapsed && <h2 className="sidebar-title-text">Languages</h2>}
        </div>
      </div>

      <div className="sidebar-content">
        <div className="language-list">
          {languages.map((language) => (
            <a
              href={`/compiler/${language.id}`}
              target="_main"
              key={language.id}
            >
              <button
                className={`language-button ${
                  selectedLanguage === language.id ? "active" : ""
                }`}
              >
                <div className={`language-icon`}>{language.icon}</div>
                {!isCollapsed && (
                  <span className="language-name">{language.name}</span>
                )}
              </button>
            </a>
          ))}
        </div>
        <button
          className={`toggle-button  ${isCollapsed ? "collapsed" : ""}`}
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ChevronRightCircleIcon /> : <ChevronLeftCircleIcon />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="sidebar-footer">
          <div className="shortcuts-info">
            <div className="shortcut-header">
              <Terminal className="shortcut-icon" />
              <span>Shortcuts:</span>
            </div>
            <div className="shortcut-list">
              <div>Ctrl+Enter: Run code</div>
              <div>Ctrl+S: Save file</div>
              <div>Ctrl+/: Comment</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
