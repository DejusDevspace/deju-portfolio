import React, { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import navList from "./navList";

function NavMain() {
  const [isSelected, setSelected] = useState(0);

  const handleSelect = (id) => {
    setSelected(id);
  };

  return (
    <header className="fixed bg-gray-900 w-full py-4 z-20">
      <div className="container mx-auto flex justify-between items-center px-6 xl:px-4">
        <h1 className="text-2xl font-bold">Deju</h1>
        <div className="hidden lg:flex">
          <DesktopNav
            data={navList}
            active={isSelected}
            onClick={handleSelect}
          />
        </div>
        <div className="lg:hidden">
          <MobileNav data={navList} />
        </div>
      </div>
    </header>
  );
}

export default NavMain;
