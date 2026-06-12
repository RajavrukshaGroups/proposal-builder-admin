import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../../components/layout/adminLayout";
import api from "../../../api/axios";
import CreateProposal from "./CreateProposal";

const EditProposal = () => {
  const { id } = useParams();

  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProposal = async () => {
    try {
      const res = await api.get(`/api/proposal/proposal/${id}`);

      setProposal(res.data.proposal);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposal();
  }, [id]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-10">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <CreateProposal editMode={true} proposalId={id} proposalData={proposal} />
  );
};

export default EditProposal;
