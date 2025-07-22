import React, { useState } from "react";
import {
  Terminal,
  FileInput,
  ChevronDown,
  ChevronUp,
  Play,
  Trash2,
} from "lucide-react";
import "../assets/CSS/InputOutput.css";
interface InputOutputPanelProps {
  Output: any;
  onInputChange: (input: string) => void;
  onRun: () => void;
}

const InputOutputPanel: React.FC<InputOutputPanelProps> = ({
  Output,
  onInputChange,
  onRun,
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

    // Format header
    const headerLines = [`Execution code ...`];
    const outputLines = Array.isArray(output) ? output : [];
    const allLines = [...headerLines, ...outputLines];
    return allLines.map((line, index) => {
      if (status == "Error" || status == "error") {
        return (
          <div key={index} className="log-error">
            {line}
          </div>
        );
      } else if (status == "Warning" || status == "warning") {
        return (
          <div key={index} className="log-warning">
            {line}
          </div>
        );
      } else if (status == "Success" || status == "success") {
        return (
          <div key={index} className="log-success">
            {line}
          </div>
        );
      }
      return (
        <div key={index} className="log-default">
          {line}
        </div>
      );
    });
  };

  return (
    <div className="io-wrapper">
      {/* Input Section */}
      <div className="input-section">
        <div
          className="input-header"
          onClick={() => setIsInputExpanded(!isInputExpanded)}
        >
          <div className="input-title">
            <FileInput className="input-icon" />
            <h3 className="input-heading">Input</h3>
          </div>
          {isInputExpanded ? (
            <ChevronUp className="chevron-icon" />
          ) : (
            <ChevronDown className="chevron-icon" />
          )}
        </div>

        {isInputExpanded && (
          <div className="input-body">
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter input for your program..."
              className="input-textarea"
              style={{
                fontFamily:
                  'JetBrains Mono, Fira Code, Monaco, Consolas, "Courier New", monospace',
              }}
            />
            <div className="input-footer">
              <span className="input-count">{input.length} characters</span>
              <button onClick={onRun} className="run-buttonio">
                <Play className="icon-sm" />
                <span>Run</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Output Section */}
      <div className="output-section">
        <div
          className="output-header"
          onClick={() => setIsOutputExpanded(!isOutputExpanded)}
        >
          <div className="output-title">
            <Terminal className="output-icon" />
            <h3 className="output-heading">Output</h3>
          </div>
          <div className="output-controls">
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearOutput();
              }}
              className="clear-button"
              title="Clear output"
            >
              <Trash2 className="icon-sm-clear" />
            </button>
            {isOutputExpanded ? (
              <ChevronUp className="chevron-icon" />
            ) : (
              <ChevronDown className="chevron-icon" />
            )}
          </div>
        </div>

        {isOutputExpanded && (
          <div className="output-body">
            <div className="output-box">
              {Output ? (
                <div className="output-content">
                  {formatTerminalOutput(Output)}
                </div>
              ) : (
                <div className="output-placeholder">
                  Click "Run" to see output...
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Console Info */}
      <div className="console-info">
        <div className="console-meta">
          <div className="console-status">
            <span>Console</span>
            <span className="status-ready">Ready</span>
          </div>
          <div className="console-time">
            Execution time: {Output ? Output?.timeTaken + " Seconds" : ""}
          </div>
          <div className="console-time">
            Memory Used: {Output ? Output?.memoryUsed + " KB" : " "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputOutputPanel;
