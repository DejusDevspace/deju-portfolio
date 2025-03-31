import React from "react";
import { FiDownload } from "react-icons/fi";

function HeroMain() {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center w-full"
      style={{ backgroundImage: "url('/src/assets/heroBg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/80 bg-opacity-50"></div>
      {/* Overlay */}
      <div className="relative z-5 flex flex-col text-center items-center justify-center text-white">
        <h1 className="text-5xl font-bold leading-tight">Hi, I'm Deju</h1>
        <p className="text-lg">
          Full Stack Data Scientist | Generative AI | MLOps | Backend Developer{" "}
        </p>
        <div className="flex flex-col xl:flex-row items-center gap-8 mt-4">
          {/* Download CV Button */}
          <a
            href="/Deju_Adejo_CV.pdf"
            download
            className="flex items-center gap-2 bg-black text-cyan-400 px-6 py-3 rounded-lg cursor-pointer 
            shadow-[0_0_15px_#00FFFF] hover:shadow-[0_0_25px_#9F00FF] transition-all duration-300"
          >
            <span>Download CV</span>
            <FiDownload className="text-xl" />
          </a>

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
        </div>
      </div>
    </section>
  );
}

export default HeroMain;
