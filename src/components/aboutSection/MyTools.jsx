// File: aboutSection/MyTools.jsx
import React from "react";
import { motion } from "framer-motion";
import { tools } from "./sectionData";

const MyTools = () => {
  return (
    <div className="w-full">
      <motion.div
        className="relative overflow-hidden w-full py-2 hidden md:block"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="flex whitespace-nowrap w-max animate-marquee gap-8">
          {tools.concat(tools).map((tool, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-lg text-primary font-semibold uppercase hover:text-accent transition-all"
            >
              <tool.icon className="text-2xl" />
              <span>{tool.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-4 md:hidden py-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {tools.map((tool, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 text-base text-primary font-semibold uppercase hover:text-accent transition-all"
          >
            <tool.icon className="text-sm" />
            <span>{tool.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MyTools;
