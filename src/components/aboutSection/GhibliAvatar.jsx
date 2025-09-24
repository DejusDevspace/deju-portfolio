import React from "react";
import { motion } from "framer-motion";
import avatarImg from "../../assets/ghibli-avatar-removebg-preview.png";

const GhibliAvatar = () => {
  return (
    <motion.div
      initial={{
        opacity: 0.7,
      }}
      whileHover={{
        opacity: 1,
      }}
      className="w-full max-w-[600px] h-[500px] xl:max-w-[400px] xl:h-[600px] shadow-xl"
    >
      <motion.img
        src={avatarImg}
        alt="Ghibli Avatar"
        className="rounded-xl hover:shadow-[0_0_25px_#9F00FF] transition-all"
        whileHover={{
          rotateY: 15,
          rotateX: 5,
          scale: 1.05,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      />
    </motion.div>
  );
};

export default GhibliAvatar;
