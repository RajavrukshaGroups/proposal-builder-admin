const Step2ServiceSelection = ({
  categories,
  services,
  selectedServices,
  setSelectedServices,
  pricingMap,
  budgetLevel,
  setStep,
}) => {
  const renderPricingCards = (serviceId) => {
    console.log("pricingMap", pricingMap);
    if (!pricingMap?.[serviceId]) return null;

    const allPlans = [
      {
        label: "Basic",
        price: pricingMap[serviceId]?.basicPrice,
      },
      {
        label: "Growth",
        price: pricingMap[serviceId]?.growthPrice,
      },
      {
        label: "Premium",
        price: pricingMap[serviceId]?.premiumPrice,
      },
      {
        label: "Enterprise",
        price: pricingMap[serviceId]?.enterprisePrice,
      },
    ];

    const plansToShow = budgetLevel
      ? allPlans.filter((plan) => plan.label === budgetLevel)
      : allPlans;

    return (
      <div className="flex flex-wrap gap-2">
        {plansToShow.map((plan) => (
          <div
            key={plan.label}
            className={`w-[120px] py-2 rounded-lg border text-center
          ${
            budgetLevel === plan.label
              ? "border-cyan-500 bg-cyan-500/20"
              : "border-slate-700 bg-slate-800"
          }`}
          >
            {/* <div className="text-xs text-slate-400">{plan.label}</div> */}

            <div className="text-white font-semibold">
              ₹{plan.price?.toLocaleString() || 0}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getSelectedAmount = (service) => {
  const pricing = pricingMap?.[service._id];

  if (!pricing) return 0;

  let amount = 0;

  switch (budgetLevel) {
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
    amount *= selectedServices[service._id] || 0;
  }

  return amount;
};

const selectedServicesList = services.filter((service) => {
  const value = selectedServices[service._id];

  if (service.inputType === "checkbox") return value === true;

  if (service.inputType === "counter") return value > 0;

  if (service.inputType === "option-selector")
    return Array.isArray(value) && value.length > 0;

  if (service.inputType === "text-input")
    return value && value.trim() !== "";

  return false;
});

const subtotal = selectedServicesList.reduce(
  (sum, service) => sum + getSelectedAmount(service),
  0,
);

const gst = subtotal * 0.18;

const finalAmount = subtotal + gst;
  return (
    <div className="p-3 sm:p-6">
      <div className="p-0 sm:p-6">
        {/* <button
          onClick={() => setStep(1)}
          className="mb-6 px-4 py-2 rounded-lg bg-slate-700 text-white"
        >
          Back
        </button> */}
        {/* <h1 className="text-2xl font-bold text-black mb-6">Select Services</h1> */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Select Services
          </h1>

          <p className="text-white">
            Choose the services required for this proposal.
          </p>
          <div
            className="
    mt-2
    p-4
    rounded-xl
    bg-cyan-500/10
    border
    border-cyan-500/30
  "
          >
            <p className="text-slate-400">Selected Budget Plan</p>

            <h2 className="text-cyan-400 text-xl font-bold">
              {budgetLevel || "Not Selected"}
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Prices highlighted below are based on the selected
              <span className="text-cyan-400 font-semibold">
                {" "}
                {budgetLevel}
              </span>{" "}
              plan.
            </p>
          </div>
        </div>

        {categories.map((category) => (
          <div
            key={category._id}
            className="
  mb-8
  bg-slate-900
  border
  border-slate-800
  rounded-2xl
  p-3 sm:p-6
  shadow-lg
"
          >
            <h2 className="text-xl font-semibold text-cyan-400 mb-5 border-b border-slate-800 pb-3">
              {category.name}
            </h2>

            {services
              .filter((service) => service.categoryId?._id === category._id)
              .map((service) => (
                <div key={service._id} className="mb-4">
                  {service.inputType === "checkbox" && (
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                      {/* Checkbox + Service Name */}
                      <label className="flex items-center gap-3 text-white md:min-w-[250px]">
                        <input
                          type="checkbox"
                          checked={selectedServices[service._id] || false}
                          onChange={(e) =>
                            setSelectedServices({
                              ...selectedServices,
                              [service._id]: e.target.checked,
                            })
                          }
                        />

                        <span>{service.serviceName}</span>
                      </label>

                      {/* Pricing Cards */}
                      <div className="flex-1">
                        {renderPricingCards(service._id)}
                      </div>
                    </div>
                  )}

                  {service.inputType === "counter" && (
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6 text-white">
                      {/* Service Name */}
                      <div className="font-medium">
                        {service.serviceName}
                      </div>

                      {/* Pricing + Counter row */}
                      <div className="flex items-center justify-between gap-3 md:gap-6 flex-1">
                        {/* Pricing Cards */}
                        <div className="flex gap-2">
                          {renderPricingCards(service._id)}
                        </div>

                        {/* Counter */}
                        <div className="flex items-center gap-3 shrink-0">
                          <button
                            className="
            w-10
            h-10
            rounded-lg
            bg-slate-700
            hover:bg-cyan-600
            transition-all
          "
                            onClick={() =>
                              setSelectedServices({
                                ...selectedServices,
                                [service._id]: Math.max(
                                  (selectedServices[service._id] || 0) - 1,
                                  0,
                                ),
                              })
                            }
                          >
                            -
                          </button>

                          <span className="w-8 text-center text-lg font-semibold">
                            {selectedServices[service._id] || 0}
                          </span>

                          <button
                            className="
            w-10
            h-10
            rounded-lg
            bg-slate-700
            hover:bg-cyan-600
            transition-all
          "
                            onClick={() =>
                              setSelectedServices({
                                ...selectedServices,
                                [service._id]:
                                  (selectedServices[service._id] || 0) + 1,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {service.inputType === "option-selector" && (
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-6 text-white">
                      {/* Service Name */}
                      <div className="font-medium">
                        {service.serviceName}
                      </div>

                      {/* Pricing Cards */}
                      <div className="flex flex-1">
                        {renderPricingCards(service._id)}
                      </div>

                      {/* Options */}
                      <div className="w-full md:w-[280px] space-y-2">
                        {service.options?.map((option) => (
                          <label
                            key={option}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              checked={
                                selectedServices[service._id]?.includes(
                                  option,
                                ) || false
                              }
                              onChange={(e) => {
                                const currentOptions =
                                  selectedServices[service._id] || [];

                                if (e.target.checked) {
                                  setSelectedServices({
                                    ...selectedServices,
                                    [service._id]: [...currentOptions, option],
                                  });
                                } else {
                                  setSelectedServices({
                                    ...selectedServices,
                                    [service._id]: currentOptions.filter(
                                      (item) => item !== option,
                                    ),
                                  });
                                }
                              }}
                            />

                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.inputType === "text-input" && (
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6 text-white">
                      {/* Service Name */}
                      <div className="font-medium">
                        {service.serviceName}
                      </div>

                      {/* Pricing Cards */}
                      <div className="flex flex-1">
                        {renderPricingCards(service._id)}
                      </div>

                      {/* Text Input */}
                      <div className="w-full md:w-[320px]">
                        <input
                          type="text"
                          placeholder={service.description || "Enter value"}
                          value={selectedServices[service._id] || ""}
                          onChange={(e) =>
                            setSelectedServices({
                              ...selectedServices,
                              [service._id]: e.target.value,
                            })
                          }
                          className="
          w-full
          px-4
          py-2
          rounded-lg
          bg-slate-800
          border
          border-slate-700
          text-white
          focus:border-cyan-500
          focus:outline-none
        "
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
      {/* <div className="mt-8 flex justify-between">
        <button
          onClick={() => setStep(1)}
          className="px-6 py-3 rounded-xl bg-slate-700 text-white"
        >
          Back
        </button>

        <button
          onClick={() => setStep(3)}
          className="px-6 py-3 rounded-xl bg-cyan-500 text-white"
        >
          Continue
        </button>
      </div> */}
      <div className="mt-10 flex justify-between">
        <button
          onClick={() => setStep(1)}
          className="
      px-6
      py-3
      rounded-xl
      bg-slate-700
      hover:bg-slate-600
      text-white
      transition-all
    "
        >
          Back
        </button>

        <button
          onClick={() => setStep(3)}
          className="
      px-6
      py-3
      rounded-xl
      bg-gradient-to-r
      from-cyan-500
      to-blue-500
      text-white
      font-semibold
      shadow-lg
      hover:scale-105
      transition-all
    "
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Step2ServiceSelection;
