import React from "react";
import { Play, Download, Copy, RotateCcw } from "lucide-react";

interface MobileToolbarProps {
  onRun: () => void;
}

const MobileToolbar: React.FC<MobileToolbarProps> = ({ onRun }) => {
  return (
    <div className="block md:hidden bg-gray-900 border-t border-gray-700 p-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={onRun}
            className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors duration-200"
          >
            <Play className="w-4 h-4" />
            <span>Run</span>
          </button>

          <button className="p-2 rounded text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-all duration-200">
            <Download className="w-4 h-4" />
          </button>

          <button className="p-2 rounded text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-all duration-200">
            <Copy className="w-4 h-4" />
          </button>
          <button className="p-2 rounded text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-all duration-200">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileToolbar;
