import React from "react";
import SectionHeading from "../common/SectionHeading";
import AboutImage from "./AboutImage";

function AboutMain() {
  return (
    <div className="container mx-auto min-h-screen my-8 xl:my-12">
      <div className="flex flex-col items-center justify-center text-center px-6 xl:px-0">
        <div className="flex flex-col gap-8 mb-8">
          <SectionHeading text="About">
            <span className="text-accent">Me</span>
          </SectionHeading>
          <p className="max-w-[500px] xl:max-w-[800px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            officia exercitationem, quos facere veritatis, quo rem cumque
            molestias, delectus nobis aut deleniti cum? Minus nam minima commodi
            doloremque fuga expedita.
          </p>
        </div>
        <div className="flex flex-col gap-8 justify-center items-center xl:flex-row w-full xl:justify-around py-8">
          <AboutImage />
          <div>Content</div>
        </div>
      </div>
    </div>
  );
}

export default AboutMain;
