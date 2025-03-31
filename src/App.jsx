import React, { useState } from "react";
import { NavMain, HeroMain } from "./components";

function App() {
  return (
    <>
      <NavMain />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <HeroMain />
      </div>
    </>
  );
}

export default App;
