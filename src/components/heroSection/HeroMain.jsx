import React, { useEffect, useState } from "react";
import DownloadCVButton from "../common/DownloadCVButton";
import { motion } from "framer-motion";
import LottieAnimation from "./LottieAnimation";

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
    <div className="relative flex items-center justify-center min-h-[95vh] w-full">
      <motion.div
        className="relative flex flex-col text-center items-center justify-center text-primary"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <LottieAnimation />
        <h1 className="text-3xl xl:text-5xl">
          {displayedText}
          <span className="text-accent animate-blink">|</span>
        </h1>
        <p className="text-sm xl:text-lg max-w-[500px] px-2 xl:max-w-[800px] my-4 text-primary/80">
          Just a curious human who turns ☕ + 💻 into fun and useful projects...
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <DownloadCVButton />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroMain;
