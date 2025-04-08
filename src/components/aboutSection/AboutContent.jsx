import React from "react";
import DownloadCVButton from "../common/DownloadCVButton";

function AboutContent() {
  const personalInfo = [
    { name: "Name", value: "Ojomideju Adejo" },
    { name: "Address", value: "Abuja, Nigeria" },
    { name: "Phone Number", value: "+234 701 603 5694" },
    { name: "Email", value: "ojomideju2003@gmail.com" },
    { name: "Website", value: "dejuadejo.vercel.app" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-[800px] text-start w-full">
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate id
        nisi animi voluptates optio recusandae qui vitae consectetur magni,
        obcaecati voluptatum similique tempora harum? Optio architecto
        consequuntur minus sit quae. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Odio dignissimos fugiat enim optio debitis! Nam
        maiores quibusdam neque qui, molestias suscipit eum iusto quo laboriosam
        odit eius delectus dolore explicabo!
      </div>
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
    </div>
  );
}

export default AboutContent;
