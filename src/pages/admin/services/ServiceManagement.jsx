import { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/adminLayout";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";

const ServiceManagement = () => {
  console.log("ServiceManagement Rendered");
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [inputType, setInputType] = useState("checkbox");
  //   const [defaultQuantity, setDefaultQuantity] = useState(0);
  const [priceType, setPriceType] = useState("one-time");

  const [editPriceType, setEditPriceType] = useState("one-time");
  const [editModal, setEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [editCategoryId, setEditCategoryId] = useState("");

  const [editServiceName, setEditServiceName] = useState("");

  const [editInputType, setEditInputType] = useState("");

  const [description, setDescription] = useState("");

  const [editDescription, setEditDescription] = useState("");

  //   const [editDefaultQuantity, setEditDefaultQuantity] = useState(0);

  //   const [editPriceType, setEditPriceType] = useState("");

  const [editActive, setEditActive] = useState(true);

  const [options, setOptions] = useState("");
  const [editOptions, setEditOptions] = useState("");

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/category/all-categories");
      console.log("response", res);

      setCategories(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch Services
  const fetchServices = async () => {
    try {
      const res = await api.get("/api/service/all-services");

      setServices(res.data.services);
    } catch (err) {
      console.log(err);
    }
  };

  // Create Service
  const createService = async () => {
    try {
      await api.post("/api/service/create-service", {
        categoryId,
        serviceName,
        description,
        inputType,
        options:
          inputType === "option-selector"
            ? options
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : [],
        priceType,
      });

      toast.success("Service created");

      setCategoryId("");
      setServiceName("");
      setDescription("");
      setInputType("checkbox");
      setPriceType("one-time");
      setOptions("");

      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create service");
    }
  };

  // Open Edit Modal

  const handleEditClick = (service) => {
    setSelectedService(service);

    setEditCategoryId(service.categoryId?._id || "");
    setEditServiceName(service.serviceName || "");
    setEditDescription(service.description || "");
    setEditInputType(service.inputType || "checkbox");
    // setEditDefaultQuantity(service.defaultQuantity || 0);
    setEditPriceType(service.priceType || "one-time");
    setEditActive(service.active);
    setEditOptions(service.options?.join(", ") || "");

    setEditModal(true);
  };

  // Update Service
  const updateService = async () => {
    try {
      await api.put(`/api/service/update-service/${selectedService._id}`, {
        categoryId: editCategoryId,
        serviceName: editServiceName,
        description: editDescription,
        inputType: editInputType,
        options:
          editInputType === "option-selector"
            ? editOptions
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : [],
        priceType: editPriceType,
        active: editActive,
      });
      toast.success("Service updated");

      setEditModal(false);

      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update service");
    }
  };

  // Delete Service
  const deleteService = async (id) => {
    const confirmDelete = window.confirm("Delete this service?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/service/delete-service/${id}`);

      toast.success("Service deleted");

      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete service");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, []);

  console.log(categories);
  console.log(services);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-white mb-6">
            Service Management
          </h1>

          {/* CREATE FORM */}
          <div className="grid md:grid-cols-5 gap-4 mb-6">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Service Name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <textarea
              placeholder="Service Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white md:col-span-2"
            />

            <select
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            >
              <option value="checkbox">Checkbox</option>

              <option value="counter">Counter</option>

              <option value="option-selector">Option Selector</option>

              <option value="text-input">Text Input</option>
            </select>

            {inputType === "option-selector" && (
              <input
                type="text"
                placeholder="Long Form, Short Form, Podcast"
                value={options}
                onChange={(e) => setOptions(e.target.value)}
                className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            )}

            <select
              value={priceType}
              onChange={(e) => setPriceType(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            >
              <option value="one-time">One Time</option>

              <option value="monthly">Monthly</option>

              <option value="quarterly">Quarterly</option>

              <option value="annual">Annual</option>
            </select>

            <button
              onClick={createService}
              className="
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                via-blue-500
                to-orange-500
                text-white
                font-semibold
              "
            >
              Add Service
            </button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="p-3 text-slate-300">Category</th>
                  <th className="p-3 text-slate-300">Service</th>
                  <th className="p-3 text-slate-300">Description</th>
                  <th className="p-3 text-slate-300">Input Type</th>
                  <th className="p-3 text-slate-300">Price Type</th>
                  <th className="p-3 text-slate-300">Actions</th>
                  <th className="p-3 text-slate-300">Status</th>
                </tr>
              </thead>

              <tbody>
                {services.map((service) => (
                  <tr key={service._id} className="border-b border-slate-800">
                    <td className="p-3 text-white">
                      {service.categoryId?.name}
                    </td>

                    <td className="p-3 text-white">{service.serviceName}</td>
                    <td className="p-3 text-slate-300">
                      {service.description || "-"}
                    </td>

                    <td className="p-3 text-slate-300">{service.inputType}</td>

                    <td className="p-3 text-slate-300">{service.priceType}</td>

                    <td className="p-3">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditClick(service)}
                          className="p-2 rounded-lg bg-blue-500/20 text-blue-400"
                        >
                          <FiEdit2 />
                        </button>

                        <button
                          onClick={() => deleteService(service._id)}
                          className="p-2 rounded-lg bg-red-500/20 text-red-400"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                    <td className="p-3 text-white">
                      {service.active ? "Active" : "Inactive"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* EDIT MODAL */}
        {editModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            {" "}
            <div
              className="
    bg-slate-900
    rounded-2xl
    border
    border-slate-700
    w-full
    max-w-2xl
    max-h-[90vh]
    overflow-y-auto
    p-4 md:p-6
  "
            >
              <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-5">
                <h2 className="text-xl text-white font-semibold">
                  Edit Service
                </h2>
                <button
                  onClick={() => setEditModal(false)}
                  className="
    flex
    items-center
    justify-center
    w-9
    h-9
    rounded-lg
    bg-red-500/20
    text-red-400
    hover:bg-red-500/30
    transition
  "
                >
                  <FiX size={18} />
                </button>
              </div>
              <div className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Category
                  </label>

                  <select
                    value={editCategoryId}
                    onChange={(e) => setEditCategoryId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Name */}
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Service Name
                  </label>

                  <input
                    value={editServiceName}
                    onChange={(e) => setEditServiceName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Description
                  </label>

                  <input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                {/* Input Type */}
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Input Type
                  </label>

                  <select
                    value={editInputType}
                    onChange={(e) => setEditInputType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="checkbox">Checkbox</option>
                    <option value="counter">Counter</option>
                    <option value="option-selector">Option Selector</option>
                    <option value="text-input">Text Input</option>
                  </select>

                  {editInputType === "option-selector" && (
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">
                        Options
                      </label>

                      <input
                        type="text"
                        value={editOptions}
                        onChange={(e) => setEditOptions(e.target.value)}
                        placeholder="Long Form, Short Form, Podcast"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                      />
                    </div>
                  )}
                </div>

                {/* Default Quantity */}
                {/* <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Default Quantity
                  </label>

                  <input
                    type="number"
                    value={editDefaultQuantity}
                    onChange={(e) => setEditDefaultQuantity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div> */}

                {/* Price Type */}
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Price Type
                  </label>

                  <select
                    value={editPriceType}
                    onChange={(e) => setEditPriceType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="one-time">One Time</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>

                {/* Active Status */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={editActive}
                    onChange={(e) => setEditActive(e.target.checked)}
                    className="w-4 h-4"
                  />

                  <label className="text-slate-300">Active Service</label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditModal(false)}
                    className="
      flex-1
      py-3
      rounded-xl
      border
      border-slate-600
      text-slate-300
      hover:bg-slate-800
    "
                  >
                    Cancel
                  </button>

                  <button
                    onClick={updateService}
                    className="
      flex-1
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
                    Update Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ServiceManagement;
