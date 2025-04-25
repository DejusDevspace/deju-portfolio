import React, { useState } from "react";
import BioContent from "./BioContent";
import ExperienceContent from "./ExperienceContent";
import EducationContent from "./EducationContent";

function AboutContent() {
  const [active, setIsActive] = useState(0);

  function setActive(id) {
    setIsActive(id);
  }

  const data = [
    { tag: "Bio", content: BioContent },
    { tag: "Education", content: EducationContent },
    { tag: "Experience", content: ExperienceContent },
  ];

  return (
    <div className="flex flex-row gap-6 max-w-[900px] text-start w-full">
      <div className="flex flex-col gap-4 ">
        {data.map((dataItem, index) => {
          return (
            <span
              key={index}
              className={`${
                index === active
                  ? "text-accent border-b-2 border-accent"
                  : "text-accent/40"
              } rounded-lg p-4 text-center bg-secondary cursor-pointer hover:text-accent/60 transition-all duration-300`}
              onClick={() => setActive(index)}
            >
              {dataItem.tag}
            </span>
          );
        })}
      </div>
      <div>
        {data.map((dataItem, index) => {
          return (
            <div key={index}>{index === active && <dataItem.content />}</div>
          );
        })}
      </div>
    </div>
  );
}

export default AboutContent;
