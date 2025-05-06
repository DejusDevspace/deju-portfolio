import React from "react";
import SectionHeading from "../common/SectionHeading";
import AboutContent from "./AboutContent";
import ToolSpan from "./ToolSpan";

const AboutMain = () => {
  return (
    <div className="relative container mx-auto my-12 xl:my-16">
      <div className="flex flex-col items-center justify-center text-center px-6 xl:px-0 relative gap-8">
        <div className="flex flex-col gap-8 mb-8">
          <SectionHeading text="About">
            <span className="text-accent">Me</span>
          </SectionHeading>
          <p className="max-w-[500px] xl:max-w-[800px] text-primary/60">
            I’m a final-year{" "}
            <span className="text-accent shadow-neonBlue">
              Mechatronics Engineering
            </span>{" "}
            student at Bowen University, Iwo, Nigeria. I’m passionate about{" "}
            <span className="text-accent">Artificial Intelligence</span> and
            continually improving my skills in{" "}
            <span className="text-accent">Machine Learning</span> and{" "}
            <span className="text-accent">Data Science</span>, I’m also
            proficient in{" "}
            <span className="text-accent">full-stack web development</span>. I
            love to code and play around and I'll still edit this section till I
            am comfortable with the text.
          </p>
          <AboutContent />
        </div>
      </div>
    </div>
  );
};

export default AboutMain;
