import React, { useState } from "react";
import BioContent from "./BioContent";
import EducationContent from "./EducationContent";

const AboutContent = () => {
  const [active, setIsActive] = useState(0);

  const setActive = (id) => {
    setIsActive(id);
  };

  const data = [
    { tag: "Bio", content: BioContent },
    { tag: "Education", content: EducationContent },
    // { tag: "Experience", content: ExperienceContent },
  ];

  return (
    <div className="flex flex-row gap-6 max-w-[900px] text-start w-full"></div>
  );
};

export default AboutContent;
