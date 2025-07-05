import React from "react";
import Navbar from "./Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-background text-textDark dark:text-textLight transition-colors duration-300">
      <Navbar />
      <main className="pt-6">{children}</main>
    </div>
  );
};

export default Layout;
