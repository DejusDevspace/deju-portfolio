import React, { useState } from "react";
import TerminalHeader from "./TerminalHeader";
import TerminalLine from "./TerminalLine";

const routeData = {
  "~": [{ path: "~", command: "whoami", output: "Ojomideju Adejo" }],
  "~/education": [
    {
      path: "~/education",
      command: "cat education.txt",
      output: "B.Eng. Mechatronics Engineering — Bowen University (Final Year)",
    },
  ],
  "~/skills": [
    {
      path: "~/skills",
      command: "ls",
      output:
        "AI  ML  DataScience  WebDev  Backend  Python  JavaScript  React  Node.js",
    },
  ],
  "~/interests": [
    {
      path: "~/interests",
      command: "cat interests.txt",
      output: "AI Research, Generative Models, Robotics, Scalable Systems",
    },
  ],
  "~/experince": [
    {
      path: "~/experience",
      command: "ls",
      output: "To be populated with experience data",
    },
  ],
};

const TerminalAbout = () => {
  const [currentRoute, setCurrentRoute] = useState("~");

  return (
    <div className="bg-black min-h-[550px] xl:min-h-[700px] xl:min-w-[800px] text-accent rounded-lg shadow-lg p-4 mx-auto mt-8 border border-accent">
      <TerminalHeader currentPath={currentRoute} />

      <div className="flex flex-wrap mt-4 gap-2">
        {Object.keys(routeData).map((route) => (
          <button
            key={route}
            onClick={() => setCurrentRoute(route)}
            className={`px-3 py-1 rounded-md border border-accent text-sm hover:bg-accent/40 transition-colors duration-200 ${
              currentRoute === route ? "bg-accent/60" : ""
            }`}
          >
            {route.replace("~/", "") || "home"}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        {routeData[currentRoute].map((entry, idx) => (
          <TerminalLine key={idx} {...entry} />
        ))}
      </div>
    </div>
  );
};

export default TerminalAbout;
