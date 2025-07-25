import React, { useState } from "react";
import {
  Terminal,
  FileInput,
  ChevronDown,
  ChevronUp,
  Trash2,
} from "lucide-react";

interface InputOutputPanelProps {
  Output: any;
  onInputChange: (input: string) => void;
  onRun: () => void;
}

const InputOutputPanel: React.FC<InputOutputPanelProps> = ({
  Output,
  onInputChange,
}) => {
  const [input, setInput] = useState("");
  const [isInputExpanded, setIsInputExpanded] = useState(true);
  const [isOutputExpanded, setIsOutputExpanded] = useState(true);

  const handleInputChange = (value: string) => {
    setInput(value);
    onInputChange(value);
  };

  const clearOutput = () => {
    // This would typically clear the output in the parent component
  };

  const formatTerminalOutput = (result: {
    status: string;
    timeTaken: string;
    memoryUsed: string;
    output: string[];
  }) => {
    const { status, output } = result;
    const headerLines = [""];
    const outputLines = Array.isArray(output) ? output : [];
    const allLines = [...headerLines, ...outputLines];
    return allLines.map((line, index) => {
      if (status == "Error" || status == "error") {
        return (
          <div key={index} className="text-white p-1 rounded-md">
            {line}
          </div>
        );
      } else if (status == "Warning" || status == "warning") {
        return (
          <div key={index} className="text-white p-1 rounded-md">
            {line}
          </div>
        );
      } else if (status == "Success" || status == "success") {
        return (
          <div key={index} className="text-white p-1 rounded-md">
            {line}
          </div>
        );
      }
      return (
        <div key={index} className="text-gray-300">
          {line}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col  h-full">
      {/* Input Section */}
      <div className="border-b border-gray-700 w-full">
        <div
          className="flex justify-between items-center py-[0.5rem] px-4 cursor-pointer hover:bg-gray-800"
          onClick={() => setIsInputExpanded(!isInputExpanded)}
        >
          <div className="flex items-center gap-2">
            <FileInput className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-semibold text-white">Input</h3>
          </div>
          {isInputExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>

        {isInputExpanded && (
          <div className="py-2 px-2">
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter input for your program..."
              className="w-[92%] h-12 p-4 text-sm bg-gray-800 border border-gray-700 rounded-lg resize-none outline-none text-gray-200 font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              style={{
                fontFamily:
                  'JetBrains Mono, Fira Code, Monaco, Consolas, "Courier New", monospace',
              }}
            />
          </div>
        )}
      </div>

      {/* Output Section */}
      <div className="flex-1 flex flex-col">
        <div
          className="flex justify-between items-center py-0.5 px-4 cursor-pointer hover:bg-gray-800 border-b border-gray-700"
          onClick={() => setIsOutputExpanded(!isOutputExpanded)}
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-green-400" />
            <h3 className="text-base font-semibold text-white">Output</h3>
          </div>
          {Output ? (
            Output.status ? (
              Output.status == "Success" ? (
                <p className="text-white">Compiled</p>
              ) : Output.status == "Error" ? (
                <p className="text-white">Error</p>
              ) : (
                <p className="text-white">Pending</p>
              )
            ) : (
              <p className="text-white">Executing code ...</p>
            )
          ) : (
            <></>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearOutput();
              }}
              className="p-1.5 rounded bg-gray-900 hover:bg-gray-700"
              title="Clear output"
            >
              <Trash2 className="w-5 h-5 text-red-400" />
            </button>
            {isOutputExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>

        {isOutputExpanded && (
          <div className="flex-1">
            <div className="w-[92%] h-[23rem] bg-black rounded-lg p-4 font-mono text-sm min-h-full">
              {Output ? (
                <div className="[&>*+*]:mt-1">
                  {formatTerminalOutput(Output)}
                </div>
              ) : (
                <div className="italic text-gray-400">
                  Click "Run" to see output...
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Console Info */}
      <div className="mt-8 p-4 bg-gray-800 border-gray-700">
        <div className="text-sm text-gray-400">
          <div className="flex justify-between">
            <span>Console</span>
            <span className="text-green-500 font-medium">Ready</span>
          </div>
          <div className="text-xs opacity-75">
            Execution time: {Output ? Output?.timeTaken + " Seconds" : ""}
          </div>
          <div className="text-xs opacity-75">
            Memory Used: {Output ? Output?.memoryUsed + " KB" : " "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputOutputPanel;
