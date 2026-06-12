import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiFolder,
  FiFileText,
  FiSettings,
  FiDollarSign,
  FiPlusCircle,
  FiClipboard,
  FiBookOpen,
} from "react-icons/fi";
import DESLogo from "../../assets/DES_LOGO.png";

const Sidebar = ({ isOpen }) => {
  const navItems = [
    {
      to: "/admin/dashboard",
      icon: FiHome,
      label: "Dashboard",
    },

    {
      to: "/admin/create-proposal",
      icon: FiPlusCircle,
      label: "Create Proposal",
    },

    {
      to: "/admin/saved-proposals",
      icon: FiClipboard,
      label: "Saved Proposals",
    },

    {
      to: "/admin/categories",
      icon: FiFolder,
      label: "Services Categories",
    },

    {
      to: "/admin/services",
      icon: FiGrid,
      label: "Services",
    },

    {
      to: "/admin/pricing",
      icon: FiDollarSign,
      label: "Pricing Setup",
    },

    {
      to: "/admin/terms",
      icon: FiBookOpen,
      label: "Terms Management",
    },

    {
      to: "/admin/proposal-templates",
      icon: FiFileText,
      label: "Proposal Templates",
    },

    {
      to: "/admin/settings",
      icon: FiSettings,
      label: "Settings",
    },
  ];

  const linkClasses = ({ isActive }) =>
    `group relative flex items-center gap-3 px-4 py-3 rounded-xl
    transition-all duration-300 font-medium
    ${
      isActive
        ? "bg-gradient-to-r from-cyan-500/20 to-orange-500/20 text-white border border-cyan-500/30 shadow-lg"
        : "text-slate-400 hover:text-white hover:bg-slate-800/80"
    }`;

  return (
    // <aside
    //   className={`fixed top-0 left-0 h-screen
    //   bg-slate-950 border-r border-slate-800
    //   transition-all duration-300 z-40
    //   ${isOpen ? "w-72" : "w-20"}`}
    // >
    <aside
      className={`fixed top-0 left-0 h-screen
  bg-slate-950 border-r border-slate-800
  transition-all duration-300 z-40
  flex flex-col
  ${isOpen ? "w-72" : "w-20"}`}
    >
      {/* Logo Section */}
      <div className="h-20 border-b border-slate-800 flex items-center justify-center px-4">
        <div className="flex items-center gap-3">
          <img
            src={DESLogo}
            alt="DES Logo"
            className={`transition-all duration-300 ${
              isOpen ? "h-12" : "h-10"
            }`}
          />

          {/* {isOpen && (
            <div>
              <h2 className="font-bold text-white text-sm">
                DES Proposal Studio
              </h2>

              <p className="text-[11px] text-slate-400">
                Digital Excellence Solutions
              </p>
            </div>
          )} */}
        </div>
      </div>

      {/* Navigation */}
      {/* <nav className="mt-6 px-3 space-y-2"> */}
      <nav
        className="
    flex-1
    mt-6
    px-3
    space-y-2
    overflow-y-auto
    scrollbar-thin
    scrollbar-thumb-slate-700
    scrollbar-track-transparent
  "
      >
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={linkClasses}>
            <Icon
              className={`text-xl shrink-0 transition-all duration-300
              group-hover:scale-110
              ${isOpen ? "" : "mx-auto"}`}
            />

            <span
              className={`transition-all duration-300 whitespace-nowrap
              ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}
            >
              {label}
            </span>

            {!isOpen && (
              <span
                className="
                absolute left-full ml-3
                px-3 py-1.5
                rounded-lg
                bg-slate-900
                border border-slate-700
                text-white text-xs
                opacity-0 scale-95
                shadow-xl
                transition-all duration-200
                group-hover:opacity-100
                group-hover:scale-100
              "
              >
                {label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="p-5 border-t border-slate-800 bg-slate-950">
          <div className="h-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-orange-400 mb-3" />
          <p className="text-xs text-slate-500">© {new Date().getFullYear()}</p>
          <p className="text-xs font-medium text-slate-300">
            Digital Elite Services
          </p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
