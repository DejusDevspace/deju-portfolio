import React from "react";

function DesktopNav(props) {
  const navList = props.data;
  return (
    <nav className="flex gap-8 list-none">
      {navList.map((item, index) => (
        <li key={index}>
          <a
            href={`#${item.toLowerCase()}`}
            className="hover:text-accent/70 transition-all duration-300"
          >
            {item}
          </a>
        </li>
      ))}
    </nav>
  );
}

export default DesktopNav;
