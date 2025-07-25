import React, { useState, useRef, useEffect } from "react";

interface ResizablePanelProps {
  children: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  className?: string;
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  minWidth = 300,
  maxWidth = 800,
  defaultWidth = 480,
  className = "",
}) => {
  const [width, setWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;

    // Prevent text selection during resize
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = startXRef.current - e.clientX; // Reverse direction for left resize
      const newWidth = Math.min(
        Math.max(startWidthRef.current + deltaX, minWidth),
        maxWidth
      );

      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, minWidth, maxWidth]);

  return (
    <div className="flex">
      {/* Resize Handle */}
      <div
        className={`w-1 bg-gray-700 cursor-col-resize transition-colors duration-200 hover:bg-blue-400 ${
          isResizing ? "bg-blue-400" : ""
        }`}
        onMouseDown={handleMouseDown}
        style={{ minHeight: "100%" }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-0.5 h-8 bg-gray-500 rounded-full opacity-50"></div>
        </div>
      </div>

      {/* Panel Content */}
      <div
        ref={panelRef}
        className={`resizable-panel ${className}`}
        style={{ width: `${width}px` }}
      >
        {children}
      </div>
    </div>
  );
};

export default ResizablePanel;
