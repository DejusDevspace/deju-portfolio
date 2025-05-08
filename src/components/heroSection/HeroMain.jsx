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
      <div className="relative flex flex-col text-center items-center justify-center text-white">
        <SectionHeading
          text={
            <>
              {displayedText}
              <span className="text-accent animate-blink">|</span>
            </>
          }
        />
        <p className="text-md xl:text-lg max-w-[500px] px-2 xl:max-w-[800px] my-4">
          I am a final year Mechatronics Engineering student at Bowen
          University. I love doing one thing or the other with code. I would
          fill this section when I have clearer ideas
        </p>
        <DownloadCVButton>
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
    </div>
  );
};

export default HeroMain;
