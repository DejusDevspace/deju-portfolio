import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const ProjectItem = ({ project }) => {
  const isNotEven = project.id % 2 !== 0;
  const textSlideFrom = isNotEven ? 100 : -100;

  return (
    <motion.div
      className="rounded-xl my-12 p-8 xl:max-w-[40%] shadow-2xl hover:shadow-lg hover:shadow-neonBlue transition-all duration-300"
      whileHover={{ scale: 1.02 }}
    >
      {/* Text Section */}
      <motion.div
        className="flex flex-col gap-8"
        initial={{ opacity: 0, x: textSlideFrom }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="text-8xl leading-none font-extrabold text-accent text-outline">
          {project.num}
        </div>
        <h2 className="font-bold leading-none text-4xl text-primary group-hover:text-accent transition-all duration-500 capitalize">
          {project.name}
        </h2>
        <p className="text-primary/50">{project.description}</p>
        <ul className="flex gap-4 flex-wrap">
          {project.stack.map((item, index) => (
            <li key={index} className="text-sm xl:text-md text-accent">
              {item.name}
              {index !== project.stack.length - 1 && ","}
            </li>
          ))}
        </ul>

        <div className="border border-primary/20" />

        <div className="flex gap-4">
          <div className="flex justify-center items-center group w-[60px] h-[60px] bg-secondary rounded-full cursor-pointer">
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GoArrowUpRight className="text-2xl group-hover:text-accent" />
            </a>
          </div>
          <div className="flex justify-center items-center group w-[60px] h-[60px] bg-secondary rounded-full cursor-pointer">
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

      {/* Image Section */}
      {/* <motion.div
        className="w-full xl:w-[50%]"
        initial={{ opacity: 0, x: imageSlideFrom }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div
          className="relative group flex justify-center items-center bg-accent/10 rounded-lg shadow-md transition-all duration-300
                        h-[250px] sm:h-[300px] md:h-[350px] xl:h-[460px] overflow-hidden"
        >
          <img
            src={project.image}
            alt={project.name}
            className="object-cover object-center w-full h-full rounded-lg z-10"
            loading="lazy"
          />
        </div>
      </motion.div> */}
    </motion.div>
  );
};

export default ProjectItem;
