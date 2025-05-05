import React from "react";

function SectionHeading({ text, children }) {
  return (
    <h1 className="text-3xl xl:text-5xl font-bold leading-tight">
      {text} {children}
    </h1>
  );
}

export default SectionHeading;
