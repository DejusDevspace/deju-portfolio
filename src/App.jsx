import React from "react";
import {
  NavMain,
  HeroMain,
  AboutMain,
  ProjectMain,
  ContactMain,
  ExperienceMain,
} from "./components";

function App() {
  return (
    <div className="relative flex flex-col overflow-x-hidden z-0">
      <NavMain />
      <main className="relative z-10 flex-grow flex flex-col justify-center items-center">
        <HeroMain />
        <AboutMain />
        <ExperienceMain />
        <div className="w-full">
          <ProjectMain />
        </div>
        <ContactMain />
      </main>
    </div>
  );
}

export default App;
