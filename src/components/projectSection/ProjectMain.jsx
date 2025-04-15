import React, { useState } from "react";
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
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          viewport={{ once: false, amount: 0.1 }}
        >
          <ProjectItem project={projects[currentIndex]} />
        </motion.div>

        <div className="flex gap-4 w-full justify-center">
          <button
            onClick={movePrev}
            disabled={currentIndex === 0}
            className={`flex justify-center items-center group w-[50px] h-[50px] ${
              currentIndex === 0
                ? "bg-accent/50 cursor-not-allowed"
                : "bg-accent hover:bg-neonMagenta hover:shadow-[0_0_25px_#9F00FF] cursor-pointer"
            } cursor-pointer rounded-md`}
          >
            <IoIosArrowBack className="text-3xl group-hover:text-secondary" />
          </button>
          <button
            onClick={moveNext}
            disabled={currentIndex === totalProjects - 1}
            className={`flex justify-center items-center group w-[50px] h-[50px] ${
              currentIndex === totalProjects - 1
                ? "bg-accent/50 cursor-not-allowed"
                : "bg-accent hover:bg-neonMagenta hover:shadow-[0_0_25px_#9F00FF] cursor-pointer"
            } bg-accent cursor-pointer rounded-md`}
          >
            <IoIosArrowForward className="text-3xl group-hover:text-secondary" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ProjectMain;
