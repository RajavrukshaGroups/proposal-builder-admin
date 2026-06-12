const Step2ServiceSelection = ({
  categories,
  services,
  selectedServices,
  setSelectedServices,
  setStep,
}) => {
  return (
    <div className="p-6">
      <div className="p-6">
        {/* <button
          onClick={() => setStep(1)}
          className="mb-6 px-4 py-2 rounded-lg bg-slate-700 text-white"
        >
          Back
        </button> */}
        {/* <h1 className="text-2xl font-bold text-black mb-6">Select Services</h1> */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Select Services
          </h1>

          <p className="text-black-400">
            Choose the services required for this proposal.
          </p>
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
  p-6
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
                    <label className="flex items-center gap-3 text-white">
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

                      {service.serviceName}
                    </label>
                  )}

                  {service.inputType === "counter" && (
                    <div className="flex items-center justify-between text-white">
                      <span>{service.serviceName}</span>

                      <div className="flex items-center gap-3">
                        <button
                          className="
  w-8
  h-8
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

                        <span>{selectedServices[service._id] || 0}</span>

                        <button
                          className="
  w-8
  h-8
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
                  )}

                  {service.inputType === "option-selector" && (
                    <div className="text-white">
                      <label className="block mb-3 font-medium">
                        {service.serviceName}
                      </label>

                      <div className="grid md:grid-cols-2 gap-2">
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
                    <div className="text-white">
                      <label className="block mb-2">
                        {service.serviceName}
                      </label>

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
      "
                      />
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
