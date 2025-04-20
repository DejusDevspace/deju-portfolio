import React from "react";
import SectionHeading from "../common/SectionHeading";
import DownloadCVButton from "../common/DownloadCVButton";
import ToolsSpan from "./ToolSpan";

function HeroMain() {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center w-full"
      style={{ backgroundImage: "url('/src/assets/heroBg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 bg-opacity-50" />

      <div className="relative flex flex-col text-center items-center justify-center text-white">
        <SectionHeading text="Hi, I'm Deju" />
        <p className="text-md xl:text-lg mt-4">
          Full Stack Data Scientist | Generative AI | MLOps | Backend Developer{" "}
        </p>
        <DownloadCVButton>
          {/* Hire Me Button */}
          <a
            href="https://www.linkedin.com/in/deju-adejo/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:block bg-cyan-400 text-black font-bold py-3 px-6 rounded-lg cursor-pointer 
            shadow-[0_0_15px_#00FFFF] hover:bg-purple-600 hover:text-white hover:shadow-[0_0_25px_#9F00FF] 
            transition-all duration-300"
          >
            Hire Me
          </a>
        </DownloadCVButton>
      </div>
    </section>
  );
}

export default HeroMain;
