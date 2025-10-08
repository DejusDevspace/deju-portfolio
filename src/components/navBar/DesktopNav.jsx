import React from "react";
import { motion } from "framer-motion";
import SocialIcon from "../common/SocialIcon";

const DesktopNav = ({ navList, socialList, active, onClick, ThemeToggle }) => {
  return (
    <motion.div
      className="hidden lg:flex items-center justify-between w-full"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <nav className="flex gap-6 items-center list-none">
        {navList.map((item, index) => (
          <li key={index} onClick={() => onClick(index)}>
            <a
              href={`#${item.toLowerCase()}`}
              className={`${
                active === index ? "text-accent" : "text-primary"
              } capitalize text-md hover:text-accent/70 transition-all duration-300`}
            >
              {item}
            </a>
          </li>
        ))}
        <div className="flex items-center gap-4">
          {socialList.map((social, index) => (
            <SocialIcon key={index} icon={social.icon} link={social.link} />
          ))}
          {ThemeToggle}
        </div>
      </nav>
    </motion.div>
  );
};

export default DesktopNav;
