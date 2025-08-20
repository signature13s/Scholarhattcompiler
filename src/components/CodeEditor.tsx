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
import Editor from "@monaco-editor/react";
import { SAMPLE_CODE } from "../helpers/constant";
import { ToastContainer, toast } from "react-toastify";
interface CodeEditorProps {
  language: string;
  onRun: () => void;
  user: string;
  seteditorstate: any;
  editorstate: {
    user: string;
    file: string;
    language: string | undefined;
    code: string | undefined;
    input: string[];
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
  output,
  editorstate,
  seteditorstate,
}) => {
  const [activeFile, setActiveFile] = useState(0);
  const [files, setFiles] = useState<FileTab[]>(
    SAMPLE_CODE.filter((snippet) => snippet.language == language)
  );
  const [code, setCode] = useState(editorstate.code);
  const [initialCode, setInitialCode] = useState<string>(
    editorstate.code || files[activeFile]?.content || ""
  );
  const copied = () => toast("Code Copied Successfully!");
  const Reset = () => toast("Code Reset Successful!");
  function runcode() {
    const currentState = editorstate;
    currentState.code = code;
    seteditorstate(currentState);
  }
  function onCopy() {
    navigator.clipboard.writeText(code || "");
    copied();
  }

  function onDownload() {
    const blob = new Blob([code || ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = editorstate.downloadFile || "code.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    copied();
  }

  function onReset() {
    setCode(initialCode || "");
    setInitialCode(initialCode || "");
    Reset();
  }
  useEffect(() => {
    runcode();
    setCode(editorstate.code);
  }, [activeFile, files]);

  const handleCodeChange = (newCode: any) => {
    setCode(newCode);
    const updatedFiles = [...files];
    updatedFiles[activeFile].content = newCode;
    editorstate.code = newCode;
    setFiles(updatedFiles);
  };

  const addNewFile = () => {
    const newFile: FileTab = {
      id: Date.now().toString(),
      name: `file${files.length + 1}.${language}`,
      content: editorstate.code,
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
        "editorGutter.background": "#111827",
        "editorGutter.modifiedBackground": "#1B1F23",
        "editorGutter.addedBackground": "#1B1F23",
        "editorGutter.deletedBackground": "#1B1F23",
      },
    });
  };

  const handleEditorDidMount = (_editor: any, monaco: any) => {
    monaco.editor.setTheme("monaco-111827-dark");
  };

  return (
    <>
      <style>
        {`
          .monaco-editor .margin,
          .monaco-editor .glyph-margin,
          .monaco-editor .margin-view-zones {
            background-color: #111827 !important;
          }
          .monaco-editor,
          .monaco-scrollable-element,
          .monaco-editor-background {
            overflow: visible !important;
          }
        `}
      </style>
      <div className="flex-1 flex flex-col bg-gray-800">
        {/* File Tabs */}
        <div className="flex items-center bg-gray-900 border-b border-gray-700">
          <div className="flex-1 flex items-center overflow-x-auto">
            {files.map((file, index) => (
              <div
                key={file.id}
                className={`flex items-center gap-2 px-4 py-2 border-r border-gray-700 cursor-pointer ${
                  activeFile === index
                    ? "bg-gray-800 text-blue-400"
                    : "text-gray-400 hover:bg-gray-800"
                }`}
                onClick={() => setActiveFile(index)}
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">{file.name}</span>
                {files.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeFile(index);
                    }}
                    className="p-1 rounded hover:bg-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addNewFile}
              className="p-2 text-blue-400 bg-gray-900 hover:text-gray-200 hover:bg-gray-800"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 border-l border-gray-700">
            <button
              onClick={onDownload}
              className="p-2 rounded text-blue-400 hover:text-gray-200 bg-gray-900 transition-all duration-200"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onCopy}
              className="p-2 rounded text-blue-400 hover:text-gray-200 bg-gray-900 transition-all duration-200"
              title="Copy"
            >
              <Copy className="w-4 h-4" />
            </button>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <button
              onClick={onReset}
              className="p-2 rounded text-blue-400 hover:text-gray-200 bg-gray-900 transition-all duration-200"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onRun}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors duration-200"
              disabled={output ? (output.status ? false : true) : false}
            >
              <Play className="w-3 h-3" />
              <span>Run</span>
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex flex-1">
          {/* Line Numbers */}
          <div className="bg-gray-900 text-gray-400 font-mono text-sm p-4 border-r border-gray-700">
            {lines?.map((_, index) => (
              <div key={index} className="text-right pr-2 leading-6">
                {index + 1}
              </div>
            ))}
          </div>
          {/* Code Area */}
          <div className="flex-1 relative">
            <Editor
              height="calc(100vh - 140px)"
              language={language}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
