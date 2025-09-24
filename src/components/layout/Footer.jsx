import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center text-center gap-2 py-8 text-sm
      text-primary/70 bg-transparent bg-clip-content"
    >
      <p className="text-sm">Crafted with care ❤️</p>
      <p className="text-sm">Deju Adejo &copy; {currentYear}</p>
    </motion.footer>
  );
};

export default Footer;
