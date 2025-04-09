import React from "react";
import { NavMain, HeroMain, AboutMain, ProjectMain } from "./components";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavMain />
      <main className="flex-grow flex flex-col justify-center items-center overflow-hidden">
        <HeroMain />
        <AboutMain />
        <div className="bg-gray-600 w-full">
          <ProjectMain />
        </div>
      </main>
    </div>
  );
}

export default App;
