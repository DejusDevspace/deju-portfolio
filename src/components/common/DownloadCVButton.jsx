import React from "react";
import { FiDownload } from "react-icons/fi";

function DownloadCVButton({ children }) {
  return (
    <div className="flex flex-col xl:flex-row items-center gap-8 mt-4">
      <a
        href="/Deju_Adejo_CV.pdf"
        download
        className="flex items-center gap-2 bg-black text-cyan-400 px-6 py-3 rounded-lg cursor-pointer 
              shadow-[0_0_15px_#00FFFF] hover:shadow-[0_0_25px_#9F00FF] transition-all duration-300"
      >
        <span>Download CV</span>
        <FiDownload className="text-xl" />
      </a>

      {children}
    </div>
  );
}

export default DownloadCVButton;
