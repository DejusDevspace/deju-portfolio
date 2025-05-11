import React from "react";

const TerminalHeader = ({ currentPath }) => {
  return (
    <div className="flex items-center justify-between text-sm text-accent">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="ml-4">deju@portfolio:{currentPath}</span>
      </div>
      <span>Terminal</span>
    </div>
  );
};

export default TerminalHeader;
