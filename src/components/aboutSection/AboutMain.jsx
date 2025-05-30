import React from "react";
import SectionHeading from "../layout/SectionHeading";
import AboutContent from "./AboutContent";
import ToolSpan from "./ToolSpan";

const AboutMain = () => {
  return (
    <div className="relative container mx-auto my-12 xl:my-16 overflow-hidden">
      <div className="relative flex flex-col items-center justify-center px-6 xl:px-0 gap-8">
        <div className="flex flex-col gap-8 mb-8">
          <SectionHeading text="about">
            <span className="text-accent">me</span>
          </SectionHeading>
          <AboutContent />
        </div>
      </div>
    </div>
  );
};

export default AboutMain;
