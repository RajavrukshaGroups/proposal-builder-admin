const Step1ClientRequirement = ({
  formData,
  setFormData,
  objectivesList,
  handleObjectiveChange,
  setStep,
}) => {
  return (
    <>
      (
      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}

          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h1 className="text-2xl font-bold text-white mb-6">
              Create New Proposal
            </h1>

            {/* Client Name */}

            {/* <div className="mb-5">
              <label className="block text-slate-300 mb-2">Client Name</label>

              <input
                type="text"
                value={formData.clientName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientName: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div> */}
            {/* Client Information */}

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Client Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Client Name"
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clientName: e.target.value,
                    })
                  }
                  className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />

                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.clientCompany || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clientCompany: e.target.value,
                    })
                  }
                  className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />

                <input
                  type="email"
                  placeholder="Client Email"
                  value={formData.clientEmail || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clientEmail: e.target.value,
                    })
                  }
                  className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />

                <input
                  type="text"
                  placeholder="Client Phone"
                  value={formData.clientPhone || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clientPhone: e.target.value,
                    })
                  }
                  className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>
            </div>

            {/* Industry */}

            <div className="mb-5">
              <label className="block text-slate-300 mb-2">Industry</label>

              {/* <select
                value={formData.industry}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    industry: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
              >
                <option value="">Select Industry</option>

                <option>Real Estate</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Manufacturing</option>
                <option>E-commerce</option>
                <option>Local Business</option>
                <option>Corporate / B2B</option>
                <option>Hospitality</option>
                <option>Finance</option>
                <option>Custom Industry</option>
              </select> */}
              <select
                value={formData.industry}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    industry: e.target.value,
                    customIndustry:
                      e.target.value === "Custom Industry"
                        ? formData.customIndustry
                        : "",
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
              >
                <option value="">Select Industry</option>

                <option>Real Estate</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Manufacturing</option>
                <option>E-commerce</option>
                <option>Local Business</option>
                <option>Corporate / B2B</option>
                <option>Hospitality</option>
                <option>Finance</option>

                <option value="Custom Industry">
                  Other (Specify Industry)
                </option>
              </select>
              {formData.industry === "Custom Industry" && (
                <input
                  type="text"
                  placeholder="Enter Industry Name"
                  value={formData.customIndustry || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customIndustry: e.target.value,
                    })
                  }
                  className="
      mt-3
      w-full
      px-4
      py-3
      rounded-xl
      bg-slate-800
      border
      border-slate-700
      text-white
    "
                />
              )}
            </div>

            {/* Objectives */}

            <div className="mb-5">
              <label className="block text-slate-300 mb-3">
                Main Objectives
              </label>

              <div className="grid md:grid-cols-2 gap-3">
                {objectivesList.map((objective) => (
                  <label
                    key={objective}
                    className="flex items-center gap-2 text-white"
                  >
                    <input
                      type="checkbox"
                      checked={formData.objectives.includes(objective)}
                      onChange={() => handleObjectiveChange(objective)}
                    />

                    {objective}
                  </label>
                ))}
              </div>
            </div>

            {/* Business Stage */}

            <div className="mb-5">
              <label className="block text-slate-300 mb-2">
                Business Stage
              </label>

              <select
                value={formData.businessStage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessStage: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
              >
                <option value="">Select</option>

                <option>New Business</option>
                <option>Growing Business</option>
                <option>Established Business</option>
                <option>Corporate / Enterprise</option>
              </select>
            </div>

            {/* Budget */}

            <div className="mb-5">
              <label className="block text-slate-300 mb-2">Budget Level</label>

              <select
                value={formData.budgetLevel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    budgetLevel: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
              >
                <option value="">Select</option>

                <option>Basic</option>
                <option>Growth</option>
                <option>Premium</option>
                <option>Enterprise</option>
              </select>
            </div>

            {/* Proposal Type */}

            <div className="mb-5">
              <label className="block text-slate-300 mb-2">Proposal Type</label>

              <select
                value={formData.proposalType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    proposalType: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
              >
                <option value="">Select</option>

                <option>Monthly Retainer</option>
                <option>One-Time Project</option>
                <option>Setup + Monthly</option>
                <option>Quarterly Campaign</option>
                <option>Annual Plan</option>
              </select>
            </div>

            {/* Notes */}

            <div>
              <label className="block text-slate-300 mb-2">Notes</label>

              <textarea
                rows={5}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notes: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="
              mt-6
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              via-blue-500
              to-orange-500
              text-white
              font-semibold
            "
            >
              Continue
            </button>
          </div>

          {/* RIGHT SUMMARY */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit sticky top-6">
            <h2 className="text-xl text-white font-semibold mb-4">
              Live Summary
            </h2>

            <div className="space-y-3 text-slate-300">
              <p>
                <strong>Client:</strong>
                {formData.clientName || "-"}
              </p>

              <p>
                <strong>Company:</strong>
                {formData.clientCompany || "-"}
              </p>

              <p>
                <strong>Email:</strong>
                {formData.clientEmail || "-"}
              </p>

              <p>
                <strong>Phone:</strong>
                {formData.clientPhone || "-"}
              </p>

              <p>
                {/* <strong>Industry:</strong> {formData.industry || "-"} */}
                <strong>Industry:</strong>{" "}
                {formData.industry === "Custom Industry"
                  ? formData.customIndustry || "-"
                  : formData.industry || "-"}
              </p>

              <p>
                <strong>Budget:</strong> {formData.budgetLevel || "-"}
              </p>

              <p>
                <strong>Proposal:</strong> {formData.proposalType || "-"}
              </p>

              <p>
                <strong>Objectives:</strong>
              </p>

              <ul className="list-disc ml-5">
                {formData.objectives.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      )
    </>
  );
};

export default Step1ClientRequirement;
