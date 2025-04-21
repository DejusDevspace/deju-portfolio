import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";

function MobileNav(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navList = props.data;

  return (
    <div className="relative">
      <CiMenuFries
        className="text-[32px] cursor-pointer"
        onClick={toggleMenu}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-4 bg-secondary text-primary rounded-lg shadow-lg 
            py-4 px-6 flex flex-col gap-4 z-100"
          >
            {navList.map((link, index) => (
              <li
                key={index}
                onClick={() => {
                  toggleMenu();
                }}
                className="hover:text-accent cursor-pointer capitalize"
              >
                <a href="#">{link}</a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileNav;
