import React from "react";
import {
  NavMain,
  HeroMain,
  AboutMain,
  ProjectMain,
  ContactMain,
} from "./components";

function App() {
  return (
    <div className="relative flex flex-col overflow-x-hidden bg-gray-900 z-0">
      <NavMain />
      <main className="relative z-10 flex-grow flex flex-col justify-center items-center">
        <HeroMain />
        <AboutMain />
        <div className="w-full">
          <ProjectMain />
        </div>
        <ContactMain />
      </main>
    </div>
  );
}

export default App;
