import React from "react";
import SectionHeading from "../common/SectionHeading";
import AboutImage from "./AboutImage";
import AboutContent from "./AboutContent";

function AboutMain() {
  return (
    <div className="container mx-auto my-12 xl:my-16">
      <div className="flex flex-col items-center justify-center text-center px-6 xl:px-0">
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
        </div>
        <div className="flex flex-col gap-8 justify-center xl:flex-row w-full py-8">
          <AboutImage />
          <AboutContent />
        </div>
      </div>
    </div>
  );
}

export default AboutMain;
