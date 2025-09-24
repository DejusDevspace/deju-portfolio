import React from "react";
import DownloadCVButton from "../common/DownloadCVButton";

const personalInfo = [
  { name: "Name", value: "Ojomideju Adejo" },
  { name: "Address", value: "Abuja, Nigeria" },
  { name: "Phone Number", value: "+234 701 603 5694" },
  { name: "Email", value: "ojomideju2003@gmail.com" },
  { name: "Website", value: "dejuadejo.vercel.app" },
];

const BioContent = () => {
  return (
    <div className="flex flex-col">
      {personalInfo.map((info, index) => {
        return (
          <div key={index} className="flex my-4">
            <span className="text-accent">{info.name}:</span>
            <span className="mx-2 text-primary/80">{info.value}</span>
          </div>
        );
      })}
      <div className="flex items-start">
        <DownloadCVButton />
      </div>
    </div>
  );
};

export default BioContent;
