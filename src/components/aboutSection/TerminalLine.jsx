import React from "react";

const TerminalLine = ({ path, command, output }) => {
  return (
    <div>
      <p className="text-green-400">
        <span className="text-blue-400 text-sm xl:text-lg">deju@portfolio</span>
        :<span className="text-purple-400 text-sm xl:text-lg">{path}</span>${" "}
        {command}
      </p>
      <p className="pl-4 text-green-200 whitespace-pre-wrap text-sm xl:text-lg">
        <span className="text-green-400">&gt; </span>
        {output}
      </p>
    </div>
  );
};

export default TerminalLine;
