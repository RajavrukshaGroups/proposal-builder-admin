import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { isAdminLoggedIn } from "../../utils/auth";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import DESLogo from "../../assets/DES_LOGO.png";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn()) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/admin/login", {
        email,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);

      toast.success("Login successful");

      navigate("/admin/dashboard", {
        replace: true,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 px-4 py-4 overflow-y-auto">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-150px] left-[-100px] h-[350px] w-[350px] rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-[-150px] right-[-100px] h-[350px] w-[350px] rounded-full bg-orange-500/20 blur-3xl" />

        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Login Card */}
      <div
        className="
          relative z-10
          w-full max-w-sm md:max-w-md
          rounded-3xl
          border border-slate-800
          bg-slate-900/90
          backdrop-blur-xl
          shadow-2xl
          overflow-hidden
          my-4
        "
      >
        {/* Top Gradient */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-orange-400" />

        <div className="p-5 md:p-6">
          {/* Logo */}
          <div className="flex justify-center mb-3">
            <img
              src={DESLogo}
              alt="Digital Elite Services"
              className="h-14 md:h-16 object-contain"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
            Welcome Back
          </h1>

          <p className="text-center text-slate-400 mt-1 mb-5">
            Digital Elite Services
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@digitalelite.com"
                className="
                  w-full
                  px-4
                  py-2.5
                  rounded-xl
                  bg-slate-800
                  border border-slate-700
                  text-white
                  placeholder:text-slate-500
                  focus:outline-none
                  focus:border-cyan-500
                  transition
                "
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="
                    w-full
                    px-4
                    py-2.5
                    rounded-xl
                    bg-slate-800
                    border border-slate-700
                    text-white
                    placeholder:text-slate-500
                    focus:outline-none
                    focus:border-cyan-500
                    transition
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    hover:text-cyan-400
                    transition
                  "
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-2.5
                rounded-xl
                font-semibold
                text-white
                bg-gradient-to-r
                from-cyan-500
                via-blue-500
                to-orange-500
                hover:scale-[1.01]
                transition-all
                duration-300
                shadow-lg
                disabled:opacity-60
              "
            >
              {loading ? "Signing In..." : "Login to Dashboard"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-5 text-center">
            <p className="text-slate-500 text-xs">DES Proposal Studio</p>

            <p className="text-slate-600 text-xs mt-1">
              © {new Date().getFullYear()} Digital Elite Services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
