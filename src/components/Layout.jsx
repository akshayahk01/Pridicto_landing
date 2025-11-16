import React, { useState } from 'react';
// import Navbar from './Navbar';
import VerticalNavbar from './VerticalNavbar';

export default function Layout({ children, dark, setDark }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen">
      <VerticalNavbar dark={dark} setDark={setDark} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`pt-20 transition-all duration-500 ease-in-out ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        {children}
      </main>
    </div>
  );
}
