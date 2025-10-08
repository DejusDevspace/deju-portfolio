import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  const [touchStartX, setTouchStartX] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const projectImages = project?.docImages || [project?.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + projectImages.length) % projectImages.length
    );
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) nextImage();
    else if (diff < -50) prevImage();
    setTouchStartX(null);
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/70 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full xl:max-w-[82%] h-[79vh] xl:h-[70vh] bg-secondary rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-all duration-200"
            >
              <FaTimes className="text-white/70 cursor-pointer text-xl" />
            </button>

            <div className="flex flex-col lg:flex-row max-h-[80vh] xl:h-full">
              {/* Image Section */}
              <div className="lg:w-[95%] relative bg-accent/5">
                <div
                  className="relative h-60 lg:h-full"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <img
                    src={projectImages[currentImageIndex]}
                    alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                    className="w-full h-full"
                  />

                  {/* Image Navigation */}
                  {projectImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-all duration-200"
                      >
                        <FaChevronLeft className="text-white" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-all duration-200"
                      >
                        <FaChevronRight className="text-white" />
                      </button>
                    </>
                  )}
                </div>

                {/* Image Indicators */}
                {projectImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {projectImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentImageIndex
                            ? "bg-accent"
                            : "bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2 p-6 lg:p-8 lg:flex lg:items-center overflow-y-auto">
                <div className="space-y-6">
                  {/* Project Title */}
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-2 capitalize">
                      {project.name}
                    </h2>
                    <p className="text-primary/60 text-sm uppercase tracking-wider">
                      {project.category || "ML/AI"}
                    </p>
                  </div>

                  {/* About this project */}
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      About this project
                    </h3>
                    <p className="text-primary/70 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm border border-accent/20"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-primary/10">
                    {project.links?.live !== "#" && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-accent/70 hover:bg-accent/90 text-white rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        <GoArrowUpRight className="text-lg" />
                        View Live
                      </a>
                    )}

                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        <FaGithub className="text-lg" />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
