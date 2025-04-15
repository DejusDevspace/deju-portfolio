import React, { useState } from "react";
import SectionHeading from "../common/SectionHeading";
import { projects } from "./sectionData";
import ProjectItem from "./ProjectItem";
import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function ProjectMain() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalProjects = projects.length;

  function moveNext() {
    setCurrentIndex((prev) => prev + 1);
  }

  function movePrev() {
    setCurrentIndex((prev) => prev - 1);
  }

  return (
    <div className="relative flex justify-center items-center py-12 xl:py-24 overflow-hidden">
      <motion.div
        className="container mx-auto relative z-10 flex flex-col gap-12 xl:gap-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
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
            duration: 0.7,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <div>
              <ProjectItem key={index} project={project} />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ProjectMain;
