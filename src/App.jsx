import React from "react";
import { NavMain, HeroMain, AboutMain } from "./components";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavMain />
      <main className="flex-grow flex flex-col justify-center items-center">
        <HeroMain />
        <AboutMain />
      </main>
    </div>
  );
}

export default App;
