import React from "react";
import { motion } from "framer-motion";

const data = [
  {
    period: "2020 - 2025",
    role: "B.Eng. Mechatronics",
    company: "Bowen University, Iwo",
  },
];

const EducationContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="flex flex-col gap-8 xl:max-w-[900px] text-center xl:text-left"
    >
      <h2 className="h2 drop-shadow-[0_0_10px_#00ffff]">My education</h2>
      <p className="uppercase text-gray-400 leading-relaxed text-sm tracking-wide">
        Discover my academic journey and qualifications that have equipped me
        with the knowledge and skills in engineering. Learn about my educational
        background and areas of study.
      </p>

      {/* Experience Cards */}
      <div className="flex flex-col xl:flex-row flex-wrap gap-6 justify-center text-center xl:text-start xl:justify-start">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-secondary p-6 rounded-xl shadow-md hover:shadow-accent transition-shadow duration-300 xl:w-[410px]"
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
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EducationContent;
