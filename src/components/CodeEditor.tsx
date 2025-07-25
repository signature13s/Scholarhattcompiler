import React, { useState, useEffect } from "react";
import {
  Play,
  FileText,
  X,
  Plus,
  Download,
  Copy,
  RotateCcw,
} from "lucide-react";
import "../assets/CSS/Editor.css";
import Editor from "@monaco-editor/react";

import { SAMPLE_CODE } from "../helpers/constant";
interface CodeEditorProps {
  language: string;
  onRun: () => void;
  onDownload: () => void;
  onCopy: () => void;
  onReset: () => void;
  user: string;
  seteditorstate: any;
  editorstate: {
    user: string;
    file: string;
    language: string; //csharp, java, python, javascript, typescript
    code: string | undefined;
    input: [];
    downloadFile: string;
  };
  output: any;
}

interface FileTab {
  id: string;
  name: string;
  content: string | undefined;
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  onRun,
  onDownload,
  onCopy,
  onReset,
  output,
  editorstate,
  seteditorstate,
}) => {
  const [activeFile, setActiveFile] = useState(0);
  const [files, setFiles] = useState<FileTab[]>(
    SAMPLE_CODE.filter((snippet) => snippet.language == language)
  );
  const [code, setCode] = useState(files[0].content);

  function runcode() {
    const currentState = editorstate;
    currentState.code = code;
    seteditorstate(currentState);
  }
  useEffect(() => {
    runcode();
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
      name: `file${files.length + 1}.${language}`,
      content: SAMPLE_CODE.find((snippet) => snippet.language == language)
        ?.content,
      language: language,
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

  const lines = code?.split("\n");
  const handleEditorWillMount = (monaco: any) => {
    monaco.editor.defineTheme("monaco-111827-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "", foreground: "D4D4D4", background: "111827" },
        { token: "comment", foreground: "6A9955", fontStyle: "italic" },
        { token: "string", foreground: "CE9178" },
        { token: "variable", foreground: "9CDCFE" },
        { token: "keyword", foreground: "C586C0" },
        { token: "number", foreground: "B5CEA8" },
        { token: "type.identifier", foreground: "4EC9B0" },
        { token: "function", foreground: "DCDCAA" },
      ],
      colors: {
        "editor.background": "#111827",
        "editor.foreground": "#D4D4D4",
        "editorLineNumber.foreground": "#5B6B80",
        "editorLineNumber.activeForeground": "#9CDCFE",
        "editorCursor.foreground": "#FFFFFF",
        "editor.selectionBackground": "#264F78",
        "editor.inactiveSelectionBackground": "#3A3D41",

        // 🔧 Fix white gutter (glyph margin)
        "editorGutter.background": "#111827",
        "editorGutter.modifiedBackground": "#1B1F23",
        "editorGutter.addedBackground": "#1B1F23",
        "editorGutter.deletedBackground": "#1B1F23",
      },
    });
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    monaco.editor.setTheme("monaco-111827-dark");
  };

  return (
    <div className="editor-container">
      {/* File Tabs */}
      <div className="file-tabs">
        <div className="file-list">
          {files.map((file, index) => (
            <div
              key={file.id}
              className={`file-tab ${
                activeFile === index ? "active-tab" : "inactive-tab"
              }`}
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
          <button onClick={addNewFile} className="add-button">
            <Plus className="add-icon" />
          </button>
        </div>

        <div className="run-wrapper">
          <button
            onClick={onDownload}
            className="action-button"
            title="Download"
          >
            <Download className="icon" />
          </button>
          <button onClick={onCopy} className="action-button" title="Copy">
            <Copy className="icon" />
          </button>
          <button onClick={onReset} className="action-button" title="Reset">
            <RotateCcw className="icon" />
          </button>
          <button
            onClick={onRun}
            className="run-button"
            disabled={output ? (output.status ? false : true) : false}
          >
            <Play className="run-icon" />
            <span>Run</span>
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="code-editor">
        {/* Line Numbers */}
        <div className="line-numbers">
          {lines?.map((_, index) => (
            <div key={index} className="line-number">
              {index + 1}
            </div>
          ))}
        </div>
        {/* Code Area */}
        <div className="code-area">
          <Editor
            height="calc(100vh - 140px)" // or "400px", or whatever fits your layout
            language={language} // or "python", "typescript", etc.
            value={code}
            onChange={(values) => handleCodeChange(values)}
            beforeMount={handleEditorWillMount}
            onMount={handleEditorDidMount}
            theme="monaco-111827-dark"
            options={{
              fontSize: 14,
              fontFamily:
                'JetBrains Mono, Fira Code, Monaco, Consolas, "Courier New", monospace',
              minimap: { enabled: false },
              lineNumbers: "off",
              tabSize: 4,
              automaticLayout: true,
              scrollBeyondLastLine: false,
              wordWrap: "on",
              padding: { top: 10 },
            }}
          />
          {/* <textarea
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="code-textarea"
            placeholder="Write your code here..."
            spellCheck={false}
            style={{
              fontFamily:
                'JetBrains Mono, Fira Code, Monaco, Consolas, "Courier New", monospace',
              tabSize: 4,
            }}
          /> */}
        </div>
      </div>

      {/* Status Bar */}
      {/* <div className="status-bar">
        <div className="status-left">
          <span>
            Line {cursorPosition.line}, Column {cursorPosition.column}
          </span>
          <span>UTF-8</span>
          <span>{language.toUpperCase()}</span>
        </div>
        <div className="status-right">
          <span>Spaces: 4</span>
          <span>Lines: {lines.length}</span>
        </div>
      </div> */}
    </div>
  );
};

export default CodeEditor;
