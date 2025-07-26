import React, { useState } from "react";
import {
  Code,
  Terminal,
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
} from "lucide-react";

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
    <div
      className={`w-40 bg-gray-900 border-r border-gray-700 flex flex-col h-full transition-all duration-300 relative ${
        isCollapsed ? "w-[3.8rem]" : ""
      }`}
    >
      <div
        className={`py-2 px-4 border-b border-gray-700 flex justify-between items-center ${
          isCollapsed ? "p-4" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-blue-400" />
          {!isCollapsed && (
            <h2 className="text-sm font-semibold text-white">Languages</h2>
          )}
        </div>
      </div>

      <div className="flex-1 p-2 flex">
        <div className="flex flex-col gap-1 w-full">
          {languages.map((language) => (
            <a
              href={`/compiler/${language.id}`}
              target="_main"
              key={language.id}
              className="no-underline"
            >
              <button
                className={`flex ${
                  isCollapsed ? "justify-center" : "justify-normal"
                } items-center gap-3 p-2.5 rounded-lg text-sm font-medium text-gray-300  hover:bg-gray-800 transition-colors duration-200 w-[95%] ${
                  selectedLanguage === language.id
                    ? "bg-blue-900 text-blue-100"
                    : ""
                }`}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {language.icon}
                </div>
                {!isCollapsed && (
                  <span className="text-sm font-medium">{language.name}</span>
                )}
              </button>
            </a>
          ))}
        </div>
        <button
          className={`bg-transparent border-none cursor-pointer z-50 p-0 flex items-center justify-center text-gray-500 hover:text-blue-400 transition-colors duration-200 ${
            isCollapsed ? "mb-[8.1rem]" : ""
          }`}
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ChevronRightCircleIcon /> : <ChevronLeftCircleIcon />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="text-xs text-gray-400">
            <div className="flex items-center gap-2 mb-1">
              <Terminal className="w-3 h-3" />
              <span>Shortcuts:</span>
            </div>
            <div className="pl-5 flex flex-col gap-1 opacity-75 text-xs">
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
