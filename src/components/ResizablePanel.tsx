import React, { useState, useRef, useEffect } from "react";
import "../assets/CSS/ResizablePanel.css";
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
    <div className="resizable-wrapper">
      {/* Resize Handle */}
      <div
        className={`resize-handle ${isResizing ? "resizing" : ""}`}
        onMouseDown={handleMouseDown}
        style={{ minHeight: "100%" }}
      >
        <div className="resize-handle-inner">
          <div className="resize-bar"></div>
        </div>
      </div>

      {/* Panel Content */}
      <div
        ref={panelRef}
        className="resizable-panel"
        style={{ width: `${width}px` }}
      >
        {children}
      </div>
    </div>
  );
};

export default ResizablePanel;
