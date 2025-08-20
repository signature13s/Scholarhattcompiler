import {
  FileTabs,
  useSandpack,
  useActiveCode,
  SandpackStack,
} from "@codesandbox/sandpack-react";
import Editor from "@monaco-editor/react";
import { Download, Copy, RotateCcw, Play } from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

// --------- Custom dark theme for Monaco ----------
const defineCustomTheme = (monaco: any) => {
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
    },
  });
};

const getLanguage = (filename: string) => {
  if (filename.endsWith(".js")) return "javascript";
  if (filename.endsWith(".jsx")) return "javascript";
  if (filename.endsWith(".ts")) return "typescript";
  if (filename.endsWith(".tsx")) return "typescript";
  if (filename.endsWith(".css")) return "css";
  if (filename.endsWith(".html")) return "html";
  if (filename.endsWith(".json")) return "json";
  return "plaintext";
};

interface FileItem {
  id: string;
  name: string;
  content: string;
}

function PlayGroundCodeEditor({ collapsed }: any) {
  const { sandpack } = useSandpack();
  const { code, updateCode } = useActiveCode();
  const [initialCode, setInitialCode] = useState<string>(
    sandpack.activeFile ? sandpack.files[sandpack.activeFile].code : ""
  );
  const lines = code?.split("\n") || [];
  const copied = () => toast("Code Copied Successfully!");
  const Reset = () => toast("Code Reset Successful!");
  // File system actions
  const downloadCode = () => {
    console.log("clicked");
    const blob = new Blob([code], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = sandpack.activeFile.split("/").pop() ?? "file.txt";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code ?? "");
    copied();
  };
  console.log(sandpack);
  const resetCode = () => {
    // Reset to default contents if available, otherwise clear
    updateCode(initialCode || "");
    Reset();
  };

  return (
    <>
      {/* <style>
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
      </style> */}
      <SandpackStack>
        <div
          className={`flex-1 flex flex-col bg-gray-800 ${
            collapsed ? "w-[50rem]" : "w-[60rem]"
          } min-h-screen h-full`}
        >
          {/* File Tabs */}
          <div className="flex items-center bg-gray-900 border-b border-gray-700">
            <div className="flex-1 flex">
              <FileTabs
                closableTabs={true}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  borderRight: "0.1rem",
                  borderColor: "#364153",
                  cursor: "pointer",
                  background: "#1f2937",
                  color: "#60a5fa",
                  border: "none",
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              />
              {/* {filesArray.map((file, index) => (
                <div
                  key={file.id}
                  className={`file-tab ${
                    activeFile === index ? "active-tab" : "inactive-tab"
                  }`}
                  onClick={() => {
                    setActiveFile(index);
                    updateCode(filesArray[index].content);
                  }}
                >
                  <FileText className="file-icon" />
                  <span className="file-name">{file.name}</span>
                </div>
              ))} */}
            </div>
            <div className="flex gap-2 mr-2.5">
              <button
                onClick={downloadCode}
                className="p-2 rounded text-blue-400 hover:text-gray-200 bg-gray-900 transition-all duration-200"
                title="Download"
              >
                <Download size={18} />
              </button>
              <button
                onClick={copyCode}
                className="p-2 rounded text-blue-400 hover:text-gray-200 bg-gray-900 transition-all duration-200"
                title="Copy"
              >
                <Copy size={18} />
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
                onClick={resetCode}
                className="p-2 rounded text-blue-400 hover:text-gray-200 bg-gray-900 transition-all duration-200"
                title="Reset"
              >
                <RotateCcw size={18} />
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors duration-200">
                <Play className="w-3 h-3" />
                <span>Run</span>
              </button>
            </div>
          </div>
          {/* Monaco Editor with line numbers */}
          <div className="flex flex-1 min-h-0">
            <div className="flex flex-1 relative">
              {/* Line Numbers */}
              <div className="bg-gray-900 text-gray-400 font-mono text-sm p-4 border-r border-gray-700">
                {lines.map((_, index) => (
                  <div key={index} className="h-[21px] px-3">
                    {index + 1}
                  </div>
                ))}
              </div>
              {/* Monaco Editor */}
              <div className="flex-1">
                <Editor
                  height="calc(100vh - 150px)"
                  language={getLanguage(sandpack.activeFile)}
                  key={sandpack.files}
                  value={code}
                  onChange={(value) => updateCode(value ?? "")}
                  beforeMount={defineCustomTheme}
                  theme="monaco-111827-dark"
                  options={{
                    fontSize: 14,
                    fontFamily:
                      'JetBrains Mono, Fira Code, Monaco, Consolas, "Courier New", monospace',
                    minimap: { enabled: false },
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    lineNumbers: "off",
                    wordWrap: "on",
                    tabSize: 2,
                    padding: { top: 10 },
                    formatOnType: true,
                    formatOnPaste: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </SandpackStack>
    </>
  );
}

export default PlayGroundCodeEditor;
