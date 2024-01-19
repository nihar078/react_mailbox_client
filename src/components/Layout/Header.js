import React from "react";
import Home from "./Home";
import SideBar from "./SideBar";

const Header = () => {
  return (
    <div>
      <header>
        <Home />
      </header>
      <SideBar />
    </div>
  );
};

export default Header;
