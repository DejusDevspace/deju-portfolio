import React from "react";
import { motion } from "framer-motion";
import { tools } from "./sectionData";

const MyTools = ({ animateInverse }) => {
  return (
    <div className="w-full">
      <motion.div
        className="relative overflow-hidden w-full py-2 hidden md:block"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div
          className={`flex whitespace-nowrap w-max ${
            animateInverse ? "animate-inverse-marquee" : "animate-marquee"
          } gap-8`}
        >
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

      {/* Mobile view - Enhanced Grid Cards */}
      <motion.div
        className="grid grid-cols-3 gap-3 md:hidden py-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {tools.map((tool, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center justify-center gap-3 px-4 py-5 rounded-2xl
            bg-accent/5 border border-accent/30 hover:border-accent/60
            text-primary font-semibold uppercase transition-all cursor-pointer"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(var(--accent-rgb), 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <tool.icon className="text-2xl text-accent" />
            <span className="text-xs text-center leading-tight">
              {tool.name}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Old mobile view - commented out for reference */}
      {/* <motion.div
        className="flex flex-wrap gap-4 md:hidden py-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {tools.map((tool, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1 text-sm text-primary font-semibold uppercase hover:text-accent
            bg-accent/10 px-4 py-2 rounded-xl transition-all"
          >
            <tool.icon className="text-sm" />
            <span>{tool.name}</span>
          </div>
        ))}
      </motion.div> */}
    </div>
  );
};

export default MyTools;
