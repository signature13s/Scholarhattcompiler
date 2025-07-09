import React, { useState, useEffect } from 'react';
import { Play, FileText, X, Plus } from 'lucide-react';
import './Editor.css'; 
interface CodeEditorProps {
  language: string;
  onRun: () => void;
}

interface FileTab {
  id: string;
  name: string;
  content: string;
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language, onRun }) => {
  const [activeFile, setActiveFile] = useState(0);
  const [files, setFiles] = useState<FileTab[]>([
    {
      id: '1',
      name: 'program.cs',
      content: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
        
        // Your code here
        int number = 42;
        Console.WriteLine($"The answer is: {number}");
        
        // Example: Simple calculation
        int sum = 0;
        for (int i = 1; i <= 10; i++)
        {
            sum += i;
        }
        Console.WriteLine($"Sum of 1-10: {sum}");
    }
}`,
      language: 'csharp'
    }
  ]);

  const [code, setCode] = useState(files[0].content);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });

  useEffect(() => {
    setCode(files[activeFile].content);
  }, [activeFile, files]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    const updatedFiles = [...files];
    updatedFiles[activeFile].content = newCode;
    setFiles(updatedFiles);
  };

  const addNewFile = () => {
    const newFile: FileTab = {
      id: Date.now().toString(),
      name: `file${files.length + 1}.cs`,
      content: `using System;

class Program
{
    static void Main()
    {
        // Your code here
    }
}`,
      language: 'csharp'
    };
    setFiles([...files, newFile]);
    setActiveFile(files.length);
  };

  const closeFile = (index: number) => {
    if (files.length > 1) {
      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      if (activeFile >= index && activeFile > 0) {
        setActiveFile(activeFile - 1);
      }
    }
  };

  const lines = code.split('\n');

  return (
    <div className="editor-container">
  {/* File Tabs */}
  <div className="file-tabs">
    <div className="file-list">
      {files.map((file, index) => (
        <div
          key={file.id}
          className={`file-tab ${activeFile === index ? 'active-tab' : 'inactive-tab'}`}
          onClick={() => setActiveFile(index)}
        >
          <FileText className="file-icon" />
          <span className="file-name">{file.name}</span>
          {files.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeFile(index);
              }}
              className="close-button"
            >
              <X className="close-icon" />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addNewFile}
        className="add-button"
      >
        <Plus className="add-icon" />
      </button>
    </div>

    <div className="run-wrapper">
      <button onClick={onRun} className="run-button">
        <Play className="run-icon" />
        <span>Run</span>
      </button>
    </div>
  </div>

  {/* Code Editor */}
  <div className="code-editor">
    {/* Line Numbers */}
    <div className="line-numbers">
      {lines.map((_, index) => (
        <div key={index} className="line-number">
          {index + 1}
        </div>
      ))}
    </div>

    {/* Code Area */}
    <div className="code-area">
      <textarea
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
        className="code-textarea"
        placeholder="Write your code here..."
        spellCheck={false}
        style={{
          fontFamily:
            'JetBrains Mono, Fira Code, Monaco, Consolas, "Courier New", monospace',
          tabSize: 4
        }}
      />
    </div>
  </div>

  {/* Status Bar */}
  <div className="status-bar">
    <div className="status-left">
      <span>Line {cursorPosition.line}, Column {cursorPosition.column}</span>
      <span>UTF-8</span>
      <span>{language.toUpperCase()}</span>
    </div>
    <div className="status-right">
      <span>Spaces: 4</span>
      <span>Lines: {lines.length}</span>
    </div>
  </div>
</div>
  );
};

export default CodeEditor;