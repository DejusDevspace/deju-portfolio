import React from "react";
import { motion } from "framer-motion";

const DesktopNav = ({ navList, socialList, active, onClick }) => {
  return (
    <motion.div
      className="hidden lg:flex items-center justify-center w-full"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <nav className="flex gap-8 list-none">
        {navList.map((item, index) => (
          <li key={index} onClick={() => onClick(index)}>
            <a
              href={`#${item.toLowerCase()}`}
              className={`${
                active === index ? "text-accent" : "text-primary"
              } capitalize hover:text-accent/70 transition-all duration-300`}
            >
              {item}
            </a>
          </li>
        ))}
      </nav>
    </motion.div>
  );
};

export default DesktopNav;
