import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/adminLayout";
import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiGrid,
  FiSettings,
  FiPlusCircle,
} from "react-icons/fi";
import api from "../../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState({
    totalProposals: 0,
    approvedProposals: 0,
    pendingProposals: 0,
    totalValue: 0,
  });

  const [recentProposals, setRecentProposals] = useState([]);
  const stats = [
    {
      title: "Total Proposals",
      value: statsData.totalProposals,
      icon: FiFileText,
      iconColor: "text-cyan-400",
    },
    {
      title: "Approved Proposals",
      value: statsData.approvedProposals,
      icon: FiCheckCircle,
      iconColor: "text-green-400",
    },
    {
      title: "Pending Proposals",
      value: statsData.pendingProposals,
      icon: FiClock,
      iconColor: "text-orange-400",
    },
    {
      title: "Proposal Value",
      value: `₹${statsData.totalValue?.toLocaleString()}`,
      icon: FiTrendingUp,
      iconColor: "text-blue-400",
    },
  ];
  const fetchDashboardStats = async () => {
    try {
      const res = await api.get("/api/dashboard/dashboard-stats");

      setStatsData({
        totalProposals: res.data.totalProposals,
        approvedProposals: res.data.approvedProposals,
        pendingProposals: res.data.pendingProposals,
        totalValue: res.data.totalValue,
      });

      setRecentProposals(res.data.recentProposals);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-950 p-6 space-y-6">
        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-orange-500/20" />

          <div className="relative z-10 p-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to Digital Elite Services 🚀
            </h1>

            <p className="text-slate-300 max-w-3xl">
              Build professional proposals, manage service pricing, customize
              proposal templates, and generate client-ready quotations from one
              centralized platform.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  bg-slate-900
                  border border-slate-800
                  rounded-2xl
                  p-5
                  hover:border-cyan-500/40
                  hover:shadow-lg
                  transition-all duration-300
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">{item.title}</p>

                    <h3 className="text-2xl font-bold text-white mt-1">
                      {item.value}
                    </h3>
                  </div>

                  <div
                    className="
                      h-12 w-12
                      rounded-xl
                      bg-slate-800
                      flex items-center justify-center
                    "
                  >
                    <Icon className={`text-xl ${item.iconColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ABOUT */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            About Digital Elite Services
          </h2>

          <p className="text-slate-300 leading-relaxed">
            Digital Elite Services Proposal Studio is a centralized proposal
            management platform designed to streamline the creation of
            professional quotations, website proposals, SEO packages, branding
            solutions, paid advertising plans, automation services, and complete
            digital growth strategies.
          </p>

          <p className="text-slate-400 mt-4 leading-relaxed">
            The platform allows administrators to manage service categories,
            pricing structures, proposal templates, reusable terms & conditions,
            and client proposals from a single powerful dashboard.
          </p>
        </div>

        {/* QUICK ACTIONS */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Create Proposal */}
            <div
              onClick={() => navigate("/admin/create-proposal")}
              className="
    bg-slate-900
    border border-slate-800
    rounded-2xl
    p-6
    hover:border-cyan-500/40
    transition-all duration-300
    cursor-pointer
  "
            >
              <FiPlusCircle className="text-cyan-400 text-3xl mb-3" />

              <h3 className="text-white font-semibold text-lg">
                Create Proposal
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                Start building a new proposal for your client.
              </p>
            </div>

            {/* Services */}
            <div
              onClick={() => navigate("/admin/services")}
              className="
    bg-slate-900
    border border-slate-800
    rounded-2xl
    p-6
    hover:border-cyan-500/40
    transition-all duration-300
    cursor-pointer
  "
            >
              <FiGrid className="text-blue-400 text-3xl mb-3" />

              <h3 className="text-white font-semibold text-lg">
                Manage Services
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                Configure categories, services, and sub-services.
              </p>
            </div>

            {/* Pricing */}
            <div
              onClick={() => navigate("/admin/pricing")}
              className="
    bg-slate-900
    border border-slate-800
    rounded-2xl
    p-6
    hover:border-cyan-500/40
    transition-all duration-300
    cursor-pointer
  "
            >
              <FiSettings className="text-orange-400 text-3xl mb-3" />

              <h3 className="text-white font-semibold text-lg">
                Pricing Setup
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                Configure package pricing and proposal rates.
              </p>
            </div>
          </div>
        </div>

        {/* FUTURE SECTION */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Recent Proposals
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="text-left py-3">Proposal No</th>
                  <th className="text-left py-3">Client</th>
                  <th className="text-left py-3">Company</th>
                  <th className="text-left py-3">Amount</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-center py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {recentProposals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-500">
                      No proposals found
                    </td>
                  </tr>
                ) : (
                  recentProposals.map((proposal) => (
                    <tr
                      key={proposal._id}
                      className="border-b border-slate-800"
                    >
                      <td className="py-4 text-white">
                        {proposal.proposalNumber}
                      </td>

                      <td className="py-4 text-slate-300">
                        {proposal.clientName}
                      </td>

                      <td className="py-4 text-slate-300">
                        {proposal.clientCompany}
                      </td>

                      <td className="py-4 text-green-400 font-semibold">
                        ₹{proposal.finalAmount?.toLocaleString()}
                      </td>

                      <td className="py-4">
                        <span
                          className={`
                  px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    proposal.status === "approved"
                      ? "bg-green-500/20 text-green-400"
                      : proposal.status === "sent"
                        ? "bg-blue-500/20 text-blue-400"
                        : proposal.status === "rejected"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                  }
                `}
                        >
                          {proposal.status}
                        </span>
                      </td>

                      <td className="py-4 text-center">
                        <button
                          onClick={() =>
                            navigate(`/admin/proposal/view/${proposal._id}`)
                          }
                          className="
                  px-3
                  py-1
                  rounded-lg
                  bg-cyan-500
                  text-white
                  text-sm
                "
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
