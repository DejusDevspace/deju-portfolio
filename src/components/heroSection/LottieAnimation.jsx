import React from "react";
import Lottie from "lottie-react";
import animationData from "../lottie/coding-setup.json";
import { motion } from "framer-motion";

const LottieAnimation = () => {
  return (
    <motion.div
      className="flex items-center justify-center max-w-[450px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
    >
      <Lottie animationData={animationData} />
    </motion.div>
  );
};

export default LottieAnimation;
