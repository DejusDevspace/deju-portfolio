import React, { useState, useRef, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { TbBrandLinkedinFilled } from "react-icons/tb";
import { RiTwitterXFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { MdOutgoingMail } from "react-icons/md";

const SocialIcon = ({ icon: Icon, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-accent transition-all duration-300"
    >
      <Icon className="text-[20px]" />
    </a>
  );
};

const MobileNav = ({ data, active, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navList = data;
  const menuRef = useRef();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const socialLinks = [
    {
      icon: TbBrandLinkedinFilled,
      link: "https://www.linkedin.com/in/deju-adejo/",
    },
    { icon: FaGithub, link: "https://github.com/DejusDevspace" },
    { icon: RiTwitterXFill, link: "https://x.com/adejo_deju" },
    { icon: MdOutgoingMail, link: "mailto:ojomideju2003@gmail.com" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.6 }}
      className="relative"
      ref={menuRef}
    >
      <div className="flex gap-4">
        {socialLinks.map((social, index) => (
          <SocialIcon key={index} icon={social.icon} link={social.link} />
        ))}
      </div>

      <div className="fixed bottom-0 right-0 p-4 m-4 z-20 rounded-xl bg-secondary shadow-xl">
        <CiMenuFries
          className="text-[32px] cursor-pointer"
          onClick={toggleMenu}
        />
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: -250 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-4 bg-secondary rounded-lg shadow-xl
            py-4 px-6 flex flex-col gap-4 z-20"
            >
              {navList.map((link, index) => (
                <li
                  key={index}
                  onClick={() => {
                    toggleMenu();
                    onClick(index);
                  }}
                >
                  <a
                    href={`#${link.toLowerCase()}`}
                    className={`${
                      active === index ? "text-accent" : "text-primary"
                    } hover:text-accent/70 cursor-pointer capitalize`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MobileNav;
