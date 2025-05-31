import React from "react";
import { tools } from "./sectionData";
import { motion } from "framer-motion";

const ToolsSpan = ({ animateInverse }) => {
  return (
    <motion.div
      className="relative overflow-hidden py-2 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 1,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
    >
      <div className="relative flex whitespace-nowrap overflow-hidden">
        <div
          className={`flex gap-12 ${
            animateInverse ? "animate-inverse-marquee" : "animate-marquee"
          }`}
        >
          {tools.map((tool, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center gap-2 hover:text-neonBlue transition-all duration-300
              text-md xl:text-xl font-semibold uppercase hover:drop-shadow-[0_0_6px_#00ffff]"
            >
              <span className="text-md xl:text-xl">
                <tool.icon />
              </span>
              <p>{tool.name}</p>
            </div>
          ))}
        </div>
        <div
          className={`flex gap-12 ${
            animateInverse ? "animate-inverse-marquee" : "animate-marquee"
          } ml-12`}
        >
          {tools.map((tool, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center gap-2 hover:text-neonBlue transition-all duration-300
              text-md xl:text-xl font-semibold uppercase hover:drop-shadow-[0_0_6px_#00ffff]"
            >
              <span className="text-md xl:text-xl">
                <tool.icon />
              </span>
              <p>{tool.name}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ToolsSpan;
