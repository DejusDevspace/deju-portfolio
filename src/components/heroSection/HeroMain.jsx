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
        <h1 className="text-3xl xl:text-5xl">
          {displayedText}
          <span className="text-accent animate-blink">|</span>
        </h1>
        <p className="text-sm xl:text-lg max-w-[500px] px-2 xl:max-w-[800px] my-4 text-primary/80">
          Just a curious human who turns ☕ + 💻 into fun and useful projects...
        </p>
        <DownloadCVButton />
      </div>
    </div>
  );
};

export default HeroMain;
