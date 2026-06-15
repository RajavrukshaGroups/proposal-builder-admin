import { useState, useEffect } from "react";
import api from "../../../api/axios";
const Step3PricingSummary = ({
  formData,
  categories,
  services,
  selectedServices,
  setStep,
  pricingData,
  setPricingData,
  subtotal,
  setSubtotal,
  discount,
  setDiscount,
  excludeGST,
  setExcludeGST,
}) => {
  //   const [pricingData, setPricingData] = useState([]);
  //   const [subtotal, setSubtotal] = useState(0);
  const getSelectedServices = () => {
    return services.filter((service) => {
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
  };

  const selectedList = getSelectedServices();
  const calculatePricing = async () => {
    try {
      let total = 0;

      const pricingList = [];

      for (const service of selectedList) {
        const res = await api.get(`/api/pricing/service/${service._id}`);
        console.log("response", res);

        const pricing = res.data.pricing;

        let amount = 0;

        switch (formData.budgetLevel) {
          case "Basic":
            amount = pricing.basicPrice;
            break;

          case "Growth":
            amount = pricing.growthPrice;
            break;

          case "Premium":
            amount = pricing.premiumPrice;
            break;

          case "Enterprise":
            amount = pricing.enterprisePrice;
            break;

          default:
            amount = 0;
        }

        if (service.inputType === "counter") {
          amount = amount * (selectedServices[service._id] || 1);
        }

        pricingList.push({
          serviceName: service.serviceName,
          amount,
        });

        total += amount;
      }

      setPricingData(pricingList);
      setSubtotal(total);

      console.log("pricingList", pricingList);
      console.log("total", total);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    calculatePricing();
  }, [services, selectedServices, formData.budgetLevel]);

  const discountAmount = Number(discount || 0);

  const discountedSubtotal = Math.max(subtotal - discountAmount, 0);

  const gstAmount = excludeGST ? 0 : discountedSubtotal * 0.18;

  const finalAmount = discountedSubtotal + gstAmount;

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT */}

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            Review Selected Services
          </h2>

          {categories.map((category) => {
            const categoryServices = selectedList.filter(
              (service) => service.categoryId?._id === category._id,
            );

            if (categoryServices.length === 0) return null;

            return (
              <div key={category._id} className="mb-8">
                <h3 className="text-cyan-400 text-lg font-semibold mb-4">
                  {category.name}
                </h3>

                <div className="space-y-3">
                  {categoryServices.map((service) => (
                    <div
                      key={service._id}
                      className="bg-slate-800 rounded-lg p-3"
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-white font-medium">
                          {service.serviceName}
                        </div>

                        <div className="text-cyan-400 font-semibold">
                          ₹
                          {pricingData
                            .find(
                              (item) =>
                                item.serviceName === service.serviceName,
                            )
                            ?.amount?.toLocaleString() || 0}
                        </div>
                      </div>

                      {service.inputType === "counter" && (
                        <div className="text-slate-400 text-sm">
                          Quantity : {selectedServices[service._id]}
                        </div>
                      )}

                      {service.inputType === "option-selector" && (
                        <div className="text-slate-400 text-sm">
                          Selected : {selectedServices[service._id].join(", ")}
                        </div>
                      )}

                      {service.inputType === "text-input" && (
                        <div className="text-slate-400 text-sm">
                          {selectedServices[service._id]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT SUMMARY */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit sticky top-6">
          <h2 className="text-xl text-white font-semibold mb-4">
            Proposal Summary
          </h2>

          <div className="space-y-3 text-slate-300">
            <p>
              <strong>Client:</strong> {formData.clientName}
            </p>

            {/* <p>
              <strong>Industry:</strong> {formData.industry}
            </p> */}
            <p>
              <strong>Industry:</strong>{" "}
              {formData.industry === "Custom Industry"
                ? formData.customIndustry || "-"
                : formData.industry || "-"}
            </p>

            <p>
              <strong>Business Stage:</strong> {formData.businessStage}
            </p>

            <p>
              <strong>Budget:</strong> {formData.budgetLevel}
            </p>

            <p>
              <strong>Proposal Type:</strong> {formData.proposalType}
            </p>

            <p>
              {/* <p>
                <strong>Subtotal:</strong> ₹{subtotal.toLocaleString()}
              </p>
              <p>
                <strong>GST (18%):</strong> ₹
                {(subtotal * 0.18).toLocaleString()}
              </p>
              <p>
                <strong>Final Amount:</strong> ₹
                {(subtotal * 1.18).toLocaleString()}
              </p> */}

              <p>
                <strong>Subtotal:</strong> ₹{subtotal.toLocaleString()}
              </p>

              <p>
                <strong>Discount:</strong> ₹{discountAmount.toLocaleString()}
              </p>

              <p>
                <strong>After Discount:</strong> ₹
                {discountedSubtotal.toLocaleString()}
              </p>

              <p>
                <strong>GST {excludeGST ? "(Excluded)" : "(18%)"}:</strong> ₹
                {gstAmount.toLocaleString()}
              </p>

              <p className="text-cyan-400 text-lg font-bold">
                <strong>Final Amount:</strong> ₹{finalAmount.toLocaleString()}
              </p>
            </p>
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={excludeGST}
                onChange={(e) => setExcludeGST(e.target.checked)}
              />
              Exclude GST
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-white mb-2">Discount Amount</label>

            <input
              type="number"
              min="0"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="
      w-full
      px-4
      py-2
      rounded-lg
      bg-slate-800
      border
      border-slate-700
      text-white
    "
              placeholder="Enter discount"
            />
          </div>
        </div>
      </div>

      {/* FOOTER BUTTONS */}

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setStep(2)}
          className="
            px-6
            py-3
            rounded-xl
            bg-slate-700
            text-white
          "
        >
          Back
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => setStep(4)}
            className="
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-500
              text-white
            "
          >
            {/* Generate Proposal */}
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3PricingSummary;
