export const SANDBOX_ID = "sbid";
export const SANDBOX_CODE_ID = "sbcid";

// export const WS_API = window.location.origin.indexOf('44312') > -1 ? 'ws://localhost:6969':'wss://scholarhat.io/ws';
// export const SIGNALR_API = window.location.origin.indexOf('44312') > -1 ? 'http://localhost:6969/sr':'https://scholarhat.io/signalr';

export const API_ADDRESS =
  window.location.origin.indexOf("44312") > -1
    ? "https://localhost:44310"
    : "https://www.scholarhat.io";

export const SAMPLE_CODE = [
  {
    id: "1",
    name: "program.c",
    content:
      '#include <stdio.h>\n\nint main() {\n  // Write C code here\n  printf("Hello ScholarHat!");\n  return 0;\n}',
    language: "c",
  },
  {
    id: "1",
    name: "program.cpp",
    content:
      '#include <iostream>\nusing namespace std;\n\nint main() {\n  // Write C++ code here\n  cout << "Hello ScholarHat!";\n  return 0;\n}',
    language: "cpp",
  },
  {
    id: "1",
    name: "Program.cs",
    content:
      'using System;\n\n// Write C# code here\nConsole.WriteLine("Hello ScholarHat!");',
    language: "csharp",
  },
  {
    id: "1",
    name: "Program.java",
    content:
      'class Program {\n  public static void main(String[] args) {\n    // Write Java code here\n    System.out.println("Hello ScholarHat!");\n  }\n}',
    language: "java",
  },
  {
    id: "1",
    name: "program.kt",
    content:
      'fun main() {\n  // Write Kotlin code here\n  println("Hello, ScholarHat!")\n}',
    language: "kotlin",
  },
  {
    id: "1",
    name: "script.js",
    content: '// Write JavaScript code here\nconsole.log("Hello ScholarHat!");',
    language: "javascript",
  },
  {
    id: "1",
    name: "script.py",
    content: '# Write Python code here\nprint("Hello ScholarHat!")',
    language: "python",
  },
  {
    id: "1",
    name: "script.ts",
    content: '// Write TypeScript code here\nconsole.log("Hello ScholarHat!");',
    language: "typescript",
  },
  {
    id: "1",
    name: "index.html",
    content:
      "<!DOCTYPE html>\n<html>\n<head>\n  <title>ScholarHat WebApp</title>\n</head>\n<body>\n  <!-- Write HTML code here -->\n  <h1>Hello ScholarHat!</h1>\n</body>\n</html>",
    language: "html",
  },
];
