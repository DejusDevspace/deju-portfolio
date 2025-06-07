import React from "react";

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

export default SocialIcon;
