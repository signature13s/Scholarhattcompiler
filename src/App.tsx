import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import LanguageSelector from "./components/LanguageSelector.tsx";
import CodeEditor from "./components/CodeEditor.tsx";
import InputOutputPanel from "./components/InputOutputPanel.tsx";
import ResizablePanel from "./components/ResizablePanel.tsx";
import MobileToolbar from "./components/MobileToolbar.tsx";
import {
  SANDBOX_ID,
  SANDBOX_CODE_ID,
  SAMPLE_CODE,
} from "./helpers/constant.ts";
import UtilService from "./helpers/util.ts";
import EditorService from "./services/editor.service.ts";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import PlayGroundCodeEditor from "./components/PlayGroundCodeEditor.tsx";
import {
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";

function generateId() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000000);
  const uniqueNumber = `${timestamp}${random}`.substring(0, 16);
  return uniqueNumber;
}

function getSandBoxId() {
  let id = sessionStorage.getItem(SANDBOX_ID);
  if (id == null) {
    id = generateId();
    sessionStorage.setItem(SANDBOX_ID, id);
  }
  return id;
}

function getSandBoxCode(codeId: any) {
  let sandboxcodeId = sessionStorage.getItem(SANDBOX_CODE_ID);
  let code = localStorage.getItem(codeId) || "";
  if (sandboxcodeId == null && codeId != undefined) {
    sessionStorage.setItem(SANDBOX_CODE_ID, codeId);
    sessionStorage.setItem(codeId, code);
    localStorage.removeItem(codeId);
  } else if (code != null && codeId != undefined) {
    sessionStorage.setItem(SANDBOX_CODE_ID, codeId);
    sessionStorage.setItem(codeId, code);
    localStorage.removeItem(codeId);
  } else if (sandboxcodeId != null) {
    let data = sessionStorage.getItem(sandboxcodeId);
    if (data != null && data != "null") code = data;
  }
  return code;
}

