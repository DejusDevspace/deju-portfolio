import React, { useState } from "react";
import {
  NavMain,
  HeroMain,
  AboutMain,
  ProjectMain,
  ContactMain,
  ExperienceMain,
} from "./components";
import LoadingScreen from "./components/layout/LoadingScreen";
import TerminalWindow from "./components/aboutSection/TerminalWindow";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      {/* {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />} */}

      <div className="relative flex flex-col overflow-x-hidden z-0">
        <NavMain />
        <main className="relative z-10 flex-grow flex flex-col justify-center items-center">
          <section id="home">
            <HeroMain />
          </section>
          <section id="about">
            <AboutMain />
          </section>
          {/* <TerminalWindow /> */}
          {/* <ExperienceMain /> */}
          <section id="projects">
            <ProjectMain />
          </section>
          <div id="contact">
            <ContactMain />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
