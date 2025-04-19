import React from "react";
import { tools } from "./sectionData";
// import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";

const ToolsSpan = () => {
  // const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <motion.div
      className="w-full border-y border-primary bg-secondary py-6 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 1,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
    >
      <div className="flex whitespace-nowrap">
        <div className="flex gap-12 animate-marquee">
          {tools.map((tool, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center gap-2 text-accent hover:text-neonMagenta transition-all duration-300 text-2xl xl:text-3xl font-semibold uppercase drop-shadow-[0_0_6px_#00ffff] hover:drop-shadow-[0_0_10px_#ff00ff]"
            >
              <span className="text-3xl">
                <tool.icon />
              </span>
              <p>{tool.name}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-12 animate-marquee ml-12">
          {tools.map((tool, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center gap-2 text-accent hover:text-neonMagenta transition-all duration-300 text-2xl xl:text-3xl font-semibold uppercase drop-shadow-[0_0_6px_#00ffff] hover:drop-shadow-[0_0_10px_#ff00ff]"
            >
              <span className="text-3xl">
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
