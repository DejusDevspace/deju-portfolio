import React from "react";
import SectionHeading from "../common/SectionHeading";
import GhibliAvatar from "./GhibliAvatar";
import AboutContent from "./AboutContent";
import ToolSpan from "./ToolSpan";

function AboutMain() {
  return (
    <div className="relative container mx-auto my-12 xl:my-16">
      <div className="flex flex-col items-center justify-center text-center px-6 xl:px-0 relative gap-8">
        <div className="flex flex-col gap-8 mb-8">
          <SectionHeading text="About">
            <span className="text-accent">Me</span>
          </SectionHeading>
          <p className="max-w-[500px] xl:max-w-[800px] uppercase text-primary/60">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            officia exercitationem, quos facere veritatis, quo rem cumque
            molestias, delectus nobis aut deleniti cum? Minus nam minima commodi
            doloremque fuga expedita.
          </p>
          <AboutContent />
        </div>
        <div className="container mx-auto text-center flex flex-col my-12 gap-6">
          <SectionHeading text="Tools & Technologies" />
          <ToolSpan animateInverse={false} />
          <ToolSpan animateInverse={true} />
        </div>
      </div>
    </div>
  );
}

export default AboutMain;
