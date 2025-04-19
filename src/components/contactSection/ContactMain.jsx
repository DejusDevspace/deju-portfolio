import React from "react";
import SectionHeading from "../common/SectionHeading";

function ContactMain() {
  return (
    <div className="container mx-auto flex flex-col items-center py-12 xl:py-24">
      <SectionHeading text="Contact Me" />
      <div className="my-12 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-[0_0_20px_5px_var(--color-neonBlue)]"></div>
    </div>
  );
}

export default ContactMain;
