import React, { useEffect, useRef, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  FileTabs,
  useSandpack,
  useActiveCode,
  SandpackStack,
} from "@codesandbox/sandpack-react";
import Editor from "@monaco-editor/react";
import { Download, Copy, RotateCcw, Play, FileText } from "lucide-react";
import "../assets/CSS/Playeditor.css";
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
function PlayGroundCodeEditor() {
  const { sandpack } = useSandpack();
  const { code, updateCode } = useActiveCode();

  const lines = code?.split("\n") || [];

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
  };

  const resetCode = () => {
    // Reset to default contents if available, otherwise clear
    updateCode("");
  };

  return (
    <SandpackStack>
      <div
        className="editor-container"
        style={{
          background: "#111827",
          minHeight: "100vh",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* File Tabs */}
        <div
          className="file-tabs"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="file-list" style={{ flex: 1, display: "flex" }}>
            <FileTabs
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",

                borderRight: "1px solid #374151",
                cursor: "pointer",
                background: "#1f2937",
                color: "#60a5fa",
                border: "none",
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
          <div
            className="run-wrapper"
            style={{ display: "flex", gap: 8, marginRight: 10 }}
          >
            <button
              onClick={downloadCode}
              className="action-button"
              title="Download"
            >
              <Download size={18} style={{ color: "#aaa" }} />
            </button>
            <button onClick={copyCode} className="action-button" title="Copy">
              <Copy size={18} style={{ color: "#aaa" }} />
            </button>
            <button onClick={resetCode} className="action-button" title="Reset">
              <RotateCcw size={18} style={{ color: "#aaa" }} />
            </button>
            <button className="run-button">
              <Play className="run-icon" />
              <span>Run</span>
            </button>
          </div>
        </div>
        {/* Monaco Editor with line numbers */}
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          <div
            className="code-editor"
            style={{ display: "flex", flex: 1, position: "relative" }}
          >
            {/* Line Numbers */}
            <div className="line-numbers">
              {lines.map((_, index) => (
                <div key={index} style={{ height: 21, padding: "0 12px" }}>
                  {index + 1}
                </div>
              ))}
            </div>
            {/* Monaco Editor */}
            <div className="code-area" style={{ flex: 1 }}>
              <Editor
                height="calc(100vh - 77px)" // adjust as per your header height
                language={getLanguage(sandpack.activeFile)}
                key={sandpack.activeFile}
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
                  lineNumbers: "off", // handled manually
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
  );
}

export default PlayGroundCodeEditor;
