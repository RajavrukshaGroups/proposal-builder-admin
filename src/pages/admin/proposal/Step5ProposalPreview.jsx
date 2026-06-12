import React from "react";

const Step5ProposalPreview = ({
  formData,
  categories,
  services,
  selectedServices,
  selectedTemplate,
  pricingData,
  subtotal,
  settings,
  proposalData,
  setStep,
  saveDraft,
  editMode = false,
}) => {
  // Generate proposal number
  const proposalNumber = proposalData?.proposalNumber
    ? proposalData.proposalNumber
    : `DES-${new Date().getFullYear()}-${Date.now().toString().slice(-5)}`;

  //   const selectedList = services.filter((service) => {
  //     const value = selectedServices[service._id];

  //     if (service.inputType === "checkbox") {
  //       return value === true;
  //     }

  //     if (service.inputType === "counter") {
  //       return value > 0;
  //     }

  //     if (service.inputType === "option-selector") {
  //       return Array.isArray(value) && value.length > 0;
  //     }

  //     if (service.inputType === "text-input") {
  //       return value && value.trim() !== "";
  //     }

  //     return false;
  //   });

  const selectedList = proposalData
    ? proposalData.selectedServices
    : services.filter((service) => {
        const value = selectedServices[service._id];

        if (service.inputType === "checkbox") {
          return value === true;
        }

        if (service.inputType === "counter") {
          return value > 0;
        }

        if (service.inputType === "option-selector") {
          return Array.isArray(value) && value.length > 0;
        }

        if (service.inputType === "text-input") {
          return value && value.trim() !== "";
        }

        return false;
      });

  console.log("selectedTemplate", selectedTemplate);
  console.log("pricingData", pricingData);
  console.log("subtotal", subtotal);
  console.log("formdata", formData);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        {!proposalData && (
          <button
            onClick={() => setStep(4)}
            className="px-5 py-2 rounded-xl bg-slate-700 text-white"
          >
            Back
          </button>
        )}
        <h1 className="text-3xl font-bold text-black">Proposal Preview</h1>
        <div />
      </div>

      {/* Proposal Container */}
      <div className="relative max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Cover Section */}
        <div className="bg-slate-950 text-white p-12">
          <div className="flex justify-between items-start">
            <div>
              <img
                src={settings?.logo}
                alt="Agency Logo"
                className="h-20 object-contain mb-6"
              />
              <h1 className="text-5xl font-bold">
                {selectedTemplate?.coverTitle}
              </h1>
              <p className="text-cyan-400 text-xl mt-3">
                {selectedTemplate?.coverSubtitle}
              </p>
            </div>
            <div className="text-right">
              <h3 className="font-semibold text-xl">{settings?.agencyName}</h3>
              <p>{settings?.website}</p>
              <p>{settings?.contactEmail}</p>
              <p>{settings?.contactPhone}</p>
            </div>
          </div>

          {/* Proposal Number Badge */}
          <div className="mt-4">
            <span className="bg-cyan-500 text-white px-4 py-2 rounded-full text-sm">
              Proposal No: {proposalNumber}
            </span>
          </div>

          <div className="mt-16">
            <p className="text-slate-400 uppercase">Prepared For</p>
            <h2 className="text-4xl font-semibold mt-2">
              {formData.clientCompany || formData.clientName}
            </h2>

            <p className="mt-3">Contact Person : {formData.clientName}</p>

            <p>Email : {formData.clientEmail}</p>

            <p>Phone : {formData.clientPhone}</p>
            <p className="text-slate-400 mt-2">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        {/* Main Content */}
        <div className="p-8 space-y-10">
          {/* About Company */}
          {selectedTemplate?.aboutCompany && (
            <div>
              <h2 className="text-2xl font-bold mb-3">About Company</h2>
              <p className="text-slate-700 leading-7">
                {selectedTemplate.aboutCompany}
              </p>
            </div>
          )}

          {/* Executive Summary */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>
            <p className="text-slate-700 leading-8">
              Thank you for considering {settings?.agencyName} as your digital
              growth partner. Based on our understanding of your business goals,
              we have prepared this proposal to help {formData.clientName}{" "}
              achieve {formData.objectives.join(", ")}. The recommended
              services, timeline, pricing structure, and implementation plan
              have been tailored specifically for your business requirements.
            </p>
          </div>

          {/* Client Requirements */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Client Requirements</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <strong>Business Stage:</strong> {formData.businessStage}
              </div>
              <div>
                <strong>Budget Level:</strong> {formData.budgetLevel}
              </div>
              <div>
                <strong>Proposal Type:</strong> {formData.proposalType}
              </div>
              <div>
                <strong>Objectives:</strong> {formData.objectives.join(", ")}
              </div>
            </div>
            {formData.notes && (
              <div className="mt-4">
                <strong>Notes:</strong>
                <p className="text-slate-700 mt-2">{formData.notes}</p>
              </div>
            )}
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 className="text-2xl font-bold mb-5">
              Why Choose {settings?.agencyName}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-xl p-5">
                Dedicated Project Manager
              </div>
              <div className="border rounded-xl p-5">Transparent Reporting</div>
              <div className="border rounded-xl p-5">ROI Focused Strategy</div>
              <div className="border rounded-xl p-5">
                Experienced Marketing Team
              </div>
            </div>
          </div>

          {/* Selected Services */}
          {selectedTemplate?.includeServices && (
            <div>
              <h2 className="text-2xl font-bold mb-5">Selected Services</h2>
              {proposalData ? (
                <div className="space-y-3">
                  {proposalData.selectedServices.map((service) => (
                    <div key={service._id} className="border rounded-lg p-3">
                      <div className="font-medium">{service.serviceName}</div>

                      {/* <div className="text-sm text-slate-600">
                        Quantity : {service.quantity}
                      </div> */}
                      {service.quantity > 1 && (
                        <div className="text-sm text-slate-600">
                          Quantity : {service.quantity}
                        </div>
                      )}

                      {service.inputValue && (
                        <div className="text-sm text-slate-600">
                          {service.inputValue}
                        </div>
                      )}

                      <div className="text-cyan-600 font-semibold mt-1">
                        ₹{service.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                categories.map((category) => {
                  const categoryServices = selectedList.filter(
                    (service) => service.categoryId?._id === category._id,
                  );
                  if (categoryServices.length === 0) return null;
                  return (
                    <div key={category._id} className="mb-6">
                      <h3 className="text-lg font-semibold text-cyan-600 mb-3">
                        {category.name}
                      </h3>
                      <div className="space-y-2">
                        {categoryServices.map((service) => (
                          <div
                            key={service._id}
                            className="border rounded-lg p-3"
                          >
                            <div className="font-medium">
                              {service.serviceName}
                            </div>
                            {service.inputType === "counter" && (
                              <div className="text-sm text-slate-600">
                                Quantity: {selectedServices[service._id]}
                              </div>
                            )}
                            {service.inputType === "option-selector" && (
                              <div className="text-sm text-slate-600">
                                Selected:{" "}
                                {selectedServices[service._id].join(", ")}
                              </div>
                            )}
                            {service.inputType === "text-input" && (
                              <div className="text-sm text-slate-600">
                                {selectedServices[service._id]}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Pricing Summary (with table) */}
          {selectedTemplate?.includePricing && (
            <div>
              <h2 className="text-2xl font-bold mb-5">Pricing Summary</h2>
              <div className="border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="p-4 text-left">Service</th>
                      <th className="p-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingData?.map((item, index) => (
                      <tr key={index}>
                        <td className="p-4 border-b">{item.serviceName}</td>
                        <td className="p-4 border-b text-right">
                          ₹{item.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-4 bg-slate-100">
                  <div className="flex justify-between mb-2">
                    <strong>Subtotal</strong>
                    <strong>₹{subtotal.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between mb-2">
                    <strong>GST (18%)</strong>
                    <strong>₹{(subtotal * 0.18).toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <strong>Final Total</strong>
                    <strong>₹{(subtotal * 1.18).toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Information */}
          <div>
            <h2 className="text-2xl font-bold mb-5">Payment Information</h2>
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p>
                    <strong>Bank:</strong> {settings?.bankName}
                  </p>
                  <p>
                    <strong>Account Number:</strong> {settings?.accountNumber}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>IFSC:</strong> {settings?.ifscCode}
                  </p>
                  <p>
                    <strong>Branch:</strong> {settings?.branchName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Timeline */}
          {selectedTemplate?.includeTimeline &&
            selectedTemplate?.timelineContent && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Project Timeline</h2>
                <div className="bg-slate-100 rounded-xl p-5 whitespace-pre-wrap">
                  {selectedTemplate.timelineContent}
                </div>
              </div>
            )}

          {/* Terms & Conditions */}
          {selectedTemplate?.includeTerms &&
            selectedTemplate?.selectedTerms?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
                <div className="space-y-6">
                  {selectedTemplate.selectedTerms.map((term) => (
                    <div
                      key={term._id}
                      className="border rounded-xl p-5 bg-slate-50"
                    >
                      <h3 className="font-semibold text-lg mb-4">
                        {term.title}
                      </h3>
                      <ul className="space-y-2">
                        {term.content?.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-slate-700"
                          >
                            <span className="font-semibold text-cyan-600">
                              {index + 1}.
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Proposal Validity */}
          <div className="bg-yellow-50 border rounded-xl p-5">
            <h3 className="font-semibold mb-2">Proposal Validity</h3>
            <p>This proposal is valid for 15 days from the issue date.</p>
          </div>
        </div>
        {/* Premium Footer */}
        <div className="bg-slate-950 text-white p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img src={settings?.logo} alt="" className="h-16 mb-4" />
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <p>{settings?.contactEmail}</p>
              <p>{settings?.contactPhone}</p>
              <p>{settings?.whatsappNumber}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Office</h3>
              <p>{settings?.address}</p>
              <p>{settings?.website}</p>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-6 pt-4 text-center text-sm">
            © {new Date().getFullYear()} {settings?.agencyName}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      {/* Footer Buttons */}
      {!proposalData && (
        <div className="mt-10 flex justify-between">
          <button
            onClick={() => setStep(4)}
            className="px-5 py-2 rounded-xl bg-slate-700 text-white"
          >
            Back
          </button>

          <div className="flex gap-3">
            <button
              onClick={saveDraft}
              className="px-6 py-3 rounded-xl bg-orange-500 text-white"
            >
              {editMode ? "Update Proposal" : "Save Draft"}
            </button>

            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              Generate PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step5ProposalPreview;
