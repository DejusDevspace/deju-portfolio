import React from "react";
import TerminalAbout from "./TerminalAbout";
import SectionHeading from "../layout/SectionHeading";

const TerminalWindow = () => {
  return (
    <section
      id="about"
      className="flex flex-col min-h-screen gap-8 items-center justify-center px-4 z-10"
    >
      <SectionHeading text="About">
        <span className="text-accent">Me</span>{" "}
      </SectionHeading>
      <TerminalAbout />
    </section>
  );
};

export default TerminalWindow;
