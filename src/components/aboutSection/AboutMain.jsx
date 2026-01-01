import React from "react";
import SectionHeading from "../layout/SectionHeading";
import MyTools from "./MyTools";
import { motion } from "framer-motion";

const AboutMain = () => {
  return (
    <div className="relative container mx-auto my-12 xl:my-16 overflow-hidden">
      <motion.div
        className="relative flex flex-col items-center justify-center px-6 xl:px-0 gap-8"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex flex-col w-full xl:mx-[10%] xl:px-[10%] gap-8 mb-8">
          <SectionHeading text="about">
            <span className="text-accent">me</span>
          </SectionHeading>
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <p className="text-sm xl:text-lg text-primary/80 leading-relaxed">
              I’m a Machine Learning Engineer and Data Scientist who builds production-ready AI systems, not just models.
              I specialize in Python, machine learning, computer vision, NLP, and data analytics, with experience taking ideas from raw data to deployed solutions.
              I focus on scalable, practical AI, enjoy solving hard problems, and consistently ship real-world projects that deliver measurable value.
              <br /> <br />
              When I'm not actively building projects, I'm writing my blog with the aim of explaining complex AI topics as simply as possible.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <p className="font-bold text-accent">
              // Tools I enjoy working with:
            </p>
            <div className="flex flex-col">
              <div>
                <MyTools />
              </div>
              <div className="hidden md:block">
                <MyTools animateInverse={true} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutMain;
