import { FiMenu, FiLogOut } from "react-icons/fi";
import DESLogo from "../../assets/DES_LOGO.png";
import { logoutAdmin } from "../../utils/auth";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-30 h-20 bg-slate-950 border-b border-slate-800 backdrop-blur-md">
      <div className="flex items-center justify-between h-full px-6">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* Menu */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <FiMenu size={22} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* <img
              src={DESLogo}
              alt="DES"
              className="h-11 w-auto object-contain"
            /> */}

            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-white">Proposal Builder</h1>

              <p className="text-xs text-slate-400">Digital Elite Services</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Admin Badge */}
          <div className="hidden md:flex items-center px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10">
            <span className="text-sm font-medium text-cyan-300">
              Administrator
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={logoutAdmin}
            className="
              flex items-center gap-2
              px-5 py-2.5
              rounded-xl
              text-white
              font-medium
              shadow-lg
              bg-gradient-to-r
              from-cyan-500
              via-blue-500
              to-orange-500
              hover:scale-105
              transition-all
              duration-300
            "
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Gradient Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-orange-400" />
    </header>
  );
};

export default Header;
