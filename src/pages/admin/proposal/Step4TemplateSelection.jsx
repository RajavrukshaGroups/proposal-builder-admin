import { useEffect, useState } from "react";
import api from "../../../api/axios";

const Step4TemplateSelection = ({
  selectedTemplate,
  setSelectedTemplate,
  setStep,
}) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTemplates = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/proposal-template/all-templates");

      const activeTemplates = res.data.templates.filter(
        (template) => template.active,
      );

      setTemplates(activeTemplates);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => setStep(3)}
          className="
            px-5
            py-2
            rounded-xl
            bg-slate-700
            text-white
          "
        >
          Back
        </button>

        <h1 className="text-2xl font-bold text-black">
          Select Proposal Template
        </h1>

        <div />
      </div>

      {/* Loading */}

      {loading ? (
        <div className="text-center text-white">Loading Templates...</div>
      ) : (
        <>
          {/* Templates */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template._id}
                onClick={() => setSelectedTemplate(template)}
                className={`
                  cursor-pointer
                  rounded-2xl
                  border
                  p-5
                  transition-all
                  duration-300

                  ${
                    selectedTemplate?._id === template._id
                      ? `
      border-cyan-400
      bg-slate-900
      ring-4
      ring-cyan-500/30
      shadow-[0_0_25px_rgba(34,211,238,0.5)]
    `
                      : "border-slate-800 bg-slate-900 hover:border-cyan-500/50"
                  }
                `}
              >
                <h2 className="text-xl font-semibold text-white mb-3">
                  {template.templateName}
                </h2>

                <p className="text-cyan-400 font-medium mb-2">
                  {template.coverTitle}
                </p>

                <p className="text-slate-400 text-sm mb-4">
                  {template.coverSubtitle}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="text-slate-300">
                    Services :
                    <span className="ml-2 text-white">
                      {template.includeServices ? "Yes" : "No"}
                    </span>
                  </div>

                  <div className="text-slate-300">
                    Pricing :
                    <span className="ml-2 text-white">
                      {template.includePricing ? "Yes" : "No"}
                    </span>
                  </div>

                  <div className="text-slate-300">
                    Timeline :
                    <span className="ml-2 text-white">
                      {template.includeTimeline ? "Yes" : "No"}
                    </span>
                  </div>

                  <div className="text-slate-300">
                    Terms :
                    <span className="ml-2 text-white">
                      {template.includeTerms ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                {selectedTemplate?._id === template._id && (
                  <div
                    className="
    mt-4
    inline-flex
    items-center
    gap-2
    px-3
    py-1
    rounded-full
    bg-cyan-500
    text-white
    text-sm
    font-semibold
  "
                  >
                    ✓ Selected
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}

          <div className="mt-10 flex justify-end">
            <button
              disabled={!selectedTemplate}
              onClick={() => setStep(5)}
              className="
                px-8
                py-3
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                text-white
                font-semibold
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              Continue To Proposal Preview
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Step4TemplateSelection;
