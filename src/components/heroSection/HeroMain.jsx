import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DownloadCVButton from "../common/DownloadCVButton";
import LottieAnimation from "./LottieAnimation";

const roles = [
  "a Data Scientist",
  "a Machine Learning Engineer",
  "an AI Engineer",
];

export default function HeroMain() {
  const greeting = "Hi, I'm Deju.";
  const [displayedGreeting, setDisplayedGreeting] = useState("");
  const [greetIndex, setGreetIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (greetIndex < greeting.length) {
      const t = setTimeout(() => {
        setDisplayedGreeting((prev) => prev + greeting[greetIndex]);
        setGreetIndex((i) => i + 1);
      }, 100);
      return () => clearTimeout(t);
    }
  }, [greetIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-[95vh] w-full">
      <motion.div
        className="relative flex flex-col text-center items-center justify-center text-primary px-4"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        <LottieAnimation />

        {/* Greeting */}
        <h1 className="text-3xl xl:text-5xl font-medium">
          {displayedGreeting}
          <span className="text-accent animate-blink">|</span>
        </h1>

        {/* Rotating Roles */}
        <div className="h-8 xl:h-10 overflow-hidden mt-2">
          <AnimatePresence exitBeforeEnter>
            <motion.h2
              key={roles[roleIndex]}
              className="text-md xl:text-xl text-accent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {`I'm ${roles[roleIndex]}.`}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Subtext */}
        <p className="text-sm xl:text-lg max-w-[500px] px-2 xl:max-w-[800px] my-4 text-primary/80">
          Just a curious human who turns ☕ + 💻 into fun and useful projects...
        </p>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
        >
          <DownloadCVButton />
        </motion.div>
      </motion.div>
    </div>
  );
}
