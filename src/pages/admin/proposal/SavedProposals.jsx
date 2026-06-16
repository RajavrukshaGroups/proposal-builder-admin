import { useEffect, useState } from "react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import AdminLayout from "../../../components/layout/adminLayout";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const SavedProposals = () => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProposals = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/proposal/all-proposals");

      setProposals(res.data.proposals);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProposal = async (id) => {
    try {
      if (!window.confirm("Delete this proposal?")) return;

      await api.delete(`/api/proposal/delete-proposal/${id}`);

      fetchProposals();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-950 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Saved Proposals</h1>

            <p className="text-slate-400 mt-1">
              Manage all generated proposals
            </p>
          </div>

          <div
            className="
      px-4
      py-2
      rounded-xl
      bg-slate-900
      border
      border-slate-800
      text-slate-300
    "
          >
            Total : {proposals.length}
          </div>
        </div>
        <div
          className="
    bg-slate-900
    border
    border-slate-800
    rounded-2xl
    overflow-x-auto
    shadow-xl
  "
        >
          <table className="w-full min-w-[800px]">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="p-4 text-left">Proposal No</th>
                <th className="p-4 text-left">Client</th>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Template</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center p-8">
                    Loading...
                  </td>
                </tr>
              ) : proposals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-8">
                    <div className="py-10 text-center">
                      <h3 className="text-slate-400">No proposals found</h3>

                      <p className="text-slate-500 text-sm mt-2">
                        Create your first proposal to get started.
                      </p>
                    </div>{" "}
                  </td>
                </tr>
              ) : (
                proposals.map((proposal) => (
                  <tr
                    key={proposal._id}
                    className="
    border-b
    border-slate-800
    hover:bg-slate-800/50
    transition-all
  "
                  >
                    <td className="p-4 text-white font-medium">
                      {proposal.proposalNumber}
                    </td>
                    <td className="p-4 text-slate-300">
                      {proposal.clientName}
                    </td>
                    <td className="p-4 text-slate-400">
                      {proposal.clientCompany}
                    </td>
                    <td className="p-4 text-slate-400">
                      {proposal.selectedTemplate?.templateName || "-"}
                    </td>

                    <td className="p-4 font-semibold text-green-400">
                      ₹{proposal.finalAmount?.toLocaleString()}
                    </td>

                    <td className="p-4">
                      <span
                        className={`
    px-3
    py-1
    rounded-full
    text-xs
    font-semibold

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

                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() =>
                            navigate(`/admin/proposal/view/${proposal._id}`)
                          }
                          className="
    h-9
    w-9
    rounded-lg
    bg-cyan-500/10
    hover:bg-cyan-500/20
    text-cyan-400
    flex
    items-center
    justify-center
    transition-all
  "
                        >
                          <FiEye size={18} />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/proposal/edit/${proposal._id}`)
                          }
                          className="
    h-9
    w-9
    rounded-lg
    bg-orange-500/10
    hover:bg-orange-500/20
    text-orange-400
    flex
    items-center
    justify-center
    transition-all
  "
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => deleteProposal(proposal._id)}
                          className="
    h-9
    w-9
    rounded-lg
    bg-red-500/10
    hover:bg-red-500/20
    text-red-400
    flex
    items-center
    justify-center
    transition-all
  "
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SavedProposals;
