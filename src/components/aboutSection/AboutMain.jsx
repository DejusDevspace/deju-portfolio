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
            <p className="text-sm xl:text-lg text-primary/80">
              I'm a Jack of a few a trades and a Mechatronics Engineering
              graduate from{" "}
              <span className="text-accent font-bold">Bowen University</span>,
              Nigeria.
            </p>
            <p className="text-sm xl:text-lg text-primary/80">
              I am currently working on data science, machine learning and AI
              projects, experimenting with AI models, getting obsessed with
              agentic workflows, training stubborn models, and occasionally
              yelling at my terminal when things break (which they do...often).
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <p className="font-bold text-accent">
              // When I'm not working, I am:
            </p>
            <ul className="list-disc pl-6 text-sm xl:text-lg text-primary/80">
              <li>staying up to date with tech advancements</li>
              <li>playing PC games (mostly just EA SPORTS FC)</li>
              <li>watching a movie for 2 weeks</li>
              <li>adding to my graveyard of half-finished side projects</li>
            </ul>
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
