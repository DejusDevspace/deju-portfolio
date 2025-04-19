import React from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import navList from "./navList";

function NavMain() {
  return (
    <header className="fixed bg-gray-900 w-full py-4 z-20">
      <div className="container mx-auto flex justify-between items-center px-6 xl:px-4">
        <h1
          className="text-4xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500
        bg-clip-text text-transparent"
        >
          Deju
        </h1>
        <div className="hidden lg:flex">
          <DesktopNav data={navList} />
        </div>
        <div className="lg:hidden">
          <MobileNav data={navList} />
        </div>
      </div>
    </header>
  );
}

export default NavMain;
