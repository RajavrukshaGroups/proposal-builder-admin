import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Close sidebar by default on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar isOpen={sidebarOpen} />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`flex-1 min-h-screen bg-slate-950 transition-all duration-300 flex flex-col w-full
        ${sidebarOpen ? "lg:ml-72" : "lg:ml-20"}`}
      >
        <Header toggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        <main className="p-4 md:p-6 flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
