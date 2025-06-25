import React from "react";
import Navbar from "./Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-6">{children}</main>
    </>
  );
};

export default Layout;
