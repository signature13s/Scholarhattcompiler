import React from 'react';
import { Play, Download, Copy, Share, RotateCcw, Settings, Menu } from 'lucide-react';
import'./MobileToolbar.css'
interface MobileToolbarProps {
  onRun: () => void;
  onDownload: () => void;
  onCopy: () => void;
  onShare: () => void;
  onReset: () => void;
  onSettings: () => void;
  onMenuToggle: () => void;
}

const MobileToolbar: React.FC<MobileToolbarProps> = ({
  onRun,
  onDownload,
  onCopy,
  onShare,
  onReset,
  onSettings,
  onMenuToggle
}) => {
  return (
   <div className="mobile-toolbar">
  <div className="toolbar-inner">
    <button onClick={onMenuToggle} className="toolbar-icon-button">
      <Menu className="icon-md" />
    </button>

    <div className="toolbar-actions">
      <button onClick={onRun} className="run-button">
        <Play className="icon-sm" />
        <span>Run</span>
      </button>

      <button onClick={onDownload} className="toolbar-icon-button">
        <Download className="icon-sm" />
      </button>

      <button onClick={onCopy} className="toolbar-icon-button">
        <Copy className="icon-sm" />
      </button>

      <button onClick={onShare} className="toolbar-icon-button">
        <Share className="icon-sm" />
      </button>

      <button onClick={onReset} className="toolbar-icon-button">
        <RotateCcw className="icon-sm" />
      </button>

      <button onClick={onSettings} className="toolbar-icon-button">
        <Settings className="icon-sm" />
      </button>
    </div>
  </div>
</div>
  );
};

export default MobileToolbar;