const AppContent: React.FC = () => {
  const params = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    params?.lang || ""
  );
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [data, setData] = useState(" ");
  const sandboxId = getSandBoxId();
  const code = getSandBoxCode(params?.id);

  const [editorState, setEditorState] = useState({
    user: sandboxId,
    file: SANDBOX_ID,
    language: params.lang,
    code:
      SAMPLE_CODE.find((snippet) => snippet.language == params.lang)?.content ||
      "",
    input: input?.length > 0 ? input.split("\n") : [],
    downloadFile: "code.txt",
  });

  function getCourse(category: any) {
    switch (category) {
      case "c":
        return "/free-course/c-course-for-beginners";
      case "cpp":
        return "/free-course/cpp-course-for-beginners";
      case "csharp":
        return "/free-course/csharp-course-for-beginners";
      case "html":
        return "/free-course/html-course";
      case "javascript":
        return "/free-course/java-course";
      case "typescript":
        return "/free-course/typescript-course";
      case "java":
        return "/free-course/java-course";
      case "python":
        return "/free-course/python-course-for-beginners";
      case "kotlin":
        return "";
    }
  }

  function getSkillTest(category: any) {
    switch (category) {
      case "c":
        return "/skill-challenge";
      case "cpp":
        return "/skill-challenge";
      case "csharp":
        return "/skill-challenge/csharp";
      case "html":
        return "/skill-challenge/html";
      case "javascript":
        return "/skill-challenge/javascript";
      case "typescript":
        return "/skill-challenge/typescript";
      case "java":
        return "/skill-challenge";
      case "kotlin":
        return "/skill-challenge";
      case "python":
        return "/skill-challenge";
    }
  }

  function getTutorial(category: any) {
    switch (category) {
      case "c":
        return "/tutorial/c";
      case "cpp":
        return "/tutorial/cpp";
      case "csharp":
        return "/tutorial/csharp";
      case "html":
        return "/tutorial/html";
      case "javascript":
        return "/tutorial/javascript";
      case "typescript":
        return "/tutorial/typescript";
      case "java":
        return "/tutorial/java";
      case "kotlin":
        return "/tutorial/kotlin";
      case "python":
        return "/tutorial/python";
    }
  }

  function getBooks(category: any) {
    switch (category) {
      case "c":
        return "/books/c-interview-questions-and-answers-book-pdf";
      case "cpp":
        return "/books/cpp-interview-questions-and-answers-book-pdf";
      case "csharp":
        return "/books/csharp-interview-questions-and-answers-book-pdf";
      case "html":
        return "/books/html-interview-questions-and-answers-book-pdf";
      case "javascript":
        return "/books/javascript-interview-questions-and-answers-book-pdf";
      case "typescript":
        return "/books/typescript-interview-questions-and-answers-book-pdf";
      case "java":
        return "/books/java-interview-questions-and-answers-book-pdf";
      case "python":
        return "/books/python-interview-questions-and-answers-book-pdf";
      case "kotlin":
        return "";
      default:
        return "";
    }
  }

  // useEffect(() => {
  //   let language = toTitleCase(params.lang);
  //   const course = getCourse(params.lang);
  //   if (course != "" && course != undefined) {
  //     document.getElementById("btn-course").innerHTML = `Free ${language} Course`;
  //     document.getElementById("btn-course").setAttribute("href", course);
  //   } else {
  //     document.getElementById("btn-course").innerHTML = ``;
  //     document.getElementById("btn-course").style.display = "none";
  //   }
  // }, []);

  const runCode = () => {
    let code = editorState.code;
    const currentState = editorState;
    currentState.code = code;
    currentState.input = input?.length > 0 ? input.split("\n") : [];
    setEditorState(currentState);

    const model = {
      file: editorState.user,
      code: code,
      input: editorState.input,
      language: editorState.language,
      user: editorState.user,
    };

    if (model.code != "" && model.code != undefined) {
      if (editorState.language != "html") {
        setOutput("Executing code ...");
      }
      let wordsToCheck = [];
      let isValid = true;
      switch (model.language) {
        case "csharp":
          wordsToCheck = ["console.read()", "console.readline()"];
          isValid = UtilService.CheckCode(
            model.code,
            model.input,
            wordsToCheck,
            setOutput
          );
          if (isValid) {
            EditorService.RunCode(model)
              .then((res) => {
                if (res != undefined) {
                  setOutput(res.data);
                } else {
                  setOutput("Something went wrong, please try again.");
                }
              })
              .catch((err) => {
                setOutput(err);
              });
          } else {
          }
          break;
        case "java":
          wordsToCheck = [
            ".next()",
            ".nextline()",
            ".nextint()",
            ".nextfloat()",
            ".nextdouble()",
            ".nextboolean()",
            ".nextlong()",
          ];
          isValid = UtilService.CheckCode(
            model.code,
            model.input,
            wordsToCheck,
            setOutput
          );
          if (isValid) {
            EditorService.RunCode(model)
              .then((res) => {
                if (res != undefined) {
                  setOutput(res.data);
                  console.log(res.data);
                } else {
                  setOutput("Something went wrong, please try again.");
                }
              })
              .catch((err) => {
                setOutput(err);
              });
          } else {
          }
          break;
        case "c":
          wordsToCheck = ["scanf"];
          isValid = UtilService.CheckCode(
            model.code,
            model.input,
            wordsToCheck,
            setOutput
          );
          if (isValid) {
            EditorService.RunCode(model)
              .then((res) => {
                if (res != undefined) {
                  setOutput(res.data);
                } else {
                  setOutput("Something went wrong, please try again.");
                }
              })
              .catch((err) => {
                setOutput(err);
              });
          } else {
          }
          break;
        case "cpp":
          wordsToCheck = ["cin"];
          isValid = UtilService.CheckCode(
            model.code,
            model.input,
            wordsToCheck,
            setOutput
          );
          if (isValid) {
            EditorService.RunCode(model)
              .then((res) => {
                if (res != undefined) {
                  setOutput(res.data);
                } else {
                  setOutput("Something went wrong, please try again.");
                }
              })
              .catch((err) => {
                setOutput(err);
              });
          } else {
          }
          break;
        case "python":
          wordsToCheck = ["input("];
          isValid = UtilService.CheckCode(
            model.code,
            model.input,
            wordsToCheck,
            setOutput
          );
          if (isValid) {
            EditorService.RunCode(model)
              .then((res) => {
                if (res != undefined) {
                  setOutput(res.data);
                } else {
                  setOutput("Something went wrong, please try again.");
                }
              })
              .catch((err) => {
                setOutput(err);
              });
          } else {
          }
          break;
        case "javascript":
        case "typescript":
          EditorService.RunCode(model)
            .then((res) => {
              setOutput(res.data);
            })
            .catch((err) => {
              setOutput(err);
            });
          break;
        default:
          break;
      }
    }
  };

  const downloadCode = () => {
    console.log("Downloading code...");
  };

  const copyCode = () => {
    console.log("Copying code to clipboard...");
  };

  const resetCode = () => {
    // setOutput("");
    // setInput("");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        runCode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header
        course={getCourse(params.lang) || "#"}
        books={getBooks(params.lang)}
        skillTest={getSkillTest(params.lang) || "#"}
        masterClass={getTutorial(params.lang) || "#"}
      />
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile: Overlay menu */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:hidden relative`}
        >
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-64 z-50">
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
          </div>
        </div>

        {/* Desktop: Sidebar */}
        <div className="hidden md:block">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>
        {params.lang == "html" ||
        params.lang == "react" ||
        params.lang == "angular" ? (
          <SandpackProvider
            template={params?.lang === "html" ? "static" : params.lang}
            theme={{
              colors: {
                surface1: "#111827",
                surface2: "#3A3D41",
                surface3: "#264F78",
                clickable: "#9CDCFE",
                base: "#D4D4D4",
                disabled: "#5B6B80",
                hover: "#264F78",
                accent: "#60a5fa",
                error: "#FFFFFF",
                errorSurface: "#B5CEA8",
              },
              syntax: {
                plain: "#D4D4D4",
                comment: {
                  color: "#6A9955",
                  fontStyle: "italic",
                },
                keyword: "#C586C0",
                tag: "#D4D4D4",
                punctuation: "#D4D4D4",
                definition: "#4EC9B0",
                property: "#9CDCFE",
                static: "#DCDCAA",
                string: "#CE9178",
              },
              font: {
                body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                mono: 'JetBrains Mono, Fira Code, Monaco, Consolas, "Courier New", monospace',
                size: "16px",
                lineHeight: "20px",
              },
            }}
          >
            <SandpackLayout
              style={{
                background: "#111827",
                margin: 0,
                display: "flex",
                height: "100vh",
                overflow: "hidden",
                border: "none",
              }}
            >
              {/* Code Editor Panel */}
              <div className="flex-1 flex flex-col">
                <PlayGroundCodeEditor />
              </div>

              {/* Resizable Preview Panel */}
              <ResizablePanel
                minWidth={300}
                maxWidth={800}
                defaultWidth={480}
                className="h-full box-border bg-gray-900 border-l border-gray-700"
                style={{ height: "100%", boxSizing: "border-box" }}
              >
                <SandpackPreview
                  style={{
                    width: "100%",
                    height: "100%",
                    borderLeft: "1px solid #202939",
                    background: "#fff",
                  }}
                  showOpenInCodeSandbox={false}
                  showRestartButton={false}
                />
              </ResizablePanel>
            </SandpackLayout>
          </SandpackProvider>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row">
            <div className="flex-1 flex flex-col">
              <CodeEditor
                editorstate={editorState}
                seteditorstate={setEditorState}
                data={data}
                setData={setData}
                user={SANDBOX_ID}
                language={selectedLanguage}
                onRun={runCode}
                onDownload={downloadCode}
                onCopy={copyCode}
                onReset={resetCode}
                output={output}
              />
            </div>

            <div className="hidden md:block">
              <ResizablePanel
                minWidth={300}
                maxWidth={800}
                defaultWidth={480}
                className="h-full bg-gray-900 border-l border-gray-700 flex flex-col"
              >
                <InputOutputPanel
                  Output={output}
                  onInputChange={setInput}
                  onRun={runCode}
                />
              </ResizablePanel>
            </div>
          </div>
        )}

        {/* Mobile: I/O bottom panel */}
        <div className="block md:hidden">
          <InputOutputPanel
            Output={output}
            onInputChange={setInput}
            onRun={runCode}
          />
        </div>
      </div>

      <MobileToolbar
        onRun={runCode}
        onDownload={downloadCode}
        onCopy={copyCode}
        onReset={resetCode}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/compiler/:lang/:id" element={<AppContent />}></Route>
      <Route path="/compiler/:lang/" element={<AppContent />}></Route>
      <Route
        path="/compiler"
        element={
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-5">
            <h1 className="text-6xl text-gray-800 m-0">404</h1>
            <h2 className="text-2xl text-gray-600 my-2">Page Not Found</h2>
            <p className="text-lg text-gray-500 mb-8">
              Sorry, the page you're looking for doesn't exist.
            </p>
            <Link
              to="/compiler/java"
              className="inline-block px-5 py-2.5 bg-blue-500 text-white no-underline rounded-md text-base hover:bg-blue-600 transition-colors duration-300"
            >
              Back to Home
            </Link>
          </div>
        }
      ></Route>
    </Routes>
  );
};

export default App;
