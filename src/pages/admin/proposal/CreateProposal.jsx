import { useState, useEffect } from "react";
import AdminLayout from "../../../components/layout/adminLayout";
import api from "../../../api/axios";
import Step1ClientRequirement from "./Step1ClientRequirement";
import Step2ServiceSelection from "./Step2ServiceSelection";
import Step3PricingSummary from "./Step3PricingSummary";
import Step4TemplateSelection from "./Step4TemplateSelection";
import Step5ProposalPreview from "./Step5ProposalPreview";
import { useNavigate } from "react-router-dom";

const CreateProposal = ({
  editMode = false,
  proposalId = null,
  proposalData = null,
}) => {
  const navigate = useNavigate();
  const [pricingMap, setPricingMap] = useState({});
  //   const savedDraft = JSON.parse(localStorage.getItem("proposalDraft"));
  const savedDraft = !editMode
    ? JSON.parse(localStorage.getItem("proposalDraft"))
    : null;

  const [formData, setFormData] = useState(
    savedDraft?.formData || {
      clientName: "",
      clientCompany: "",
      clientEmail: "",
      clientPhone: "",

      industry: "",
      customIndustry: "",
      objectives: [],
      businessStage: "",
      budgetLevel: "",
      proposalType: "",
      notes: "",
    },
  );

  const [step, setStep] = useState(savedDraft?.step || 1);

  const [selectedServices, setSelectedServices] = useState(
    savedDraft?.selectedServices || {},
  );

  //   const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);

  const [services, setServices] = useState([]);

  const [selectedTemplate, setSelectedTemplate] = useState(
    savedDraft?.selectedTemplate || null,
  );
  const [settings, setSettings] = useState(null);

  //   const [pricingData, setPricingData] = useState([]);
  //   const [subtotal, setSubtotal] = useState(0);
  const [pricingData, setPricingData] = useState(savedDraft?.pricingData || []);

  const [subtotal, setSubtotal] = useState(savedDraft?.subtotal || 0);

  const [discount, setDiscount] = useState(savedDraft?.discount || 0);

  const [excludeGST, setExcludeGST] = useState(savedDraft?.excludeGST || false);

  //   const [selectedServices, setSelectedServices] = useState([]);
  //   const [selectedServices, setSelectedServices] = useState({});

  const objectivesList = [
    "Generate Leads",
    "Improve Lead Quality",
    "Increase Brand Awareness",
    "Improve Social Media Presence",
    "Build Website / Landing Page",
    "Rank On Google",
    "Increase Sales Conversion",
    "Complete Digital Growth",
  ];

  const handleObjectiveChange = (objective) => {
    if (formData.objectives.includes(objective)) {
      setFormData({
        ...formData,
        objectives: formData.objectives.filter((item) => item !== objective),
      });
    } else {
      setFormData({
        ...formData,
        objectives: [...formData.objectives, objective],
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/category/all-categories");

      setCategories(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await api.get("/api/service/all-services");

      setServices(res.data.services);
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

  const fetchPricing = async () => {
    try {
      const res = await api.get("/api/pricing/all-pricing");
      console.log("pricing response", res.data.pricing);

      const map = {};

      //   res.data.pricing.forEach((item) => {
      //     map[item.serviceId] = item;
      //   });
      res.data.pricing.forEach((item) => {
        map[item.serviceId?._id || item.serviceId] = item;
      });

      setPricingMap(map);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchServices();
    fetchSettings();
    fetchPricing();
  }, []);

  useEffect(() => {
    if (!editMode || !proposalData || services.length === 0) return;

    const predefinedIndustries = [
      "Real Estate",
      "Healthcare",
      "Education",
      "Manufacturing",
      "E-commerce",
      "Local Business",
      "Corporate / B2B",
      "Hospitality",
      "Finance",
    ];

    setFormData({
      clientName: proposalData.clientName,
      clientCompany: proposalData.clientCompany,
      clientEmail: proposalData.clientEmail,
      clientPhone: proposalData.clientPhone,

      industry: predefinedIndustries.includes(proposalData.industry)
        ? proposalData.industry
        : "Custom Industry",

      customIndustry: predefinedIndustries.includes(proposalData.industry)
        ? ""
        : proposalData.industry,

      objectives: proposalData.objectives,
      businessStage: proposalData.businessStage,
      budgetLevel: proposalData.budgetLevel,
      proposalType: proposalData.proposalType,
      notes: proposalData.notes,
    });

    setSelectedTemplate(proposalData.selectedTemplate);

    setPricingData(
      proposalData.selectedServices.map((service) => ({
        serviceName: service.serviceName,
        amount: service.amount,
      })),
    );

    setSubtotal(proposalData.subtotal);
    setDiscount(proposalData.discount || 0);
    setExcludeGST(proposalData.excludeGST || false);

    const selectedServicesObj = {};

    proposalData.selectedServices.forEach((savedService) => {
      const actualService = services.find(
        (service) => service._id === savedService.serviceId._id,
      );

      if (!actualService) return;

      switch (actualService.inputType) {
        case "checkbox":
          selectedServicesObj[actualService._id] = true;
          break;

        case "counter":
          selectedServicesObj[actualService._id] = savedService.quantity;
          break;

        case "option-selector":
          selectedServicesObj[actualService._id] =
            savedService.inputValue?.split(", ").filter(Boolean) || [];
          break;

        case "text-input":
          selectedServicesObj[actualService._id] =
            savedService.inputValue || "";
          break;

        default:
          break;
      }
    });

    setSelectedServices(selectedServicesObj);
  }, [editMode, proposalData, services]);

  useEffect(() => {
    if (editMode) return;

    localStorage.setItem(
      "proposalDraft",
      JSON.stringify({
        formData,
        selectedServices,
        selectedTemplate,
        pricingData,
        subtotal,
        discount,
        excludeGST,
        step,
      }),
    );
  }, [
    editMode,
    formData,
    selectedServices,
    selectedTemplate,
    pricingData,
    subtotal,
    discount,
    excludeGST,
    step,
  ]);

  const saveDraft = async () => {
    try {
      const selectedServicesPayload = services
        .filter((service) => {
          const value = selectedServices[service._id];

          if (service.inputType === "checkbox") return value === true;

          if (service.inputType === "counter") return value > 0;

          if (service.inputType === "option-selector")
            return Array.isArray(value) && value.length > 0;

          if (service.inputType === "text-input")
            return value && value.trim() !== "";

          return false;
        })
        .map((service) => {
          const value = selectedServices[service._id];

          const pricingItem = pricingData.find(
            (item) => item.serviceName === service.serviceName,
          );

          return {
            serviceId: service._id,
            serviceName: service.serviceName,

            quantity: service.inputType === "counter" ? value : 1,

            amount: pricingItem?.amount || 0,

            inputValue:
              typeof value === "string"
                ? value
                : Array.isArray(value)
                  ? value.join(", ")
                  : "",
          };
        });

      const payload = {
        ...formData,
        industry:
          formData.industry === "Custom Industry"
            ? formData.customIndustry
            : formData.industry,
        selectedTemplate: selectedTemplate?._id,

        selectedServices: selectedServicesPayload,

        subtotal,

        discount,
        excludeGST,

        gst: excludeGST ? 0 : Math.max(subtotal - discount, 0) * 0.18,
        finalAmount:
          Math.max(subtotal - discount, 0) +
          (excludeGST ? 0 : Math.max(subtotal - discount, 0) * 0.18),

        status: "draft",
      };

      const res = await api.post("/api/proposal/create-proposal", payload);
      localStorage.removeItem("proposalDraft");
      //   clearDraft();
      navigate("/admin/saved-proposals");

      alert("Draft Saved Successfully");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const clearDraft = () => {
    localStorage.removeItem("proposalDraft");

    setFormData({
      clientName: "",
      clientCompany: "",
      clientEmail: "",
      clientPhone: "",
      industry: "",
      customIndustry: "",
      objectives: [],
      businessStage: "",
      budgetLevel: "",
      proposalType: "",
      notes: "",
    });

    setSelectedServices({});
    setSelectedTemplate(null);
    setPricingData([]);
    setSubtotal(0);
    setDiscount(0);
    setExcludeGST(0);
    setStep(1);
  };

  const updateProposal = async () => {
    try {
      const selectedServicesPayload = services
        .filter((service) => {
          const value = selectedServices[service._id];

          if (service.inputType === "checkbox") return value === true;

          if (service.inputType === "counter") return value > 0;

          if (service.inputType === "option-selector")
            return Array.isArray(value) && value.length > 0;

          if (service.inputType === "text-input")
            return value && value.trim() !== "";

          return false;
        })
        .map((service) => {
          const value = selectedServices[service._id];

          const pricingItem = pricingData.find(
            (item) => item.serviceName === service.serviceName,
          );

          return {
            serviceId: service._id,
            serviceName: service.serviceName,
            quantity: service.inputType === "counter" ? value : 1,
            amount: pricingItem?.amount || 0,
            inputValue:
              typeof value === "string"
                ? value
                : Array.isArray(value)
                  ? value.join(", ")
                  : "",
          };
        });

      const payload = {
        ...formData,
        industry:
          formData.industry === "Custom Industry"
            ? formData.customIndustry
            : formData.industry,
        selectedTemplate: selectedTemplate?._id,
        selectedServices: selectedServicesPayload,
        subtotal,
        discount,
        excludeGST,

        gst: excludeGST ? 0 : Math.max(subtotal - discount, 0) * 0.18,
        finalAmount:
          Math.max(subtotal - discount, 0) +
          (excludeGST ? 0 : Math.max(subtotal - discount, 0) * 0.18),
      };

      await api.put(`/api/proposal/update-proposal/${proposalId}`, payload);
      localStorage.removeItem("proposalDraft");

      alert("Proposal Updated Successfully");

      navigate("/admin/saved-proposals");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AdminLayout>
      {/* <h1 className="text-white p-4">Current Step : {step}</h1> */}

      {step === 1 && (
        <Step1ClientRequirement
          formData={formData}
          setFormData={setFormData}
          objectivesList={objectivesList}
          handleObjectiveChange={handleObjectiveChange}
          setStep={setStep}
        />
      )}
      {step === 2 && (
        <Step2ServiceSelection
          categories={categories}
          services={services}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          pricingMap={pricingMap}
          budgetLevel={formData.budgetLevel}
          setStep={setStep}
        />
      )}

      {step === 3 && (
        <Step3PricingSummary
          formData={formData}
          categories={categories}
          services={services}
          selectedServices={selectedServices}
          setStep={setStep}
          pricingData={pricingData}
          setPricingData={setPricingData}
          subtotal={subtotal}
          setSubtotal={setSubtotal}
          discount={discount}
          setDiscount={setDiscount}
          excludeGST={excludeGST}
          setExcludeGST={setExcludeGST}
        />
      )}
      {step === 4 && (
        <Step4TemplateSelection
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          setStep={setStep}
        />
      )}
      {step === 5 && (
        <Step5ProposalPreview
          formData={formData}
          categories={categories}
          services={services}
          selectedServices={selectedServices}
          selectedTemplate={selectedTemplate}
          pricingData={pricingData}
          discount={discount}
          excludeGST={excludeGST}
          subtotal={subtotal}
          settings={settings}
          setStep={setStep}
          //   saveDraft={saveDraft}
          saveDraft={editMode ? updateProposal : saveDraft}
          editMode={editMode}
        />
      )}
    </AdminLayout>
  );
};

export default CreateProposal;
