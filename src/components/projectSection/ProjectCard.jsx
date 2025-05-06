import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { BsFolderFill } from "react-icons/bs";

const ProjectCard = ({ project }) => {
  const isNotEven = project.id % 2 !== 0;
  const textSlideFrom = isNotEven ? 100 : -100;

  return (
    <motion.div
      className="rounded-2xl my-4 p-8 xl:max-w-[30%] shadow-xl bg-white/5 hover:shadow-lg hover:shadow-neonBlue transition-all duration-300"
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="flex flex-col gap-8"
        initial={{ opacity: 0, x: textSlideFrom }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="text-4xl leading-none font-extrabold text-accent text-outline">
          <BsFolderFill />
        </div>
        <h2 className="font-bold leading-none text-xl xl:text-2xl text-primary group-hover:text-accent transition-all duration-500 capitalize">
          {project.name}
        </h2>
        <p className="text-primary/50 text-sm xl:text-md">
          {project.description}
        </p>
        <ul className="flex gap-4 flex-wrap">
          {project.stack.map((item, index) => (
            <li key={index} className="text-sm xl:text-md text-accent/70">
              {item.name}
              {index !== project.stack.length - 1 && ","}
            </li>
          ))}
        </ul>

        <div className="border border-primary/20" />

        <div className="flex gap-4">
          <div className="flex justify-center items-center group w-[40px] h-[40px] bg-secondary rounded-full cursor-pointer">
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GoArrowUpRight className="text-2xl group-hover:text-accent" />
            </a>
          </div>
          <div className="flex justify-center items-center group w-[40px] h-[40px] bg-secondary rounded-full cursor-pointer">
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-2xl group-hover:text-accent" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
