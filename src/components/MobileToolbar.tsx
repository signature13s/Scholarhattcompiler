import React from "react";
import {
  Play,
  Download,
  Copy,
  Share,
  RotateCcw,
  Settings,
  Menu,
} from "lucide-react";

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
  onMenuToggle,
}) => {
  return (
    <div className="block md:hidden bg-gray-900 border-t border-gray-700 p-2">
      <div className="flex justify-between items-center">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-all duration-200"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onRun}
            className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors duration-200"
          >
            <Play className="w-4 h-4" />
            <span>Run</span>
          </button>

          <button
            onClick={onDownload}
            className="p-2 rounded text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-all duration-200"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={onCopy}
            className="p-2 rounded text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-all duration-200"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            onClick={onShare}
            className="p-2 rounded text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-all duration-200"
          >
            <Share className="w-4 h-4" />
          </button>

          <button
            onClick={onReset}
            className="p-2 rounded text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onSettings}
            className="p-2 rounded text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-all duration-200"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileToolbar;
