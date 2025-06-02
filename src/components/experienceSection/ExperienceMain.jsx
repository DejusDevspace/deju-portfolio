import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../layout/SectionHeading";
import ExperienceContent from "./ExperienceContent";

const ExperienceMain = () => {
  return (
    <div className="relative container mx-auto overflow-hidden my-12 xl:my-16">
      <motion.div
        className="relative flex flex-col justify-center items-center px-6 xl:px-0 gap-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="flex flex-col w-full xl:mx-[10%] xl:px-[10%] gap-8 mb-8">
          <SectionHeading text="my">
            <span className="text-accent">experience</span>
          </SectionHeading>
          <ExperienceContent />
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceMain;
