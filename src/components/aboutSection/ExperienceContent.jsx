import React from "react";
import { motion } from "framer-motion";

const data = [
  {
    period: "Feb - Sept 2024",
    role: "Machine Learning Intern",
    company: "NCAIR, Abuja",
    description:
      "Developing AI solutions and conducting machine learning research for national initiatives.",
    locationType: "Onsite",
  },
  {
    period: "Jul - Sept 2023",
    role: "Web Developer",
    company: "GrowMyCompany",
    description:
      "Built a responsive frontend for the client's website using WordPress.",
    locationType: "Remote",
  },
  {
    period: "Jul - Sept 2023",
    role: "Mechatronics Intern",
    company: "NASRDA, Abuja",
    description:
      "Worked on robotics and automated systems for space research applications.",
    locationType: "Onsite",
  },
  {
    period: "March 2023",
    role: "Data Entry Specialist",
    company: "virtualousPRO",
    description:
      "Managed and processed large datasets while ensuring data accuracy and integrity.",
    locationType: "Remote",
  },
];

const ExperienceContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="flex flex-col gap-8 text-center justify-center items-center"
    >
      <p
        className="uppercase text-gray-400 leading-relaxed text-sm tracking-wide 
      max-w-[500px] xl:max-w-[800px]"
      >
        Explore my career path, featuring key roles and impactful contributions
        across diverse organizations. Discover how each experience has shaped my
        professional growth and expertise.
      </p>

      {/* Experience Cards */}
      <div className="flex flex-col xl:flex-row flex-wrap gap-6 justify-center text-center xl:text-start">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative bg-secondary p-6 rounded-xl shadow-md hover:shadow-accent transition-shadow duration-300 xl:w-[410px]"
          >
            <p className="text-accent text-sm mb-2">{item.period}</p>
            <h3 className="text-xl font-semibold text-white mb-2">
              {item.role}
            </h3>
            <p className="text-white/80 text-sm mb-4">{item.description}</p>

            <div className="flex justify-center xl:justify-start mt-6">
              <div className="flex items-center gap-2 text-white font-medium">
                <span className="text-accent text-xl">●</span>
                {item.company}
                <span className="text-sm xl:hidden bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  | {item.locationType}
                </span>
              </div>
            </div>

            <div className="absolute bottom-3 hidden xl:block left-1/2 -translate-x-1/2 xl:left-auto xl:right-3 xl:translate-x-0 px-2 py-1 text-xs font-medium rounded-full border border-accent text-accent bg-secondary shadow-sm transition-all duration-300 group-hover:scale-105">
              {item.locationType}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExperienceContent;
