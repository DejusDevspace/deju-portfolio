import React from "react";
import Lottie from "lottie-react";
import animationData from "../lottie/coding-setup.json";
import animationDataLight from "../lottie/coding-setup-light.json";
import { motion } from "framer-motion";
import useTheme from "../../hooks/useTheme";

const LottieAnimation = () => {
  const { theme } = useTheme();

  return (
    <motion.div
      className="flex items-center justify-center max-w-[450px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
    >
      <Lottie
        animationData={theme === "dark" ? animationData : animationDataLight}
      />
    </motion.div>
  );
};

export default LottieAnimation;
