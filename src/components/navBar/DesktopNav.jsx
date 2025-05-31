import React from "react";

const DesktopNav = ({ data, active, onClick }) => {
  return (
    <nav className="flex gap-8 list-none">
      {data.map((item, index) => (
        <li key={index} onClick={() => onClick(index)}>
          <a
            href={`#${item.toLowerCase()}`}
            className={`${
              active === index ? "text-accent" : "text-primary"
            } capitalize hover:text-accent/70 transition-all duration-300`}
          >
            {item}
          </a>
        </li>
      ))}
    </nav>
  );
};

export default DesktopNav;
