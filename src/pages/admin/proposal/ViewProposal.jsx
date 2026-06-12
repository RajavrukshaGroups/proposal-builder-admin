import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/axios";
import AdminLayout from "../../../components/layout/adminLayout";
import Step5ProposalPreview from "./Step5ProposalPreview";

const ViewProposal = () => {
  const { id } = useParams();

  const [proposal, setProposal] = useState(null);
  const [settings, setSettings] = useState(null);

  const fetchProposal = async () => {
    try {
      const res = await api.get(`/api/proposal/proposal/${id}`);
      console.log("response", res);

      setProposal(res.data.proposal);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await api.get("/api/settings/get-settings");

      setSettings(res.data.settings);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProposal();
    fetchSettings();
  }, []);

  if (!proposal || !settings) {
    return (
      <AdminLayout>
        <div className="p-10">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Step5ProposalPreview
        formData={{
          clientName: proposal.clientName,
          clientCompany: proposal.clientCompany,
          clientEmail: proposal.clientEmail,
          clientPhone: proposal.clientPhone,
          industry: proposal.industry,
          objectives: proposal.objectives,
          businessStage: proposal.businessStage,
          budgetLevel: proposal.budgetLevel,
          proposalType: proposal.proposalType,
          notes: proposal.notes,
        }}
        categories={[]}
        services={[]}
        selectedServices={{}}
        selectedTemplate={proposal.selectedTemplate}
        pricingData={proposal.selectedServices.map((service) => ({
          serviceName: service.serviceName,
          amount: service.amount,
        }))}
        subtotal={proposal.subtotal}
        settings={settings}
        proposalData={proposal} // ADD THIS
        setStep={() => {}}
        saveDraft={() => {}}
      />
    </AdminLayout>
  );
};

export default ViewProposal;
