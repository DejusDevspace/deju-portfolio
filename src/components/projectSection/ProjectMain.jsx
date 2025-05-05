import React, { useState } from "react";
import SectionHeading from "../common/SectionHeading";
import { projects } from "./sectionData";
import ProjectItem from "./ProjectItem";
import { motion } from "framer-motion";

const ProjectMain = () => {
  return (
    <div className="relative flex justify-center items-center py-12 overflow-hidden">
      <motion.div
        className="container mx-auto relative z-10 flex flex-col gap-12 xl:gap-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="flex justify-center">
          <SectionHeading text="My">
            <span className="text-accent">Projects</span>
          </SectionHeading>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-wrap w-full p-4 justify-center gap-8 "
        >
          {projects.map((project, index) => (
            <ProjectItem key={index} project={project} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectMain;
