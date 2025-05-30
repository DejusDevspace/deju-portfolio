import React, { useEffect, useState } from "react";
import SectionHeading from "../layout/SectionHeading";
import DownloadCVButton from "../common/DownloadCVButton";
import HeroBackgroundScene from "./HeroBackgroundScene";

const HeroMain = () => {
  const fullText = "Hi, I'm Deju.";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full">
      {/* <HeroBackgroundScene /> */}
      <section className="relative flex flex-col text-center items-center justify-center text-white">
        <h1 className="text-5xl">
          {displayedText}
          <span className="text-accent animate-blink">|</span>
        </h1>
        <p className="text-md xl:text-lg max-w-[500px] px-2 xl:max-w-[800px] my-4 text-primary/80">
          Just a curios human who turns ☕ + 💻 into fun projects.
        </p>
        <DownloadCVButton>
          {/* <a
            href="https://www.linkedin.com/in/deju-adejo/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:block bg-cyan-400 text-black font-bold py-3 px-6 rounded-lg cursor-pointer
              shadow-[0_0_15px_#00FFFF] hover:text-white transition-all duration-300"
          >
            Hire Me
          </a> */}
        </DownloadCVButton>
      </section>
    </div>
  );
};

export default HeroMain;
