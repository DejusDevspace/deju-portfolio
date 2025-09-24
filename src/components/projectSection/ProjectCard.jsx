import React, { useState } from "react";
import ProjectDetailModal from "./ProjectDetailModal";
// import { GoArrowUpRight } from "react-icons/go";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
// import { BsFolderFill } from "react-icons/bs";

const ProjectCard = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isNotEven = project.id % 2 !== 0;
  const textSlideFrom = isNotEven ? 100 : -100;

  return (
    <>
      <motion.div
        className="rounded-2xl my-4 p-8 xl:max-w-[31.5%] shadow-xl bg-secondary hover:shadow-lg hover:shadow-neonBlue transition-all duration-300"
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, x: textSlideFrom }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: textSlideFrom }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative group flex justify-center items-center bg-accent/10 rounded-lg shadow-md xl:h-[204px] h-auto overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="object-cover object-center w-full h-full rounded-lg z-10"
                loading="lazy"
              />
            </div>
          </motion.div>

          <h2 className="font-bold leading-none text-xl xl:text-2xl text-primary group-hover:text-accent transition-all duration-500 capitalize">
            {project.name}
          </h2>

          <p className="text-primary/50 text-sm xl:text-md">
            {project.description.length > 150
              ? project.description.slice(0, 97) + "..."
              : project.description}
          </p>

          <ul className="flex gap-1.5 flex-wrap">
            {project.stack.map((item, index) => (
              <li key={index} className="text-sm xl:text-md text-accent/70">
                {item.name}
                {index !== project.stack.length - 1 && ","}
              </li>
            ))}
          </ul>

          <div className="border border-primary/20" />

          <div className="flex gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-accent/10 text-primary shadow-md hover:scale-105 rounded-xl cursor-pointer transition-all duration-300"
            >
              More Info
            </button>

            <div className="flex justify-center items-center group w-[40px] h-[40px] bg-accent/10 rounded-full cursor-pointer hover:scale-115 transition-all duration-300">
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-2xl" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <ProjectDetailModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProjectCard;
